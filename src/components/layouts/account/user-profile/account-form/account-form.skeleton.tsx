import { Skeleton } from "@/components/ui";

export const AccountFormSkeleton = () => {
  return (
    <div className="flex items-start 2xl:gap-24 gap-8 flex-col xl:flex-row w-full">
      <div className="space-y-8 p-4 border-border border border-solid rounded-md w-full">
        {/* First row of inputs */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-64 rounded-md" />
          <Skeleton className="h-12 w-64 rounded-md" />
        </div>

        {/* Second row of inputs */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-64 rounded-md" />
          <Skeleton className="h-12 w-64 rounded-md" />
        </div>

        {/* Button */}
        <Skeleton className="h-12 w-24 rounded-md" />
      </div>

      {/* Skeleton for the SecondForm */}
      <div className="space-y-8 p-4 border-border border border-solid rounded-md md:w-[70%]">
        <Skeleton className="h-12 w-full rounded-md" />
        <Skeleton className="h-12 w-full rounded-md" />
        <Skeleton className="h-12 w-full rounded-md" />
        <Skeleton className="h-12 w-24 rounded-md" />
      </div>
    </div>
  );
};
