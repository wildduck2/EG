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
import { AdGridSectionSkeleton } from "./ad-grid-section.skeleton";
import { get_ads_section } from "./ad-grid-section.lib";
import { useQuery } from "@tanstack/react-query";

export const AdGridSection: React.FC<AdGridSectionProps> = ({
  title,
  url,
  buttonContent,
}) => {
  // Query Grid Section
  const { data, status } = useQuery({
    queryKey: ["todos"],
    queryFn: () => get_ads_section({ url }),
    refetchOnWindowFocus: false,
  });

  // if (status === "pending"){
  return <AdGridSectionSkeleton />;
  // }

  if (status === "success") {
    return (
      <CardPreview>
        <CardPreviewHeader>
          <CardPreviewTitle>{title}</CardPreviewTitle>
          <Button
            variant="outline"
            className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
          >
            {buttonContent}
          </Button>
        </CardPreviewHeader>
        <CardPreviewContent>
          {data.map((item, index) => {
            return <AdItemCard {...item} key={index} />;
          })}
        </CardPreviewContent>
      </CardPreview>
    );
  }
};

AdGridSection.displayName = "ProductsPreview";
