import {
  CategoryPageFilter,
  CategoryPageProducts,
  CategoryPageWrapperSkeleton,
} from "@/components/layouts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Separator,
} from "@/components/ui";
import { useTranslation } from "react-i18next";

export const CategoryPageWrapper = () => {
  const { t, i18n } = useTranslation();
  const products = t("products");

  return <CategoryPageWrapperSkeleton />;

  return (
    <section className="flex gap-8 items-start my-8 min-h-[63vh]">
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-3xl font-semibold">{t("categoriesname")}</h2>
        <Separator className="px-2" />
        <div className="flex items-center justify-between">
          <CategoryPageFilter />

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

        <CategoryPageProducts />
      </div>
    </section>
  );
};

// {
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
// }
