import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Separator,
} from "@/components/ui";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProductPageWrapper } from "@/components/layouts/product-page";
gsap.registerPlugin(ScrollTrigger);

import { useGSAP } from "@gsap/react";
import { Link, useLocation, useParams } from "@tanstack/react-router";
import { ProductType } from "@/components/layouts";
import { useTranslation } from "react-i18next";

export const ProductPage = () => {
  const { product, category } = useParams({ strict: false });
  const { state }: { state: { name: string; category: string } } =
    useLocation();

  const { t, i18n } = useTranslation();

  return (
    <>
      <main className="container flex flex-col pm-4 lg:pt-[14rem]">
        {
          <Breadcrumb className="mx-auto">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link to="/">{t("home")}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link to="/categories">{t("categories")}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link
                    to="/categories/$category"
                    params={{ category: category ?? "" }}
                  >
                    {i18n.dir() === "ltr" ? state.category_en : state.category}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-red-400 font-bold">
                  {i18n.dir() === "ltr" ? state.name_en : state.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }

        <Separator className="my-2" />

        <ProductPageWrapper id={Number(product)} state={state as any} />
      </main>
    </>
  );
};
