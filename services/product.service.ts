import { AxiosError } from "axios";
import api from "./api.service";
import { ApiResponse } from "@/types/Api.type";
import { Product, ProductListResponse } from "@/types/Product";
import { SortType } from "@/types/Sort.type";

export async function getProducts(
  page: number = 1,
  limit: number = 10,
  categoryId?: number,
  minPrice?: number | null,
  maxPrice?: number | null,
  sort: SortType = "newest",
  order: "asc" | "desc" = "desc"
): Promise<ProductListResponse> {
  try {
    const params: Record<string, string | number|undefined> = { page, limit, sort, order };
    if (categoryId) params.categoryId = categoryId;
    if (minPrice !== null) params.minPrice = minPrice;
    if (maxPrice !== null) params.maxPrice = maxPrice;

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