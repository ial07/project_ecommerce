import React from "react";
import { ArrowLeft } from "lucide-react";
import SellerProductForm from "./components";

const FormProductSeller: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-190 rounded-xl p-5 bg-white shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <ArrowLeft width={20} className="cursor-pointer" />
          <h1 className="font-bold">
            <span className="inline md:hidden text-xl">Add product</span>
            <span className="hidden md:inline display-xs">Add Product</span>
          </h1>
        </div>

        <SellerProductForm />
      </div>
    </div>
  );
};

export default FormProductSeller;
