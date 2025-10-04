import { getProducts } from "@/services/product.service";
import { ProductListResponse } from "@/types/Product";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useProducts(
  page: number = 1,
  limit: number = 10,
  categoryId?: string,
  minPrice?: number,
  maxPrice?: number,
  sort: "--" | "newest" | "price" | "rating" | "popular" = "newest",
  order: "asc" | "desc" = "desc"
) {
  return useQuery<ProductListResponse, Error>({
    queryKey: ["products", page, limit, categoryId, minPrice, maxPrice, sort, order],
    queryFn: () => getProducts(page, limit, categoryId, minPrice, maxPrice, sort, order),
    placeholderData: keepPreviousData,
  });
}