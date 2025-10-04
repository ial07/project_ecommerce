"use client";

import React from "react";
import { Product as ProductType } from "@/types/Product";
import { useProducts } from "@/hooks/useProducts";
import { notFound } from "next/navigation";
import Image from "next/image";
import ImageDetail from "../components/ImageDetail";
import { Button } from "@/components/ui/button";
import QuantityCount from "../components/QuantityCount";
import { Plus } from "lucide-react";
import ProductStore from "../components/ProductStore";
import ProductRating from "../components/ProductRating";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import Product from "../../../components/Product";
import { useProductById } from "@/hooks/useProductById";

interface ProductDetailProps {
  params: Promise<{ slug: string; id: number }>;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ params }) => {
  const { id, slug } = React.use(params); // unwrap params

  const { data: product, isLoading } = useProductById(id);
  const { data: productList, isLoading: isLoadingProducts } = useProducts(1, 4);
  const products = productList?.products ?? [];

  if (isLoading) return <div>Loading...</div>;

  if (!product) return notFound();

  return (
    <section className="px-4 md:px-30 py-7">
      <div className="flex items-center font-semibold gap-2 text-xs md:text-md mb-3 md:mb-6">
        <span>Home</span>
        <span>&gt;</span>
        <span>Detail</span>
        <span>&gt;</span>
        <span className="overflow-hidden text-ellipsis line-clamp-1 font-normal">
          {product.title}
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:gap-7">
        <ImageDetail images={product.images} />

        <div className="py-4 md:pb-5 w-full">
          <h3 className="text-md md:text-xl text-ellipsis">{product.title}</h3>
          <div className="py-2">
            <span className="inline md:hidden text-xl font-bold">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              }).format(product.price ?? 0)}
            </span>
            <span className="hidden md:inline display-md font-bold">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              }).format(product.price ?? 0)}
            </span>
          </div>
          <div className="text-sm flex items-center gap-1 mb-2">
            <Image
              src="/icons/Star.svg"
              alt="svg"
              className="w-4"
              width={20}
              height={20}
            />
            {product.rating == 0 ? (
              "No rating yet"
            ) : (
              <>
                <span>{product.rating} - </span>
                <span>
                  {product.stock !== 0 ? product.stock + " Sold" : ""}{" "}
                </span>
              </>
            )}
          </div>

          <hr className="border border-neutral-300 my-4" />

          <div>
            <h3 className="text-md md:text-lg mb-2">Deskripsi</h3>
            <p className="text-sm md:text-md">{product.title}</p>
          </div>

          <hr className="border border-neutral-300 my-4" />

          <ProductStore productShop={product.shop} />

          <hr className="border border-neutral-300 my-4" />

          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm md:text-md">Quantity</span>

            <QuantityCount />
          </div>
          <Button className="w-full md:w-80">
            <Plus />
            <span>Add to Cart</span>
          </Button>
        </div>
      </div>

      <hr className="border border-neutral-300 my-4" />

      <h1 className="font-bold mb-4">
        <span className="md:hidden display-xs">Products Review</span>
        <span className="hidden md:inline display-md">Products Review</span>
      </h1>

      <div className="flex items-center gap-2">
        <Image
          src="/icons/Star.svg"
          alt="svg"
          className="w-4"
          width={30}
          height={30}
        />
        {product.rating == 0 ? (
          <span className="text-xl">No rating yet</span>
        ) : (
          <>
            <h1 className="font-bold">
              <span className="hidden md:inline display-xs">
                {product.rating}
                <span className="font-normal">/5.0</span>
              </span>
              <span className="inline md:hidden text-xl">
                {product.rating}
                <span className="font-normal">/5.0</span>
              </span>
            </h1>
          </>
        )}
      </div>

      <ProductRating />

      <div className="flex justify-center">
        <Button variant={"outline"} size={"sm"} className="w-60 cursor-pointer">
          Load More
        </Button>
      </div>

      <hr className="border border-neutral-300 my-4" />

      <h1 className="font-bold mb-4">
        <span className="md:hidden display-md">Products Review</span>
        <span className="hidden md:inline display-xs">Products Review</span>
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-4 md:mb-10">
        {isLoadingProducts ? (
          <>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-100 w-full rounded-lg" />
            ))}
          </>
        ) : (
          products.map((p: ProductType) => (
            <Link key={p.id} href={`/detail/${p.slug}/${p.id}`} passHref>
              <Product
                key={p.id}
                productImg={p.images[0]}
                title={p.title}
                price={p.price}
                rating={p.rating}
                qtySold={p.soldCount}
                isVerified={true}
                MarketName={p.shop.name}
              />
            </Link>
          ))
        )}
      </div>
    </section>
  );
};

export default ProductDetail;
