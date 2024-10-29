import { Skeleton } from "@/components/ui";

export const CategoriesSkeleton = () => {
  return (
    <div className="py-4 lg:py-12">
      <div>
        <div className="flex justify-start items-center mb-7">
          <div className="relative z-[2]">
            <Skeleton className="h-8 w-48 rounded-md" />
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[1.5rem] my-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton className="flex flex-col justify-center items-center w-full rounded-lg gap-2">
              <Skeleton className="rounded full size-[250px]" />
              <Skeleton className="text-center mt-0 font-semibold text-md transition-colors duration-300 ease-in-out group-hover:text-[#ffc223]"></Skeleton>
            </Skeleton>
          ))}
        </div>
      </div>
    </div>
  );
};

CategoriesSkeleton.displayName = "CategoriesSkeleton";
