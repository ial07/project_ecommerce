import { CategoriesResponse } from "@/types/Category.type";
import { AxiosError } from "axios";
import api from "./api.service";
import { ApiResponse } from "@/types/Api.type";

// Get Categories
export async function GetCategories(
    page: number = 1,
  limit: number = 10,
): Promise<CategoriesResponse> {
 try {
     const params: Record<string, string | number> = { page, limit };
    const { data } = await api.get<ApiResponse<CategoriesResponse>>(`/categories`, {
      params,
    });
    return data.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        (error.response?.data as { message?: string })?.message ||
          "Get Categories Failed"
      );
    }
    throw error;
  }
}