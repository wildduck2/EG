import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui";
import { CategorySwiperItem } from "../category-swiper-card";
import { get_categories } from "./category-swiper.lib";
import { CategorySwiperSkeleton } from "./category-swiper.skeleton";
import Autoplay from "embla-carousel-autoplay";
import { useNavigate } from "@tanstack/react-router";

export const CategorySwiper = () => {
  const route = useNavigate();

  // Translate Api
  const { t, i18n } = useTranslation();

  // Query Categories
  const { data, status } = useQuery({
    queryKey: ["categories"],
    queryFn: get_categories,
  });

  if (status === "pending") {
    return <CategorySwiperSkeleton />;
  }

  if (status === "success" && data) {
    return (
      <div className="py-4 lg:py-4">
        <div>
          <div className="flex justify-start items-center mb-7">
            <div className="relative z-[2]">
              <h2
                className={`font-bold text-[23px] flex justify-center items-center gap-2  underline__sudo`}
              >
                {t("categoriesTitle")}
              </h2>
            </div>
          </div>
          <Carousel
            opts={{
              direction: i18n.language === "en" ? "ltr" : "rtl",
              align: "start",
            }}
            plugins={[Autoplay({ delay: 2000 })]}
          >
            <CarouselContent>
              {data?.map((e, i) => (
                <CarouselItem
                  onClick={() => {
                    route({
                      to: `/categories/$category`,
                      params: { category: e.id.toString() },
                      state: { ...e, branch: 1 } as any,
                    });
                  }}
                  className="basis-1/3 md:basis-1/5 xl:basis-[14%] transition-all"
                  key={i}
                >
                  <CategorySwiperItem {...e} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    );
  }
};
