import React from "react";
import { useTranslation } from "react-i18next";
import {
  NavGroup,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Separator,
  Button,
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  Input,
} from "@/components/ui";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/assets";
import { cn } from "@/lib/utils";

import shape from "../../../assets/shape.png";
import { useAtom } from "jotai";
import { signoutAsync, user } from "../auth";
import { MapPin, Search } from "lucide-react";
import { Category } from "../home";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const route = useNavigate();
  const [userData] = useAtom(user);
  const [isSticky, setIsSticky] = React.useState(false);

  React.useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
  }, [location.pathname]);

  const categories: Category[] = JSON.parse(
    localStorage.getItem("categories") || "{}",
  );

  return (
    <>
      <header
        className={cn(
          "lg:fixed top-0 xl:left-1/2 xl:-translate-x-1/2 w-full z-50 mx-auto place-self-center",
          isSticky ? "border-border border-solid border-b" : "",
        )}
      >
        <div className="flex flex-col items-cetner gap-2 container  bg-background ">
          <div className="flex items-center justify-between">
            <Link to="/" className="logo mt-2">
              <img src={Logo} className="w-[9rem] h-auto" alt="Logo" />
            </Link>
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

          <div className="flex flex-col">
            <nav
              className={cn(
                "grid md:flex items-center md:justify-center lg:justify-between place-self-center pt-2 pb-4 gap-2 w-full",
              )}
            >
              <div className="flex item-center gap-4 w-full">
                <Button
                  variant={"outline"}
                  className="w-[90px] rounded-lg"
                  icon={{ icon: MapPin }}
                  onClick={() => route({ to: "/categories/search" })}
                >
                  {t("egypt")}
                </Button>
                <SearchInput
                  //@ts-ignore
                  variant="default"
                  size="default"
                  className="lg:max-w-[700px] md:w-full !w-full relative"
                  searchPlaceholder={t("search")}
                  searchIcon={true}
                  dir={i18n.dir()}
                />
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 [&_button]:place-content-center [&_button]:text-[1rem]">
                {userData && (
                  <Button className="w-fit p-0 rounded-full" variant={"ghost"}>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Avatar>
                          <AvatarImage
                            className="object-cover"
                            src="https://zpgqhogoevbgpxustvmo.supabase.co/storage/v1/object/public/produc_imgs/duckui%20(1).png"
                            alt="@duckui"
                          />
                          <AvatarFallback>{userData.name}</AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>{t("my_account")}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            localStorage.setItem("tab", "account");
                            navigate({ to: "/account" });
                          }}
                        >
                          {t("accounty")}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={async () => {
                            signoutAsync({ route });
                          }}
                        >
                          {t("logout")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Button>
                )}
                <Button
                  title={t("languages")}
                  variant={"outline"}
                  className="w-full md:w-[100px]"
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
                    className="w-full md:w-[130px]"
                    onClick={() => navigate({ to: "/auth/signin" })}
                  />
                )}
                <Button
                  title={t("sale")}
                  className="bg-[#e60000] hover:bg-transparent border hover:border-solid hover:border-[#e60000] hover:text-[#e60000] w-full md:w-[100px]"
                  onClick={() => {
                    navigate({ to: "/account" });
                    localStorage.setItem("tab", "my ads");
                  }}
                />
              </div>
            </nav>
            <Separator />
          </div>
          <div className="flex items-center justify-center place-self-center w-full">
            <NavGroup<true>
              position="top"
              nav={{
                className:
                  "[&_ul]:flex [&_ul]:gap-4 [&_li]:w-fit [&_button]:justify-center [&_ul]:flex-wrap w-full",
                group: [10],
                router: {},
                pathname: location.pathname,
                isCollabsed: false,
              }}
              navigationKeys={{
                data:
                  categories.length > 0
                    ? [
                        ...categories.splice(0, 6).map((item) => ({
                          title: item.name_en,
                          route: `/categories/${item.id}`,
                          state: item,
                          children:
                            i18n.language === "en" ? item.name_en : item.name,
                        })),
                        {
                          title: "more",
                          route: `/categories/`,
                          state: null,
                          children: i18n.language === "en" ? "More" : "المزيد",
                        },
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

const SearchInput = () => {
  const { i18n } = useTranslation();
  const route = useNavigate();

  return (
    <form
      className="relative flex w-full"
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
        placeholder={i18n.dir() === "rtl" ? "ابحث" : "Search..."}
        className={cn(
          "w-full max-w-[700px]",
          i18n.dir() === "rtl" ? "pr-8" : " pl-8",
        )}
      />
    </form>
  );
};
