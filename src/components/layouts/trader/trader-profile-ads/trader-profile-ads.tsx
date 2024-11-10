import { CategoryPageProducts } from "@/components/layouts";
import { useQuery } from "@tanstack/react-query";
import { TraderProfileAdsSkeleton } from "./trader-profile-ads.skeleton";
import { get_trader_ads } from "./trader-profile-ads.lib";
import { useTranslation } from "react-i18next";

export const TraderProfileAds = ({ id }: { id: string }) => {
  const { t } = useTranslation();
  const { data, status } = useQuery({
    queryKey: ["trader_ads", id],
    queryFn: () => get_trader_ads({ id }),
    refetchOnWindowFocus: false,
  });

  if (status === "pending") {
    return <TraderProfileAdsSkeleton />;
  }

  if (status === "error") {
    return <h2 className="text-sm text-center">Something went wrong</h2>;
  }

  if (status === "success" && !data) {
    return <h2 className="text-center text-sm">{t("notrades")}</h2>;
  }

  if (status === "success" && data) {
    return <CategoryPageProducts data={data} />;
  }
};
