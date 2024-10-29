import { Button, Separator, Tabs, TabsContent } from "@/components/ui";
import { SidebarNav } from "./SideNav/SideNav";
import { CustomerServiceForm } from "./customer-service";
import { useTranslation } from "react-i18next";
import { AccountForm } from "./user-profile";
import { UserAds } from "./user-ads";
import { UserWishlist } from "./user-wishlist";
import { useNavigate, UseNavigateResult } from "@tanstack/react-router";
import axios from "axios";
import { User } from "../home/ad-item-card";
import { toast } from "sonner";
import React from "react";

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
            dir={i18n.dir()}
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
                ) : item.title === "verify your account" ? (
                  <VerifyAccountBtn />
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

export const VerifyAccountBtn = () => {
  const route = useNavigate();
  const [loadiong, setLoadiong] = React.useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <div className="w-full place-center">
      <Button
        className="mx-auto capitalize"
        size={"lg"}
        loading={loadiong}
        onClick={() => {
          verifyAccount({ route, setLoadiong });
        }}
      >
        {t("verify_account")}
      </Button>
    </div>
  );
};
export async function verifyAccount({
  route,
  setLoadiong,
}: {
  setLoadiong: React.Dispatch<React.SetStateAction<boolean>>;
  route: UseNavigateResult<string>;
}) {
  setLoadiong(true);
  const user: User = JSON.parse(localStorage.getItem("user-info") as string);
  if (!user) {
    toast.error("Your data has not been saved");
    setLoadiong(false);
    return null;
  }
  try {
    const { data } = await axios.post(
      process.env.BACKEND__BASE_URL + "/user/password-send-otp",
      {
        phone_number: user.phone_number,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!data.success) {
      toast.error("Failed to send OTP");
      setLoadiong(false);
      return;
    }

    setLoadiong(false);
    route({
      to: "/auth/verification",
    });
  } catch (error) {
    toast.error("Failed to send OTP");
    setLoadiong(false);
    return;
  }
}
