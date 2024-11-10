import {
  CategoryPageFilter,
  CategoryPageWrapperSkeleton,
  filter,
  get_gategory_page_ads,
} from "@/components/layouts";
import { Separator } from "@/components/ui";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { Link } from "@tanstack/react-router";

export const CategoryB1PageWrapper = ({
  id,
  name,
}: {
  id: string;
  name: string;
}) => {
  const { t } = useTranslation();
  const [filter_schema] = useAtom(filter);

  const { data, status, isRefetching } = useQuery({
    queryKey: ["categories", id, filter_schema],
    queryFn: () => get_gategory_page_ads({ id: +id }),
    refetchOnWindowFocus: false,
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

  if (data?.data.length === 0) {
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
        <h2 className="text-sm mx-auto">
          {t("there_no_data_related_to")}
          {name}
        </h2>
      </section>
    );
  }

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
          {data?.data?.map((e: any, i) => (
            <Link
              key={e.id as any}
              className="flex flex-col justify-center items-center w-full rounded-lg gap-2"
              to={`/categories/${e.id}`}
              params={{
                id: e.id.toString(),
              }}
              state={{ e, branch: 1 } as any}
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
};
