import Slide1 from "../../../assets/home-banner-bg.png";
import Slide2 from "../../../assets/home-banner-bg-2.png";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui";
import React from "react";
import { cn } from "@/lib/utils";

export const HomeBannerSwiper = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="relative">
      <Carousel
        className="overflow-hidden px-8 mx-28 h-[450px] my-8"
        setApi={setApi}
        opts={{
          direction: "rtl",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
      >
        <CarouselContent>
          <CarouselItem>
            <div className="relative rounded-2xl">
              <img
                src={Slide1}
                alt="slide1"
                className="h-[450px] object-cover rounded-2xl  w-full"
              />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="relative rounded-2xl">
              <img
                src={Slide2}
                alt="slide3"
                className="h-[450px] object-cover rounded-2xl w-full"
              />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="relative rounded-2xl">
              <img
                src={Slide1}
                alt="slide1"
                className="h-[450px] object-cover rounded-2xl  w-full"
              />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="relative rounded-2xl">
              <img
                src={Slide2}
                alt="slide3"
                className="h-[450px] object-cover rounded-2xl w-full"
              />
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground gap-1 flex items-center w-fit justify-center mx-auto bottom-4 left-1/2 -translate-x-1/2 z-10 absolute">
        {Array.from({ length: count }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "w-3 h-3 rounded-full border border-red-400 border-solid inline-flex",
              current === i + 1 && "bg-red-400",
            )}
          />
        ))}
      </div>
    </div>
  );
};
