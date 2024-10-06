import { HomeBannerSwiper, SpecialOffers } from "@/components/layouts";
import { AirConditioning } from "@/components/layouts/AirConditioning";
import { AirFighting } from "@/components/layouts/AirFighting";
import { Banner } from "@/components/layouts/Banner";
import { Footer } from "@/components/layouts/Footer";
import banner from "../../../assets/Background.png";
import banner2 from "../../../assets/image-150.png";

export const Home = () => {
  return (
    <div>
      <HomeBannerSwiper />
      <SpecialOffers />
      <Banner banner={banner} />
      <AirFighting />
      <Banner banner={banner2} />
      <AirConditioning />
      <Banner banner={banner} />
      <AirFighting />
      <Banner banner={banner2} />
      <AirConditioning />
    </div>
  );
};
/*      <Footer /> */

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
