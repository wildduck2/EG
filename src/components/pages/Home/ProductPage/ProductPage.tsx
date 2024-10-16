import { map } from "@/assets";
import { Footer } from "@/components/layouts";
import { ProductCard } from "@/components/layouts/AddContent";
import { data as Data } from "@/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AvatarCustom,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CustomCarousel,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  BadgeCheck,
  Clock10,
  Heart,
  LucideIcon,
  MapPin,
  Phone,
  Share,
  Star,
} from "lucide-react";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
gsap.registerPlugin(ScrollTrigger);

export const ProductPage = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const { t, i18n } = useTranslation();
  const products = t("product");

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const container = React.useRef<HTMLDivElement>();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1300px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".trigger",
            start: `0% 35%`,
            end: `80% 45%`,
            pin: ".pinn",
            scrub: 0.1,
            pinSpacing: false,
            // markers: true,
          },
          clearProps: true,
        });
      });
    },
    { scope: container },
  );

  return (
    <>
      <main
        className="container flex flex-col pm-4 lg:pt-[17rem]"
        ref={container}
      >
        {
          <Breadcrumb className="mx-auto">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/home">الرئيسية</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/docs/components">
                  المنتجات
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-red-400 font-bold">
                  تكنولوجيا المعلومات
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }

        <div className="flex flex-col items-center gap-4 w-full my-8">
          <div className="flex gap-8 justify-between w-full trigger">
            <div className="w-full xl:w-[60%]">
              <Carousel
                setApi={setApi}
                opts={{
                  direction: "ltr",
                  loop: true,
                }}
              >
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <picture>
                        <img
                          className="lg:h-[600px] w-full object-cover rounded-md border border-solid border-border"
                          src="https://images.pexels.com/photos/1667071/pexels-photo-1667071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        />
                      </picture>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-8" />
                <CarouselNext className="right-8" />
              </Carousel>
              <ProductPreviewInfo className="xl:hidden" />
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
                        <p
                          className="text-md font-semibold truncate"
                          key={index}
                        >
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
                      <p
                        className="text-md max-w-[80%] text-primary/80"
                        key={index}
                      >
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
                  {Data?.map((item, idx) => (
                    <CarouselItem
                      className="w-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3"
                      key={idx}
                    >
                      <ProductCard data={item} />
                    </CarouselItem>
                  ))}
                </CustomCarousel>
              </div>
            </div>

            <div className="pinn">
              <ProductPreviewInfo className="hidden xl:flex" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

const creamProductDescription = [
  "هذا الكريم الفاخر يحتوي على مزيج فريد من زيوت الأفوكادو وفيتامين E لترطيب البشرة بعمق وجعلها ناعمة ومرنة طوال اليوم.",
  "مصمم للبشرة الحساسة، خالٍ من المواد الكيميائية الضارة مثل البارابين والكبريتات، ما يجعله لطيفًا على البشرة ولا يسبب التهيج.",
  "قوامه خفيف وغير دهني، يمتص بسرعة في البشرة، مما يجعله مثاليًا للاستخدام صباحًا أو مساءً دون ترك أي بقايا لزجة.",
  "ثبت سريريًا أنه يحسن ترطيب البشرة بنسبة تصل إلى 45% بعد أسبوعين فقط من الاستخدام المنتظم.",
  "يحتوي على مكونات مضادة للشيخوخة مثل حمض الهيالورونيك لتحسين مظهر الخطوط الدقيقة والتجاعيد.",
];

export interface ProductPreviewInfoProps
  extends React.HTMLProps<HTMLDivElement> {}

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
