import { ScrollArea } from "../scroll-area";

export interface AttachmentType {
  id: string;
  file: Blob | null;
  url: string | null;
  type: string;
  name: string;
  size: string;
}

export interface UploadContextType {
  attachments: AttachmentType[];
  setAttachments: React.Dispatch<React.SetStateAction<AttachmentType[]>>;
  attachmentsState: AttachmentType[];
  setAttachmentsState: React.Dispatch<React.SetStateAction<AttachmentType[]>>;
}

export interface UploadProps
  extends Omit<React.HTMLProps<HTMLDivElement>, "content"> {
  trigger: React.ReactNode;
  content: React.ReactNode;
}

export interface UploadTriggerProps extends React.HTMLProps<HTMLDivElement> {}

export interface UploadInputProps extends React.HTMLProps<HTMLDivElement> {}

export interface UploadContentProps
  extends React.ComponentPropsWithoutRef<typeof ScrollArea> {}

export interface UploadItemProps extends React.HTMLProps<HTMLDivElement> {
  attachment: AttachmentType;
}

export interface UploadtItemRemoveProps
  extends React.HTMLProps<HTMLDivElement> {}

export interface HandleAttachmentProps {
  e: React.ChangeEvent<HTMLInputElement>;
  setAttachmentsState: React.Dispatch<React.SetStateAction<AttachmentType[]>>;
}
