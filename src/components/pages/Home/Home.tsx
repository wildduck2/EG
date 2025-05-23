import {
  CategorySwiper,
  HomeBannerSwiper,
  SpecialOffers,
  AdGridSectionsWrapper,
} from "@/components/layouts";

export const Home = () => {
  return (
    <main className="flex flex-col [&>div:not(:first-child)]:pt-3 [&>div:not(:first-child)]:pb-12 container min-h-screen lg:mt-[13rem]">
      <HomeBannerSwiper />
      <CategorySwiper />
      <SpecialOffers />
      <AdGridSectionsWrapper />
    </main>
  );
};
