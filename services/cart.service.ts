import api from "./api.service";
import { ApiResponse } from "@/types/Api.type";
import { Cart } from "@/types/Cart.type";
import { AxiosError } from "axios";

export async function getCart(): Promise<Cart> {
  try {
    const { data } = await api.get<ApiResponse<Cart>>("/cart");
    return data.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        (error.response?.data as { message?: string })?.message ||
          "Failed to fetch cart"
      );
    }
    throw error;
  }
}