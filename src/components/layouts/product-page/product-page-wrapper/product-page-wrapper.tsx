import { useQuery } from "@tanstack/react-query";
import { ProductPageCards } from "../product-page-cards";
import { ProductPreviewInfo } from "../product-page-info";
import { ProductPageSwiper } from "../product-page-swiper";
import { get_product_item } from "./product-page-wrapper.lib";
import { ProductPageWrapperSkeleton } from "./product-page-wrapper.skeleton";
import { ProductPageWrapperProps } from "./product-page-wrapper.types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const ProductPageWrapper = ({ id, state }: ProductPageWrapperProps) => {
  // Query get Product Item
  const { data, status } = useQuery({
    queryKey: ["product", id],
    queryFn: () => get_product_item({ category_id: id }),
  });

  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: `0% 25%`,
          end: `85% 55%`,
          pin: ".pinn",
          scrub: 0.1,
          pinSpacing: false,
          // markers: true,
        },
        clearProps: true,
      });

      // Cleanup function to prevent memory leaks
      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    }
  }, [data]); // Runs only once when the component mounts

  if (status === "success" && data?.id) {
    return (
      <div className="flex flex-col items-center gap-4 w-full my-4">
        <div className="flex gap-8 justify-between w-full trigger" ref={ref}>
          <div className="w-full xl:w-[60%]">
            <ProductPageSwiper data={data} />
            <ProductPreviewInfo className="xl:hidden" data={data ?? []} />
            <ProductPageCards category={state.category_id} data={data ?? []} />
          </div>

          <div className="pinn w-[37.6%] hidden xl:block">
            <ProductPreviewInfo className="hidden xl:flex" data={data ?? []} />
          </div>
        </div>
      </div>
    );
  }

  // Render a skeleton if loading or error state
  if (status === "pending") {
    return <ProductPageWrapperSkeleton />;
  }

  return null;
};
