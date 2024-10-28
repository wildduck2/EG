export interface Governorate {
  id: number;
  name: string;
  notes: string | null;
}

export interface Region {
  id: number;
  name: string;
  governorate_id: number;
  notes: string | null;
}

export interface User {
  id: number;
  name: string;
  name_company: string;
  phone_number: string;
  phone_verified_at: string;
  email: string | null;
  verify: number;
  is_trader: number;
  image: string | null;
}

export interface Image {
  id: number;
  image_path: string;
}

export interface Category {
  id: number;
  name: string;
  name_en: string;
  description: string;
  image: string;
}

export interface Subcategory {
  id: number;
  name: string;
  name_en: string;
  description: string;
  image: string;
}

export interface BrandCountry {
  id: number;
  subcategory_id: number;
  name: string;
  name_en: string;
  notes: string | null;
}

export interface ProductType {
  id: number;
  name: string;
  image?: string; // Assuming image might be optional or inferred from brand
  status: string;
  is_featured: number;
  longitude: string;
  latitude: string;
  address: string | null;
  description: string;
  price: string;
  negotiable: number;
  gov_id: number;
  region_id: number;
  governorate: Governorate;
  region: Region;
  user: User;
  brand_id: number;
  brand_image: string;
  age: string;
  wishlist: boolean;
  created_at: string;
  updated_at: string;
  images: Image[]; // Array of images
  category: Category; // Category details
  subcategory: Subcategory; // Subcategory details
  brandcountry?: BrandCountry; // Optional brand country info
  multi_features?: any[]; // Empty array, can update based on actual use
}

export interface AddItemCardProps extends ProductType {}
