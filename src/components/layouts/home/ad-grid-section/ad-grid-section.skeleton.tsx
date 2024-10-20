import { AdItemCardSkeleton } from "../ad-item-card/ad-item-card.skeleton";
import {
  CardPreview,
  CardPreviewHeader,
  CardPreviewTitle,
  CardPreviewContent,
  Button,
  Skeleton,
} from "@/components/ui";

export const AdGridSectionSkeleton: React.FC = () => {
  return (
    <CardPreview>
      <CardPreviewHeader>
        <CardPreviewTitle>
          {/* Skeleton for Title */}
          <Skeleton className="w-40 h-6" />
        </CardPreviewTitle>
        <Button
          variant="outline"
          className="bg-gray-200 rounded h-10 w-24 animate-pulse"
          disabled
        >
          {/* Skeleton for Button */}
        </Button>
      </CardPreviewHeader>
      <CardPreviewContent>
        {/* Skeleton for AdItemCards */}
        {Array.from({ length: 4 }).map((_, index) => (
          <AdItemCardSkeleton key={index} />
        ))}
      </CardPreviewContent>
    </CardPreview>
  );
};
