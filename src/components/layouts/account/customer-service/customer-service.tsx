import { Button } from "@/components/ui";
import { LucideIcon, MessageSquare, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export const CustomerServiceForm = () => {
  return (
    <div>
      <div className="flex items-center gap-4 w-full my-2 ">
        <Button
          variant={"default"}
          className="w-full max-w-[300px] h-[50px]"
          icon={{
            icon: Phone,
          }}
          onClick={() => {
            window.open(`tel:${"+966500000000"}`, "_blank");
          }}
        >
          اتصل بنا
        </Button>
        <Button
          variant={"default"}
          className="h-[50px] [&_svg]:w-5 [&_svg]:h-5 bg-green-400 hover:bg-green-500"
          icon={{
            icon: FaWhatsapp as LucideIcon,
          }}
          onClick={() => {
            window.open(`https://wa.me/${"+966500000000"}`, "_blank");
          }}
        >
          تواصل عبر الواتساب
        </Button>
        <Button
          variant={"default"}
          className=" h-[50px] [&_svg]:w-5 [&_svg]:h-5"
          icon={{
            icon: MessageSquare,
          }}
          onClick={() => {
            window.open(`https://wa.me/${"+966500000000"}`, "_blank");
          }}
        >
          ارسال رسالة
        </Button>
      </div>
    </div>
  );
};
