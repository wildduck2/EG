import { CarouselItem, CustomCarousel } from "@/components/ui";
import { ProductType } from "../../home";

export const ProductPageSwiper = ({ data }: { data: ProductType }) => {
  console.log([data.brand_image, data.images.map((item) => item.image_path)]);
  return (
    <CustomCarousel className="mt-0">
      {[data.brand_image, ...data.images.map((item) => item.image_path)].map(
        (image, index) => (
          <CarouselItem key={index}>
            <picture>
              <img
                className="lg:h-[600px] w-full object-cover rounded-md border border-solid border-border"
                src={process.env.BACKEND__BASE_UPLOAD_URL + "/" + image}
              />
            </picture>
          </CarouselItem>
        ),
      )}
    </CustomCarousel>
  );
};
