import React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  SearchInput,
} from "@/components/ui";
import { FileIcon } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export const Search = () => {
  const router = useNavigate();
  const [open, setOpen] = React.useState(false);
  const { t, i18n } = useTranslation();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  let dir: string = "ltr";
  return (
    <>
      <div className="[&_button.absolute]:left-12 wrapper w-full">
        <SearchInput
          variant="default"
          size="default"
          className="lg:max-w-[700px] md:w-full !w-full"
          searchPlaceholder={t("search")}
          searchIcon={true}
          dir="ltr"
          onClick={() => setOpen(true)}
        />
        <CommandDialog
          open={open}
          onOpenChange={setOpen}
          // @ts-ignore
          dir={dir}
        >
          <CommandInput
            placeholder={dir === "ltr" ? "Type a command or search..." : "ابحث"}
          />
          <CommandList className="min-h-[270px]">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading={dir === "ltr" ? "Categories" : "التصنيفات"}>
              {items.map((navItem) => (
                <CommandItem
                  key={navItem.href}
                  value={navItem.title}
                  onSelect={() => {
                    runCommand(() => router({ to: navItem.href }));
                  }}
                >
                  <FileIcon
                    className={cn("h-4 w-4", dir === "ltr" ? "mr-2" : "ml-2")}
                  />
                  {navItem.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    </>
  );
};

const items = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Sections",
    href: "/sections",
  },
  {
    title: "sale",
    href: "/sale",
  },
  {
    title: "Adds",
    href: "/adds",
  },
  {
    title: "profile",
    href: "/profile",
  },
];
