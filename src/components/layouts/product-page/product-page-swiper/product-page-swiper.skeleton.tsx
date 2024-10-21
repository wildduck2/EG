import { Skeleton } from "@/components/ui";

export const ProductPageSwiperSkeleton = () => {
  return (
    <div className="w-full">
      {Array.from({ length: 1 }).map((_, index) => (
        <div key={index} className="w-full">
          <Skeleton className="lg:h-[600px] w-full object-cover rounded-md" />
        </div>
      ))}
    </div>
  );
};
