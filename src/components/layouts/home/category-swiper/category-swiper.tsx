import { Carousel, CarouselContent, CarouselItem } from "@/components/ui";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { ProductCard } from "../../HomeSection";
import { FireExtinguisher } from "lucide-react";

export const CategorySwiper = () => {
  return (
    <div className="py-4 lg:py-12">
      <div>
        <div className="flex justify-start items-center mb-7">
          <div className="relative z-[2]">
            <h2
              className={`font-bold text-[23px] flex justify-center items-center gap-2  underline__sudo`}
            >
              الفئات
            </h2>
          </div>
        </div>
        <Carousel
          opts={{
            direction: "rtl",
            align: "start",
          }}
          plugins={[Autoplay({ delay: 2000 })]}
        >
          <CarouselContent>
            {Array.from({ length: 8 })?.map((e, i) => (
              <React.Fragment key={i}>
                <CarouselItem className="basis-1/3 md:basis-1/5 xl:basis-[14%] transition-all">
                  <ProductCard title="مكافحة الحريق" src={""} alt="img1" />
                </CarouselItem>
              </React.Fragment>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};
