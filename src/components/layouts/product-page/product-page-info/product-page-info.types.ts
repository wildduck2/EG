import { ProductType, ReqResponseType } from "../../home";

export interface ProductPreviewInfoProps
  extends Omit<React.HTMLProps<HTMLDivElement>, "data"> {
  data: ProductType;
}

export type GetProductHazards<T> = Awaited<T>;

export type getProductHazardsReq<T> = Promise<ReqResponseType<T>>;

export interface Tip {
  id: number;
  title: string;
}

export type TipsResponse = Tip[];
