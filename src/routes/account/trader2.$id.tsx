import {
  ds,
  Facebook,
  LinkedIn,
  Logo,
  mes,
  teletgram,
  ticktock,
  Whatsapp,
  wts,
  x,
} from "@/assets";
import {
  Banner,
  Category,
  Footer,
  TraderProfileAds,
  User,
} from "@/components/layouts";

import shape from "../../assets/shape.png";
import {
  Button,
  buttonVariants,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogTrigger,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from "@/components/ui";
import { filterData } from "@/context";
import { queryClient } from "@/main";
import {
  createFileRoute,
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { useAtom } from "jotai";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { get_traders } from "./trader-profiles";
import { Building2, Check, Copy, Mail, Phone, Share } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

type TraderRouteState = {
  isVIP: boolean;
};

export const Route = createFileRoute("/account/trader2/$id")({
  component: () => {
    const { state, pathname } = useLocation();
    const { id } = useParams({ strict: false });
    const user_old = (state as any).user as User;
    const { t, i18n } = useTranslation();
    const [filter_data, setFilterData] = useAtom(filterData);
    console.log(id);
    const { data } = useQuery({
      queryKey: ["trader"],
      queryFn: () => gettrader(id ?? user.id),
      refetchOnWindowFocus: false,
    });

    const user = data ?? user_old;

    const bannersss = JSON.parse(localStorage.getItem("banners") || "[]");

    console.log(data);

    const [copied, setCopied] = React.useState(false);
    const products = t("product");

    return (
      <>
        <Header />
        <main
          className="flex-col pm-4 pt-[4.8rem]"
          // dir="rtl"
        >
          {user?.name ||
            (user?.company_name && (
              <section className="flex gap-4 items-start my-8 min-h-[63vh] flex-col">
                <img
                  src={
                    (user?.image &&
                      process.env.BACKEND__BASE_UPLOAD_URL +
                        "/" +
                        user?.image) ||
                    (user?.slug &&
                      process.env.BACKEND__BASE_UPLOAD_URL +
                        "/" +
                        user?.slug) ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s"
                  }
                  className="w-full h-[300px] border  object-cover"
                  alt="map"
                />
                <div className="grid grid-cols-3 w-[98%]">
                  <div className="flex flex-col mx auto w-full col-span-2">
                    <div className="flex items-start justify-between gap-8 px-3">
                      <ul className="flex flex-col items-center gap-8 lg:mt-[4.2rem] place-content-center lg:mr-8">
                        <a href={user.facebook} target="_blank">
                          <img
                            src={Facebook}
                            className="md:w-[50px] h-[50px] [&_svg]:w-6 [&_svg]:h-6"
                          />
                        </a>
                        <a href={user.twitter} target="_blank">
                          <img
                            src={x}
                            className="md:w-[50px] h-[50px] [&_svg]:w-6 [&_svg]:h-6"
                          />
                        </a>
                        <a
                          href={"https://wa.me/" + user.whatsapp}
                          target="_blank"
                        >
                          <img
                            src={wts}
                            className="md:w-[50px] h-[50px] [&_svg]:w-6 [&_svg]:h-6"
                          />
                        </a>
                        <a href={user.instagram} target="_blank">
                          <img
                            src={Whatsapp}
                            className="md:w-[50px] h-[50px] [&_svg]:w-6 [&_svg]:h-6"
                          />
                        </a>

                        {user.tiktok && (
                          <li>
                            <a href={user.tiktok} target="_blank">
                              <img
                                className="size-[3.2rem]"
                                src={ticktock}
                                alt=""
                              />
                            </a>
                          </li>
                        )}
                      </ul>
                      <div className="w-full">
                        <div className="flex gap-4 justify-center pb-4">
                          <h2 className="text-3xl font-semibold text-start w-full mb-3 flex items-center gap-4">
                            <img src={ds} className="size-[3rem] rounded-lg" />{" "}
                            {user?.name || user?.company_name}
                          </h2>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"default"}
                                className="w-full max-w-[300px] h-[50px] grid-4 bg-[#ed1c24] text-white hover:bg-[#ed1c24] hover:text-white"
                                icon={{
                                  icon: Share,
                                }}
                              >
                                {t(products.share)}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                              <div className="flex items-center gap-2 mb-2">
                                <a
                                  href={`https://www.facebook.com/sharer/sharer.php?u=${location.href}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={cn(
                                    buttonVariants({ variant: "default" }),
                                    "p-0",
                                  )}
                                >
                                  <img
                                    src={Facebook}
                                    alt="facebook"
                                    className="size-10 object-contain"
                                  />
                                </a>
                                <a
                                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${location.href}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "p-0",
                                  )}
                                >
                                  <img
                                    src={LinkedIn}
                                    alt="facebook"
                                    className="size-10 object-contain"
                                  />
                                </a>

                                <a
                                  href={`https://twitter.com/intent/tweet?url=${location.href}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={cn(
                                    buttonVariants({ variant: "default" }),
                                    "p-0",
                                  )}
                                >
                                  <img
                                    src={x}
                                    alt="facebook"
                                    className="size-10 object-contain"
                                  />
                                </a>

                                <a
                                  href={`https://t.me/share/url?url=${location.href}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={cn(
                                    buttonVariants({ variant: "default" }),
                                    "p-0",
                                  )}
                                >
                                  <img
                                    src={teletgram}
                                    alt="facebook"
                                    className="size-10 object-contain"
                                  />
                                </a>

                                <a
                                  href={`https://wa.me/?text=Check%20this%20out:%20${location.href}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={cn(
                                    buttonVariants({ variant: "default" }),
                                    "p-0",
                                  )}
                                >
                                  <img
                                    src={wts}
                                    alt="facebook"
                                    className="size-10 object-contain"
                                  />
                                </a>

                                <a
                                  href={`https://m.me/?link=${location.href}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={cn(
                                    buttonVariants({ variant: "default" }),
                                    "p-0",
                                  )}
                                >
                                  <img
                                    src={mes}
                                    alt="facebook"
                                    className="size-10 object-contain"
                                  />
                                </a>
                              </div>
                              <div className="flex gap-2">
                                <Input value={location.href} />
                                <Button
                                  className="0"
                                  onClick={() => {
                                    setCopied(true);

                                    navigator.clipboard.writeText(
                                      location.href,
                                    );
                                    setTimeout(() => {
                                      setCopied(false);
                                    }, 1000);
                                  }}
                                >
                                  {copied ? (
                                    <Check size={16} />
                                  ) : (
                                    <Copy size={16} />
                                  )}
                                </Button>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="flex flex-col gap-8 w-full">
                          <Card className=" p-2">
                            <CardHeader className="p-2">
                              <CardTitle>{t("description")}</CardTitle>
                            </CardHeader>
                            <CardContent className="grid lg:grid-cols-2 gap-2">
                              <p className="text-primary/80 text-md text-start max-w-[800px]">
                                {user?.description}
                              </p>
                            </CardContent>
                          </Card>

                          <Card className="">
                            <CardHeader>
                              <CardTitle>{t("preface")}</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-2 w-full">
                              <p className="text-primary/80 text-md text-start max-w-[800px]">
                                {user?.about}
                              </p>
                            </CardContent>
                          </Card>

                          <div className="p-2 border rounded-lg flex items-center gap-4">
                            <h5 className="text-2xl">{t("sorty")}</h5>
                            <div className="flex gap-4">
                              <div className="flex items-center gap-4 lg:gap-12 lg:flex-row">
                                {filter_data.categories.find(
                                  (e) => e.id === user?.category_id,
                                )?.name && (
                                  <p className="text-md p-4 rounded-md bg-secondary/80 [&_p]:whitespace-nowrap [&_p]:w-full">
                                    {t("category")}:{"   "}
                                    {
                                      filter_data.categories.find(
                                        (e) => e.id === user?.category_id,
                                      )?.name
                                    }
                                  </p>
                                )}

                                {filter_data.subcategories.find(
                                  (e) => e.id === user?.subcategory_id,
                                )?.name && (
                                  <p className="text-md p-4 rounded-md bg-secondary/80">
                                    {t("subcategory")}:
                                    {
                                      filter_data.subcategories.find(
                                        (e) => e.id === user?.subcategory_id,
                                      )?.name
                                    }
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="p-2 border rounded-lg flex items-center gap-4">
                            <h5 className="text-2xl">{t("address")}</h5>
                            <ul className="flex items-center gap-8 flex-col lg:flex-row">
                              <p className="text-md p-4 rounded-md bg-secondary/80">
                                {t("governorate")}: {user?.address}
                              </p>

                              {
                                // <p className="text-md p-4 rounded-md bg-secondary/80">
                                //   {t("region")}: {user?.address}
                                // </p>
                              }
                            </ul>
                          </div>

                          <Card className="p-2">
                            <CardHeader className="p-0 text-2xl">
                              {t("contact")}
                            </CardHeader>
                            <CardContent className="pb-0">
                              <ul className="flex items-center gap-8  flex-col lg:flex-row">
                                <p className="text-primary/90 text-lg flex items-center gap-3">
                                  <Phone /> {user?.phone_number}
                                </p>

                                <p className="text-primary/90 text-lg flex items-center gap-3">
                                  <Mail /> {user?.sms}
                                </p>
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 border rounded-lg gap-4  mr-[7.8rem] ml-[.8rem] mt-4">
                      <h5 className="text-primary/90 text-2xl flex items-center gap-3 mb-3">
                        {i18n.dir() === "ltr" ? "الصور" : "الصور"}
                      </h5>
                      <div className="grid grid-cols-4 gap-2 max-w-[100%] pl-3">
                        {user.images.map((image) => (
                          <Dialog>
                            <DialogTrigger className="w-full">
                              <picture>
                                <img
                                  className="lg:h-[150px] w-full object-cover rounded-md border border-solid border-border"
                                  src={
                                    process.env.BACKEND__BASE_UPLOAD_URL +
                                    "/" +
                                    image?.image_path
                                  }
                                />
                              </picture>
                            </DialogTrigger>
                            <DialogContent className="max-w-[90dvw] w-full">
                              <img
                                className="lg:h-[90dvh] w-[90dvw] object-contain"
                                src={
                                  process.env.BACKEND__BASE_UPLOAD_URL +
                                  "/" +
                                  image?.image_path
                                }
                              />
                            </DialogContent>
                          </Dialog>
                        ))}
                      </div>
                      <a
                        href={user?.catalog}
                        className="mt-4 w-[50%] bg-[#ed1c24] text-white mx-auto"
                        target="_blank"
                      >
                        <Button
                          size={"lg"}
                          className="mt-4 w-[50%] bg-[#ed1c24] text-white mx-auto"
                        >
                          {i18n.dir() === "ltr" ? "Catelog" : "كاتالوج"}
                        </Button>
                      </a>
                    </div>

                    <Card className="m-4">
                      <CardHeader>
                        <CardTitle>{products.locationtitle}</CardTitle>
                      </CardHeader>
                      <CardContent className="grid gap-2 w-full">
                        <iframe
                          height="450"
                          loading="lazy"
                          className="w-full rounded-lg border border-border border-solid"
                          src={`https://www.google.com/maps?q=${user?.latitude},${user?.longitude}&z=15&output=embed`}
                        ></iframe>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="w-full border h-[95.5%] m-4 mb-8 p-4 rounded-lg mt-[4.1rem] overflow-hidden">
                    <a
                      href={bannersss?.[0]?.link}
                      target="_blank"
                      className="w-full h-full"
                    >
                      <img
                        src={
                          process.env.BACKEND__BASE_UPLOAD_URL +
                          "/" +
                          bannersss?.[0]?.image
                        }
                        alt="banner"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </a>
                  </div>
                </div>
              </section>
            ))}
        </main>
        <Footer />
      </>
    );
  },
});
function formatJoinedAtDate(dateString: string, lan = "en"): string {
  const date = new Date(dateString); // Parse the date string
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long", // Day of the week (e.g., Monday)
    year: "numeric", // Full year (e.g., 2024)
    month: "long", // Full month name (e.g., November)
    // day: "numeric", // Day of the month (e.g., 8)
    // hour: "2-digit", // 2-digit hour (e.g., 15)
    // minute: "2-digit", // 2-digit minute (e.g., 27)
    // second: "2-digit", // 2-digit second (e.g., 47)
    // timeZoneName: "short", // Abbreviated timezone name (e.g., GMT)
  };

  return `${date.toLocaleString(lan === "ar" ? "ar-SA" : "en-US", options)}`;
}
export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const route = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user-info") as string);
  const [isSticky, setIsSticky] = React.useState(false);

  console.log();

  React.useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
  }, [location.pathname]);

  const categories: Category[] = JSON.parse(
    localStorage.getItem("categories") || "{}",
  );

  return (
    <>
      <header
        className={cn(
          "lg:fixed top-0 xl:left-1/2 xl:-translate-x-1/2 w-full z-50 mx-auto place-self-center bg-background",
          location.pathname !== "/account/trader-profiles" ||
            (location.pathname.toString().includes("/account/trader2") &&
              "border-border border-solid border-b"),
        )}
      >
        <div className="flex flex-col items-cetner gap-2 container  bg-background ">
          <div className="flex items-center justify-between">
            <Link to="/" className="logo mt-2">
              <img src={Logo} className="w-[12rem] h-auto" alt="Logo" />
            </Link>
            <div className="flex lg:hidden items-center gap-4">
              <Button
                title={i18n.language === "en" ? "عربي" : "English"}
                variant={"outline"}
                className="w-full md:w-[100px] font-bold lg:hidden flex"
                onClick={() => {
                  document.body.classList.toggle("rtl");
                  localStorage.setItem(
                    "i18nextLng",
                    i18n.language === "en" ? "ar" : "en",
                  );
                  i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
                }}
              />
            </div>
            <img
              src={shape}
              className={cn(
                "w-[605px] -mt-4 hidden lg:block fixed",
                i18n.dir() === "ltr" ? "right-0" : "left-0",
              )}
              style={{
                transform: i18n.dir() === "ltr" ? "rotateY(180deg)" : "",
              }}
            />
          </div>
        </div>
      </header>
    </>
  );
};
export async function gettrader(id: string) {
  try {
    const { data } = await axios.get(
      process.env.BACKEND__BASE_URL + `/client/profiles/${id}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!data.success) {
      toast.error("فشل عرض معلومات التاجر");
    }

    return data.data;
  } catch (error) {
    console.log(error);
    toast.error("فشل عرض معلومات التاجر");

    return null;
  }
}
