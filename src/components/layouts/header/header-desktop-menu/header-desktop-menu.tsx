import { buttonVariants, NavGroup, Separator } from "@/components/ui";
import { useTranslation } from "react-i18next";
import { HeaderDesktopMenuProps } from "./header-desktop-menu.types";
import { Category } from "../../home";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export const HeaderDesktopMenu = ({}: HeaderDesktopMenuProps) => {
  const { t, i18n } = useTranslation();

  const categories: Category[] = JSON.parse(
    localStorage.getItem("categories") || "{}",
  );

  return (
    <>
      <div className="hidden md:flex items-center justify-between place-self-center w-full">
        <div className="flex items-center gap-3 ml-4">
          <Link
            to="/"
            className={cn(
              buttonVariants({ variant: "default" }),
              "bg-[#ee1d24] hover:bg-white hover:text-[#ee1d24] border hover:border-[#ee1d24] w-[88.88px]",
            )}
          >
            {t("homepage")}
          </Link>
          <Link
            to="/our-services"
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-[88.88px]",
            )}
          >
            {t("ourservice")}
          </Link>
        </div>
        <Separator orientation="vertical" className="h-8" />
        <NavGroup<true>
          position="top"
          nav={{
            className:
              "[&_ul]:flex [&_ul]:gap-4 [&_li]:w-fit hover:[&_button]:bg-[#ee1d24] hover:[&_button]:text-accent [&_button]:justify-center [&_ul]:flex-wrap w-full [&_button]:font-bold",
            group: [10],
            router: {},
            pathname: location.pathname,
            isCollabsed: false,
          }}
          navigationKeys={{
            activeKey: {
              className: "bg-[#ee1d24] text-accent",
            },
            data:
              categories.length > 0
                ? i18n.language === "en"
                  ? [
                      ...categories.slice(0, 7).map((item) => ({
                        title: item.name_en,
                        route: `/categories/${item.id}`,
                        state: { ...item, branch: 1 },
                        children:
                          i18n.language === "en" ? item.name_en : item.name,
                      })),
                      {
                        title: "more",
                        route: `/categories/`,
                        state: { branch: 0 },
                        children: i18n.language === "en" ? "More" : "المزيد",
                      },
                    ]
                  : [
                      {
                        title: "more",
                        route: `/categories/more`,
                        state: { branch: 0 },
                        children: i18n.language === "en" ? "More" : "المزيد",
                      },
                      ...categories
                        .slice(0, 7)
                        .reverse()
                        .map((item) => ({
                          title: item.name_en,
                          route: `/categories/${item.id}`,
                          state: { ...item, branch: 1 },
                          children:
                            i18n.language === "en" ? item.name_en : item.name,
                        })),
                    ]
                : [],
          }}
        />
      </div>
    </>
  );
};
