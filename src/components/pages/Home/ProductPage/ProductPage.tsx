import { map } from "@/assets";
import { Footer, SpecialOffers } from "@/components/layouts";
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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  BadgeCheck,
  Clock10,
  Headset,
  Heart,
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
gsap.registerPlugin(ScrollTrigger);

export const ProductPage = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".trigger",
          start: `5% 15%`,
          end: `80% 70%`,
          pin: ".pin",
          scrub: 0.1,
          pinSpacing: false,
          // markers: true,
        },
        clearProps: true,
      });

      // tl.to(".pinn", {
      //   opacity: 0,
      //   duration: 0.5,
      // });
    },
    { scope: container },
  );

  return (
    <>
      <main
        className="mx-28 px-8 flex flex-col pm-4 pt-[17rem]"
        ref={container}
      >
        <Breadcrumb className="mx-auto">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/home">الرئيسية</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs/components">المنتجات</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-red-400 font-bold">
                تكنولوجيا المعلومات
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col items-center gap-4 w-full my-8">
          <div className="flex gap-8 justify-between w-full">
            <div className="w-[60%]">
              <Carousel
                setApi={setApi}
                opts={{
                  direction: "rtl",
                  loop: true,
                }}
              >
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <picture>
                        <img
                          className="h-[600px] w-full object-cover rounded-md border border-solid border-border"
                          src="https://images.pexels.com/photos/1667071/pexels-photo-1667071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        />
                      </picture>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-8" />
                <CarouselNext className="right-8" />
              </Carousel>
              <div className="flex w-full my-4 gap-4 flex-col">
                <Card className="">
                  <CardHeader>
                    <CardTitle>التفاصيل</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-2">
                    {data.map((item, index) => (
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
                    <CardTitle>الوصف</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-2 w-full">
                    {creamProductDescription.map((item, index) => (
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
                    <CardTitle>الموقع</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-2 w-full">
                    <img
                      src={map}
                      className="rounded-lg border border-border border-solid"
                    />
                  </CardContent>
                </Card>

                <div className={``}>
                  <Carousel
                    setApi={setApi}
                    opts={{
                      direction: "rtl",
                      loop: true,
                    }}
                  >
                    <CarouselContent>
                      {Data?.map((item, idx) => (
                        <CarouselItem className="basis-1/3" key={idx}>
                          <ProductCard data={item} />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-8" />
                    <CarouselNext className="right-8" />
                  </Carousel>
                  <div className="py-2 text-center text-sm text-muted-foreground gap-1 flex items-center w-fit justify-center mx-auto">
                    {Array.from({ length: count }).map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          "w-3 h-3 rounded-full border border-red-400 border-solid inline-flex",
                          current === i + 1 && "bg-red-400",
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 p-4 relative pin">
              <Button
                variant="secondary"
                size="sm"
                className={cn(
                  "size-8 rounded-full bg-red-100/70 border-red-200 border hover:bg-red-100 absolute left-[1.1rem] top-[1.1rem]",
                  // "bg-red-400 hover:bg-red-500/70",
                )}
                label={{
                  children: "مفضلة",
                  className:
                    "bg-red-100/70 border-red-200 border hover:bg-red-100/70 [&_span]:text-red-400 [&_span]:mt-[-.4rem]",
                  showLabel: true,
                  side: "bottom",
                }}
              >
                <Heart className={cn("size-4", "text-red-400 fill-red-400")} />
              </Button>
              <h3 className="text-3xl font-semibold">٥٠٠٠ جنيه مصري</h3>
              <h2 className="text-2xl font-semibold">
                مقشر القهوة أورجانيك كير
              </h2>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-fit py-1 rounded-full bg-blue-100/70 border-blue-200 border hover:bg-blue-100/70 cursor-default"
                    label={{
                      className: "text-xs",
                      children: "موثق",
                      side: "top",
                    }}
                  >
                    <BadgeCheck
                      className={cn("size-5", "text-white fill-blue-400")}
                    />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    label={{
                      children: "مميز",
                      className: "text-xs",
                      side: "top",
                    }}
                    className="h-fit py-1 rounded-full bg-yellow-100/70 border-yellow-200 border cursor-default hover:bg-yellow-100/70"
                  >
                    <Star
                      className={cn(
                        "size-5",
                        "text-yellow-400 fill-yellow-400",
                      )}
                    />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-12 py-1">
                <div className="flex items-center gap-1 text-primary/60">
                  <MapPin className="size-4" />
                  <span className="text-sm">{"القاهره - سهل حمزه"}</span>
                </div>

                <div className="flex items-center gap-1 text-primary/60">
                  <Clock10 className="size-4" />
                  <span className="text-sm">{"خمسه ايام"}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full my-2 ">
                <Button
                  variant={"default"}
                  className="w-full max-w-[300px] h-[50px]"
                  icon={{
                    icon: Phone,
                  }}
                >
                  الاتصال بالتاجر
                </Button>
                <Button
                  variant={"default"}
                  className="w-[50px] h-[50px] [&_svg]:w-6 [&_svg]:h-6 bg-green-400 hover:bg-green-500"
                  icon={{
                    icon: FaWhatsapp,
                  }}
                />
                <Button
                  variant={"default"}
                  className="w-[50px] h-[50px] [&_svg]:w-6 [&_svg]:h-6"
                  icon={{
                    icon: Phone,
                  }}
                ></Button>
                <Button
                  variant={"ghost"}
                  className="w-full max-w-[300px] h-[50px]"
                  icon={{
                    icon: Share,
                  }}
                >
                  مشاركة
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
                            children: "موثق",
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
                        <h3 className="text-xl font-semibold">wildduck</h3>
                      </div>
                      <p className="text-sm text-primary/60">عضو منذ 2 سنوات</p>
                    </div>
                  </Button>
                  <Accordion
                    type="multiple"
                    className="w-full"
                    defaultValue={["item-1", "item-2", "item-3"]}
                  >
                    <AccordionItem value={`item-${1}`} className="">
                      <AccordionTrigger className="hover:no-underline px-2">
                        سلامتك تهمنا!
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-wrap gap-2 px-2">
                        <ul className="flex flex-col gap-2">
                          <li className="text-md text-primary/60">
                            - الالتقاء فقط في الأماكن العامة/المزدحمة، على سبيل
                            المثال محطات المترو ومراكز التسوق.{" "}
                          </li>
                          <li className="text-md text-primary/60">
                            - لا تذهب أبدًا بمفردك لمقابلة المشتري / البائع،
                            اصطحب دائمًا شخصًا معك.
                          </li>
                          <li className="text-md text-primary/60">
                            - قم بفحص المنتج وفحصه بشكل صحيح قبل شرائه.
                          </li>
                          <li className="text-md text-primary/60">
                            - لا تدفع أبدًا أي شيء مقدمًا أو تحول الأموال قبل
                            فحص المنتج.
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

const data = [
  { label: "العلامة التجارية", value: "نيفيا" },
  { label: "نوع المنتج", value: "كريم مرطب" },
  { label: "نوع البشرة", value: "جميع أنواع البشرة" },
  { label: "الوزن", value: "200 مل" },
  { label: "المكونات", value: "زيوت طبيعية، فيتامين E" },
  { label: "فترة الاستخدام", value: "نهاري ومسائي" },
  { label: "فوائد", value: "ترطيب عميق" },
];

const creamProductDescription = [
  "هذا الكريم الفاخر يحتوي على مزيج فريد من زيوت الأفوكادو وفيتامين E لترطيب البشرة بعمق وجعلها ناعمة ومرنة طوال اليوم.",
  "مصمم للبشرة الحساسة، خالٍ من المواد الكيميائية الضارة مثل البارابين والكبريتات، ما يجعله لطيفًا على البشرة ولا يسبب التهيج.",
  "قوامه خفيف وغير دهني، يمتص بسرعة في البشرة، مما يجعله مثاليًا للاستخدام صباحًا أو مساءً دون ترك أي بقايا لزجة.",
  "ثبت سريريًا أنه يحسن ترطيب البشرة بنسبة تصل إلى 45% بعد أسبوعين فقط من الاستخدام المنتظم.",
  "يحتوي على مكونات مضادة للشيخوخة مثل حمض الهيالورونيك لتحسين مظهر الخطوط الدقيقة والتجاعيد.",
];
