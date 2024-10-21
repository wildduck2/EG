import { useQuery } from "@tanstack/react-query";
import { ProductPageCards } from "../product-page-cards";
import { ProductPreviewInfo } from "../product-page-info";
import { ProductPageSwiper } from "../product-page-swiper";
import { get_product_item } from "./product-page-wrapper.lib";
import { ProductPageWrapperSkeleton } from "./product-page-wrapper.skeleton";

export const ProductPageWrapper = () => {
  // Query get Product Item
  const { data, status } = useQuery({
    queryKey: ["product"],
    queryFn: () => get_product_item({ category_id: 1 }),
  });

  // if( status === "pending" ) {
  return <ProductPageWrapperSkeleton />;
  // }

  if (status === "success") {
    return (
      <>
        <div className="flex flex-col items-center gap-4 w-full my-8">
          <div className="flex gap-8 justify-between w-full trigger">
            <div className="w-full xl:w-[60%]">
              <ProductPageSwiper />
              <ProductPreviewInfo className="xl:hidden" />
              <ProductPageCards />
            </div>

            <div className="pinn">
              <ProductPreviewInfo className="hidden xl:flex" />
            </div>
          </div>
        </div>
      </>
    );
  }
};
