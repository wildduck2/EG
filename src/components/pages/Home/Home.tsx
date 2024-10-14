import {
  CategorySwiper,
  HomeBannerSwiper,
  SpecialOffers,
} from "@/components/layouts";
import { Banner } from "@/components/ui";
import banner from "../../../assets/Background.png";
import banner2 from "../../../assets/image-150.png";
import { ProductsPreview } from "@/components/layouts/product-preview";
import { data } from "@/constants";

export const Home = () => {
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
      <ProductsPreview
        title="المنتجات المميزة"
        data={data}
        buttonContent="اعرض المزيد"
      />
      <Banner>
        <img
          src={banner2}
          alt="banner"
          className="w-full h-full object-cover rounded-xl"
        />
      </Banner>
      <ProductsPreview
        title="المنتجات المميزة"
        data={data}
        buttonContent="اعرض المزيد"
      />
      <Banner>
        <img
          src={banner2}
          alt="banner"
          className="w-full h-full object-cover rounded-xl"
        />
      </Banner>
      <ProductsPreview
        title="المنتجات المميزة"
        data={data}
        buttonContent="اعرض المزيد"
      />
    </main>
  );
};
