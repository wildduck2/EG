import { Button, NavGroup } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { HeaderProfile } from "../header-profile";
import { HeaderRegion } from "../header-region-search";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/duckui/sheet";
import { Category, User } from "../../home";
import { Menu } from "lucide-react";

export const HeaderMenu = ({ categories }: { categories: Category[] }) => {
  const { t, i18n } = useTranslation();
  const userData: User = JSON.parse(
    localStorage.getItem("user-info") as string,
  );
  const navigate = useNavigate();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"} className=" font-bold lg:hidden">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full overflow-scroll">
        <div className="flex flex-col mt-3">
          <nav className={cn("grid pt-2 pb-4 gap-2 w-full")}>
            {userData && (
              <HeaderProfile
                userData={userData}
                className="md:grid grid [&_div]:w-full [&_div]:grid"
              />
            )}

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
            <HeaderRegion className="grid [&>*]:w-full" />
            <div className="grid  gap-2 [&_button]:place-content-center [&_button]:text-[1rem]">
              <Button
                title={i18n.language === "en" ? "عربي" : "English"}
                variant={"outline"}
                className="w-full font-bold hidden lg:flex"
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
                className="bg-[#e60000] hover:bg-transparent border hover:border-solid hover:border-[#e60000] hover:text-[#e60000] w-full font-bold"
                onClick={() => {
                  navigate({ to: "/account" });
                  localStorage.setItem("tab", "my ads");
                }}
              />
            </div>
          </nav>
          <NavGroup<true>
            position="top"
            nav={{
              className:
                "[&_ul]:grid [&_ul]:gap-4 [&_li]:w-fit hover:[&_button]:bg-[#ee1d24] hover:[&_button]:text-accent [&_button]:justify-center [&_ul]:w-full [&_button]:font-bold w-full place-content-center mx-auto",
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
                        children: i18n.language === "en" ? "More" : "المزيد",
                      },
                    ]
                  : [],
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
