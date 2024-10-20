import { useTranslation } from "react-i18next";
import {
  CategorySwiper,
  HomeBannerSwiper,
  SpecialOffers,
  AdGridSection,
  Banner,
} from "@/components/layouts";
import banner from "../../../assets/Background.png";
import banner2 from "../../../assets/image-150.png";

export const Home = () => {
  const { t } = useTranslation();

  return (
    <main className="flex flex-col [&>div]:pt-12 [&>div]:pb-12 container min-h-screen lg:mt-[17rem]">
      <HomeBannerSwiper />
      <CategorySwiper />
      <SpecialOffers />
      <Banner>
        <img
          src={banner}
          alt="banner"
          className="w-full h-full object-cover rounded-xl"
        />
      </Banner>
      <AdGridSection
        title={t("specialOffers")}
        url="/home"
        buttonContent="اعرض المزيد"
      />
      <Banner>
        <img
          src={banner2}
          alt="banner"
          className="w-full h-full object-cover rounded-xl"
        />
      </Banner>
      <AdGridSection
        title={t("specialOffers")}
        url="/home"
        buttonContent="اعرض المزيد"
      />
      <Banner>
        <img
          src={banner2}
          alt="banner"
          className="w-full h-full object-cover rounded-xl"
        />
      </Banner>
      <AdGridSection
        title={t("specialOffers")}
        url="/home"
        buttonContent="اعرض المزيد"
      />
    </main>
  );
};
