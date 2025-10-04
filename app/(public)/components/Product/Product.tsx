"use client";

import React from "react";
import Image from "next/image";

type ProductProps = {
  title?: string;
  price?: number;
  rating?: number;
  qtySold?: number;
  isVerified?: boolean;
  MarketName?: string;
  productImg: string;
};

const Product: React.FC<ProductProps> = ({
  title,
  rating,
  MarketName,
  isVerified,
  price,
  qtySold,
  productImg,
}) => {
  return (
    <div className="card bg-white shadow-md rounded-xl cursor-pointer">
      <div className="h-43 md:h-71 w-full relative">
        <Image
          src={productImg}
          alt="product"
          className="h-full w-full bg-cover"
          width={300}
          height={300}
          unoptimized
        />
      </div>
      <div className="p-3">
        <p className="text-sm md:text-md mb-2 overflow-hidden text-ellipsis line-clamp-2 h-10">
          {title}
        </p>
        <p className="text-sm md:text-md font-bold mb-2">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
          }).format(price ?? 0)}
        </p>

        <div className="text-sm flex items-center gap-1 mb-2">
          <Image
            src="/icons/Star.svg"
            alt="svg"
            className="w-4"
            width={20}
            height={20}
          />
          {rating == 0 ? (
            "No rating yet"
          ) : (
            <>
              <span>{rating} - </span>
              <span>{qtySold !== 0 ? qtySold + " Sold" : ""} </span>
            </>
          )}
        </div>

        {MarketName && (
          <div className="flex items-center text-sm gap-1">
            {isVerified && (
              <Image
                src="/icons/Verify.svg"
                alt="svg"
                className="w-5"
                width={20}
                height={20}
              />
            )}
            <span>{MarketName}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
