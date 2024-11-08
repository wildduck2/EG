import {
  DialogContent,
  CarouselItem,
  CustomCarousel,
  DialogTrigger,
  Dialog,
  Button,
} from "@/components/ui";
import { ProductType } from "../../home";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export const ProductPageSwiper = ({ data }: { data: ProductType }) => {
  const { t, i18n } = useTranslation();
  const route = useNavigate();

  const products = t("product");

  return (
    <CustomCarousel className="mt-0">
      {[...data.images.map((item) => item.image_path)].map((image, index) => (
        <CarouselItem key={index}>
          <Dialog>
            <DialogTrigger className="w-full">
              {data.is_featured && (
                <Button
                  variant="secondary"
                  size="sm"
                  label={{
                    children: (products as any).special,
                    className: "text-xs",
                    side: "top",
                  }}
                  className="h-fit py-1 rounded-full bg-yellow-100/70 border-yellow-200 border cursor-default hover:bg-yellow-100/70 absolute top-4 right-4"
                >
                  <Star
                    className={cn("size-5", "text-yellow-400 fill-yellow-400")}
                  />
                </Button>
              )}
              <picture>
                <img
                  className="lg:h-[500px] w-full object-cover rounded-md border border-solid border-border"
                  src={process.env.BACKEND__BASE_UPLOAD_URL + "/" + image}
                />
              </picture>
            </DialogTrigger>
            <DialogContent className="max-w-[90dvw] w-full">
              <img
                className="lg:h-[90dvh] w-[90dvw] object-contain"
                src={process.env.BACKEND__BASE_UPLOAD_URL + "/" + image}
              />
            </DialogContent>
          </Dialog>
        </CarouselItem>
      ))}
    </CustomCarousel>
  );
};
