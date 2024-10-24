import { Separator, Tabs, TabsContent } from "@/components/ui";
import { SidebarNav } from "./SideNav/SideNav";
import { CustomerServiceForm } from "./customer-service";
import { useTranslation } from "react-i18next";
import { AccountForm } from "./user-profile";
import { UserAds } from "./user-ads";
import { UserWishlist } from "./user-wishlist";

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
            className="flex flex-col md:flex-row space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 w-full gap-4"
          >
            <SidebarNav items={settings.header} />
            {settings.header.map((item) => (
              <TabsContent
                value={item.title}
                key={item.title}
                className="!m-0 w-full"
              >
                {item.title === "account" ? (
                  <AccountForm />
                ) : item.title === "my ads" ? (
                  <UserAds />
                ) : item.title === "my favorites" ? (
                  <UserWishlist />
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
