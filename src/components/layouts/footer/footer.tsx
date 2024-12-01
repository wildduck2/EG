import { lap } from "@/assets";
import { useTranslation } from "react-i18next";
import { FooterTranslationsType } from "./footer.types";
import { FooterContactus } from "./footer-contactus/footer-contactus";
import { FooterSocial } from "./footer-social";

export const Footer = () => {
  const { t } = useTranslation();
  const footer = t("footer") as unknown as FooterTranslationsType;

  return (
    <footer className="text-white bg-[#ed1c24;] z-10 relative">
      <div className="pt-4 container">
        <div className="flex flex-col lg:flex-row items-end  xl:gap-20">
          <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row gap-12 items-center xl:items-start w-full">
            <img src={lap} className="w-72" />
            <FooterContactus />
          </div>
          <FooterSocial />
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
