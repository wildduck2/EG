import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { HeaderProfile } from "../header-profile";
import { Button } from "@/components/ui";
import { HeaderRegion } from "../header-region-search";
import { User } from "../../home";

export const HeaderDesktopMain = () => {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const userData: User = JSON.parse(
    localStorage.getItem("user-info") as string,
  );

  return (
    <>
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
    </>
  );
};
