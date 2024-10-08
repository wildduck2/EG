import { ProductCard } from "@/components/layouts/AddContent";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  ButtonProps,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Header,
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
import { cn } from "@/lib/utils";
import {
  AlignCenter,
  ArrowLeftToLine,
  ArrowRightFromLine,
  Calendar,
  Home,
} from "lucide-react";
import React from "react";

export const Categories = () => {
  return (
    <main className="mx-28 px-8 flex flex-col py-4">
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
        <div className="flex flex-col gap-4 h-full">
          <aside className="flex flex-col w-[300px] m-4 mt-12 border border-y-0 border-border border-solid h-full">
            <div className="flex flex-col items-start p-2 w-full">
              <Button
                variant="ghost"
                className="justify-between text-lg w-full [&_span]:ml-0"
                icon={{ icon: AlignCenter, className: "!size-5" }}
                label={{
                  children: <ArrowLeftToLine className="size-5 rotate-180" />,
                }}
              >
                فلتر
              </Button>
            </div>
            <Separator className="px-2" />
            <div className="flex flex-col items-start p-2 w-full">
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
            </div>
          </aside>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-3xl font-semibold">تكنولوجيا المعلومات</h2>
          <Separator className="px-2" />
          <div className="flex items-center justify-between">
            <div className="flex  gap-2 px-2">
              {categoryData.slice(0, 6).map((item, idx) => (
                <Toggle
                  className="border border-border border-solid h-fit px-4 py-2 rounded-lg"
                  key={item.id}
                >
                  {item.name}
                </Toggle>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span>صنف المنتج :</span>
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
            {data?.map((item, idx) => (
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
  },
  {
    id: 2,
    name: "أجهزة الكمبيوتر",
  },
  {
    id: 3,
    name: "الهواتف الذكية",
  },
  {
    id: 4,
    name: "التلفزيونات",
  },
  {
    id: 5,
    name: "السماعات",
  },
  {
    id: 6,
    name: "اللوحات الإلكترونية",
  },
  {
    id: 7,
    name: "الأجهزة المنزلية",
  },
];

const data = [
  {
    trusted: false,
    img: "",
    alt: "",
    price: "330.00",
    title: "مواسير سملس جدول 40",
    offers: false,
    location: "القاهره / شارع الجمهورية",
    date: "منذ 1 ايام",
  },
  {
    trusted: true,
    img: "",
    alt: "",
    price: "330.00",
    title: "مواسير سملس جدول 40",
    offers: false,
    location: "القاهره / شارع الجمهورية",
    date: "منذ 1 ايام",
  },
  {
    trusted: true,
    img: "",
    alt: "",
    price: "330.00",
    title: "مواسير سملس جدول 40",
    offers: true,
    location: "القاهره / شارع الجمهورية",
    date: "منذ 1 ايام",
  },
  {
    trusted: true,
    img: "",
    alt: "",
    price: "330.00",
    title: "مواسير سملس جدول 40",
    offers: true,
    location: "القاهره / شارع الجمهورية",
    date: "منذ 1 ايام",
  },
];
