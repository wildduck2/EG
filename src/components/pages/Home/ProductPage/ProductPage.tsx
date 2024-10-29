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
import { Link, useLocation, useParams } from "@tanstack/react-router";
import { ProductType } from "@/components/layouts";

export const ProductPage = () => {
  const { product, category } = useParams({ strict: false });
  const hi = useParams({ strict: false });
  console.log(hi);
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
                <BreadcrumbLink>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link to="/categories">Categories</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link
                    to="/categories/$category"
                    params={{ category: category ?? "" }}
                  >
                    {category}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-red-400 font-bold">
                  {product}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }

        <ProductPageWrapper id={Number(product)} state={state as ProductType} />
      </main>
    </>
  );
};
