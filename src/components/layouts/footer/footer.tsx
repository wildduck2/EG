import { Link } from "@tanstack/react-router";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import {
  Facebook,
  img1,
  img2,
  lap,
  LinkedIn,
  logo,
  snap,
  teletgram,
  ticktock,
  Whatsapp,
  x,
  yt,
} from "@/assets";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();
  const footer = t("footer");
  // <div>
  //           <h3 className="text-xl mg:text-3xl font-bold mb-2">
  //             {footer.title}
  //           </h3>
  //           <h3 className="text-lg md:text-3xl font-bold ">
  //             {footer.subtitle}
  //           </h3>
  //         </div>
  return (
    <footer className="text-white bg-[#ed1c24;]">
      <div className="pt-4 container">
        <div className="flex flex-col lg:flex-row items-end  xl:gap-20">
          <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row gap-12 items-center xl:items-start w-full">
            <img src={lap} className="w-72" />
            <div>
              <h3 className="text-md font-bold mb-6 whitespace-nowrap">
                {footer.numberstitle}
              </h3>
              <ul>
                <li className="flex justify-start items-center gap-2 text-sm mb-3">
                  <PhoneCall /> 01206666005
                </li>
                <li className="flex justify-start items-center gap-2 text-sm mb-3">
                  <PhoneCall /> 0225779950
                </li>
                <li className="flex justify-start items-center gap-2 text-sm mb-3">
                  <Mail /> info@goods.eg
                </li>
                <a
                  className="flex justify-start items-center gap-2 text-sm mb-3"
                  href="https://www.google.com/maps/place/30%C2%B003'28.7%22N+31%C2%B014'17.8%22E/@30.057972,31.2356949,17z/data=!3m1!4b1!4m4!3m3!8m2!3d30.057972!4d31.2382698?hl=en&entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                >
                  <MapPin /> القاهره - مول وسط العاصمه
                </a>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full items-center">
            <div>
              <img src={logo} className="w-[302px] h-auto -mb-24" alt="Logo" />
            </div>
            <div className="flex flex-col gap-4 justify-cneter mt-[5rem] lg:mt-0">
              <h3 className="text-md font-bold">{footer.socialtitle}</h3>
              <li className="grid md:flex justify-start items-center gap-2 text-sm mb-3 mr-4 rounded-lg overflow-hidden">
                <img
                  src={img1}
                  alt="img1"
                  style={{ maxWidth: "200px" }}
                  className="rounded-lg"
                />
                <img src={img2} alt="img2" style={{ maxWidth: "200px" }} />
              </li>
              <ul className="flex items-center xl:justify-center gap-3 lg:mb-4">
                <li>
                  <a
                    href="https://www.facebook.com/people/%D8%A7%D9%84%D8%A8%D8%B6%D8%A7%D8%B9%D8%A9/61563898674585/"
                    target="_blank"
                  >
                    <img className="size-[2.2rem]" src={Facebook} alt="" />
                  </a>
                </li>
                <li>
                  <a href="https://x.com/Goods_Eg" target="_blank">
                    <img className="size-[2.2rem]" src={x} alt="" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/goods.egypt/"
                    target="_blank"
                  >
                    <img
                      className="w-[2.2rem] h-[2.2rem] "
                      src={Whatsapp}
                      alt=""
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/goods-eg/?viewAsMember=true"
                    target="_blank"
                  >
                    <img className="size-[2.2rem] " src={LinkedIn} alt="" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@goods_eg/videos"
                    target="_blank"
                  >
                    <img className="size-[2.2rem]" src={yt} alt="" />
                  </a>
                </li>
                <li>
                  <a href="https://www.tiktok.com/@goods.eg" target="_blank">
                    <img className="size-[2.2rem]" src={ticktock} alt="" />
                  </a>
                </li>
                {
                  // <li>
                  //   <a>
                  //     <img className="size-[2.2rem]" src={snap} alt="" />
                  //   </a>
                  // </li>
                  // <li>
                  //   <a>
                  //     <img className="size-[2.2rem]" src={teletgram} alt="" />
                  //   </a>
                  // </li>
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#000000] py-4 border-t border-[#e5e7eb45] relative">
        <div className="flex justify-center items-center">
          <p className="font-semibold text-[13px] text-center">
            {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};
