import { Pagination } from "./Api.type";
import { Product } from "./Product";

export interface Shop {
  id: number;
  name: string;
  slug?: string;
  logo?: string | null;
  address?:string;
  isActive?:boolean
}

export interface ShopProductsResponse {
  shop:Shop,
  products: Product[];
  pagination: Pagination;
}