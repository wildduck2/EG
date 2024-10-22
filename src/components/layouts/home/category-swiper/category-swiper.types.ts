export type ReqResponseType<T> = {
  success: boolean;
  data: T;
};

export type GetCategories<T> = Awaited<T[]>;

export type GetCategoriesReq<T> = Promise<ReqResponseType<T>>;
