import { Link } from "@tanstack/react-router";
import { Zap } from "lucide-react";

interface MainHeadProps {
  title: string;
  button: string;
  offers: boolean;
}

export const MainHead: React.FC<MainHeadProps> = ({
  title,
  button,
  offers = false,
}) => {
  return (
    <div className="flex justify-between items-center mb-12">
      <div className="relative z-[2]">
        <h2
          className={`font-bold text-[23px] flex justify-center items-center gap-2 ${offers && "text-red-400"} underline__sudo`}
        >
          {offers && (
            <Zap className="border border-red-400 rounded-full p-1 text-[9px]" />
          )}
          {title}
        </h2>
        <span className="absolute bottom-[-6px] right-0 w-full h-full z-[-1]"></span>{" "}
      </div>
      <Link className="border border-[#e60000] text-[15px] font-semibold py-2 px-8 rounded-md text-[#e60000] transition-all hover:bg-[#e60000] hover:text-white">
        {button}
      </Link>
    </div>
  );
};
