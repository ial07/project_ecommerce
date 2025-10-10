import api from "./api.service";
import { ApiResponse } from "@/types/Api.type";
import { Shop } from "@/types/Shop.type";
import { AxiosError } from "axios";

export async function getSellerShop(): Promise<Shop> {
  try {
    const { data } = await api.get<ApiResponse<Shop>>("/seller/shop");
    return data.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        (error.response?.data as { message?: string })?.message ||
          "Failed to fetch Shop Profile"
      );
    }
    throw error;
  }
}

// Post Seller
export async function PostSellerActivate(
  name: string, 
  slug:string, 
  address?:string,
  logo:string = "https://img.freepik.com/premium-vector/shop-store-icon-vector-logo-template_917138-2081.jpg"
) {
 try {
    const { data } = await api.post<ApiResponse<Shop>>("/seller/activate", {
     name,
     slug,
     address,
     logo
    });
    return data.data;
  } catch (error: unknown) {
if (error instanceof AxiosError) {
      // Now you’ll actually see backend message
      
      throw new Error(
        (error.response?.data as { message?: string })?.message ||
          "Seller add failed"
      );
    }
    throw error;
  }
}

// Patch Seller
export async function PatchSellerShop(name: string, address: string,isActive:boolean ) {
 try {
    const { data } = await api.patch<ApiResponse<Shop>>(`/seller/shop`, {
     name,
     address,
     isActive
    });
    return data.data;
  } catch (error: unknown) {
if (error instanceof AxiosError) {
      // Now you’ll actually see backend message
      throw new Error(
        (error.response?.data as { message?: string })?.message ||
          "Seller editbody failed"
      );
    }
    throw error;
  }
}
