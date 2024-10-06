import { useEffect, useState } from "react";
import { AddContent } from "../AddContent";
import { SpecialOffersHead } from "../SpecialOffersHead";
import { data } from "@/constants";

export const SpecialOffers = () => {
  const [dataType, setDataType] = useState("special");

  const handleData = (data: unknown) => {
    {
      /* NOTE: You have to fix this */
    }

    setDataType(data as unknown as string);
  };

  const [dataFiltered, setDataFiltered] = useState([]);

  useEffect(() => {
    if (dataType === "special") {
      setDataFiltered([...data].filter((e) => e.offers));
    } else if (dataType === "lowPrice") {
      setDataFiltered(
        [...data].sort((a, b) => parseInt(a.price) - parseInt(b.price)),
      );
    } else if (dataType === "mostPrice") {
      setDataFiltered(
        [...data].sort((a, b) => parseInt(b.price) - parseInt(a.price)),
      );
    }
  }, [dataType]);

  return (
    <div className={`py-12 bg-[#F5F6F7]`}>
      <div className="px-8 mx-28">
        {/* NOTE: You have to fix this */}
        <SpecialOffersHead dataType={handleData} data="special" />

        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
          {dataFiltered?.map((e, i) => (
            <div className="" key={i}>
              <AddContent
                trusted={e.trusted}
                img={e.img}
                alt={e.alt}
                price={e.price}
                title={e.title}
                location={e.location}
                offers={e.offers}
                date={e.date}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
