import { HomeBanner } from "@/assets";
import { CarouselItem, CustomCarousel } from "@/components/ui";
import { get_banner_swiper } from "./banner-swiper.lib";
import { useQuery } from "@tanstack/react-query";
import { BannerSwiperSkeleton } from "./banner-swiper.skeleton";

export const HomeBannerSwiper = () => {
  // Query Get Banners
  const { data, status } = useQuery({
    queryKey: ["banners"],
    queryFn: get_banner_swiper,
    refetchOnWindowFocus: false,
  });

  if (status === "pending") {
    return <BannerSwiperSkeleton />;
  }

  if (status === "success" && data) {
    return (
      <CustomCarousel showIndicators={false}>
        {Array.from({ length: 1 }).map((_) => (
          <CarouselItem>
            <div className="relative rounded-2xl">
              <img
                src={HomeBanner}
                alt="slide1"
                className="object-cover rounded-2xl w-full h-[400px]"
              />
            </div>
          </CarouselItem>
        ))}
      </CustomCarousel>
    );
  }
};
