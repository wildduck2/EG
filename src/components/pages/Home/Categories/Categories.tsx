import { ProductCard } from "@/components/layouts/AddContent";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  ScrollArea,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Separator,
  Toggle,
} from "@/components/ui";
import { AlertDialogCustom } from "@/components/ui/duckui/alert";
import { ArrowDown01, Home } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Categories = () => {
  const { t, i18n } = useTranslation();
  const products = t("products");

  return (
    <main className="flex flex-col py-8 container min-h-screen lg:mt-[17rem]">
      <Breadcrumb className="mx-auto">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">الرئيسيه</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs/components">منتجات</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-red-400 font-bold">
              تكنولوجيا المعلومات
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="flex gap-8 items-start my-8 min-h-[63vh]">
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-3xl font-semibold">{t("categoriesname")}</h2>
          <Separator className="px-2" />
          <div className="flex items-center justify-between">
            <AlertDialogCustom<boolean>
              type="sheet"
              drawerData={products.length > 0}
              header={{
                head: "فلتر",
                description: "تحديد الفئات التي تريد مشاهدتها",
              }}
              footer={{
                className:
                  "flex w-full place-content-start justify-end items-end gap-2 [&__button]:w-32",
                submit: <Button variant="default">تأكيد</Button>,
                cancel: <Button variant="outline">الغاء</Button>,
              }}
              state={true}
              trigger={{
                children: (
                  <Button variant="ghost" size="default" className="">
                    <ArrowDown01 className="size-5 rotate-180" />
                    {t("filter")}
                  </Button>
                ),
              }}
              content={{
                dir: "rtl",
                className:
                  "flex flex-col gap-4 sm:max-w-[450px] [&>div]:flex [&>div]:flex-col [&>div]:justify-between [&>div]:h-full",
                children: (
                  <ScrollArea className="flex flex-col items-start p-2 w-full h-full">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Accordion
                        type="multiple"
                        className="w-full"
                        defaultValue={["item-1", "item-2", "item-3"]}
                      >
                        <AccordionItem
                          value={`item-${i + 1}`}
                          className="border-b-2 border-border border-dashed"
                        >
                          <AccordionTrigger className="hover:no-underline px-2">
                            اقسام
                          </AccordionTrigger>
                          <AccordionContent className="flex flex-wrap gap-2 px-2">
                            {categoryData.slice(0, 6).map((item, idx) => (
                              <Toggle
                                className="border border-border border-solid h-fit px-4 py-2 rounded-lg"
                                key={item.id}
                              >
                                {item.name}
                              </Toggle>
                            ))}
                            <Toggle
                              className="border border-red-400 border-dashed h-fit px-4 py-2 rounded-lg bg-red-100/70 text-red-500"
                              key={0}
                            >
                              Show All
                            </Toggle>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </ScrollArea>
                ),
              }}
            />
            {
              // <div className="flex  gap-2 px-2">
              //   {categoryData.slice(0, 6).map((item, idx) => (
              //     <Toggle
              //       className="border border-border border-solid h-fit px-4 py-2 rounded-lg"
              //       key={item.id}
              //     >
              //       {item.name}
              //     </Toggle>
              //   ))}
              // </div>
            }

            <div className="flex items-center gap-2">
              <span>{t("sortby")}</span>
              <Select defaultValue={"None"}>
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort by</SelectLabel>
                    <SelectItem value="None">بلا</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Separator className="px-2" />

          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 my-4">
            {products?.map((item, idx) => (
              <div className="" key={idx}>
                <ProductCard data={item} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

const categoryData = [
  {
    id: 1,
    name: "الإلكترونيات",
    icon: { icon: Home, className: "!size-5" },
  },
  {
    id: 2,
    name: "أجهزة الكمبيوتر",
    icon: { icon: Home, className: "!size-5" },
  },
  {
    id: 3,
    name: "الهواتف الذكية",
    icon: { icon: Home, className: "!size-5" },
  },
  {
    id: 4,
    name: "التلفزيونات",
    icon: { icon: Home, className: "!size-5" },
  },
  {
    id: 5,
    name: "السماعات",
    icon: { icon: Home, className: "!size-5" },
  },
  {
    id: 6,
    name: "اللوحات الإلكترونية",
    icon: { icon: Home, className: "!size-5" },
  },
  {
    id: 7,
    name: "الأجهزة المنزلية",
    icon: { icon: Home, className: "!size-5" },
  },
];
