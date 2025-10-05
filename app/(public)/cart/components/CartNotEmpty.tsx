import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useDeleteCartItem } from "@/hooks/useCart";
import CartItem from "./CartItem";
import { Cart } from "@/types/Cart.type";

type CartNotEmptyProp = {
  cartData: Cart;
};

const CartNotEmpty: React.FC<CartNotEmptyProp> = ({ cartData }) => {
  const deleteCartItem = useDeleteCartItem();

  const [selected, setSelected] = useState<number[]>([]);

  const handleCheck = (id: number, checked: boolean) => {
    setSelected((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      if (cartData && cartData.items)
        setSelected(cartData?.items.map((item) => item.id));
    } else {
      setSelected([]);
    }
  };

  const totalItems = cartData?.items?.length ?? 0;

  const allSelected = totalItems > 0 && selected.length === totalItems;
  const isIndeterminate = selected.length > 0 && selected.length < totalItems;

  return (
    <div className="px-4 md:px-30 py-7">
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 p-4">
        <div className="w-full">
          <h1 className="font-bold mb-6">
            <span className="inline md:hidden display-xs">Cart</span>
            <span className="hidden md:inline display-md">Cart</span>
          </h1>

          <div className="flex items-center gap-3 mb-6">
            <Checkbox
              checked={
                allSelected ? true : isIndeterminate ? "indeterminate" : false
              }
              onCheckedChange={handleSelectAll}
            />
            <h3 className="text-sm md:text-md">Select All</h3>
          </div>

          {cartData?.items?.map((c, i) => (
            <CartItem
              storeName="The Store"
              productName={c.product.title}
              productCategory="Shoes"
              productImage={c.product.images[0]}
              price={c.priceSnapshot}
              productQty={c.qty}
              checked={selected.includes(c.id)}
              onCheck={(val) => handleCheck(c.id, val)}
              onRemove={() => console.log("Removed item")}
              onQuantityChange={(qty) => console.log("Quantity changed:", qty)}
              key={i}
            />
          ))}
        </div>

        <div className="w-full md:w-88 shadow-md p-5 rounded-xl h-fit">
          <h2 className="text-lg font-bold mb-3">Total Shopping</h2>
          <div className="flex items-center justify-between mb-3 text-md md:text-lg">
            <span>Total</span>
            <span className="font-bold">
              Rp{cartData?.grandTotal?.toLocaleString("id-ID")}
            </span>
          </div>
          <Button className="w-full" size={"sm"}>
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartNotEmpty;
