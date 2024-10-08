import { HomeBannerSwiper, SpecialOffers } from "@/components/layouts";
import { AirConditioning } from "@/components/layouts/AirConditioning";
import { AirFighting } from "@/components/layouts/AirFighting";
import { Banner } from "@/components/layouts/Banner";
import { Footer } from "@/components/layouts/Footer";
import banner from "../../../assets/Background.png";
import banner2 from "../../../assets/image-150.png";
import img1 from "../../../assets/fire-extinguisher-colorful-flat-4eeefb.webp";
import img2 from "../../../assets/422aa1520760c530804a7d6f148871eb.png";
import img3 from "../../../assets/pngimg.com - air_conditioner_PNG20.png";
import img4 from "../../../assets/red-black-gear-png-AgjFEw.png";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui";
import Autoplay from "embla-carousel-autoplay";
import { HomeSection } from "@/components/layouts/HomeSection";
export const Home = () => {
  return (
    <div>
      <HomeBannerSwiper />

      <div className="py-12">
        <div className="px-8 mx-28">
          <div className="flex justify-start items-center mb-7">
            <div className="relative z-[2]">
              <h2
                className={`font-bold text-[23px] flex justify-center items-center gap-2  underline__sudo`}
              >
                الفئات
              </h2>
            </div>
          </div>
          <Carousel
            opts={{
              direction: "rtl",
              align: "start",
            }}
            plugins={[Autoplay({ delay: 2000 })]}
          >
            <CarouselContent>
              {" "}
              {/* {data?.map((e , i) => ( */}
              <CarouselItem className="flex-basis transition-all">
                <HomeSection title="مكافحة الحريق" src={img1} alt="img1" />
              </CarouselItem>
              <CarouselItem className="flex-basis transition-all">
                <HomeSection title="التكييف المركزي" src={img2} alt="img1" />
              </CarouselItem>
              <CarouselItem className="flex-basis transition-all">
                <HomeSection title="تدفئه وتكييف منزلي" src={img3} alt="img1" />
              </CarouselItem>
              <CarouselItem className="flex-basis transition-all">
                <HomeSection title="العدد والمستلزمات" src={img4} alt="img1" />
              </CarouselItem>
              <CarouselItem className="flex-basis transition-all">
                <HomeSection title="مكافحة الحريق" src={img1} alt="img1" />
              </CarouselItem>
              <CarouselItem className="flex-basis transition-all">
                <HomeSection title="التكييف المركزي" src={img2} alt="img1" />
              </CarouselItem>
              <CarouselItem className="flex-basis transition-all">
                <HomeSection title="تدفئه وتكييف منزلي" src={img3} alt="img1" />
              </CarouselItem>
              <CarouselItem className="flex-basis transition-all">
                <HomeSection title="العدد والمستلزمات" src={img4} alt="img1" />
              </CarouselItem>
              <CarouselItem className="flex-basis transition-all">
                <HomeSection title="التكييف المركزي" src={img2} alt="img1" />
              </CarouselItem>
              <CarouselItem className="flex-basis transition-all">
                <HomeSection title="التكييف المركزي" src={img2} alt="img1" />
              </CarouselItem>
              <CarouselItem className="flex-basis transition-all">
                <HomeSection title="تدفئه وتكييف منزلي" src={img3} alt="img1" />
              </CarouselItem>
              <CarouselItem className="flex-basis transition-all">
                <HomeSection title="العدد والمستلزمات" src={img4} alt="img1" />
              </CarouselItem>
              <CarouselItem className="flex-basis transition-all">
                <HomeSection title="التكييف المركزي" src={img2} alt="img1" />
              </CarouselItem>
              {/* ))} */}{" "}
            </CarouselContent>
          </Carousel>
          {/* <MainHead title='استكشف الفئات' button='مشاهدة الكل' /> */}
          {/* <div className="flex justify-center items-center flex-wrap">
                     
                 </div> */}{" "}
        </div>
      </div>
      <SpecialOffers />
      <Banner banner={banner} />
      <AirFighting />
      <Banner banner={banner2} />
      <AirConditioning />
      <Banner banner={banner} />
      <AirFighting />
      <Banner banner={banner2} />
      <AirConditioning />
      <Footer />
    </div>
  );
};

// <Header<false>
//     header={{
//         position: "top",
//         className: "justify-between mx-28 place-self-center px-8 py-8",
//     }}
//     logo={<img src={Logo} className="w-24 h-auto" alt="Logo" />}
//     nav={{
//         navigationKeys: data,
//         nav: {
//             className:
//             "[&_ul]:flex [&_ul]:gap-8 [&_button]:text-[1rem] [&_button]:bg-transparent hover:[&_button]:bg-transparent",
//             group: [5],
//             router: {},
//             pathname: "/",
//         },
//     }}
//     footer={{
//         className: "[&_button]:place-content-center [&_button]:text-[1rem]",
//         buttons: [
//             <SelectSwitcher
//                 isCollapsed={true}
//                 accounts={emails}
//                 className={cn("!w-12", 0 && "mx-auto")}
//             />,
//             <Button title={"بيع"} variant={"outline"} className="w-[100px]" />,
//             <Button
//                 title={"تسجيل الدخول"}
//                 className="bg-[#e60000] hover:bg-transparent border hover:border-solid hover:border-[#e60000] hover:text-[#e60000] w-[130px]"
//             />,
//         ],
//     }}
// />
//     <HomeSearch />
