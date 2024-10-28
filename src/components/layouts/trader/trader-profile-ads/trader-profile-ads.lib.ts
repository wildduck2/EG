// @ts-nocheck
export async function get_trader_ads({
  id,
}: GetCategoryPageAdsType): Promise<ProductType[] | null> {
  try {
    const { data: res_data } = await axios.post<
      Awaited<GetCategoryPageAdsRes<ProductType[]>>
    >(
      process.env.BACKEND__BASE_URL + "/client/ads/getAdsByParameters",
      {
        categoryId: 38,
        // "subCategoryId": 3,
        // "brandCountryId": 3,
        // "thirdBranchId": 3,
        page: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (res_data.success && res_data.data) {
      return res_data.data;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
