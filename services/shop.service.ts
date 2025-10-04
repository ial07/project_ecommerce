import { ApiResponse } from "@/types/Api.type";
import { ShopProductsResponse } from "@/types/Shop.type";
import api from "./api.service";
import { AxiosError } from "axios";

export async function getShopProductBySlug(
    page: number = 1,
    limit: number = 10,
    slug: string
): Promise<ShopProductsResponse> {
  try {
    
    const params: Record<string, string | number> = { page, limit };
    const { data } = await api.get<ApiResponse<ShopProductsResponse>>(`/stores/slug/${slug}`, {
      params,
    });
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