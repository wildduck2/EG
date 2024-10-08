// @ts-nocheck

import { Link } from "@tanstack/react-router";
import img1 from "../../assets/b8aa65eb918cbc07e842e4488e6e236962c3b1db028e3.png";
import img2 from "../../assets/a0ab336c73c4c336395aed6d6c04b66b.png";
import { useTranslation } from "react-i18next";
import { Mail, PhoneCall } from "lucide-react";
import {
  Facebook,
  Instagram,
  LinkedIn,
  Logo,
  LogoWhite,
  Whatsapp,
} from "@/assets";

export const Footer = () => {
  const activeLink = ["/", "/sections", "/about", "/sales", "/info"];
  const { t, i18n } = useTranslation();

  return (
    <footer className="text-white">
      <div className="bg-[#242526ed] py-12">
        <div className="px-8 mx-28">
          <div className="flex justify-between">
            <div>
              <img src={LogoWhite} alt="logo" width="100px" />
            </div>
            <div>
              <h3 className="text-md font-bold mb-6">الاقسام</h3>
              <ul>
                {(t("nav") as unknown as string[])?.map((e, i) => (
                  <li
                    className="text-[13px] font-semibold mb-3 cursor-pointer"
                    key={i}
                  >
                    <Link
                      to={activeLink[i]}
                      className={`${
                        location.pathname === activeLink[i]
                          ? "border-b border-white"
                          : "text-white"
                      }`}
                    >
                      {e}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-md font-bold mb-6">الفئات</h3>
              <ul>
                {(t("categories") as unknown as string[])?.map((e, i) => (
                  <li
                    className="text-[13px] font-semibold mb-3 cursor-pointer"
                    key={i}
                  >
                    <Link to={activeLink[i]}>{e}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-md font-bold mb-6">تواصل معنا</h3>
              <ul>
                <li className="flex justify-start items-center gap-2 text-sm mb-3">
                  <PhoneCall /> 0121212121285
                </li>
                <li className="flex justify-start items-center gap-2 text-sm mb-3">
                  <Mail /> zTQpS@example.com
                </li>
                <li className="flex justify-start items-center gap-2 text-sm mb-3">
                  <PhoneCall /> 987456321123456
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-md font-bold">تابعنا : </h3>
              <ul className="flex items-center gap-3">
                <li>
                  <Link>
                    <img className="size-[2.5rem]" src={Whatsapp} alt="" />
                  </Link>
                </li>
                <li>
                  <Link>
                    <img className="size-[2.5rem]" src={LinkedIn} alt="" />
                  </Link>
                </li>
                <li>
                  <Link>
                    <img className="size-[2.5rem]" src={Instagram} alt="" />
                  </Link>
                </li>
                <li>
                  <Link>
                    <img className="size-[2.5rem]" src={Facebook} alt="" />
                  </Link>
                </li>
              </ul>

              <div className="flex justify-center items-center w-[250px] gap-4">
                <img src={img1} alt="img1" style={{ maxWidth: "120px" }} />
                <img src={img2} alt="img2" style={{ maxWidth: "120px" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#242526ed] py-4 border-t border-[#e5e7eb45]">
        <div>
          <div className="px-8 mx-28">
            <div className="flex justify-center items-center">
              <p className="font-semibold text-[13px] text-center">
                جميع الحقوق محفوظه لدي البضاعه @ 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
