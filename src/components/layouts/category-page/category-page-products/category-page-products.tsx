import { useTranslation } from "react-i18next";
import { AdItemCard, ProductType } from "../../home";

export const CategoryPageProducts = ({ data }: { data: ProductType[] }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 my-4">
      {data?.map((item, idx) => (
        <div className="" key={idx}>
          <AdItemCard {...item} />
        </div>
      ))}
    </div>
  );
};
