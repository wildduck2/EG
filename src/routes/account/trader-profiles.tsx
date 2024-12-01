import { Logo, Shape } from "@/assets";
import {
  Category,
  CategoryPageFilter,
  CategoryPageWrapperSkeleton,
  FilterSchema,
  FilterSlector,
  Footer,
} from "@/components/layouts";
import { paginationType } from "@/components/layouts/account/user-ads/user-ads.lib";
import { User } from "@/components/layouts/account/user-profile";
import { Button, Input, Separator } from "@/components/ui";
import { filterData } from "@/context";
import { cn } from "@/lib/utils";
import { queryClient } from "@/main";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import axios from "axios";
import { useAtom } from "jotai";
import React from "react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/account/trader-profiles")({
  component: () => {
    return (
      <>
        <Header />
        <main className="flex flex-col [&>div:not(:first-child)]:pt-12 [&>div:not(:first-child)]:pb-12 container min-h-screen lg:mt-[4rem]">
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
                placeholder={t("search2")}
                className="w-full max-w-[600px]"
                onChange={(e) => setQ(e.target.value)}
                value={q}
              />
              <div
                className="flex flex-col sm:flex-row items-start gap-2 w-full [&_*]:max-w-full"
                dir={i18n.dir()}
              >
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
              </div>
              <Button
                className="bg-[#ed1d24] hover:text-white w-[200px]"
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
              placeholder={`${i18n.dir() === "rtl" ? "ابحث في" : "Search in"} ${t("search2")}`}
              className="w-full max-w-[600px]"
              onChange={(e) => setQ(e.target.value)}
              value={q}
            />
            <div
              className="flex flex-col sm:flex-row items-start gap-2 w-full [&_*]:max-w-full"
              dir={i18n.dir()}
            >
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
            </div>

            <Button
              className="bg-[#ed1d24] hover:text-white w-[200px]"
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
              <div className="flex flex-col place-items-center gap-4 border p-4 rounded-lg">
                <Link
                  key={e.id as any}
                  className="flex flex-col justify-center items-center w-full rounded-lg gap-2 "
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
                  <h4 className="text-center mt-0 font-semibold text-lg transition-colors duration-300 ease-in-out group-hover:text-[#ffc223]">
                    {e.company_name}
                  </h4>
                </Link>
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

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const route = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user-info") as string);
  const [isSticky, setIsSticky] = React.useState(false);

  console.log();

  React.useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
  }, [location.pathname]);

  const categories: Category[] = JSON.parse(
    localStorage.getItem("categories") || "{}",
  );

  return (
    <>
      <header
        className={cn(
          "lg:fixed top-0 xl:left-1/2 xl:-translate-x-1/2 w-full z-50 mx-auto place-self-center",
          location.pathname !== "/account/trader-profiles" ||
            (location.pathname.toString().includes("/account/trader2") &&
              "border-border border-solid border-b"),
        )}
      >
        <div className="flex flex-col items-cetner gap-2 container  bg-background ">
          <div className="flex items-center justify-between">
            <Link to="/" className="logo mt-2">
              <img src={Logo} className="w-[12rem] h-auto" alt="Logo" />
            </Link>
            <div className="flex lg:hidden items-center gap-4">
              <Button
                title={i18n.language === "en" ? "عربي" : "English"}
                variant={"outline"}
                className="w-full md:w-[100px] font-bold lg:hidden flex"
                onClick={() => {
                  document.body.classList.toggle("rtl");
                  localStorage.setItem(
                    "i18nextLng",
                    i18n.language === "en" ? "ar" : "en",
                  );
                  i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
                }}
              />
            </div>
            <img
              src={Shape}
              className={cn(
                "w-[605px] -mt-4 hidden lg:block fixed",
                i18n.dir() === "ltr" ? "right-0" : "left-0",
              )}
              style={{
                transform: i18n.dir() === "ltr" ? "rotateY(180deg)" : "",
              }}
            />
          </div>
        </div>
      </header>
    </>
  );
};

export const SGHeader = () => {
  const { t, i18n } = useTranslation();
  const route = useNavigate();

  const [filter_data] = useAtom(filterData);

  const [filter_schema, setFilterSchema] = useAtom<FilterSchema>(filter);
  const [filter_data1, setFilterData] = React.useState<{
    governates: number | null;
    region: number | null;
  }>({
    region: null,
    governates: null,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setFilterSchema((old) => ({ ...old, ...filter_data1 }));
        route({
          to: "/categories/search",
        });
      }}
    >
      <div className="flex items-center gap-2 w-full" dir={i18n.dir()}>
        <FilterSlector
          filter_data={filter_data.governorates}
          value={{ id: filter_data1.governates } as any}
          name={t("governorates")}
          setValue={(item: FilterSchema["governorates"]) => {
            setFilterData((old) => ({
              ...old,
              governates: item?.id as number,
            }));
          }}
        />
        <FilterSlector
          filter_data={filter_data.regions}
          value={{ id: filter_data1.region } as any}
          name={t("regions")}
          // id={"governorate_id"}
          // selected={{ governorate_id: filter_data.governates }}
          setValue={(item: FilterSchema["regions"]) => {
            setFilterData((old) => ({
              ...old,
              region: item?.id as number,
            }));
          }}
        />
      </div>

      <Button type="submit" className="w-full mt-4">
        {t("search")}
      </Button>
    </form>
  );
};

const SearchInput = ({
  className,
  placeHolder,
}: {
  className?: string;
  placeHolder?: string;
}) => {
  const { i18n } = useTranslation();
  const route = useNavigate();

  return (
    <form
      className={cn("relative flex w-full", className)}
      onSubmit={(e) => {
        e.preventDefault();
        route({
          to: "/categories/search/$id",
          params: { id: e.target[0].value },
        });
      }}
    >
      {
        <Search
          className={cn(
            "absolute top-1/2 -translate-y-1/2   h-4 w-4",
            i18n.dir() === "ltr" ? "left-3" : "right-3",
          )}
        />
      }
      <Input
        placeholder={placeHolder}
        className={cn("w-full", i18n.dir() === "rtl" ? "pr-8" : " pl-8", "")}
      />
    </form>
  );
};
