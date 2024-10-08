import React from "react";
import Logo from "../../assets/logo-01.png";
import { Button } from "../ui";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/duckui/card";
import { BadgeCheck, Heart, MapPin, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  data: {
    trusted: boolean;
    img: string;
    price: string;
    title: string;
    location: string;
    date: string;
    offers: boolean;
    alt: string;
  };
}

export const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const { trusted, img, price, title, location, date, offers, alt } =
    data ?? {};
  const [loved, setLoved] = React.useState(false);

  return (
    <Card className="hover:border-white border-0 transition shadow-none hover:shadow-[0px_0px_12px_2px_rgba(17,12,35,0.05)] rounded-2xl p-3">
      <CardHeader className="p-0 relative h-[250px] overflow-hidden">
        <img
          src={
            "https://images.pexels.com/photos/1631918/pexels-photo-1631918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt={alt}
          className="h-full rounded-2xl border-border border border-solid w-full object-cover"
        />
        <div className="absolute bottom-4 left-4">
          <img src={Logo} alt="logo" width="40px" />
        </div>
        <div className="absolute top-4 left-4"></div>
      </CardHeader>
      <CardContent className="p-2 flex items-start justify-between px-0">
        <div className="flex justify-between items-center mb-2 flex-col">
          <h4 className="text-[14px] font-medium m-0 truncate">{title}</h4>
          <div className="flex justify-start items-center gap-1 mt-1 text-gray-500">
            <MapPin className="w-[15px]" />
            <span className=" text-[10px] font-medium truncate">
              {location}
            </span>
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          className={cn(
            "size-8 rounded-full bg-red-100/70 border-red-200 border hover:bg-red-100",
            offers && "bg-red-400 hover:bg-red-500/70",
          )}
          label={{
            children: "مفضلة",
            className:
              "bg-red-100/70 border-red-200 border hover:bg-red-100/70 [&_span]:text-red-400 [&_span]:mt-[-.4rem]",
            showLabel: true,
            side: "bottom",
          }}
        >
          <Heart
            className={cn(
              "size-4",
              !offers ? "text-red-400 fill-red-400" : "text-white fill-white",
            )}
          />
        </Button>
      </CardContent>
      <CardFooter className="flex justify-between items-end p-0 gap-4">
        <div className="flex flex-col">
          <div className="flex justify-start items-center gap-2">
            <span className="whitespace-nowrap min-w-[6rem] text-center mb-2 text-lg">
              {price} ج.م
            </span>
            <p className="text-gray-500 text-[12px]">{date}</p>
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
