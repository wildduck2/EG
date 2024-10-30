import { useTranslation } from "react-i18next";
import banner from "../../../../assets/Background.png";
import banner2 from "../../../../assets/image-150.png";
import { AdGridSection, AdGridSectionSkeleton } from "../ad-grid-section";
import { Banner } from "../banner";
import { useQuery } from "@tanstack/react-query";
import { get_ads_section } from "./ad-grid-sections-wrapper.lib";
export const AdGridSectionsWrapper = () => {
  const { t } = useTranslation();

  // Query Grid Section
  const { data, status } = useQuery({
    queryKey: ["home-categoryies-ads"],
    queryFn: () => get_ads_section({}),
    refetchOnWindowFocus: false,
  });

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
          <>
            <Banner>
              <img
                src={banner2}
                alt="banner"
                className="w-full h-full object-cover rounded-xl"
              />
            </Banner>
            <AdGridSection {...item} key={idx} buttonContent={t("viewMore")} />
          </>
        ))}
      </>
    );
  }
};
