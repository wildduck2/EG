import { Link } from "@tanstack/react-router";
import { Mail, PhoneCall } from "lucide-react";
import { Facebook, Instagram, LinkedIn, logo, Whatsapp } from "@/assets";

export const Footer = () => {
  return (
    <footer className="text-white bg-[#262727ed]">
      <div className="pt-12 container">
        <div className="flex flex-col lg:flex-row items-end justify-between xl:gap-20">
          <div className="flex justify-between flex-col md:flex-row lg:flex-col xl:flex-row gap-4 items-center xl:items-start w-full">
            <div>
              <h3 className="text-xl mg:text-3xl font-bold mb-2">
                اعثر على صفقات مذهلة لدينا.
              </h3>
              <h3 className="text-lg md:text-3xl font-bold text-red-500">
                حمل التطبيق الآن!
              </h3>
            </div>

            <div>
              <h3 className="text-md font-bold mb-6 whitespace-nowrap">
                تواصل معنا
              </h3>
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
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div>
              <img src={logo} className="w-[200px] h-auto" alt="Logo" />
            </div>
            <div className="flex flex-col gap-4 justify-cneter">
              <h3 className="text-md font-bold">تابعنا : </h3>
              <ul className="flex items-center justify-end xl:justify-start gap-3 lg:mb-4">
                <li>
                  <Link>
                    <img
                      className="w-[2.5rem] h-[2.5rem]"
                      src={Whatsapp}
                      alt=""
                    />
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
                {
                  // <img src={img1} alt="img1" style={{ maxWidth: "120px" }} />
                  // <img src={img2} alt="img2" style={{ maxWidth: "120px" }} />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#262727ed] py-4 border-t border-[#e5e7eb45]">
        <div className="flex justify-center items-center">
          <p className="font-semibold text-[13px] text-center">
            جميع الحقوق محفوظه لدي البضاعه @ 2024
          </p>
        </div>
      </div>
    </footer>
  );
};
