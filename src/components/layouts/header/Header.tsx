// @ts-nocheck
import {
  AccountType,
  ButtonProps,
  buttonVariants,
  NavGroup,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Separator,
} from "@/components/ui";
import { Button, SelectSwitcher } from "@/components/ui";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import React from "react";
import { Logo } from "@/assets";
import { cn } from "@/lib/utils";
import { Search } from "@/components/ui/duckui/Search/Search";
import { useTranslation } from "react-i18next";

import shape from "../../../assets/shape.png";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const t_languages = t("languages");

  const [open, setOpen] = React.useState(false);

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

  return (
    <>
      <header
        className={cn(
          "lg:fixed top-0 xl:left-1/2 xl:-translate-x-1/2 w-full z-50 bg-background container mx-auto place-self-center",
          isSticky ? "border-border border-solid border-b" : "",
        )}
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="logo mt-2">
            <img src={Logo} className="w-[9rem] h-auto" alt="Logo" />
          </Link>
          <img src={shape} className="w-[300px] -mt-4 hidden lg:block" />
        </div>

        <nav
          className={cn(
            "grid md:flex items-center md:justify-center lg:justify-between place-self-center pt-8 pb-4 gap-2 ",
            // isSticky ? "sticky" : "",
          )}
        >
          <div className="flex item-center gap-4 w-full">
            <Select defaultValue="apple">
              <SelectTrigger className="w-[80px] rounded-lg">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>الدوله</SelectLabel>
                  <SelectItem value="apple">مصر</SelectItem>
                  <SelectItem value="banana">UAE</SelectItem>
                  <SelectItem value="blueberry">UK</SelectItem>
                  <SelectItem value="grapes">USA</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Search />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 [&_button]:place-content-center [&_button]:text-[1rem]">
            <Button
              title={t("English")}
              variant={"outline"}
              className="w-full md:w-[100px]"
              onClick={() => navigate({ to: "/auth/signin" })}
            />
            <Button
              title={"تسجيل الدخول"}
              variant={"outline"}
              className="w-full md:w-[130px]"
              onClick={() => navigate({ to: "" })}
            />
            <Button
              title={"بيع"}
              className="bg-[#e60000] hover:bg-transparent border hover:border-solid hover:border-[#e60000] hover:text-[#e60000] w-full md:w-[100px]"
              onClick={() => navigate({ to: "/auth/signin" })}
            />
          </div>
        </nav>
        <Separator />
        <div className="flex items-center justify-center place-self-center pt-3">
          <NavGroup<true>
            position="top"
            nav={{
              className:
                "[&_ul]:flex [&_ul]:gap-4 [&_li]:w-fit [&_button]:justify-center [&_ul]:flex-wrap",
              group: [10],
              router: {},
              pathname: location.pathname,
              isCollabsed: false,
            }}
            navigationKeys={{
              data: data,
            }}
          />
        </div>
      </header>
    </>
  );
};

export interface headerNavigationDataTypes {
  headerNavigationData?: string[][][][];
  satatus: "loading" | "succeeded" | "failed";
}

export const NavigationHeaderLooping = ({
  headerNavigationData,
}: headerNavigationDataTypes) => {
  return (
    <ul className="flex w-[1100px]">
      {headerNavigationData?.map((item, index) => {
        return (
          <li key={index} className="flex gap-16">
            {item.map((child) => {
              return child.map((item, index) => {
                return (
                  <ul key={index} className="flex flex-col !gap-2">
                    {item.map((item, index) => {
                      return (
                        <li key={index} className="flex flex-col">
                          {index === 0 ? (
                            <h4 className="font-bold">{item}</h4>
                          ) : (
                            <li className="flex flex-col gap-1">
                              {item.map((item, index) => {
                                return (
                                  <Link
                                    to={item}
                                    className={cn(
                                      buttonVariants({ variant: "link" }),
                                      "text-sm p-0 justify-start h-fit text-accent-foreground",
                                    )}
                                  >
                                    {item}
                                  </Link>
                                );
                              })}
                            </li>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                );
              });
            })}
          </li>
        );
      })}
    </ul>
  );
};

export const hi = [
  [
    [
      [
        ["وصل حديثًا"],
        ["عرض الكل", "ملابس", "أحذية وإكسسوارات", "ملابس رياضية"],
      ],
      [
        ["العروض والميزات"],
        ["الأكثر مبيعًا بدءًا من 299 جنيه", "قمصان وبلوزات تحت 1199 جنيه"],
      ],
    ],
    [
      [
        ["الأكثر رواجًا الآن"],
        [
          "خريف/شتاء 2023",
          "الرومانسية",
          "الموسم الجديد في الدنيم",
          "أناقة المدينة",
          "الأناقة العصرية",
        ],
      ],
    ],
    [
      [
        ["تسوق حسب المنتج"],
        [
          "عرض الكل",
          "فساتين",
          "أعلى",
          "قمصان وبلوزات",
          "سويت شيرتات وهوديز",
          "ملابس السباحة والشاطئ",
          "سراويل",
          "جينز",
          "جمبسوت وبلايسوت",
          "تنورات",
          "أحذية",
          "إكسسوارات",
        ],
      ],
    ],
  ],
];

const data: ButtonProps[] = [
  {
    title: "المزيد",
    route: "/home/categories/my-ads",
    children: "المزيد",
  },
  {
    title: "مكافحة الحريق",
    route: "/home/categories/",
    children: "مكافحة الحريق",
  },
  {
    title: "التكييف المركزي",
    route: "/home/categories/categories",
    children: "التكييف المركزي",
  },
  {
    title: "تدفئه وتكييف منزلي",
    route: "/home/categories/sale",
    children: "تدفئه وتكييف منزلي",
  },
  {
    title: "عقارات",
    route: "/home/categories/my-ads",
    children: "عقارات",
  },
  {
    title: "موارد البناء",
    route: "/home/categories/my-ads",
    children: "موارد البناء",
  },
  {
    title: "الكهرباء",
    route: "/home/categories/my-ads",
    children: "الكهرباء",
  },
  {
    title: "معادن",
    route: "/home/categories/my-ads",
    children: "معادن",
  },
  {
    title: "انظمه امنيه",
    route: "/home/categories/my-ads",
    children: "انظمه امنيه",
  },
  {
    title: "",
    route: "/home/categories/my-ads",
    children: "معادن",
  },
];

// const location = useLocation();
// const [searchFocus, setSearchFocus] = React.useState(false);
// const [isSticky, setIsSticky] = React.useState(false);
// const [searchVal, setSearchVal] = React.useState("");
// const { t, i18n } = useTranslation();
//
// const langs = [
//   { lang: "عربي", code: "ar" },
//   { lang: "English", code: "en" },
// ];
//
// const changeLangTitle = langs?.filter((e) =>
//   e.code === i18n.language ? e.lang : "",
// );
// {
//   /* @ts-ignore */
// }
//
// const changeLang = (lng) => {
//   i18n.changeLanguage(lng);
// };
//
// React.useEffect(() => {
//   searchVal !== "" ? setSearchFocus(true) : setSearchFocus(false);
// }, [searchVal]);
//
// const activeLink = ["/", "/sections", "/about", "/sales", "/info"];
//
// const handleScroll = () => {
//   if (window.scrollY > 0) {
//     setIsSticky(true);
//   } else {
//     setIsSticky(false);
//   }
// };
// React.useEffect(() => {
//   window.addEventListener("scroll", handleScroll);
// }, []);
