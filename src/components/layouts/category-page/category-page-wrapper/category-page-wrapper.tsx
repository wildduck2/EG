import {
  CategoryPageFilter,
  CategoryPageProducts,
  CategoryPageWrapperSkeleton,
  filter,
  get_gategory_page_ads,
  ProductType,
} from "@/components/layouts";
import { Button, Separator } from "@/components/ui";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";

export const CategoryPageWrapper = ({
  id,
  name,
}: {
  id: string;
  name: string;
}) => {
  const { t } = useTranslation();
  const [filter_schema] = useAtom(filter);

  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ["categories", id, filter_schema],
    queryFn: ({ pageParam = 1 }) =>
      get_gategory_page_ads({ id: +id, page: pageParam, filter_schema }),
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.pagination.current_page ?? 1;
      const lastPageNum = lastPage?.pagination.last_page ?? 1;
      return currentPage < lastPageNum ? currentPage + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    initialPageParam: 1,
  });

  if (status === "pending" || isRefetching) {
    return <CategoryPageWrapperSkeleton />;
  }

  if (status === "error") {
    return (
      <section className="flex gap-8 items-start my-8 min-h-[63vh] flex-col">
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-3xl font-semibold capitalize">{id}</h2>
          <Separator className="px-2" />
        </div>
        <Separator className="px-2" />
        <div className="flex items-center justify-between">
          <CategoryPageFilter />
        </div>
        <Separator className="px-2" />
      </section>
    );
  }

  const noData = data?.pages[0]?.data.length === 0;

  if (noData) {
    return (
      <section className="flex gap-8 items-start my-8 min-h-[63vh] flex-col">
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-3xl font-semibold capitalize">{name}</h2>
          <Separator className="px-2" />
          <div className="flex items-center justify-between">
            <CategoryPageFilter />
          </div>
          <Separator className="px-2" />
        </div>
        <h2 className="text-sm mx-auto">There's no data related to {name}</h2>
      </section>
    );
  }

  return (
    <section className="flex gap-8 items-start my-8 min-h-[63vh]">
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-3xl font-semibold capitalize">{name}</h2>
        <Separator className="px-2" />
        <div className="flex items-center justify-between">
          <CategoryPageFilter />
        </div>
        <Separator className="px-2" />
        <CategoryPageProducts
          data={data.pages.flatMap((page) => page?.data) as any}
        />
        {hasNextPage && (
          <Button
            variant="default"
            size="lg"
            className="w-fit my-2 mx-auto"
            loading={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            {t("load_more")}
          </Button>
        )}
      </div>
    </section>
  );
};
