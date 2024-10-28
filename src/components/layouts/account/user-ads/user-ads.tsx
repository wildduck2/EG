import { useQuery } from "@tanstack/react-query";
import { get_user_ads } from "./user-ads.lib";
import { AdItemCard } from "../../home";
import { UserAdsSkeleton } from "./user-ads.skeleton";
import { UserAddAd } from "./user-add-ad";

export const UserAds = () => {
  const { data, status } = useQuery({
    queryKey: ["use-ads"],
    queryFn: () => get_user_ads(),
    refetchOnWindowFocus: false,
  });

  if (status === "pending") {
    return <UserAdsSkeleton />;
  }

  if (status === "error" || data.ads.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="capitalize text-lg">Your Ads</h2>
        <div className="flex items-center justify-between gap-4">
          <UserAddAd />
        </div>
        <h2 className="text-lg mx-auto mt-8 text-center">There's no ads</h2>
      </div>
    );
  }

  if (status === "success" && data.ads.length > 0) {
    return (
      <div className="flex items-start 2xl:gap-24 gap-8 flex-col xl:flex-row w-full">
        <div>
          <h2>Your Ads</h2>

          <UserAddAd />
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 my-4">
          {data?.map((item, idx) => (
            <div className="" key={idx}>
              <AdItemCard {...item} />
            </div>
          ))}
        </div>
      </div>
    );
  }
};
