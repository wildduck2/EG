import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CarouselItem,
  CustomCarousel,
} from "@/components/ui";
import { AdItemCard } from "../../home";
import { useTranslation } from "react-i18next";
import { map } from "@/assets";
import { data } from "@/constants";

export const ProductPageCards = () => {
  const { t } = useTranslation();

  const products = t("product");

  return (
    <div className="flex w-full my-4 gap-4 flex-col">
      <Card className="">
        <CardHeader>
          <CardTitle>{products.productdetails}</CardTitle>
        </CardHeader>
        <CardContent className="grid lg:grid-cols-2 gap-2">
          {products.productinfo.map((item, index) => (
            <div className="grid item-center grid-cols-2 justify-between">
              <p className="text-md truncate" key={index}>
                - {item.label} :
              </p>
              <p className="text-md font-semibold truncate" key={index}>
                {item.value}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="">
        <CardHeader>
          <CardTitle>{products.productdescription}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 w-full">
          {products.description.map((item, index) => (
            <p className="text-md max-w-[80%] text-primary/80" key={index}>
              - {item}.
            </p>
          ))}
        </CardContent>
      </Card>
      <Card className="">
        <CardHeader>
          <CardTitle>{products.locationtitle}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 w-full">
          <img
            src={map}
            className="rounded-lg border border-border border-solid"
          />
        </CardContent>
      </Card>

      <CustomCarousel>
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
