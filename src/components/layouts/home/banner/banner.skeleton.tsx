import { Skeleton } from "@/components/ui";

export const BannerSKeleton = () => {
  return (
    <div className={"h-[230px] rounded-xl"}>
      <Skeleton className="h-full w-full rounded-xl" />
    </div>
  );
};
