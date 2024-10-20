import { Skeleton } from "@/components/ui";

export const CategorySwiperSkeleton = () => {
  return (
    <div className="py-4 lg:py-12">
      <div>
        <div className="flex justify-start items-center mb-7">
          <div className="relative z-[2]">
            <Skeleton className="h-8 w-48 rounded-md" />
          </div>
        </div>
        <div className="flex gap-4 overflow-hidden">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="basis-1/3 md:basis-1/5 xl:basis-[14%] transition-all"
            >
              <Skeleton className="h-40 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

CategorySwiperSkeleton.displayName = "CategorySwiperSkeleton";
