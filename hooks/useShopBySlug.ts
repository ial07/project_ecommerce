
import { getShopProductBySlug } from "@/services/shop.service";
import { ShopProductsResponse } from "@/types/Shop.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useShopBySlug(
  page: number = 1,
  limit: number = 10,
  slug: string,
) {
  return useQuery<ShopProductsResponse, Error>({
    queryKey: ["Shop", page, limit, slug],
    queryFn: () => getShopProductBySlug(page, limit, slug),
    placeholderData: keepPreviousData,
  });
}