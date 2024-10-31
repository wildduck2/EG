import { useInfiniteQuery } from "@tanstack/react-query";
import { get_user_ads, paginationType } from "./user-ads.lib";
import { AdItemCard, ProductType } from "../../home";
import { UserAdsSkeleton } from "./user-ads.skeleton";
import { AddAdFormType, UserAddAd } from "./user-add-ad";
import { user_add_ad } from "./user-add-ad/user-add-ad.lib";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui";
import { queryClient } from "@/main";

export const UserAds = () => {
  const { t } = useTranslation();

  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["user-ads"],
      queryFn: ({ pageParam = 1 }) => get_user_ads(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const currentPage = lastPage?.pagination.current_page ?? 1;
        const lastPageNum = lastPage?.pagination.last_page ?? 1;
        return currentPage < lastPageNum ? currentPage + 1 : undefined;
      },
      refetchOnWindowFocus: false,
    });

  if (status === "pending") {
    return <UserAdsSkeleton />;
  }

  if (status === "error") {
    return (
      <div className="space-y-4">
        <h2 className="capitalize text-lg">{t("your_ads")}</h2>
        <p className="text-center">{t("errorLoadingAds")}</p>
      </div>
    );
  }

  const ads = data?.pages.flatMap((page) => page?.ads) || [];

  return (
    <div className="items-start 2xl:gap-24 gap-8 flex-col xl:flex-row w-full">
      <div className="flex items-center justify-between">
        <h2>{t("your_ads")}</h2>
        <UserAddAd
          onSubmit={async (attachments: File[], data: AddAdFormType) => {
            const res = await user_add_ad({
              ad_data: {
                ...data,
                attachment: attachments,
              },
            });
            console.log(res);

            if (res?.success) {
              queryClient.setQueryData<{
                pages: { ads: ProductType[]; pagination: paginationType }[];
                pageParams: any[];
              }>(["user-ads"], (old) => {
                if (!old) {
                  // Define a default pagination structure
                  const defaultPagination: paginationType = {
                    total: 1,
                    current_page: 1,
                    per_page: 10,
                    last_page: 1,
                    from: 1,
                    to: 1,
                  };

                  return {
                    pages: [{ ads: [res.data], pagination: defaultPagination }],
                    pageParams: [],
                  };
                }

                return {
                  ...old,
                  pages: old.pages.map((page, pageIndex) => {
                    // Add the new ad to the first page or where appropriate
                    if (pageIndex === 0) {
                      return {
                        ...page,
                        ads: [res.data, ...page.ads],
                      };
                    }
                    return page;
                  }),
                };
              });
            }
          }}
        />
      </div>

      {ads.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 my-4">
          {ads.map((ad, idx) => (
            <AdItemCard key={idx} {...(ad as ProductType)} edit={true} />
          ))}
        </div>
      ) : (
        <h2 className="text-lg mx-auto mt-8 text-center">{t("theresNoAds")}</h2>
      )}

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
  );
};
