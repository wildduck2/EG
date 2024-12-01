import {
  Facebook,
  img1,
  img2,
  LinkedIn,
  logo,
  ticktock,
  Whatsapp,
  x,
  yt,
} from "@/assets";
import { useTranslation } from "react-i18next";
import { FooterTranslationsType } from "../footer.types";

export const FooterSocial = () => {
  const { t } = useTranslation();
  const footer = t("footer") as unknown as FooterTranslationsType;

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 w-full items-center">
        <div>
          <img src={logo} className="w-[302px] h-auto -mb-24" alt="Logo" />
        </div>
        <div className="flex flex-col gap-4 justify-cneter mt-[5rem] lg:mt-0">
          <h3 className="text-md font-bold">{footer.socialtitle}</h3>
          <li className="grid md:flex justify-start items-center gap-2 text-sm mb-3 mr-4 rounded-lg overflow-hidden">
            <a
              href="https://play.google.com/store/apps/details?id=com.goods.elbda"
              target="_blank"
            >
              <img
                src={img1}
                alt="img1"
                style={{ maxWidth: "200px" }}
                className="rounded-lg"
              />
            </a>
            <a
              target="_blank"
              href="https://apps.apple.com/us/app/%D8%A7%D9%84%D8%A8%D8%B6%D8%A7%D8%B9%D8%A9/id6737291419"
            >
              <img src={img2} alt="img2" style={{ maxWidth: "200px" }} />
            </a>
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
              <a href="https://www.instagram.com/goods.egypt/" target="_blank">
                <img className="w-[2.2rem] h-[2.2rem] " src={Whatsapp} alt="" />
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
          </ul>
        </div>
      </div>
    </>
  );
};
