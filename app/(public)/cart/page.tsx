"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import React from "react";

const Cart = () => {
  const { data: cartData, isLoading } = useCart();

  if (isLoading) return <div>Loading...</div>;

  const handleSelectAll = () => {};

  return (
    <section className="px-4 md:px-30 py-7">
      <div className="flex flex-col md:flex-row gap-6 md:gap-40 p-4">
        <div className="w-full">
          <h1 className="font-bold mb-6">
            <span className="inline md:hidden display-xs">Cart</span>
            <span className="hidden md:inline display-md">Cart</span>
          </h1>

          <div className="flex items-center gap-3 mb-6">
            <Checkbox onCheckedChange={handleSelectAll} />
            <h3 className="text-sm md:text-md">Select All</h3>
          </div>

          <div className="border border-neutral-300 rounded-xl">
            <div className="flex items-center gap-3">
              <Image
                src={"/icons/Store.svg"}
                alt={"/icons/Store.svg"}
                width={20}
                height={20}
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>

        <div className="w-full md:w-88 shadow-md p-5 rounded-xl">
          <h2 className="text-lg font-bold mb-3">Total Shopping</h2>
          <div className="flex items-center justify-between mb-3 text-md md:text-lg">
            <span>Total</span>
            <span>Rp.2750000</span>
          </div>
          <Button className="w-full" size={"sm"}>
            Checkout
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
