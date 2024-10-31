import { useNavigate, useParams } from "@tanstack/react-router";
import { AddItemCardProps, ProductType } from "./ad-item-card.types";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui";
import { Logo } from "@/assets";
import { BadgeCheck, Heart, MapPin, Pencil, Star, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import i18next from "i18next";
import { useMutate } from "../../account/user-wishlist/user-wishlist.hook";
import React from "react";
import { useTranslation } from "react-i18next";
import { AddAdFormType, UserAddAd, UserEditdAd } from "../../account";
import { useMutation } from "@tanstack/react-query";
import {
  delete_ad,
  user_edit_ad,
} from "../../account/user-ads/user-add-ad/user-add-ad.lib";
import { queryClient } from "@/main";
import { paginationType } from "../../account/user-ads/user-ads.lib";

export const AdItemCard: React.FC<AddItemCardProps & { edit: boolean }> = ({
  edit = false,
  name,
  price,
  id,
  image,
  age,
  region,
  wishlist,
  is_featured,
  images,
  brand_image,
  user,
  gov_id,
  status,
  address,
  brand_id,
  latitude,
  longitude,
  region_id,
  created_at,
  negotiable,
  updated_at,
  description,
  governorate,
  subcategory,
  brandcountry,
  multi_features,
  category: _category,
}) => {
  const { t, i18n } = useTranslation();
  const { category } = useParams({ strict: false });
  const route = useNavigate();

  return (
    <Card className="hover:border-white border-0 transition shadow-none hover:shadow-[0px_0px_12px_2px_rgba(17,12,35,0.05)] rounded-2xl p-3 mb-4 cursor-pointer">
      <CardHeader
        className="p-0 relative h-[250px] overflow-hidden"
        onClick={() => {
          route({
            to: "/categories/$category/product/$product",
            params: { category: `${category}`, product: `${id}` },
            state: {
              name: i18n.dir() == "rtl" ? name : name,
              category:
                i18n.dir() === "rtl" ? _category.name : _category.name_en,
            } as any,
          });
          window.scrollTo(0, 0);
        }}
      >
        <img
          src={process.env.BACKEND__BASE_UPLOAD_URL + "/" + image}
          alt={name}
          className="h-full rounded-2xl border-border border border-solid w-full object-cover"
        />
        <div className="absolute bottom-4 left-4">
          <img src={Logo} alt="logo" width="40px" />
        </div>
        <div className="absolute top-4 left-4"></div>
      </CardHeader>
      <CardContent className="p-2 flex items-start justify-between px-0">
        <div
          className="flex justify-between items-start mb-2 flex-col"
          onClick={() => {
            route({
              to: "/categories/$category/product/$product",
              params: { category: `${category}`, product: `${id}` },
              state: { name: name, category: _category.name } as any,
            });
            window.scrollTo(0, 0);
          }}
        >
          <h4 className="text-[14px] font-medium m-0 truncate">{name}</h4>
          <div className="flex justify-start items-center gap-1 mt-1 text-gray-500">
            <MapPin className="w-[15px]" />
            <span className="text-[10px] font-medium truncate">
              {region?.name}
            </span>
          </div>
        </div>
        <AddWishlistButton id={id} wishlist={wishlist} />
      </CardContent>
      <CardFooter className="flex justify-between items-end p-0 gap-4">
        <div className="flex flex-col">
          <div className="flex justify-start items-center gap-2">
            <span className="whitespace-nowrap min-w-[6rem] text-lg">
              {price} {i18next.language === "ar" ? "ج.م" : "EGP"}
            </span>
            <p className="text-gray-500 text-[12px]">{age}</p>
          </div>
        </div>

        <div className="flex gap-2">
          {edit && (
            <UserEditdAd
              defaultValues={{
                name,
                description,
                price,
                note: "",
                negotiate: negotiable === 1 ? "yes" : "no",
                status: status as "new" | "used",
                location: {
                  lat: latitude,
                  lng: longitude,
                },
                address: address ?? "",
                attachment: images,
                category: _category?.id.toString(),
                subcategory: subcategory?.id.toString(),
                brand_country: brandcountry?.id.toString() ?? "",
                third_branch: gov_id?.toString(),
                region: region_id?.toString(),
                governorate: gov_id?.toString(),
              }}
              default_input={{
                title: t("edit_ad_title"),
                sheet_title: t("edit_ad_title"),
                sheet_desc: t("edit_ad_desc"),
              }}
              onSubmit={async (attachments: File[], data: AddAdFormType) => {
                const res = await user_edit_ad({
                  ad_data: {
                    ...data,
                    attachment: attachments,
                  },
                  id: id.toString(),
                });

                if (res?.success) {
                  queryClient.setQueryData<{
                    pages: { ads: ProductType[]; pagination: paginationType }[];
                    pageParams: any[];
                  }>(["user-ads"], (old) => {
                    if (!old) return { pages: [], pageParams: [] };

                    return {
                      ...old,
                      pages: old.pages.map((page) => ({
                        ...page,
                        ads: page.ads.map((ad) =>
                          ad.id === id ? { ...ad, ...res.data } : ad,
                        ),
                      })),
                    };
                  });
                }
              }}
            />
          )}

          {edit && <DeleteButton id={id} />}

          {is_featured === 1 ? (
            <Button
              variant="secondary"
              size="sm"
              label={{
                children: "مميز",
                showLabel: true,
                className:
                  "bg-yellow-100/70 border-yellow-200 border hover:bg-yellow-100/70 [&_span]:text-yellow-400 [&_span]:mt-[-.4rem]",
                side: "top",
              }}
              className="size-7 rounded-full bg-yellow-100/70 border-yellow-200 border cursor-default hover:bg-yellow-100/70"
            >
              <Star
                className={cn("size-4", "text-yellow-400 fill-yellow-400")}
              />
            </Button>
          ) : null}
        </div>
      </CardFooter>
    </Card>
  );
};

export const DeleteButton = ({ id }: { id: number }) => {
  const startMutation = useMutation({
    mutationFn: () => delete_ad(id.toString()),
    onSuccess: () => {
      queryClient.setQueryData<{
        pages: { ads: ProductType[]; pagination: paginationType }[];
        pageParams: any[]; // This holds parameters for each page if used
      }>(["user-ads"], (old) => {
        if (!old) return { pages: [], pageParams: [] }; // Fallback for empty structure

        // Map through each page in the infinite cache and filter out the item with the specified id
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            ads: page.ads.filter((ad) => ad.id !== id), // Remove the ad with matching id
          })),
        };
      });
    },
  });

  return (
    <Button
      variant="destructive"
      size={"icon"}
      className=""
      onClick={() => {
        startMutation.mutate();
      }}
      icon={{
        icon: Trash,
        className: "size-4",
      }}
    ></Button>
  );
};

export type AddWishlistButtonType = {
  id: number;
  wishlist: boolean;
};

export const AddWishlistButton = ({ id, wishlist }: AddWishlistButtonType) => {
  const [wishlistState, setWishlistState] = React.useState<boolean>(wishlist);
  const { startMutation } = useMutate({
    id,
    wish_list_state: wishlistState ? "add" : "remove",
  });

  return (
    <Button
      variant="secondary"
      size="sm"
      className={cn(
        "size-8 rounded-full bg-red-100/70 border-red-200 border hover:bg-red-100",
        wishlistState && "bg-red-400 hover:bg-red-500/70",
      )}
      label={{
        children: "مفضلة",
        className:
          "bg-red-100/70 border-red-200 border hover:bg-red-100/70 [&_span]:text-red-400 [&_span]:mt-[-.4rem]",
        showLabel: true,
        side: "bottom",
      }}
      onClick={() => {
        setWishlistState(!wishlistState);
        startMutation.mutate();
      }}
    >
      <Heart
        className={cn(
          "size-4",
          !wishlistState
            ? "text-red-400 fill-red-400"
            : "text-white fill-white",
        )}
      />
    </Button>
  );
};
