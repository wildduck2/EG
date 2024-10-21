import { Skeleton } from "@/components/ui";
import { cn } from "@/lib/utils";

export const ProductPreviewInfoSkeleton = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-2 p-4 relative pin",
        className,
      )}
    >
      {/* Skeleton for the favorite button */}
      <Skeleton className="h-8 w-8 rounded-full absolute right-[1.1rem] top-[1.1rem]" />

      {/* Skeleton for product name and price */}
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-6 w-1/2" />

      {/* Skeleton for badges */}
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16 rounded-full" />
          <Skeleton className="h-8 w-16 rounded-full" />
        </div>
      </div>

      {/* Skeleton for location and date */}
      <div className="flex items-center gap-12 py-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Skeleton for action buttons */}
      <div className="md:flex items-center gap-4 w-full my-2 grid grid-cols-2">
        <Skeleton className="h-[50px] w-full lg:max-w-[300px]" />
        <Skeleton className="h-[50px] md:w-[180px]" />
        <Skeleton className="h-[50px] md:w-[180px]" />
        <Skeleton className="h-[50px] w-full max-w-[300px]" />
      </div>

      {/* Skeleton for avatar and user details */}
      <div className="flex flex-col items-start w-full">
        <div className="flex flex-col w-full">
          <Skeleton className="flex items-start gap-2 w-full h-fit justify-start p-4">
            <Skeleton className="h-[60px] w-[60px] rounded-md" />
            <div className="flex flex-col items-start">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
          </Skeleton>

          {/* Skeleton for Accordion */}
          <div className="h-32 w-full mt-2 border border-border/20 border-solid p-4 space-y-2 rounded-lg">
            <Skeleton className="h-6 w-[50%]" />
            <Skeleton className="h-2 w-[70%]" />
            <Skeleton className="h-2 w-[90%]" />
            <Skeleton className="h-2 w-[80%]" />
            <Skeleton className="h-2 w-[40%]" />
          </div>
          <Skeleton className="h-6 w-full mt-2" />
        </div>
      </div>
    </div>
  );
};
