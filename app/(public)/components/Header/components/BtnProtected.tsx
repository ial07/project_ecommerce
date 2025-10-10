import { Skeleton } from "@/components/ui/skeleton";
import { getValidImage } from "@/lib/getValidImage";
import { useAuth } from "@/providers/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BtnProtected = () => {
  const { user, loading } = useAuth();
  return (
    <>
      {loading ? (
        // Skeleton placeholder while loading
        <div className="grid grid-cols-2 md:flex items-center gap-3">
          <Skeleton className="h-10 w-24 rounded" />
          <Skeleton className="h-10 w-24 rounded" />
        </div>
      ) : (
        user != null && (
          <div className="grid grid-cols-2 md:flex items-center gap-3">
            <Link
              href={user.shop ? "/seller/dashboard" : `/open-store`}
              passHref
              className="rounded-full border py-2 px-3 flex items-center gap-2 cursor-pointer hover:bg-neutral-50"
            >
              <div className="relative w-5 h-5">
                <Image
                  src={
                    user.shop
                      ? getValidImage(user.shop.logo!)
                      : `/icons/Store.svg`
                  }
                  fill
                  alt="Store"
                  unoptimized
                />
              </div>
              <span className="text-sm font-bold">
                {user.shop ? user.shop.name : "Open Store"}
              </span>
            </Link>
            <Link
              href="/order"
              passHref
              className="rounded-full border py-2 px-3 flex items-center gap-2 cursor-pointer hover:bg-neutral-50"
            >
              <div className="relative w-5 h-5">
                <Image
                  src={getValidImage(user.avatarUrl)}
                  fill
                  alt="Store"
                  unoptimized
                  className="rounded-full"
                />
              </div>
              <span className="text-sm font-bold">{user.name}</span>
            </Link>
          </div>
        )
      )}
    </>
  );
};

export default BtnProtected;
