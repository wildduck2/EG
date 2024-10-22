import React from "react";
import {
  CardPreview,
  CardPreviewContent,
  CardPreviewHeader,
  CardPreviewTitle,
  Button,
} from "@/components/ui";
import { AdGridSectionProps } from "./ad-grid-section.types";
import { AdItemCard } from "../ad-item-card";
import { useTranslation } from "react-i18next";

export const AdGridSection: React.FC<AdGridSectionProps> = ({
  ads,
  sort_order,
  category_id,
  category_name,
  category_name_en,
  buttonContent,
}) => {
  const { t, i18n } = useTranslation();
  return (
    <CardPreview>
      <CardPreviewHeader>
        <CardPreviewTitle>
          {i18n.language === "en" ? category_name_en : category_name}
        </CardPreviewTitle>
        <Button
          variant="outline"
          className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
        >
          {buttonContent}
        </Button>
      </CardPreviewHeader>
      <CardPreviewContent>
        {ads.map((item, index) => {
          return <AdItemCard {...item} key={index} />;
        })}
      </CardPreviewContent>
    </CardPreview>
  );
};

AdGridSection.displayName = "ProductsPreview";
