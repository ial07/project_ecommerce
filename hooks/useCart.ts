import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/services/cart.service";
import { Cart } from "@/types/Cart.type";

export function useCart() {
  return useQuery<Cart, Error>({
    queryKey: ["cart"],
    queryFn: getCart,
  });
}