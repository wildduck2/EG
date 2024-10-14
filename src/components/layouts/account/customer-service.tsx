import { Button } from "@/components/ui";
import { MessageSquare, Phone, Share } from "lucide-react";
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
        >
          اتصل بنا
        </Button>
        <Button
          variant={"default"}
          className="h-[50px] [&_svg]:w-5 [&_svg]:h-5 bg-green-400 hover:bg-green-500"
          icon={{
            icon: FaWhatsapp,
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
        >
          ارسال رسالة
        </Button>
      </div>
    </div>
  );
};
