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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  Input,
  Popover,
  DropdownMenuContent,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/assets";
import { cn } from "@/lib/utils";

import shape from "../../../assets/shape.png";
import { useAtom } from "jotai";
import { signoutAsync, user } from "../auth";
import { MapPin, Search } from "lucide-react";
import { Category } from "../home";
import { filter, FilterSchema, FilterSlector } from "../category-page";
import { filterData } from "@/context";
import { queryClient } from "@/main";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const route = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user-info") as string);
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
            <div className="flex lg:hidden items-center gap-4">
              <Button
                title={i18n.language === "en" ? "عربي" : "English"}
                variant={"outline"}
                className="w-full md:w-[100px] font-bold lg:hidden flex"
                onClick={() => {
                  document.body.classList.toggle("rtl");
                  localStorage.setItem(
                    "i18nextLng",
                    i18n.language === "en" ? "ar" : "en",
                  );
                  i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
                }}
              />
              {userData && (
                <div className="w-full">
                  <Button
                    className="size-[47px] p-0 rounded-full overflow-hidden lg:hidden flex"
                    variant={"outline"}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <img
                          className="object-cover w-12 h-12 rounded-full"
                          src={
                            userData?.image
                              ? process.env.BACKEND__BASE_UPLOAD_URL +
                                "/" +
                                userData?.image
                              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s"
                          }
                          alt={userData?.name}
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent dir={i18n.dir()}>
                        <DropdownMenuItem
                          onClick={() => {
                            localStorage.setItem("tab", "account");
                            navigate({ to: "/account" });
                          }}
                        >
                          {t("my_account")}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="hover:bg-destructive hover:text-accent"
                          onClick={async () => {
                            signoutAsync({ route });
                          }}
                        >
                          {t("logout")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Button>
                </div>
              )}
            </div>
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
              {userData && (
                <Button
                  className="size-[47px] w-[57px] p-0 rounded-full overflow-hidden hidden lg:flex"
                  variant={"outline"}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <img
                        className="object-cover w-12 h-12 rounded-full"
                        src={
                          // userData?.image
                          process.env.BACKEND__BASE_UPLOAD_URL +
                          "/" +
                          userData?.image
                          // : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s"
                        }
                        alt={userData?.name}
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent dir={i18n.dir()}>
                      <DropdownMenuItem
                        onClick={() => {
                          localStorage.setItem("tab", "account");
                          navigate({ to: "/account" });
                        }}
                      >
                        {t("my_account")}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="hover:bg-destructive hover:text-accent"
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

              <div className="flex item-center gap-4 w-full">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-[90px] rounded-lg font-bold"
                      icon={{ icon: MapPin }}
                    >
                      {t("egypt")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-96 p-4">
                    <SGHeader />
                  </PopoverContent>
                </Popover>
                <SearchInput
                  placeHolder={
                    i18n.dir() === "rtl"
                      ? "ابحث عن البضاعه التي تريدها..."
                      : "search for products..."
                  }
                />

                <Button
                  title={t("search2")}
                  className="bg-[#e60000] hover:bg-transparent border hover:border-solid hover:border-[#e60000] hover:text-[#e60000] w-full md:w-[100px] font-bold !max-w-[300px] md:w-full !w-full relative [&_svg]:stroke-white [&_input]:placeholder:text-white [&_input]:bg-[#ee1d24]"
                  onClick={() => {
                    navigate({ to: "/account/trader-profiles" });
                  }}
                />
              </div>
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
          <div className="flex items-center justify-center place-self-center w-full">
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
                          ...categories.splice(0, 9).map((item) => ({
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
                            .splice(0, 9)
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

export const SGHeader = () => {
  const { t, i18n } = useTranslation();
  const route = useNavigate();

  const [filter_data] = useAtom(filterData);

  const [filter_schema, setFilterSchema] = useAtom<FilterSchema>(filter);
  const [filter_data1, setFilterData] = React.useState<{
    governates: number | null;
    region: number | null;
  }>({
    region: null,
    governates: null,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setFilterSchema((old) => ({ ...old, ...filter_data1 }));
        route({
          to: "/categories/search",
        });
      }}
    >
      <div className="flex items-center gap-2 w-full" dir={i18n.dir()}>
        <FilterSlector
          filter_data={filter_data.governorates}
          value={{ id: filter_data1.governates } as any}
          name={t("governorates")}
          setValue={(item: FilterSchema["governorates"]) => {
            setFilterData((old) => ({
              ...old,
              governates: item?.id as number,
            }));
          }}
        />
        <FilterSlector
          filter_data={filter_data.regions}
          value={{ id: filter_data1.region } as any}
          name={t("regions")}
          id={"governorate_id"}
          disabled={filter_data1.governates ? false : true}
          selected={filter_data1.governates}
          setValue={(item: FilterSchema["regions"]) => {
            setFilterData((old) => ({
              ...old,
              region: item?.id as number,
            }));
          }}
        />
      </div>

      <Button type="submit" className="w-full mt-4">
        {t("search")}
      </Button>
    </form>
  );
};

const SearchInput = ({
  className,
  placeHolder,
}: {
  className?: string;
  placeHolder?: string;
}) => {
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
