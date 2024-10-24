export interface ApiResponse<T = any> {
  success: boolean;
  code: number;
  msg: string;
  data: T | null;
}

export interface ErrorDetail {
  [key: string]: string[];
}

export interface AdResponse {
  id: number;
  name: string;
  image?: string;
  status: string;
  isFeatured: boolean;
  longitude: number;
  latitude: number;
  address: string;
  description?: string;
  price?: number;
  negotiable?: boolean;
  govId?: number;
  regionId?: number;
  governorate?: Governorate;
  region?: Region;
  user?: User;
  brandId?: number;
  brandImage?: string;
  age?: number;
  wishlist: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Governorate {
  id: number;
  name: string;
  notes?: string;
}

export interface Region {
  id: number;
  name: string;
  governorateId: number;
  notes?: string;
}

export interface User {
  id: number;
  name: string;
  nameCompany?: string;
  phoneNumber?: string;
  phoneVerifiedAt?: string;
  email: string;
  verify: boolean;
  image?: string;
}
