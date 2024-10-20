import { CustomCarousel, CarouselItem, Skeleton } from "@/components/ui";

export const BannerSwiperSkeleton = () => {
  return (
    <CustomCarousel showIndicators={false} showArrows={false}>
      {Array.from({ length: 1 }).map((_, index) => (
        <CarouselItem key={index}>
          <div className="relative rounded-2xl animate-pulse">
            <Skeleton className="h-[300px] rounded-2xl w-full" />{" "}
            {/* Skeleton for the image */}
          </div>
        </CarouselItem>
      ))}
    </CustomCarousel>
  );
};
