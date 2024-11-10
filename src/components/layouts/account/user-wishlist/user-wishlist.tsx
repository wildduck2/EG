import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { user } from "@/components/layouts/auth";
import { AdItemCard } from "../../home";
import { UserWishlistSkeleton } from "./user-wishlist.skeleton";
import { get_user_wishlist } from "./user-wishlist.lib";
import { useTranslation } from "react-i18next";

export const UserWishlist = () => {
  const [userData] = useAtom(user);
  const { t } = useTranslation();

  const { data, status } = useQuery({
    queryKey: ["user_wishlist"],
    queryFn: () => get_user_wishlist(userData),
    refetchOnWindowFocus: false,
  });

  if (status === "pending") {
    return <UserWishlistSkeleton />;
  }

  if (status === "error" || !data?.length) {
    return (
      <div className="space-y-4">
        <h2 className="capitalize text-lg">{t("yourWishlist")}</h2>
        <h2 className="text-lg mx-auto mt-8 text-center">
          {t("not_wishlist")}
        </h2>
      </div>
    );
  }

  if (status === "success" && data) {
    return (
      <div className="space-y-4">
        <h2 className="capitalize text-lg">{t("yourWishlist")}</h2>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 my-4">
          {data?.map((item, idx) => (
            <div className="" key={item.id}>
              <AdItemCard {...item} />
            </div>
          ))}
        </div>
      </div>
    );
  }
};
