import { Bg } from "@/assets";
import React from "react";
import { CategoryItemType } from "./category-swiper-card.types";
import { Link } from "@tanstack/react-router";

export const CategorySwiperItem: React.FC<CategoryItemType> = ({
  id,
  name,
  image,
  notes,
  name_en,
  created_at,
  updated_at,
  description,
  title_price,
  multi_feature_hd_id,
}) => {
  return (
    <Link className="flex flex-col justify-center items-center h-40 w-full rounded-lg">
      <div className="relative rounded-full w-[120px] h-[100px] flex justify-center items-center group">
        <img
          src={process.env.BACKEND__BASE_UPLOAD_URL + "/" + image}
          alt={name}
          className="rounded full w-[90px]"
        />
        <img
          src={Bg}
          alt={"animation image for " + name}
          className="absolute z-[-1] w-[120px] scale-0 transition-transform duration-200 ease-in-out group-hover:scale-[1.5]"
        />
      </div>
      <h4 className="text-center mt-0 font-semibold text-sm transition-colors duration-300 ease-in-out group-hover:text-[#ffc223]">
        {name}
      </h4>
    </Link>
  );
};

CategorySwiperItem.displayName = "CategorySwiperItem";
