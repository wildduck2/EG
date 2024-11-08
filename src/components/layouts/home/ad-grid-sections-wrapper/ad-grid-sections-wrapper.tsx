import { useTranslation } from "react-i18next";
import banner from "../../../../assets/Background.png";
import banner2 from "../../../../assets/image-150.png";
import { AdGridSection, AdGridSectionSkeleton } from "../ad-grid-section";
import { Banner } from "../banner";
import { useQuery } from "@tanstack/react-query";
import { get_ads_section } from "./ad-grid-sections-wrapper.lib";
import React from "react";
import { useAtom } from "jotai";
import { banners } from "@/main";
export const AdGridSectionsWrapper = () => {
  const { t } = useTranslation();

  // Query Grid Section
  const { data, status } = useQuery({
    queryKey: ["home-categoryies-ads"],
    queryFn: () => get_ads_section({}),
    refetchOnWindowFocus: false,
  });
  console.log(data);

  const [bann, setBanners] = useAtom(banners);
  const bannersss = JSON.parse(localStorage.getItem("banners") || "[]");

  if (status === "pending") {
    return (
      <>
        <AdGridSectionSkeleton />
        <Banner>
          <img
            src={banner}
            alt="banner"
            className="w-full h-full object-cover rounded-xl"
          />
        </Banner>
      </>
    );
  }

  if (status === "success" && data) {
    return (
      <>
        {data.map((item, idx) => (
          <React.Fragment key={idx}>
            <Banner>
              <a
                href={bannersss?.[idx % bannersss.length]?.link}
                target="_blank"
              >
                <img
                  src={
                    process.env.BACKEND__BASE_UPLOAD_URL +
                    "/" +
                    bannersss?.[idx % bannersss.length]?.image
                  }
                  alt="banner"
                  className="w-full h-full object-cover rounded-xl"
                />
              </a>
            </Banner>
            <AdGridSection {...item} key={idx} buttonContent={t("viewMore")} />
          </React.Fragment>
        ))}
      </>
    );
  }
};
