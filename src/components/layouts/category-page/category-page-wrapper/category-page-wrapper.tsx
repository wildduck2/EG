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
import { Link } from "@tanstack/react-router";

export const CategoryPageWrapper = ({
  id,
  name,
  branch,
}: {
  id: string;
  branch: number;
  name: string;
}) => {
  const { t } = useTranslation();
  const [filter_schema] = useAtom(filter);
  console.log(branch);
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
      get_gategory_page_ads({
        id: +id,
        page: pageParam,
        filter_schema,
        branch,
      }),
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.pagination?.current_page ?? 1;
      const lastPageNum = lastPage?.pagination?.last_page ?? 1;
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
        </div>
        <h2 className="text-sm mx-auto">There's no data related to {name}</h2>
      </section>
    );
  }

  if (data && data?.pages?.[0]?.type === "category") {
    return (
      <div className="py-4 lg:py-12">
        <div>
          <div className="flex justify-start items-center mb-7">
            <div className="relative z-[2]">
              <h2
                className={`font- text-[23px] flex justify-center items-center gap-2`}
              >
                {t("categoriesTitle")}
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[1.5rem] my-4">
            {data.pages
              .flatMap((page) => page?.data)
              ?.map((e: any, i) => (
                <Link
                  key={e.id as any}
                  className="flex flex-col justify-center items-center w-full rounded-lg gap-2"
                  to={`/categories/${e.id}`}
                  params={{
                    id: e.id.toString(),
                  }}
                  state={{ ...e, branch: branch + 1 } as any}
                  onClick={() => {
                    localStorage.setItem("branch", (branch + 1).toString());
                  }}
                >
                  <img
                    src={process.env.BACKEND__BASE_UPLOAD_URL + "/" + e.image}
                    alt={e.name}
                    className="rounded full size-[250px]"
                  />
                  <h4 className="text-center mt-0 font-semibold text-md transition-colors duration-300 ease-in-out group-hover:text-[#ffc223]">
                    {e.name}
                  </h4>
                </Link>
              ))}
          </div>
        </div>
      </div>
    );
  }

  if (data && data?.pages?.[0]?.type === "product") {
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
  }
};
