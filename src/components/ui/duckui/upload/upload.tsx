import React from "react";
import { AlertDialogCustom } from "../alert-dialog";
import { ContextMenu, ContextMenuTrigger } from "../context-menu";
import { Input } from "../input";
import { ScrollArea } from "../scroll-area";
import { uuidv7 } from "uuidv7";
import { toast } from "sonner";
import { filesize } from "filesize";
import { Button, buttonVariants } from "../button";
import { Upload as UploadIcon } from "lucide-react";
import {
  AttachmentType,
  HandleAttachmentProps,
  UploadContentProps,
  UploadContextType,
  UploadInputProps,
  UploadItemProps,
  UploadProps,
  UploadtItemRemoveProps,
  UploadTriggerProps,
} from "./upload.types";
import { fileTypeIcons } from "./upload.constants";
import { getFileType } from "./upload.lib";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { supabase } from "@/supabase";

const UploadContext = React.createContext<UploadContextType | null>(null);

export const useUploadContext = () => {
  const context = React.useContext(UploadContext);
  if (!context) {
    throw new Error("useUploadContext must be used within an UploadProvider");
  }
  return context;
};

export const UploadProvider = ({ children }: { children: React.ReactNode }) => {
  const [attachments, setAttachments] = React.useState<AttachmentType[]>([]);
  const [attachmentsState, setAttachmentsState] = React.useState<
    AttachmentType[]
  >([]);

  return (
    <UploadContext.Provider
      value={{
        attachments,
        setAttachments,
        attachmentsState,
        setAttachmentsState,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

// Upload
const uploadBlobAndLinkToTable = async (blob: Blob, fileName: string) => {
  try {
    // Upload the file to Supabase Storage bucket
    const { data, error } = await supabase.storage
      .from("pdfs") // Specify your bucket name
      .upload(`${fileName}`, blob ?? new Blob(), {
        cacheControl: "3600",
        upsert: true, // Overwrite if file exists
      });

    if (error) {
      console.error("Error uploading file:", error.message);
      return;
    }

    // Insert file metadata into the `files` table (including the public URL)
    const { data: insertData, error: insertError } = await supabase
      .from("pdf_imgs")
      .insert([
        {
          file_name: fileName,
          file_url: `https://zphaxvznmjrdvteeuzjy.supabase.co/storage/v1/object/public/${data.fullPath}`,
          pdf_id: "8927db8d-2f86-4e01-9bb0-013d7f8c1eec",
        },
      ])
      .select();
    console.log(insertData);

    if (insertError) {
      console.error("Error inserting file metadata:", insertError);
      return;
    }

    console.log("File uploaded and linked to table:", insertData);
  } catch (error) {
    console.error("Error during the file upload and linking process:", error);
  }
};

export const Upload = ({ children, trigger, content }: UploadProps) => {
  const { setAttachments, attachmentsState, setAttachmentsState } =
    useUploadContext();
  return (
    <>
      {children ? (
        children
      ) : (
        <AlertDialogCustom
          type="sheet"
          drawerData={attachmentsState.length > 0}
          header={{
            head: "Upload File",
            description: "Set your daily calorie goal",
          }}
          actions={{
            continue: () => {
              setAttachments([]);
              setAttachmentsState([]);
            },
          }}
          footer={{
            className: "Upload an attachment to your comment.",
            submit: {
              onClick: async () => {
                // Ensure Promise.all is given an array of promises
                const files = await Promise.all(
                  attachmentsState.map((attachment) =>
                    uploadBlobAndLinkToTable(
                      attachment.file ?? new Blob(),
                      attachment.name
                    )
                  )
                );
                console.log(files); // Log the result of all uploads

                // Update state: Append the uploaded attachments to the list
                setAttachments((prev) => [...prev, ...attachmentsState]);

                // Clear the attachments state
                setAttachmentsState([]);
              },
              disabled: attachmentsState.length === 0,
              children: (
                <div
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    attachmentsState.length === 0 && "cursor-not-allowed",
                    "w-[120px]"
                  )}
                >
                  Submit
                </div>
              ),
            },
            cancel: {
              children: (
                <Button variant="outline" className="w-[120px]">
                  Cancel
                </Button>
              ),
            },
          }}
          state={attachmentsState.length}
          trigger={{ children: trigger }}
          content={{ children: content }}
        />
      )}
    </>
  );
};

export const UploadTrigger = React.forwardRef<
  HTMLDivElement,
  UploadTriggerProps
>(({ className, children, ...props }, ref) => (
  <div className={cn(className)} ref={ref} {...props}>
    {children}
  </div>
));

export const UploadInput = React.forwardRef<HTMLDivElement, UploadInputProps>(
  ({ className, children, ...props }, ref) => {
    const { setAttachmentsState } = useUploadContext();

    return (
      <div className={cn(className)} ref={ref} {...props}>
        <ContextMenu>
          <ContextMenuTrigger className="relative flex flex-col items-center justify-center w-full h-64 rounded-md border border-dashed border-border text-sm leading-5 transition-colors duration-100 ease-in-out hover:bg-muted/10">
            <div className="grid place-items-center gap-4">
              <UploadIcon className="size-[30px]" />
              <span>Click to upload</span>
            </div>
            <Input
              placeholder="Filter files..."
              type="file"
              className="absolute w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
              multiple={true}
              onChange={(e) => handleAttachment({ e, setAttachmentsState })}
            />
          </ContextMenuTrigger>
        </ContextMenu>
        <p className="mt-2 text-muted-foreground text-[.9rem]">
          {" "}
          Supports all file types.
        </p>
      </div>
    );
  }
);

export const UploadContent = React.forwardRef<
  HTMLDivElement,
  UploadContentProps
>(({ className, children, ...props }, ref) => {
  const { attachmentsState, setAttachmentsState } = useUploadContext();

  return (
    <ScrollArea
      className={cn(
        "flex flex-col gap-2 max-h-[39ch] md:max-h-[43ch]",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
      <div className="flex flex-col gap-2">
        {attachmentsState.map((attachment) => {
          return (
            <UploadItem key={attachment.id} attachment={attachment}>
              <UploadtItemRemove
                className="absolute top-1/2 -translate-y-1/2 right-2"
                onClick={() => {
                  setAttachmentsState((prev) =>
                    prev.filter((item) => item.id !== attachment.id)
                  );
                }}
              />
            </UploadItem>
          );
        })}
      </div>
    </ScrollArea>
  );
});

export const UploadItem = React.forwardRef<HTMLDivElement, UploadItemProps>(
  ({ attachment, children, className, ...props }, ref) => {
    const fileType = getFileType(attachment.file);
    return (
      <div
        className={cn(
          "relative flex items-center gap-4 bg-secondary/20 rounded-md p-2",
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="flex items-center gap-4">
          <div className="relative">{fileTypeIcons[fileType]}</div>
          <div className="grid items-start">
            <h3 className="inline-block text-[.9rem] truncate max-w-[200px]">
              {attachment.name || "Empty File"}
            </h3>
            <p className="inline-block truncate text-semibold text-[.8rem] max-w-[300px]">
              {filesize(attachment.file ? +attachment.file.size : 0, {
                round: 0,
              })}
            </p>
          </div>
        </div>
        {children}
      </div>
    );
  }
);

export const UploadtItemRemove = React.forwardRef<
  HTMLDivElement,
  UploadtItemRemoveProps
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        "size-4 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 cursor-pointer",
        className
      )}
      ref={ref}
      {...props}
    >
      <X className="w-4 h-4" />
    </div>
  );
});

export const handleAttachment = ({
  e,
  setAttachmentsState,
}: HandleAttachmentProps) => {
  const files = e.currentTarget.files;

  if (!files) return toast.error("Please select a file");

  const newAttachments: AttachmentType[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (file.size > 10 * 1024 * 1024) {
      toast.error(
        `File has exceeded the max size: ${file.name.slice(0, 15)}...`
      );
      continue; // Skip this file and continue with the next
    }

    const attachment: AttachmentType = {
      id: uuidv7(),
      file: file,
      name: file.name,
      url: null,
      type: file.type,
      size: file.size.toString(),
    };

    newAttachments.push(attachment);
  }

  setAttachmentsState((prev) => [...prev, ...newAttachments]);
  e.currentTarget.value = "";
};
