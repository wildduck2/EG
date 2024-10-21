import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  ScrollArea,
  Toggle,
} from "@/components/ui";
import { AlertDialogCustom } from "@/components/ui/duckui/alert";
import { ArrowDown01, Home } from "lucide-react";
import { useTranslation } from "react-i18next";

export const CategoryPageFilter = () => {
  const { t, i18n } = useTranslation();
  const products = t("products");

  return (
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
  );
};

export const categoryData = [
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
