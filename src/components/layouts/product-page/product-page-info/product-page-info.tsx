import React from "react";
import { ProductPreviewInfoProps } from "./product-page-info.types";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import {
  BadgeCheck,
  Clock10,
  Heart,
  MapPin,
  Phone,
  Share,
  Star,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AvatarCustom,
  Button,
} from "@/components/ui";

export const ProductPreviewInfo = React.forwardRef<
  HTMLDivElement,
  ProductPreviewInfoProps
>(({ className, children, ...props }, ref) => {
  const { t, i18n } = useTranslation();

  const products = t("product");
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-2 p-4 relative pin",
        className,
      )}
      {...props}
      ref={ref}
    >
      <Button
        variant="secondary"
        size="sm"
        className={cn(
          "size-8 rounded-full bg-red-100/70 border-red-200 border hover:bg-red-100 absolute right-[1.1rem] top-[1.1rem]",
          // "bg-red-400 hover:bg-red-500/70",
        )}
        label={{
          children: products.addtofav,
          className:
            "bg-red-100/70 border-red-200 border hover:bg-red-100/70 [&_span]:text-red-400 [&_span]:mt-[-.4rem]",
          showLabel: true,
          side: "bottom",
        }}
      >
        <Heart className={cn("size-4", "text-red-400 fill-red-400")} />
      </Button>
      <h3 className="text-3xl font-semibold">{products.productname}</h3>
      <h2 className="text-2xl font-semibold">{products.price}</h2>
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="h-fit py-1 rounded-full bg-blue-100/70 border-blue-200 border hover:bg-blue-100/70 cursor-default"
            label={{
              className: "text-xs",
              children: products.check,
              side: "top",
            }}
          >
            <BadgeCheck className={cn("size-5", "text-white fill-blue-400")} />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            label={{
              children: products.special,
              className: "text-xs",
              side: "top",
            }}
            className="h-fit py-1 rounded-full bg-yellow-100/70 border-yellow-200 border cursor-default hover:bg-yellow-100/70"
          >
            <Star className={cn("size-5", "text-yellow-400 fill-yellow-400")} />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-12 py-1">
        <div className="flex items-center gap-1 text-primary/60">
          <MapPin className="size-4" />
          <span className="text-sm">{products.location}</span>
        </div>

        <div className="flex items-center gap-1 text-primary/60">
          <Clock10 className="size-4" />
          <span className="text-sm">{products.date}</span>
        </div>
      </div>
      <div className="md:flex items-center gap-4 w-full my-2 grid grid-cols-2">
        <Button
          variant={"default"}
          className="w-full lg:max-w-[300px] h-[50px] grid-2"
          icon={{
            icon: Phone,
          }}
        >
          {products.calltrader}
        </Button>
        <Button
          variant={"default"}
          className="md:w-[50px] h-[50px] [&_svg]:w-6 [&_svg]:h-6 bg-green-400 hover:bg-green-500"
          icon={{
            icon: FaWhatsapp as LucideIcon,
          }}
        />
        <Button
          variant={"default"}
          className="md:w-[50px] h-[50px] [&_svg]:w-6 [&_svg]:h-6"
          icon={{
            icon: Phone,
          }}
        ></Button>
        <Button
          variant={"ghost"}
          className="w-full max-w-[300px] h-[50px] grid-4"
          icon={{
            icon: Share,
          }}
        >
          {products.share}
        </Button>
      </div>
      <div className="flex flex-col items-start w-full">
        <div className="flex flex-col w-full">
          <Button
            className="flex items-start gap-2 w-full h-fit justify-start p-4"
            variant={"ghost"}
            size={"lg"}
          >
            <div className="relative">
              <AvatarCustom
                className={cn(
                  "border-muted-foreground/80 border-[2px] size-[60px]",
                )}
                avatar_image={{
                  src: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                  alt: "wildduck",
                  className: cn("rounded-md object-cover object-top"),
                }}
                fallback={{
                  children: "WD",
                  className: "bg-zinc-900/80",
                }}
              />
            </div>
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-5 h-5 p-0 rounded-full bg-blue-100/70 border-blue-200 border hover:bg-blue-100/70 cursor-default"
                  label={{
                    children: products.check,
                    showLabel: true,
                    className:
                      "bg-blue-100/70 border-blue-200 border hover:bg-blue-100/70 [&_span]:text-blue-400 [&_span]:mt-[-.4rem]",
                    side: "top",
                  }}
                >
                  <BadgeCheck
                    className={cn("size-4", "text-white fill-blue-400")}
                  />
                </Button>
                <h3 className="text-xl font-semibold">{products.name}</h3>
              </div>
              <p className="text-sm text-primary/60">{products.joined}</p>
            </div>
          </Button>
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={["item-1", "item-2", "item-3"]}
          >
            <AccordionItem value={`item-${1}`} className="">
              <AccordionTrigger className="hover:no-underline px-2">
                {products.hazard}
              </AccordionTrigger>
              <AccordionContent className="flex flex-wrap gap-2 px-2">
                <ul className="flex flex-col gap-2">
                  {products.hazards.map((item, i) => (
                    <li className="text-md text-primary/60">{item} </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
});
