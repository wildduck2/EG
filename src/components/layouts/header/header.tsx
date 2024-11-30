import React from "react";
import { useTranslation } from "react-i18next";
import {
  NavGroup,
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  Popover,
  DropdownMenuContent,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/assets";
import { cn } from "@/lib/utils";

import shape from "../../../assets/shape.png";
import { signoutAsync } from "../auth";
import { MapPin } from "lucide-react";
import { Category } from "../home";
import { HeaderRegion, HeaderRegionSearch } from "./header-region-search";
import { SearchInput } from "./header-search";
import { HeaderProfile } from "./header-profile/header-profile";
import { User } from "../account/user-profile";
import { HeaderMenu } from "./header-menu";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const route = useNavigate();

  const userData: User = JSON.parse(
    localStorage.getItem("user-info") as string,
  );
  const categories: Category[] = JSON.parse(
    localStorage.getItem("categories") || "{}",
  );

  return (
    <>
      <header
        className={cn(
          "lg:fixed top-0 xl:left-1/2 xl:-translate-x-1/2 w-full z-50 mx-auto place-self-center",
          location.pathname !== "/account/trader-profiles" ||
            (location.pathname.toString().includes("/account/trader2") &&
              "border-border border-solid border-b"),
        )}
      >
        <div className="flex flex-col items-cetner gap-2 container  bg-background ">
          <div className="flex items-center justify-between">
            <Link to="/" className="logo mt-2">
              <img src={Logo} className="w-[9rem] h-auto" alt="Logo" />
            </Link>
            <HeaderMenu categories={categories} />
            <img
              src={shape}
              className={cn(
                "w-[605px] -mt-4 hidden lg:block fixed",
                i18n.dir() === "ltr" ? "right-0" : "left-0",
              )}
              style={{
                transform: i18n.dir() === "ltr" ? "rotateY(180deg)" : "",
              }}
            />
          </div>

          <div className="hidden xl:flex flex-col">
            <nav
              className={cn(
                "grid md:flex items-center md:justify-center lg:justify-between place-self-center pt-2 pb-4 gap-2 w-full",
              )}
            >
              {userData && <HeaderProfile userData={userData} />}

              <HeaderRegion />
              <div className="flex  sm:flex-row items-center justify-center gap-2 [&_button]:place-content-center [&_button]:text-[1rem]">
                <Button
                  title={i18n.language === "en" ? "عربي" : "English"}
                  variant={"outline"}
                  className="w-full md:w-[100px] font-bold hidden lg:flex"
                  onClick={() => {
                    document.body.classList.toggle("rtl");
                    localStorage.setItem(
                      "i18nextLng",
                      i18n.language === "en" ? "ar" : "en",
                    );
                    i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
                  }}
                />
                {!userData && (
                  <Button
                    title={t("login")}
                    variant={"outline"}
                    className="w-full md:w-[130px] font-bold"
                    onClick={() => navigate({ to: "/auth/signin" })}
                  />
                )}
                <Button
                  title={t("sale")}
                  className="bg-[#e60000] hover:bg-transparent border hover:border-solid hover:border-[#e60000] hover:text-[#e60000] w-full md:w-[100px] font-bold"
                  onClick={() => {
                    navigate({ to: "/account" });
                    localStorage.setItem("tab", "my ads");
                  }}
                />
              </div>
            </nav>
          </div>
          <div className="hidden md:flex items-center justify-center place-self-center w-full">
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
                          ...categories.slice(0, 9).map((item) => ({
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
                            children:
                              i18n.language === "en" ? "More" : "المزيد",
                          },
                        ]
                      : [
                          {
                            title: "more",
                            route: `/categories/`,
                            state: { branch: 0 },
                            children:
                              i18n.language === "en" ? "More" : "المزيد",
                          },
                          ...categories
                            .slice(0, 9)
                            .reverse()
                            .map((item) => ({
                              title: item.name_en,
                              route: `/categories/${item.id}`,
                              state: { ...item, branch: 1 },
                              children:
                                i18n.language === "en"
                                  ? item.name_en
                                  : item.name,
                            })),
                        ]
                    : [],
              }}
            />
          </div>
        </div>
      </header>
    </>
  );
};
