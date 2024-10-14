import { cn } from "@/lib/utils";
import { Button } from "../button";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { Search } from "lucide-react";

const SearchInputVariants = cva(
  "relative justify-start font-normal shadow-none flex items-center",
  {
    variants: {
      variant: {
        default: "bg-muted/10 text-muted-foreground",
        docs: "bg-muted/50 text-muted-foreground",
      },
      size: {
        default:
          "h-10 w-10  sm:ltr:pr-12 sm:rtl:pl-12 md:w-40 lg:w-96 rounded-[0.6rem] text-md ltr:[&_kbd]:right-2 rtl:[&_kbd]:left-2 [&_kbd]:text-md",
        sm: "h-8 w-10 sm:pr-12 md:w-40 lg:w-64 rounded-[0.5rem] text-sm text-sm ltr:[&_kbd]:right-2 [&_kbd]:text-sm",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface SearchInputProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof SearchInputVariants> {
  searchIcon?: boolean;
  showKbd?: boolean;
  searchPlaceholder?: { ltr: string; rtl: string };
}

const SearchInput = React.forwardRef<HTMLButtonElement, SearchInputProps>(
  (
    {
      className,
      variant,
      size,
      searchIcon,
      showKbd,
      searchPlaceholder,
      dir,
      ...props
    },
    ref,
  ) => {
    return (
      <>
        <Button
          variant="outline"
          className={cn(SearchInputVariants({ variant, size }), className)}
          ref={ref}
          dir={dir}
          {...props}
        >
          {searchIcon && <Search className="mr-2 h-4 w-4" />}
          <span className="hidden lg:inline-flex" dir={dir}>
            {dir === "rtl"
              ? `${searchPlaceholder.rtl}...`
              : `${searchPlaceholder.ltr}...`}
          </span>
          <span className="inline-flex lg:hidden" dir={dir}>
            {dir === "rtl" ? "ابحث" : "Search..."}
          </span>
          {showKbd && (
            <kbd
              dir={dir}
              className="pointer-events-none absolute top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono font-medium opacity-100 sm:flex"
            >
              <span className="text-xs">⌘</span>
              <span>K</span>
            </kbd>
          )}
        </Button>
      </>
    );
  },
);

SearchInput.displayName = "SearchInput";

export { SearchInput };
