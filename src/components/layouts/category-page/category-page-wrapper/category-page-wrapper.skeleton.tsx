import { Skeleton, Separator } from "@/components/ui";

export const CategoryPageWrapperSkeleton = () => {
  return (
    <section className="flex gap-8 items-start my-8 min-h-[63vh]">
      <div className="flex flex-col gap-4 w-full">
        {/* Category Title Skeleton */}
        <Skeleton className="h-8 w-1/4" />
        <Separator className="px-2" />

        {/* Filter and Sort By Skeleton */}
        <div className="flex items-center justify-between">
          {/* Filter Skeleton */}
          <Skeleton className="h-10 w-1/12" />

          {/* Sort By Skeleton */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-12" />
            <Skeleton className="h-10 w-[80px]" />
          </div>
        </div>

        <Separator className="px-2" />

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} className="h-64 w-full rounded-lg" />
            ))}
        </div>
      </div>
    </section>
  );
};
