import { img1, img2 } from "@/assets";
import { buttonVariants } from "@/components/ui";
import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { ScreenShare } from "lucide-react";

export const Route = createFileRoute("/show-links")({
  component: () => (
    <main className="flex flex-col [&>div:not(:first-child)]:pt-3 [&>div:not(:first-child)]:pb-12 container min-h-screen">
      <div className="relative z-[2] my-4">
        <div className="bg-[#ee1d24] text-white text-center rounded-lg p-8">
          <h1 className="xl:text-4xl text-xl font-bold">تطبيق البضاعة</h1>
          <p className="mt-2 xl:text-xl text-md">
            منصة شاملة لمواد البناء والتشطيبات ومستلزمات المصانع والشركات
          </p>
        </div>

        <li className="grid md:flex items-center gap-4 text-sm rounded-lg overflow-hidden pt-8 mx-auto justify-center">
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
          <a
            target="_blank"
            href="https://goods.eg"
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-[200px] h-[57.75px] text-xl font-bold flex items-center gap-4",
            )}
          >
            Goods.eg
            <ScreenShare size={22} />
          </a>
        </li>
        <section
          id="goal"
          className="mx-auto p-6 bg-white shadow-md rounded-lg mt-4"
        >
          <h2 className="text-lg font-semibold text-[#ee1d24] text-center">
            #البضاعة_في_البضاعة #بدون_منافس #بدون_وسيط
          </h2>
        </section>
      </div>
    </main>
  ),
});
