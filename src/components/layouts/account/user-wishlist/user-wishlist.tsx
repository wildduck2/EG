import { Skeleton } from "@/components/ui";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { user } from "@/components/layouts/auth";
import { AdItemCard } from "../../home";
import { UserWishlistSkeleton } from "./user-wishlist.skeleton";
import { get_user_wishlist } from "./user-wishlist.lib";
import { useTranslation } from "react-i18next";

export const UserWishlist = () => {
  const [userData, setUserData] = useAtom(user);
  const { t } = useTranslation();

  const { data, status } = useQuery({
    queryKey: ["user_wishlist"],
    queryFn: () => get_user_wishlist(userData),
    refetchOnWindowFocus: false,
  });

  console.log(data);

  if (status === "pending") {
    return <UserWishlistSkeleton />;
  }

  if (status === "success" && data) {
    return (
      <div className="space-y-4">
        <h2 className="capitalize text-lg">Your wishlist</h2>

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

  if (status === "error" || !data) {
    return (
      <h2 className="text-lg mx-auto mt-8 text-center">{t("theresNoAds")}</h2>
    );
  }
};
