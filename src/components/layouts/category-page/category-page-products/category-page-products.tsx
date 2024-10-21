import { useTranslation } from "react-i18next";
import { AdItemCard } from "../../home";

export const CategoryPageProducts = ({}) => {
  const { t, i18n } = useTranslation();
  const products = t("products");

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 my-4">
      {products?.map((item, idx) => (
        <div className="" key={idx}>
          <AdItemCard {...item} />
        </div>
      ))}
    </div>
  );
};
