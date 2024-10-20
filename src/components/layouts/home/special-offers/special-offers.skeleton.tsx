import { Skeleton } from "@/components/ui";
import { AdItemCardSkeleton } from "../ad-item-card/ad-item-card.skeleton";

export const ButtonListSkeleton = () => {
  return (
    <ul className="flex justify-start items-center gap-3 flex-wrap">
      {Array(6)
        .fill(null)
        .map((_, i) => (
          <li key={i}>
            <Skeleton className="w-24 h-8 rounded-md" />
          </li>
        ))}
    </ul>
  );
};

export const SpecialOffersSkeleton = () => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 items-center gap-3 flex-wrap">
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i}>
          <AdItemCardSkeleton />
        </li>
      ))}
    </ul>
  );
};
