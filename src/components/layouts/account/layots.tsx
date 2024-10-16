import { Separator, Tabs, TabsContent } from "@/components/ui";
import { SidebarNav } from "./SideNav/SideNav";
import SettingsNotificationsPage from "./notifications/page";
import { DisplayForm } from "./Display/Display";
import { AppearanceForm } from "./Appearance/Appearance";
import { ProfileForm } from "./profile-form";
import { CustomerServiceForm } from "./customer-service";
import { AccountForm } from "./Account/account-form";
import { useTranslation } from "react-i18next";

export const metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "الحساب",
    href: "/examples/forms/account",
  },
  {
    title: "ميز اعلاناتك",
    href: "/account/Profile",
  },
  {
    title: "خدمه العملاء",
    href: "/account/Profile",
  },
  {
    title: "قائمتي المفضله",
    href: "/examples/forms/appearance",
  },
  {
    title: "اعلاناتي",
    href: "/examples/forms/notifications",
  },
  {
    title: "توثيق الحساب",
    href: "/examples/forms/display",
  },
];

export default function SettingsLayout() {
  const { t, i18n } = useTranslation();
  const settings = t("settings");
  return (
    <>
      <div className=" space-y-6 p-10 pb-16 container lg:pt-[19rem]">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">
            {settings.sectiontitle}
          </h2>
          <p className="text-muted-foreground">{settings.subsectiontitle}</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <Tabs
            dir="ltr"
            defaultValue={settings.header[0].title}
            className="flex flex-col md:flex-row space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 w-full"
          >
            <SidebarNav items={settings.header} />
            {settings.header.map((item) => (
              <TabsContent value={item.title} key={item.title} className="!m-0">
                {item.title === "account" ? (
                  <AccountForm />
                ) : (
                  item.title === "customer support" && <CustomerServiceForm />
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </>
  );
}
