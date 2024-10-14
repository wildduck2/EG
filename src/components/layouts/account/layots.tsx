import { Separator, Tabs, TabsContent } from "@/components/ui";
import { SidebarNav } from "./SideNav/SideNav";
import SettingsNotificationsPage from "./notifications/page";
import { DisplayForm } from "./Display/Display";
import { AppearanceForm } from "./Appearance/Appearance";
import { ProfileForm } from "./profile-form";
import { CustomerServiceForm } from "./customer-service";
import { AccountForm } from "./Account/account-form";

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
  return (
    <>
      <div className=" space-y-6 p-10 pb-16 lg:mx-28 px-4 md:px-8 mt-4 md:pt-[19rem]">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">الإعدادات</h2>
          <p className="text-muted-foreground">
            إدارة إعدادات حسابك وتحديد تفضيلات البريد الإلكتروني.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <Tabs
            dir="rtl"
            defaultValue="الحساب"
            className="flex flex-col md:flex-row space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 w-full"
          >
            <SidebarNav items={sidebarNavItems} />
            {sidebarNavItems.map((item) => (
              <TabsContent value={item.title} key={item.title}>
                {item.title === "الإشعارات" ? (
                  <SettingsNotificationsPage />
                ) : item.title === "العرض" ? (
                  <DisplayForm />
                ) : item.title === "الحساب" ? (
                  <AccountForm />
                ) : item.title === "الملف الشخصي" ? (
                  <ProfileForm />
                ) : item.title === "خدمه العملاء" ? (
                  <CustomerServiceForm />
                ) : (
                  item.title === "المظهر" && <AppearanceForm />
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </>
  );
}
