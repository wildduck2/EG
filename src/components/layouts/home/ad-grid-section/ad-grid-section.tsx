import React from "react";
import {
  CardPreview,
  CardPreviewContent,
  CardPreviewHeader,
  CardPreviewTitle,
  Button,
  CustomCarousel,
  CarouselItem,
} from "@/components/ui";
import { AdGridSectionProps } from "./ad-grid-section.types";
import { AdItemCard } from "../ad-item-card";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";

export const AdGridSection: React.FC<AdGridSectionProps> = ({
  ads,
  sort_order,
  category_id,
  category_name,
  category_name_en,
  buttonContent,
}) => {
  const { t, i18n } = useTranslation();
  const route = useNavigate();
  return (
    <>
      <CardPreviewHeader className="!pb-0">
        <CardPreviewTitle>
          {i18n.language === "en" ? category_name_en : category_name}
        </CardPreviewTitle>
        <Button
          variant="outline"
          className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
          onClick={() => {
            route({
              to: `/categories/${category_id}`,
              params: {
                id: category_id.toString(),
              },
              state: {
                name: category_name,
                name_en: category_name_en,
                branch: 1,
              } as any,
            });
          }}
        >
          {buttonContent}
        </Button>
      </CardPreviewHeader>
      <CustomCarousel className="min-h-[447px] w-full">
        {ads.slice(0, 20).map((item, index) => {
          return (
            <CarouselItem
              key={index}
              className="w-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <AdItemCard {...(item as any)} key={index} />
            </CarouselItem>
          );
        })}
      </CustomCarousel>
    </>
  );
};

AdGridSection.displayName = "ProductsPreview";
