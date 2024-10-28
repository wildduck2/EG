import axios from "axios";

export async function get_filter_data() {
  try {
    // Define multiple fetch requests
    const fetches = [
      axios.get(process.env.BACKEND__BASE_URL + "/client/governorates"),
      axios.get(process.env.BACKEND__BASE_URL + "/client/regions"),
      axios.get(process.env.BACKEND__BASE_URL + "/client/categories"),
      axios.get(process.env.BACKEND__BASE_URL + "/client/subcategories/-1"),
      axios.get(process.env.BACKEND__BASE_URL + "/client/brand-countries/-1"),
      axios.get(process.env.BACKEND__BASE_URL + "/client/third-branches/-1"),
    ];

    // Use Promise.all to wait for all fetches to complete
    const responses = await Promise.all(fetches);

    // Parse each response as JSON
    const data = await Promise.all(
      responses.map((response) => response.data.data),
    );

    const filteredData: FilteredData = {
      governorates: data[0],
      regions: data[1],
      categories: data[2],
      subcategories: data[3],
      brand_countries: data[4],
      third_branches: data[5],
    };

    // console.log(data);

    return filteredData;
  } catch (error) {
    console.error("Error fetching filter data:", error);
    return null;
  }
}

export interface FilteredData {
  governorates: Governorate[];
  regions: City[];
  categories: Category[];
  subcategories: Subcategory[];
  brand_countries: City[];
  third_branches: City[];
}

export interface Governorate {
  id: number;
  name: string;
  name_en: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface City {
  id: number;
  name: string;
  name_en: string;
  governorate_id: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
  governorate?: Governorate;
}

export interface Category {
  id: number;
  name: string;
  name_en: string;
  description: string;
  image: string;
  notes: string | null;
  multi_feature_hd_id: number;
  title_price: string;
  created_at: string;
  updated_at: string;
}

export interface Subcategory {
  id: number;
  name: string;
  name_en: string;
  description: string;
  image: string;
  category_id: number;
  notes: string | null;
  title_price: string;
  created_at: string;
  updated_at: string;
}

export interface Brand {
  id: number;
  name: string;
  name_en: string;
  subcategory_id: number;
  image: string;
  notes: string | null;
}

export interface ThirdBranch {
  id: number;
  name: string;
  name_en: string;
  category_id: number;
  subcategory_id: number;
  brandcountry_id: number;
  notes: string | null;
  image: string;
  created_at: string;
  updated_at: string;
}
