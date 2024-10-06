import { Calendar, HandshakeIcon, Home, Settings } from "lucide-react";
import { AccountType, ButtonProps, NavGroup, Separator } from "@/components/ui";
import { Button, SelectSwitcher } from "@/components/ui";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import React from "react";
import { Logo } from "@/assets";
import { cn } from "@/lib/utils";
import { Search } from "@/components/ui/duckui/Search/Search";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const t_languages = t("languages");
  console.log(t_languages); // Check if it's an array or something else

  const languages: AccountType[] = Array.isArray(t_languages)
    ? t_languages.map((language) => ({
        label: language,
        name: language,
      }))
    : [];

  console.log(languages);

  const [open, setOpen] = React.useState(false);
  return (
    <>
      <header>
        <nav
          className={cn(
            "flex items-center justify-between mx-28 place-self-center px-8 pt-8 pb-4",
            // isSticky ? "sticky" : "",
          )}
        >
          <div className="logo">
            <Link to="/" className="logo">
              <img src={Logo} className="w-24 h-auto" alt="Logo" />
            </Link>
          </div>

          <div>
            <Search />
          </div>
          <div className="flex items-center justify-center gap-2 [&_button]:place-content-center [&_button]:text-[1rem]">
            <SelectSwitcher
              isCollapsed={true}
              trigger={{
                className: cn("!w-12", 0 && "mx-auto"),
              }}
              content={{
                className: "text-capitalize",
                data: languages,
              }}
              wrapper={{
                defaultValue: "العربيه",
                onValueChange: (value) => {
                  console.log(value);
                  i18n.changeLanguage(
                    value === "الانجليزيه" ? "English" : value,
                  );
                },
              }}
            />
            <Button
              title={"بيع"}
              variant={"outline"}
              className="w-[100px]"
              onClick={() => navigate({ to: "/auth/signin" })}
            />
            <Button
              title={"تسجيل الدخول"}
              onClick={() => navigate({ to: "" })}
              className="bg-[#e60000] hover:bg-transparent border hover:border-solid hover:border-[#e60000] hover:text-[#e60000] w-[130px]"
            />
          </div>
        </nav>
        <Separator />
        <div className="flex items-center justify-center mx-28 place-self-center pb-0 pt-3  px-8">
          <NavGroup<true>
            position="top"
            nav={{
              className:
                "[&_ul]:flex [&_ul]:gap-4 [&_li]:w-full [&_button]:justify-center",
              group: [5],
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

const data: ButtonProps[] = [
  {
    title: "مكافحة الحريق",
    route: "/",
    children: "مكافحة الحريق",
  },
  {
    title: "التكييف المركزي",
    route: "/categories",
    children: "التكييف المركزي",
  },
  {
    title: "تدفئه وتكييف منزلي",
    route: "/sale",
    children: "تدفئه وتكييف منزلي",
  },
  {
    title: "العدد والمستلزمات",
    route: "/my-ads",
    children: "العدد والمستلزمات",
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
