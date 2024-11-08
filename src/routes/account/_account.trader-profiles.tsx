import { Facebook, Whatsapp, x } from "@/assets";
import {
  CategoryPageFilter,
  CategoryPageWrapperSkeleton,
  FilterSchema,
  FilterSlector,
  Footer,
  get_gategory_page_ads,
  Header,
} from "@/components/layouts";
import { paginationType } from "@/components/layouts/account/user-ads/user-ads.lib";
import { User } from "@/components/layouts/account/user-profile";
import { Button, Input, Separator } from "@/components/ui";
import { filterData } from "@/context";
import { banners, queryClient } from "@/main";
import { useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import axios from "axios";
import { useAtom } from "jotai";
import { MessageSquare, Phone } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa";

export const Route = createFileRoute("/account/_account/trader-profiles")({
  component: () => {
    return (
      <>
        <main className="flex flex-col [&>div:not(:first-child)]:pt-12 [&>div:not(:first-child)]:pb-12 container min-h-screen lg:mt-[17rem]">
          <TraderProfiles />
        </main>
        <Footer />
      </>
    );
  },
});

export const TraderProfiles = () => {
  const { t, i18n } = useTranslation();
  const [q, setQ] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [governorate, setGovernorate] = React.useState("");
  const [region, setRegion] = React.useState("");

  const [filter_data] = useAtom(filterData);
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ["traders"],
    queryFn: () => get_traders({ q, category, governorate, region }),
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.pagination?.current_page ?? 1;
      const lastPageNum = lastPage?.pagination?.last_page ?? 1;
      return currentPage < lastPageNum ? currentPage + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    initialPageParam: 1,
  });

  React.useEffect(() => {
    queryClient.invalidateQueries(["traders"]);
  }, [region === ""]);

  if (status === "pending" || isRefetching) {
    return <CategoryPageWrapperSkeleton />;
  }

  if (status === "error") {
    return (
      <section className="flex gap-8 items-start my-8 min-h-[63vh] flex-col">
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-3xl font-semibold capitalize">
            {t("tradersprofile")}
          </h2>
        </div>
        <Separator className="px-2" />
        <div className="flex items-center justify-between">
          <CategoryPageFilter />
        </div>
        <Separator className="px-2" />
      </section>
    );
  }

  const noData = data.pages?.[0].data?.length === 0;

  if (noData) {
    return (
      <section className="flex gap-8 items-start my-8 min-h-[63vh] flex-col">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-start items-center mb-7">
            <div className="relative  flex-col xl:flex-row z-[2] flex xl:items-end gap-4 w-full">
              <h2
                className={`font- text-[23px] flex justify-center items-center gap-2 whitespace-nowrap mb-1`}
              >
                {t("tradersprofile")}
              </h2>
              <Input
                type="text"
                placeholder={t("search")}
                className="w-full max-w-[600px]"
                onChange={(e) => setQ(e.target.value)}
                value={q}
              />
              <div
                className="flex flex-col sm:flex-row items-start gap-2 w-full [&_*]:max-w-full"
                dir={i18n.dir()}
              >
                <FilterSlector
                  filter_data={filter_data.governorates}
                  value={{ id: +governorate } as any}
                  name={t("governorates")}
                  setValue={(item: FilterSchema["governorates"]) => {
                    setGovernorate(item?.id.toString() ?? "");
                  }}
                />
                <FilterSlector
                  filter_data={filter_data.regions}
                  value={{ id: +region } as any}
                  id={"governorate_id"}
                  selected={+governorate}
                  name={t("regions")}
                  setValue={(item: FilterSchema["regions"]) => {
                    setRegion(item?.id.toString() ?? "");
                  }}
                  disabled={!(+governorate > 0)}
                />
                <FilterSlector
                  filter_data={filter_data.categories}
                  value={
                    {
                      id: +category,
                    } as any
                  }
                  name={t("categories")}
                  setValue={(item: FilterSchema["categories"]) => {
                    setCategory(item?.id.toString() ?? "");
                  }}
                />
              </div>
              <Button
                onClick={() => {
                  setQ("");
                  setCategory("");
                  setGovernorate("");
                  setRegion("");
                  queryClient.invalidateQueries(["traders"]);
                }}
              >
                {t("clear")}
              </Button>
              <Button
                onClick={() => {
                  queryClient.invalidateQueries(["traders"]);
                }}
              >
                {t("searchyy")}
              </Button>
            </div>
          </div>
        </div>
        <Separator className="px-2" />
        <h2 className="text-sm mx-auto">{t("notrades")}</h2>
      </section>
    );
  }

  return (
    <div className="py-4 lg:py-12">
      <div>
        <div className="flex justify-start items-center mb-7">
          <div className="relative  flex-col xl:flex-row z-[2] flex xl:items-end gap-4 w-full">
            <h2
              className={`font- text-[23px] flex justify-center items-center gap-2 whitespace-nowrap mb-1`}
            >
              {t("tradersprofile")}
            </h2>
            <Input
              type="text"
              placeholder={t("searchyy")}
              className="w-full max-w-[600px]"
              onChange={(e) => setQ(e.target.value)}
              value={q}
            />
            <div
              className="flex flex-col sm:flex-row items-start gap-2 w-full [&_*]:max-w-full"
              dir={i18n.dir()}
            >
              <FilterSlector
                filter_data={filter_data.governorates}
                value={{ id: +governorate } as any}
                name={t("governorates")}
                setValue={(item: FilterSchema["governorates"]) => {
                  setGovernorate(item?.id.toString() ?? "");
                }}
              />
              <FilterSlector
                filter_data={filter_data.regions}
                value={{ id: +region } as any}
                id={"governorate_id"}
                selected={+governorate}
                name={t("regions")}
                setValue={(item: FilterSchema["regions"]) => {
                  setRegion(item?.id.toString() ?? "");
                }}
                disabled={!(+governorate > 0)}
              />
              <FilterSlector
                filter_data={filter_data.categories}
                value={
                  {
                    id: +category,
                  } as any
                }
                name={t("categories")}
                setValue={(item: FilterSchema["categories"]) => {
                  setCategory(item?.id.toString() ?? "");
                }}
              />
            </div>
            <Button
              onMouseUp={() => {
                setQ("");
                setCategory("");
                setGovernorate("");
                setRegion("");
                queryClient.invalidateQueries(["traders"]);
              }}
            >
              {t("clear")}
            </Button>
            <Button
              onClick={() => {
                queryClient.invalidateQueries(["traders"]);
              }}
            >
              {t("searchy")}
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[1.5rem] my-4">
          {data.pages
            .flatMap((page) => page?.data)
            ?.map((e: any, i) => (
              <div className="flex flex-col place-items-center gap-8">
                <Link
                  key={e.id as any}
                  className="flex flex-col justify-center items-center w-full rounded-lg gap-2"
                  to={`/account/trader2/$id`}
                  params={{ id: e.id.toString() }}
                  state={
                    {
                      user: e,
                    } as any
                  }
                >
                  <img
                    src={process.env.BACKEND__BASE_UPLOAD_URL + "/" + e.slug}
                    alt={e.name}
                    className="rounded full size-[250px]"
                  />
                  <h4 className="text-center mt-0 font-semibold text-md transition-colors duration-300 ease-in-out group-hover:text-[#ffc223]">
                    {e.company_name}
                  </h4>
                </Link>
                <div className="flex items-center gap-2">
                  <a href={`tel:${e.phone_number}`} target="_blank">
                    <Button
                      variant={"default"}
                      className="w-full w-[50px] h-[50px] grid-2"
                      icon={{
                        icon: Phone,
                      }}
                    ></Button>
                  </a>
                  <a href={`https://wa.me/${e.phone_number}`} target="_blank">
                    <Button
                      variant={"default"}
                      className="md:w-[50px] h-[50px] [&_svg]:w-6 [&_svg]:h-6 bg-green-400 hover:bg-green-500"
                      icon={{
                        icon: FaWhatsapp,
                      }}
                    />
                  </a>
                  <a href={`https://wa.me/${e.phone_number}`} target="_blank">
                    <Button
                      variant={"default"}
                      className="md:w-[50px] h-[50px] [&_svg]:w-6 [&_svg]:h-6"
                      icon={{
                        icon: MessageSquare,
                      }}
                    ></Button>
                  </a>
                </div>
              </div>
            ))}
        </div>
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
    </div>
  );
};

export const get_traders = async ({
  q,
  category,
  governorate,
  region,
}: {
  q?: string;
  category?: string;
  governorate?: string;
  region?: string;
}) => {
  try {
    const { data: res_data } = await axios.post<GetCatgegorySearchResponse>(
      process.env.BACKEND__BASE_URL + "/client/profiles",
      {
        company_name: q,
        category_id: +category === 0 ? null : +category,
        region_id: +region === 0 ? null : +region,
        governorate_id: +governorate === 0 ? null : +governorate,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (res_data.success && res_data.data) {
      return res_data;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export interface GetCatgegorySearchResponse {
  success: boolean;
  data: User[];
  pagination: paginationType;
}
