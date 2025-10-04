import { AxiosError } from "axios";
import api from "./api.service";
import { ApiResponse } from "@/types/Api.type";
import { Product, ProductListResponse } from "@/types/Product";

export async function getProducts(
  page: number = 1,
  limit: number = 10,
  categoryId?: string,
  minPrice?: number,
  maxPrice?: number,
  sort: "--" | "newest" | "price" | "rating" | "popular" = "newest",
  order: "asc" | "desc" = "desc"
): Promise<ProductListResponse> {
  try {
    const params: Record<string, string | number> = { page, limit, sort, order };
    if (categoryId) params.categoryId = categoryId;
    if (minPrice !== undefined) params.minPrice = minPrice;
    if (maxPrice !== undefined) params.maxPrice = maxPrice;

    const { data } = await api.get<ApiResponse<ProductListResponse>>("/products", {
      params,
    });


    return data.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        (error.response?.data as { message?: string })?.message ||
          "Failed to fetch products"
      );
    }
    throw error;
  }
}


export async function getProductById(id: number): Promise<Product> {
  try {
    const { data } = await api.get<ApiResponse<Product>>(`/products/${id}`);
    return data.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        (error.response?.data as { message?: string })?.message ||
          "Failed to fetch product"
      );
    }
    throw error;
  }
}