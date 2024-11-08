import { AdItemCard, ProductType } from "../../home";

export const CategoryPageProducts = ({ data }: { data: ProductType[] }) => {
  console.log(data);
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 my-4">
      {data?.map((item, idx) =>
        item?.random_ad?.id ? (
          <>
            <div className="" key={idx}>
              <AdItemCard {...(item as any)} />
            </div>
            <div className="col-span-2" key={idx}>
              <a href={item?.random_ad?.link} target="_blank">
                <img
                  src={
                    "https://admin.goods.eg/uploads/" + item?.random_ad.image
                  }
                  className="h-[240px] w-full rounded-lg mt-[.8rem]"
                  alt="map"
                />
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="" key={idx}>
              <AdItemCard {...(item as any)} />
            </div>
          </>
        ),
      )}
    </div>
  );
};
