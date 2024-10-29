import { useQuery } from "@tanstack/react-query";
import { ProductPageCards } from "../product-page-cards";
import { ProductPreviewInfo } from "../product-page-info";
import { ProductPageSwiper } from "../product-page-swiper";
import { get_product_item } from "./product-page-wrapper.lib";
import { ProductPageWrapperSkeleton } from "./product-page-wrapper.skeleton";
import { ProductPageWrapperProps } from "./product-page-wrapper.types";

export const ProductPageWrapper = ({ id, state }: ProductPageWrapperProps) => {
  // Query get Product Item
  const { data, status } = useQuery({
    queryKey: ["product", id],
    queryFn: () => get_product_item({ category_id: id }),
  });
  // console.log(data);

  if (status === "pending") {
    return <ProductPageWrapperSkeleton />;
  }

  if (status === "success" && data) {
    return (
      <div className="flex flex-col items-center gap-4 w-full my-8">
        <div className="flex gap-8 justify-between w-full trigger">
          <div className="w-full xl:w-[60%]">
            <ProductPageSwiper data={data} />
            <ProductPreviewInfo className="xl:hidden" data={data} />
            <ProductPageCards data={data} />
          </div>

          <div className="pinn w-[37.6%]">
            <ProductPreviewInfo className="hidden xl:flex" data={data} />
          </div>
        </div>
      </div>
    );
  }
};
