"use client";
import { TProduct } from "@/types/user";
import { getDiscountPercentage } from "@/utils/getDiscountPercentage";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { handleAddToCartUtil } from "@/utils/cart/handleAddToCart";

const ProductCard = ({ product }: { product: TProduct }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const discoutnPercentage = getDiscountPercentage(
    product?.price,
    product?.discountPrice as number,
  );
  const handleAddToCart = async () => {
    await handleAddToCartUtil({
      product,
      quantity: 1,
      cartItems,
      dispatch,
    });
  };
  return (
    <div className="group rounded-md border border-gray-200 bg-white hover:shadow-[0px_4px_41px_6px_rgba(0,_0,_0,_0.1)] transition-all duration-500 overflow-hidden">
      <div className="relative overflow-hidden">
        {discoutnPercentage != 0 && (
          <div className="bg-red-600 inline p-0.5 absolute top-0 left-0 text-white text-sm z-10">
            -
            {getDiscountPercentage(
              product?.price,
              product?.discountPrice as number,
            )}
            %
          </div>
        )}

        <Link href={`/shop/${product?._id}`}>
          <div className=" h-56 w-full relative overflow-hidden">
            <Image
              src={product?.images[0]?.url}
              alt={product?.name}
              fill
              className="object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-in-out"
            />
          </div>
        </Link>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {/* TITLE (ALWAYS VISIBLE) */}
        <div className="text-center ">
          <h1 className="text-md font-semibold">{product?.name}</h1>

          <h2 className="mt-3 text-sm group-hover:hidden">
            <span className="line-through text-gray-500">
              ${product?.price}
            </span>{" "}
            <span className="font-bold">${product?.discountPrice}</span> (Per{" "}
            {product?.stock.unit})
          </h2>
        </div>

        {/* ACTION BUTTONS (smooth hover reveal only) */}
        <div className="flex justify-center space-x-3 mt-5 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
          <button className="size-10 flex justify-center items-center rounded-full bg-slate-200 hover:bg-green-700 hover:text-white transition">
            <Heart className="size-5" />
          </button>

          <button
            onClick={handleAddToCart}
            disabled={product.stock.quantity === 0}
            className="size-10 flex justify-center items-center rounded-full bg-slate-200 hover:bg-green-700 hover:text-white transition"
          >
            <ShoppingCart className="size-5" />
          </button>

          <Link href={`/shop/${product?._id}`}>
            <button className="size-10 flex justify-center items-center rounded-full bg-slate-200 hover:bg-green-700 hover:text-white transition">
              <Eye className="size-5" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
