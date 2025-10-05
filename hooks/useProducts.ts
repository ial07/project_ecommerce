import { getProductById, getProducts } from "@/services/product.service";
import { Product, ProductListResponse } from "@/types/Product";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useProducts(
  page: number = 1,
  limit: number = 10,
  categoryId?: number,
  minPrice?: number | null,
  maxPrice?: number | null,
  sort: "--" | "newest" | "price" | "rating" | "popular" = "newest",
  order: "asc" | "desc" = "desc"
) {
  return useQuery<ProductListResponse, Error>({
    queryKey: ["products", page, limit, categoryId, minPrice, maxPrice, sort, order],
    queryFn: () => getProducts(page, limit, categoryId, minPrice, maxPrice, sort, order),
    placeholderData: keepPreviousData,
  });
}


export function useProductById(id: number) {
  return useQuery<Product, Error>({
    queryKey: ["product", id], // unique cache key
    queryFn: () => getProductById(id),
    enabled: !!id, // only run if id is not empty
  });
}