import { AdItemCard, ProductType } from "../../home";

export const CategoryPageProducts = ({ data }: { data: ProductType[] }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 my-4">
      {data?.map((item, idx) => (
        <div className="" key={idx}>
          <AdItemCard {...(item as any)} />
        </div>
      ))}
    </div>
  );
};
