import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import QuantityCount from "../../components/QuantityCount";

// Define Props
interface CartItemProps {
  storeName: string;
  storeIcon?: string;
  productName: string;
  productCategory: string;
  productImage: string;
  price: number;
  productQty: number;
  checked?: boolean; // ✅ controlled check state
  onCheck?: (checked: boolean) => void; // ✅ notify parent
  onRemove?: () => void;
  onQuantityChange?: (qty: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  storeName,
  storeIcon = "/icons/Store.svg",
  productName,
  productCategory,
  productImage,
  price,
  productQty,
  checked = false,
  onCheck,
  onRemove,
  onQuantityChange,
}) => {
  return (
    <div className="border border-neutral-300 rounded-xl p-4 mb-4 md:mb-6">
      {/* Store Section */}
      <div className="flex items-center gap-3 mb-4">
        <Checkbox />
        <Image
          src={storeIcon}
          alt={storeName}
          width={20}
          height={20}
          className="object-cover"
          unoptimized
        />
        <h3 className="text-sm md:text-md">{storeName}</h3>
      </div>

      {/* Product Section */}
      <div className="flex items-start gap-3">
        <Checkbox
          checked={checked}
          onCheckedChange={(val) => onCheck?.(!!val)}
        />
        <div className="flex flex-col md:flex-row md:justify-between w-full">
          <div className="flex items-center gap-2">
            <Image
              src={productImage}
              alt={productName}
              width={50}
              height={50}
              className="object-cover rounded"
              unoptimized
            />
            <div>
              <h4 className="text-sm md:text-lg font-bold">{productName}</h4>
              <p className="text-xs md:text-md">{productCategory}</p>
            </div>
          </div>

          <div className="flex md:flex-col justify-between items-center md:items-end gap-3">
            <h4 className="text-sm md:text-lg font-bold">
              Rp{price.toLocaleString("id-ID")}
            </h4>
            <div className="flex items-center gap-4">
              <Trash2
                className="text-neutral-600 cursor-pointer"
                width={18}
                onClick={onRemove}
              />
              <QuantityCount onChange={onQuantityChange} initial={productQty} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
