import { Link } from "@tanstack/react-router";
import { Logo, Shape } from "@/assets";
import { HeaderMenu } from "../header-menu";
import { useTranslation } from "react-i18next";
import { HeaderTopProps } from "./header-top.types";
import { cn } from "@/lib/utils";
import { Category } from "../../home";

export const HeaderTop = ({}: HeaderTopProps) => {
  const { i18n } = useTranslation();
  const isLTR = localStorage.getItem("lang") === "en";

  const categories: Category[] = JSON.parse(
    localStorage.getItem("categories") || "{}",
  );

  return (
    <div className="flex items-center justify-between">
      <Link to="/" className="logo mt-2">
        <img src={Logo} className="w-[9rem] h-auto" alt="Logo" />
      </Link>
      <HeaderMenu categories={categories} />
      <img
        src={Shape}
        className={cn(
          "w-[605px] -mt-4 hidden lg:block fixed",
          isLTR ? "right-0" : "left-0",
          // isLTR ? "rotateY(180deg)" : "rotateY(-180deg)",
        )}
        style={{
          transform: !isLTR ? "rotateY(0)" : "rotateY(180deg)",
        }}
      />
    </div>
  );
};
