import { Card, CardContent, CardHeader, Skeleton } from "@/components/ui";

export const ProductPageCardsSkeleton = () => {
  return (
    <div className="flex w-full my-4 gap-4 flex-col">
      {/* Product Details Card Skeleton */}
      <Card className="border-border/10">
        <CardHeader>
          <Skeleton className="h-6 w-1/4" />
        </CardHeader>
        <CardContent className="grid lg:grid-cols-2 gap-2">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div
                className="grid item-center grid-cols-2 justify-between"
                key={index}
              >
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full font-semibold" />
              </div>
            ))}
        </CardContent>
      </Card>

      {/* Product Description Card Skeleton */}
      <Card className="border-border/10">
        <CardHeader>
          <Skeleton className="h-6 w-1/4" />
        </CardHeader>
        <CardContent className="grid gap-2 w-full">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <Skeleton className="h-4 w-[80%] text-primary/80" key={index} />
            ))}
        </CardContent>
      </Card>

      {/* Location Card Skeleton */}
      <Card className="border-border/10">
        <CardHeader>
          <Skeleton className="h-6 w-1/4" />
        </CardHeader>
        <CardContent className="grid gap-2 w-full">
          <Skeleton className="h-[25rem] w-full rounded-lg " />
        </CardContent>
      </Card>

      {/* Carousel Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <Skeleton className="h-64 w-full rounded-lg" key={index} />
          ))}
      </div>
    </div>
  );
};
