import { useQuery } from "@tanstack/react-query";
import { get_user_ads } from "./user-ads.lib";
import { AdItemCard } from "../../home";
import { UserAdsSkeleton } from "./user-ads.skeleton";
import { AddAdFormType, UserAddAd } from "./user-add-ad";
import { user_add_ad } from "./user-add-ad/user-add-ad.lib";
import { useTranslation } from "react-i18next";

export const UserAds = () => {
  const { t } = useTranslation();
  const { data, status } = useQuery({
    queryKey: ["use-ads"],
    queryFn: () => get_user_ads(),
    refetchOnWindowFocus: false,
  });

  if (status === "pending") {
    return <UserAdsSkeleton />;
  }

  if (status === "error" || data.ads.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="capitalize text-lg">{t("your_ads")}</h2>

          <UserAddAd
            defaultValues={{
              name: "asdfasdf",
              description: "sadfas",
              price: "234234",
              note: "dfasdfas",
              negotiate: "yes",
              status: "new",
              location: {
                lat: "30.0017359",
                lng: "31.1794429",
              },
              address: "a234234",
              attachment: [
                {
                  id: "0192d338-ef63-75b4-9659-61d4057cca48",
                  file: {},
                  name: "favicon.svg",
                  url: null,
                  type: "image/svg+xml",
                  size: 1524,
                },
              ],
              category: "40",
              subcategory: "40",
              brand_country: "118",
              third_branch: "32",
              region: "407",
              governorate: "55",
            }}
            default_input={{
              title: t("edit_ad_title"),
              sheet_title: t("edit_ad_title"),
              sheet_desc: t("edit_ad_desc"),
            }}
          />

          <UserAddAd
            onSubmit={(attachments: File[], data: AddAdFormType) => {
              user_add_ad({
                ad_data: {
                  ...data,
                  attachment: attachments,
                },
              });
            }}
          />
        </div>
        <h2 className="text-lg mx-auto mt-8 text-center">{t("theresNoAds")}</h2>
      </div>
    );
  }

  // <UserAddAd >
  if (status === "success" && data.ads.length > 0) {
    return (
      <div className="items-start 2xl:gap-24 gap-8 flex-col xl:flex-row w-full">
        <div className="flex items-center justify-between">
          <h2>{t("your_ads")}</h2>

          <UserAddAd
            onSubmit={(attachments: File[], data: AddAdFormType) => {
              user_add_ad({
                ad_data: {
                  ...data,
                  attachment: attachments,
                },
              });
            }}
          />
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 my-4">
          {data.ads?.map((item, idx) => (
            <div className="" key={idx}>
              <AdItemCard {...item} />
            </div>
          ))}
        </div>
      </div>
    );
  }
};
