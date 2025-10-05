import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";

interface QuantityCountProps {
  initial?: number; // optional starting value
  min?: number; // optional min value (default: 1)
  onChange?: (value: number) => void; // callback when quantity changes
}

const QuantityCount: React.FC<QuantityCountProps> = ({
  initial = 1,
  min = 1,
  onChange,
}) => {
  const [count, setCount] = useState<number>(initial);

  const handleDecrement = () => {
    setCount((prev) => {
      const newValue = prev > min ? prev - 1 : min;
      return newValue;
    });
  };

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  // Notify parent whenever count changes
  useEffect(() => {
    if (onChange) onChange(count);
  }, [count, onChange]);

  return (
    <div className="border border-neutral-300 py-2 px-3 rounded-xl flex justify-between items-center gap-2 w-30 h-10">
      <Minus
        width={20}
        height={20}
        onClick={handleDecrement}
        className="cursor-pointer"
      />
      <h3 className="text-lg font-bold">{count}</h3>
      <Plus
        width={20}
        height={20}
        onClick={handleIncrement}
        className="cursor-pointer"
      />
    </div>
  );
};

export default QuantityCount;
