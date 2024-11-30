import { Input } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SearchInputProps } from "./header-search.types";

export const SearchInput = ({ className, placeHolder }: SearchInputProps) => {
  const { i18n } = useTranslation();
  const route = useNavigate();

  return (
    <form
      className={cn("relative flex w-full", className)}
      onSubmit={(e) => {
        e.preventDefault();
        route({
          to: "/categories/search/$id",
          params: { id: e.target[0].value },
        });
      }}
    >
      {
        <Search
          className={cn(
            "absolute top-1/2 -translate-y-1/2   h-4 w-4",
            i18n.dir() === "ltr" ? "left-3" : "right-3",
          )}
        />
      }
      <Input
        placeholder={placeHolder}
        className={cn("w-full", i18n.dir() === "rtl" ? "pr-8" : " pl-8", "")}
      />
    </form>
  );
};
