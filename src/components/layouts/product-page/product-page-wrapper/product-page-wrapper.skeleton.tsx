import { Skeleton } from "@/components/ui";
import { ProductPageSwiperSkeleton } from "../product-page-swiper";
import { ProductPreviewInfoSkeleton } from "../product-page-info";
import { ProductPageCardsSkeleton } from "../product-page-cards";

export const ProductPageWrapperSkeleton = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-4 w-full my-8">
        <div className="flex gap-8 justify-between w-full trigger">
          <div className="w-full xl:w-[60%]">
            {/* Skeleton for ProductPageSwiper */}
            <ProductPageSwiperSkeleton />

            {/* Skeleton for ProductPreviewInfo (Mobile) */}
            <ProductPreviewInfoSkeleton className="xl:hidden" />

            {/* Skeleton for ProductPageCards */}
            <ProductPageCardsSkeleton />
          </div>

          <div className="pinn w-[37.6%]">
            {/* Skeleton for ProductPreviewInfo (Desktop) */}
            <ProductPreviewInfoSkeleton className="hidden xl:flex" />
          </div>
        </div>
      </div>
    </>
  );
};
