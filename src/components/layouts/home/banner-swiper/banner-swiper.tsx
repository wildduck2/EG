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
        {data.map((item, idx) => (
          <CarouselItem key={idx}>
            <a
              className="relative rounded-2xl"
              href={item?.link}
              target="_blank"
            >
              <img
                src={process.env.BACKEND__BASE_UPLOAD_URL + "/" + item.image}
                alt="slide1"
                className="object-cover rounded-2xl w-full h-[300px]"
              />
            </a>
          </CarouselItem>
        ))}
      </CustomCarousel>
    );
  }
};
