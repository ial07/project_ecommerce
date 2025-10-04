import Image from "next/image";
import React, { useState } from "react";

const QuantityCount: React.FC = () => {
  const [count, setCount] = useState<number>(1);

  const handleDecrement = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : 1)); // ✅ never less than 1
  };

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div className="border border-neutral-300 py-2 px-3 rounded-xl flex justify-between gap-2 w-30">
      <Image
        src="/icons/DecreaseQty.svg"
        width={20}
        height={20}
        alt="descreaseQty"
        onClick={handleDecrement}
        className="cursor-pointer"
      />
      <h3 className="text-lg font-bold">{count}</h3>
      <Image
        src="/icons/IncreaseQty.svg"
        width={20}
        height={20}
        alt="inscreaseQty"
        onClick={handleIncrement}
        className="cursor-pointer"
      />
    </div>
  );
};

export default QuantityCount;
