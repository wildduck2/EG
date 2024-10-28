import { Separator, Skeleton } from "@/components/ui";

export const TraderProfileAdsSkeleton = () => {
  return (
    <section className="flex gap-8 items-start my-8 min-h-[63vh]">
      <div className="flex flex-col gap-4 w-full">
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
