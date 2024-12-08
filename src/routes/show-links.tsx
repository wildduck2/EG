import { img1, img2 } from "@/assets";
import { OurServices } from "@/components/pages/our-services";
import { buttonVariants } from "@/components/ui";
import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/show-links")({
  component: () => (
    <main className="flex flex-col [&>div:not(:first-child)]:pt-3 [&>div:not(:first-child)]:pb-12 container min-h-screen">
      <div className="relative z-[2] my-4">
        <div className="bg-[#ee1d24] text-white py-12 text-center rounded-lg">
          <h1 className="text-4xl font-bold">تطبيق البضاعة</h1>
          <p className="mt-2 text-xl">
            منصة شاملة لمواد البناء والتشطيبات ومستلزمات المصانع والشركات
          </p>
        </div>

        <li className="grid md:flex items-center gap-8 text-sm rounded-lg overflow-hidden p-20 mx-auto justify-center">
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
              buttonVariants({ variant: "outline" }),
              "w-[200px] h-[57.75px]",
            )}
          >
            <img
              src={"https://img.icons8.com/?size=50&id=1349&format=png"}
              alt="img2"
              style={{ maxWidth: "200px" }}
            />
          </a>
        </li>
        <section
          id="goal"
          className="mx-auto p-6 bg-white shadow-md rounded-lg my-10"
        >
          <h2 className="text-2xl font-semibold text-[#ee1d24]">هدفنا</h2>
          <p className="mt-4 text-lg">
            يهدف تطبيق "البضاعة" إلى تمكين جميع الأطراف العاملة في قطاع البناء
            والتشطيبات من الوصول إلى احتياجاتهم بسهولة وفعالية. يعزز التطبيق
            كفاءة العمليات التجارية ويساهم في تحقيق النجاح لمشاريعهم من خلال
            توفير الأدوات والموارد اللازمة لأداء مهامهم بشكل أفضل.
          </p>
        </section>
      </div>
    </main>
  ),
});
