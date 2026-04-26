"use client";

import React from "react";
import Image from "next/image";
import { useGetSingleProductQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/user";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toast } from "react-toastify";
import { toggleWishlist } from "@/redux/features/wishlist/wishListSlice";
import { handleAddToCartUtil } from "@/utils/cart/handleAddToCart";

const WishListCard = ({ id }: { id: string }) => {
  const { data, isLoading, isError } = useGetSingleProductQuery(id);
  const dispatch = useAppDispatch();

  // 🛒 Cart
  const cartItems = useAppSelector((state) => state.cart.items);

  // ❤️ Wishlist
  const wishlistItems = useAppSelector((state) => state.wishlist.products);
  const isWishlisted = wishlistItems.includes(id);

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (isError) {
    return <div className="p-4 text-red-500">Something went wrong</div>;
  }

  const product = data?.data as TProduct;

  const inStock = product?.stock.quantity > 0;

  // Add to cart
  const handleAddToCart = async () => {
    await handleAddToCartUtil({
      product,
      quantity: 1,
      cartItems,
      dispatch,
    });
  };

  // wishlist
  const handleToggleWishlist = async (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();

  const toastId = toast.loading("Updating wishlist...");

  try {
     dispatch(toggleWishlist(id));

    const message = isWishlisted
      ? "Removed from wishlist"
      : "Added to wishlist";

    toast.update(toastId, {
      render: message,
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    toast.update(toastId, {
      render: "Something went wrong!",
      type: "error",
      isLoading: false,
      autoClose: 2000,
    });
  }
};

  return (
    <div className="border rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition bg-white">
      {/* Product Image */}
      <div className="relative w-full h-48">
        <Image
          src={product?.images?.[0]?.url || "/placeholder.png"}
          alt={product?.name}
          fill
          className="object-cover"
        />

        {/* Stock Badge */}
        <span
          className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full text-white ${
            inStock ? "bg-green-600" : "bg-red-500"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h2 className="text-lg font-semibold line-clamp-1">{product?.name}</h2>

        {/* Table-like Info */}
        <div className="text-sm border rounded-lg divide-y">
          {/* Price */}
          <div className="flex justify-between p-2">
            <span className="text-gray-500">Price</span>
            <div className="flex gap-2">
              <span className="font-semibold text-green-600">
                ${product?.discountPrice || product?.price}
              </span>

              {product?.discountPrice && (
                <span className="line-through text-gray-400">
                  ${product?.price}
                </span>
              )}
            </div>
          </div>

          {/* Stock সংখ্যা */}
          <div className="flex justify-between p-2">
            <span className="text-gray-500">Stock</span>
            <span className="font-medium">{product?.stock.quantity}</span>
          </div>

          {/* Category (optional) */}
          {product?.category && (
            <div className="flex justify-between p-2">
              <span className="text-gray-500">Category</span>
              <span className="font-medium">{product?.category.name}</span>
            </div>
          )}
        </div>

        <div className=" flex items-center gap-x-5 mt-2 ">
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className={`w-full py-2 rounded-lg transition ${
              inStock
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            {inStock ? "Add to Cart" : "Out of Stock"}
          </button>
          <button
            onClick={handleToggleWishlist}
            className={`flex justify-center  py-2 items-center rounded-md px-3 transition ${
              isWishlisted
                ? "bg-red-500 text-white"
                : "bg-slate-200 hover:bg-green-700 hover:text-white"
            }`}
          >
            Removed
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishListCard;
