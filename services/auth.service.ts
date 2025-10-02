import type { User } from "@/types/User.type";
import type { ApiResponse } from "@/types/Api.type";
import type { AuthResponse } from "@/types/Auth.type";
import api from "./api.service";
import { AxiosError } from "axios";

// login
export async function loginUser(email: string, password: string) {
 try {
    const { data } = await api.post<ApiResponse<AuthResponse>>("/auth/login", {
      email,
      password,
    });
    return data.data;
  } catch (error: unknown) {
if (error instanceof AxiosError) {
      // Now you’ll actually see backend message
      throw new Error(
        (error.response?.data as { message?: string })?.message ||
          "Login failed"
      );
    }
    throw error;
  }
}

// register
export async function registerUser(name: string, email: string, password: string) {
    try {
    const { data } = await api.post<ApiResponse<User>>("/auth/register", {
      name,
      email,
      password,
    });
    return data.data;
  } catch (error: unknown) {
     if (error instanceof AxiosError) {
      // Now you’ll actually see backend message
      throw new Error(
        (error.response?.data as { message?: string })?.message ||
          "Login failed"
      );
    }
    throw error;
  }
}
