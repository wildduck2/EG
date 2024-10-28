import { FilteredData } from "@/components/layouts";
import { atom } from "jotai";
export const phone_number = atom("");

const filter_data: FilteredData = {
  governorates: [],
  regions: [],
  categories: [],
  subcategories: [],
  brand_countries: [],
  third_branches: [],
};

export const filterData = atom(filter_data);
