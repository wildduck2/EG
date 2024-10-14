import { HomeBanner } from "@/assets";
import { CarouselItem, CustomCarousel } from "@/components/ui";

export const HomeBannerSwiper = () => {
  return (
    <CustomCarousel>
      {Array.from({ length: 3 }).map((_) => (
        <CarouselItem>
          <div className="relative rounded-2xl">
            <img
              src={HomeBanner}
              alt="slide1"
              className="object-contain rounded-2xl w-full"
            />
          </div>
        </CarouselItem>
      ))}
    </CustomCarousel>
  );
};
