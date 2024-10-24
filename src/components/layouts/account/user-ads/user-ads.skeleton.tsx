import { Skeleton } from "@/components/ui";

export const UserAdsSkeleton = () => {
  return (
    <div className="flex items-start 2xl:gap-24 gap-8 flex-col xl:flex-row w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-64 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
};
