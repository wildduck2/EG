import { CarouselItem, CustomCarousel } from "@/components/ui";

export const ProductPageSwiper = () => {
  return (
    <CustomCarousel>
      {Array.from({ length: 5 }).map((_, index) => (
        <CarouselItem key={index}>
          <picture>
            <img
              className="lg:h-[600px] w-full object-cover rounded-md border border-solid border-border"
              src="https://images.pexels.com/photos/1667071/pexels-photo-1667071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </picture>
        </CarouselItem>
      ))}
    </CustomCarousel>
  );
};
