"use client";
import Container from "@/components/ui/layout/container/Container";
import { useAppSelector } from "@/redux/hooks";
import React from "react";
import WishListCard from "./WishListCard";

const WishlistPage = () => {
  const wishlistItems = useAppSelector((state) => state.wishlist.products);

  return (
    <div>
      <Container>
        <div>
          <h1 className=" text-2xl font-bold">
            Wishlist ({wishlistItems.length})
          </h1>
          {wishlistItems.length === 0 ? (
            <div className=" py-36 w-full flex justify-center items-center">
              <div className=" p-6 rounded-lg text-center text-gray-500">
                Your wishlist is empty ❤️
              </div>
            </div>
          ) : (
            <div className=" mt-10 grid md:grid-cols-2 xl:grid-cols-4 gap-5">
              {wishlistItems.map((dt: string) => (
                <WishListCard id={dt} key={dt} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default WishlistPage;
