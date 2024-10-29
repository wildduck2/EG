import { useNavigate, useParams } from "@tanstack/react-router";
import { AddItemCardProps } from "./ad-item-card.types";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui";
import { Logo } from "@/assets";
import { BadgeCheck, Heart, MapPin, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import i18next from "i18next";
import { useMutate } from "../../account/user-wishlist/user-wishlist.hook";
import React from "react";

export const AdItemCard: React.FC<AddItemCardProps> = ({
  name,
  price,
  id,
  image,
  age,
  region,
  wishlist,
  // brand_image,
}) => {
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
            search: { name: `${name}` },
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
              search: { name: `${name}` },
            });
            window.scrollTo(0, 0);
          }}
        >
          <h4 className="text-[14px] font-medium m-0 truncate">{name}</h4>
          <div className="flex justify-start items-center gap-1 mt-1 text-gray-500">
            <MapPin className="w-[15px]" />
            <span className=" text-[10px] font-medium truncate">
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
          <Button
            variant="secondary"
            size="sm"
            className="size-7 rounded-full bg-blue-100/70 border-blue-200 border hover:bg-blue-100/70 cursor-default"
            label={{
              children: "موثق",
              showLabel: true,
              className:
                "bg-blue-100/70 border-blue-200 border hover:bg-blue-100/70 [&_span]:text-blue-400 [&_span]:mt-[-.4rem]",
              side: "top",
            }}
          >
            <BadgeCheck className={cn("size-5", "text-white fill-blue-400")} />
          </Button>
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
            <Star className={cn("size-4", "text-yellow-400 fill-yellow-400")} />
          </Button>
        </div>
      </CardFooter>
    </Card>
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

  console.log(wishlistState ? "add" : "remove");

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
