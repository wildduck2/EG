import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CarouselItem,
  CustomCarousel,
} from "@/components/ui";
import {
  AdItemCard,
  get_special_offers,
  SpecialOffersSkeleton,
} from "../../home";
import { useTranslation } from "react-i18next";
import { map } from "@/assets";
import { data as Data } from "@/constants";
import { ProductPageCardsProps } from "./product-page-cards.types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const ProductPageCards = ({ data, category }: ProductPageCardsProps) => {
  const { t } = useTranslation();

  const products = t("product");

  return (
    <div className="flex w-full my-4 gap-4 flex-col">
      {(data as any).details && (
        <Card className="">
          <CardHeader>
            <CardTitle>{products.productdetails}</CardTitle>
          </CardHeader>
          <CardContent className="grid lg:grid-cols-2 gap-2">
            {data.details.map((item, index) => (
              <div className="grid item-center grid-cols-2 justify-between">
                <p className="text-md " key={index}>
                  - {item.label} :
                </p>
                <p className="text-md font-semibold truncate" key={index}>
                  {item.value}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
      <Card className="">
        <CardHeader>
          <CardTitle>{products.productdescription}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 w-full">
          <p className="text-md "> {data.description} </p>
          {
            // products.description.map((item, index) => (
            //             <p className="text-md max-w-[80%] text-primary/80" key={index}>
            //               - {item}.
            //             </p>
            //           ))
          }
        </CardContent>
      </Card>
      <Card className="">
        <CardHeader>
          <CardTitle>{products.locationtitle}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 w-full">
          <iframe
            height="450"
            loading="lazy"
            className="w-full rounded-lg border border-border border-solid"
            src={`https://www.google.com/maps?q=${data.latitude},${data.longitude}&z=15&output=embed`}
          ></iframe>
        </CardContent>
      </Card>
      <ProductPageCardSwiper category={category} />
    </div>
  );
};

export const ProductPageCardSwiper = ({ category }: { category: string }) => {
  console.log(category);
  // Query Special Offers
  const { data, status } = useQuery({
    queryKey: ["specialOffers"],
    queryFn: async () => {
      const { data } = await axios.post(
        process.env.BACKEND__BASE_URL + "/client/ads/getAdsByParameters",
        {
          categoryId: category,
          page: 1,
        },
        {
          withCredentials: true,
          headers: {
            getContentType: "application/json",
          },
        },
      );

      if (!data.success) {
        toast.error("فشل الحصول على العروض الخاصة");
        return null;
      }

      return data.data;
    },
  });
  const { t } = useTranslation();

  if (status === "pending") {
    return <SpecialOffersSkeleton />;
  }

  return (
    <div className="flex flex-col mt-4">
      <h2 className="text-2xl font-semibold">{t("related_ads")}</h2>
      <CustomCarousel showIndicators={false}>
        {data?.map((item, idx) => (
          <CarouselItem
            className="w-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3"
            key={idx}
          >
            <AdItemCard {...item} />
          </CarouselItem>
        ))}
      </CustomCarousel>
    </div>
  );
};
