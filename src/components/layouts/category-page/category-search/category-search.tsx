//@ts-nocheck
import {
  infiniteQueryOptions,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";

import { useTranslation } from "react-i18next";
import { CategoryPageWrapperSkeleton } from "../category-page-wrapper";
import {
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Separator,
} from "@/components/ui";
import { CategoryPageFilter, get_filter_data } from "../category-page-filter";
import { CategoryPageProducts } from "../category-page-products";
import { get_category_search } from "./category-search.lib";

export const CategorySearch = ({ id }: { id: string | undefined }) => {
  const { t, i18n } = useTranslation();
  // Query Categories
  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["categories", id],
    queryFn: () => get_category_search(id ?? ""),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      (lastPage?.pagination.current_page ?? 0) + 1,
  });

  if (status === "pending") {
    return <CategoryPageWrapperSkeleton />;
  }

  if (status === "error") {
    return (
      <section className="flex gap-8 items-start my-8 min-h-[63vh] flex-col">
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-3xl font-semibold capitalize">{id}</h2>
          <Separator className="px-2" />
        </div>
        <h2 className="text-sm mx-auto">Failed to get data related to {id}</h2>
      </section>
    );
  }

  if (data.pages.slice(-1)[0]?.data.length === 0) {
    return (
      <section className="flex gap-8 items-start my-8 min-h-[63vh] flex-col">
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-3xl font-semibold capitalize">{id}</h2>
          <Separator className="px-2" />
        </div>
        <h2 className="text-sm mx-auto">There's not data related to {id}</h2>
      </section>
    );
  }

  if (status === "success" && data) {
    return (
      <section className="flex gap-8 items-start my-8 min-h-[63vh]">
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-3xl font-semibold capitalize">{id}</h2>
          <Separator className="px-2" />
          <div className="flex items-center justify-between">
            <CategoryPageFilter />
          </div>
          <Separator className="px-2" />
          <CategoryPageProducts
            data={data.pages.map((item) => item?.data)[0]}
          />
          {data.pages.slice(-1)[0]?.data.length &&
          data.pages.length > 1 ? null : (
            <Button
              variant="default"
              size={"lg"}
              className="w-fit my-2 mx-auto"
              loading={isFetchingNextPage}
              onClick={() => fetchNextPage()}
            >
              Load More
            </Button>
          )}
        </div>
      </section>
    );
  }
};
