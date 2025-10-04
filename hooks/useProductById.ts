import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/services/product.service";
import { Product } from "@/types/Product";

export function useProductById(id: number) {
  return useQuery<Product, Error>({
    queryKey: ["product", id], // unique cache key
    queryFn: () => getProductById(id),
    enabled: !!id, // only run if id is not empty
  });
}
