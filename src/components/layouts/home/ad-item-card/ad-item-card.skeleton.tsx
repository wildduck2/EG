import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Skeleton,
} from "@/components/ui";

export const AdItemCardSkeleton = () => {
  return (
    <Card className="hover:border-white border-0 transition shadow-none rounded-2xl p-3 mb-4 cursor-pointer">
      <CardHeader className="p-0 relative h-[250px] overflow-hidden">
        <Skeleton className="w-full h-full rounded-2xl" />{" "}
        {/* Image placeholder */}
        <div className="absolute bottom-4 left-4">
          <Skeleton className="w-10 h-10 rounded-full" />{" "}
          {/* Logo placeholder */}
        </div>
      </CardHeader>
      <CardContent className="p-2 flex items-start justify-between px-0">
        <div className="flex flex-col justify-start items-start mb-2">
          <Skeleton className="w-3/4 h-4 mb-2" /> {/* Title placeholder */}
          <div className="flex justify-start items-center gap-1 text-gray-500">
            <Skeleton className="w-[11rem] h-5" /> {/* Icon placeholder */}
            <Skeleton className="w-1/2 h-3" /> {/* Location placeholder */}
          </div>
        </div>
        <Skeleton className="w-10 h-10 rounded-full" /> {/* Heart Button */}
      </CardContent>
      <CardFooter className="flex justify-between items-end p-0 gap-4">
        <div className="flex flex-col">
          <Skeleton className="w-20 h-6 mb-2" /> {/* Price placeholder */}
          <Skeleton className="w-10 h-3" /> {/* Date placeholder */}
        </div>
        <div className="flex gap-2">
          <Skeleton className="w-10 h-10 rounded-full" />{" "}
          {/* Verified Button */}
          <Skeleton className="w-10 h-10 rounded-full" />{" "}
          {/* Featured Button */}
        </div>
      </CardFooter>
    </Card>
  );
};
