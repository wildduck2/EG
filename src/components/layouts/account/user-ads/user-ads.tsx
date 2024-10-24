import { Skeleton } from "@/components/ui";
import { useQuery } from "@tanstack/react-query";
import { get_user_ads } from "./user-ads.lib";
import { useAtom } from "jotai";
import { user } from "@/components/layouts/auth";
import { AdItemCard } from "../../home";
import { UserAdsSkeleton } from "./user-ads.skeleton";
import { UserAddAd } from "./user-add-ad";

export const UserAds = () => {
  const [userData, setUserData] = useAtom(user);

  const { data, status } = useQuery({
    queryKey: ["ads"],
    queryFn: () => get_user_ads(userData),
    refetchOnWindowFocus: false,
  });

  if (status === "pending") {
    return <UserAdsSkeleton />;
  }

  if (status === "success" && data) {
    return (
      <div className="flex items-start 2xl:gap-24 gap-8 flex-col xl:flex-row w-full">
        <div>
          <h2>Your Ads</h2>

          <UserAddAd />
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 my-4">
          {// @ts-expect-error
          data?.map((item, idx) => (
            <div className="" key={idx}>
              <AdItemCard {...item} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (status === "error" || !data) {
    // <h2 className="text-lg mx-auto mt-8 text-center">There's no ads</h2>
    return (
      <>
        <div className="flex items-center justify-between gap-4">
          <h2>Your Ads</h2>

          <UserAddAd />
        </div>
      </>
    );
  }
};
