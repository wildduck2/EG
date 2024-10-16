import { Carousel, CarouselContent, CarouselItem } from "@/components/ui";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

export const CategorySwiper = () => {
  const { t, i18n } = useTranslation();
  const categories = t("categories");

  return (
    <div className="py-4 lg:py-12">
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
            direction: "rtl",
            align: "start",
          }}
          plugins={[Autoplay({ delay: 2000 })]}
        >
          <CarouselContent>
            {categories?.map((e, i) => (
              <React.Fragment key={i}>
                <CarouselItem className="basis-1/3 md:basis-1/5 xl:basis-[14%] transition-all">
                  <ProductCard title={e.title} src={e.src} alt="img1" />
                </CarouselItem>
              </React.Fragment>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Bg, FireExtinguisher } from "@/assets";
import { useTranslation } from "react-i18next";

interface ProductCardProps {
  title: string;
  src: string;
  alt: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, src, alt }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link className="flex flex-col justify-center items-center">
      <div
        className={`relative rounded-full w-[120px] h-[100px] flex justify-center items-center`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img src={src} alt={alt} className="rounded-full w-[90px] " />
        <img
          src={Bg}
          alt={alt}
          className={`absolute z-[-1] w-[120px] scale-0 transition-all ${hovered ? "scale-125" : "scale-0"}`}
        />
      </div>
      <h4
        className={`text-center mt-0 font-semibold text-sm transition-all ${hovered ? "text-[#ffc223]" : "text-black"}`}
      >
        {title}
      </h4>
    </Link>
  );
};

ProductCard.displayName = "ProductCard";

export { ProductCard };
