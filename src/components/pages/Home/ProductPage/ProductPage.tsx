import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProductPageWrapper } from "@/components/layouts/product-page";
gsap.registerPlugin(ScrollTrigger);

import { useGSAP } from "@gsap/react";
import { useLocation, useParams } from "@tanstack/react-router";
import { ProductType } from "@/components/layouts";

export const ProductPage = () => {
  const { id } = useParams({ strict: false });
  const { state } = useLocation();

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1300px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".trigger",
          start: `0% 35%`,
          end: `80% 55%`,
          pin: ".pinn",
          scrub: 0.1,
          pinSpacing: false,
          // markers: true,
        },
        clearProps: true,
      });
    });
  });

  return (
    <>
      <main className="container flex flex-col pm-4 lg:pt-[17rem]">
        {
          <Breadcrumb className="mx-auto">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/home">الرئيسية</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/docs/components">
                  المنتجات
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-red-400 font-bold">
                  تكنولوجيا المعلومات
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }

        <ProductPageWrapper id={Number(id)} state={state as ProductType} />
      </main>
    </>
  );
};
