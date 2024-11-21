import {
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Separator,
  Skeleton,
  Tabs,
  TabsContent,
} from "@/components/ui";
import { SidebarNav } from "./SideNav/SideNav";
import { CustomerServiceForm } from "./customer-service";
import { useTranslation } from "react-i18next";
import { AccountForm } from "./user-profile";
import { AddAdFormType, UserAddAd, UserAds, UserAdsSkeleton } from "./user-ads";
import { UserWishlist } from "./user-wishlist";
import { useNavigate, UseNavigateResult } from "@tanstack/react-router";
import axios from "axios";
import { AdItemCard, ProductType, User } from "../home/ad-item-card";
import { toast } from "sonner";
import React from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { DialogClose } from "@radix-ui/react-dialog";
import { get_user_ads, paginationType } from "./user-ads/user-ads.lib";
import { user_add_ad } from "./user-ads/user-add-ad/user-add-ad.lib";
import { queryClient } from "@/main";

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
            defaultValue={localStorage.getItem("tab") ?? "account"}
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
                ) : item.title === "Bundles" ? (
                  <MakeYourAd />
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

export const MakeYourAd = () => {
  const { t } = useTranslation();

  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["user-ads"],
      queryFn: ({ pageParam = 1 }) => get_user_ads(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const currentPage = lastPage?.pagination.current_page ?? 1;
        const lastPageNum = lastPage?.pagination.last_page ?? 1;
        return currentPage < lastPageNum ? currentPage + 1 : undefined;
      },
      refetchOnWindowFocus: false,
    });

  if (status === "pending") {
    return <UserAdsSkeleton />;
  }

  if (status === "error") {
    return (
      <div className="space-y-4">
        <h2 className="capitalize text-lg">{t("your_ads")}</h2>
        <p className="text-center">{t("errorLoadingAds")}</p>
      </div>
    );
  }

  const ads = data?.pages.flatMap((page) => page?.ads) || [];

  return (
    <div className="items-start 2xl:gap-24 gap-8 flex-col xl:flex-row w-full">
      <div className="flex items-center justify-between">
        <h2>{t("your_ads")}</h2>
      </div>

      {ads.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 my-4">
          {ads.map(
            (ad, idx) =>
              ad.is_featured !== 1 &&
              (ad.status === "المتوافق عليه" || ad.status === "المنتهى") && (
                <Dialog>
                  <DialogTrigger>
                    <AdItemCard
                      key={idx}
                      {...(ad as ProductType)}
                      edit={true}
                      select={true}
                    />
                  </DialogTrigger>
                  <DialogContent className="w-fit">
                    <Bundles id={ad.id} />
                  </DialogContent>
                </Dialog>
              ),
          )}
        </div>
      ) : (
        <h2 className="text-lg mx-auto mt-8 text-center">{t("theresNoAds")}</h2>
      )}

      {hasNextPage && (
        <Button
          variant="default"
          size="lg"
          className="w-fit my-2 mx-auto"
          loading={isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          {t("load_more")}
        </Button>
      )}
    </div>
  );
};

export const Bundles = ({ id }: { id: string }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false);
  const [method, setMethod] = React.useState("");
  const { data, status } = useQuery({
    queryKey: ["bundles"],
    queryFn: async () => {
      const { data } = await axios.get(
        process.env.BACKEND__BASE_URL + "/client/packages",
      );
      if (!data.success) {
        toast.error("Failed to get bundles");
      }

      return data.data;
    },
  });

  if (status === "pending") {
    return (
      <div className="w-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold">Bundles</h3>
        <div className="flex gap-4 justify-between">
          <Skeleton className="p-4 w-full min-h-[200px] justify-between flex flex-col"></Skeleton>
          <Skeleton className="p-4 w-full min-h-[200px] justify-between flex flex-col"></Skeleton>
          <Skeleton className="p-4 w-full min-h-[200px] justify-between flex flex-col"></Skeleton>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="w-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold">Bundles</h3>
        <div className="flex gap-4 justify-between">
          <h6 className="text-center text-md w-full">Failed to get bundles</h6>
        </div>
      </div>
    );
  }

  if (status === "success" && data.length) {
    return (
      <div className="w-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold">{t("bundles")}</h3>
        <div className="flex gap-4 justify-between my-4">
          {data.map((item, i) => (
            <Card
              className="p-4 min-h-[200px] w-[300px] justify-between flex flex-col text-center"
              key={i}
            >
              <div className="flex gap-4 flex-col mb-3 items-center">
                <h4 className="text-xl font-semibold">{item.name}</h4>
                <p className="text-md text-primary/60">
                  {t("duration")} : {item.duration} {t("days")}
                </p>
                <p className="text-md text-primary/60">{item.note}</p>
                <p className="text-lg font-semibold text-primary">
                  {t("price")}: {item.price} {t("egp")}
                </p>
              </div>
              <Dialog>
                <DialogTrigger>
                  <Button className="w-full">{t("subscribe")}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogTitle>{t("pickpaymentmenthod")}</DialogTitle>
                  <div className="flex items-center gap-4">
                    <Button
                      className="w-full"
                      loading={loading && method === "cart"}
                      onClick={async () => {
                        setMethod("cart");
                        setLoading(true);
                        await get_method_payment_link({
                          ad_id: id.toString(),
                          package_id: item.id.toString(),
                          payment_method: "cart",
                        });
                        setLoading(false);
                      }}
                    >
                      {t("card")}
                    </Button>
                    <Button
                      className="w-full"
                      loading={loading && method === "wallet" ? true : false}
                      onClick={async () => {
                        setMethod("wallet");
                        setLoading(true);
                        await get_method_payment_link({
                          ad_id: id.toString(),
                          package_id: item.id.toString(),
                          payment_method: "wallet",
                        });
                        setLoading(false);
                      }}
                    >
                      {t("wallet")}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </Card>
          ))}
        </div>
      </div>
    );
  }
};

export async function get_method_payment_link({
  ad_id,
  package_id,
  payment_method,
}: {
  ad_id: string;
  package_id: string;
  payment_method: string;
}) {
  const user: User = JSON.parse(localStorage.getItem("user-info") || "{}");
  try {
    const { data } = await axios.post(
      process.env.BACKEND__BASE_URL + "/client/payment/create-order",
      {
        ad_id: ad_id,
        package_id: package_id,
        payment_method: payment_method,
        phone_number: user.phone_number,
        phone_number_wallet: "01010101010",
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (data.payment_url.length > 0) {
      window.open(data.payment_url);
      return data.payment_url;
    }

    return null;
  } catch (error) {
    toast.error("شفل انشائاده را بررسی کنید");
    console.log(error);
    return null;
  }
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
    toast.error("فشل التحقق من الحساب");
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
      toast.error("شفل انشائاده را بررسی کنید");
      setLoadiong(false);
      return;
    }

    setLoadiong(false);
    route({
      to: "/auth/verification",
    });
  } catch (error) {
    toast.error("شفل انشائاده را بررسی کنید");
    setLoadiong(false);
    return;
  }
}
