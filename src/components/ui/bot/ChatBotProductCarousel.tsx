"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Eye } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleWishlist } from "@/redux/features/wishlist/wishListSlice";
import { toast } from "react-toastify";
import { handleAddToCartUtil } from "@/utils/cart/handleAddToCart";

type Product = {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  stock?: {
    quantity: number;
  };
  images?: {
    url: string;
  }[];
};

type Props = {
  products: Product[];
};

export default function ProductCarousel({ products }: Props) {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector(
    (state) => state.wishlist.products
  );

  if (!products?.length) return null;

  return (
    <div className="w-full overflow-hidden">
      <Carousel opts={{ align: "start", loop: false }} className="w-full">
        <CarouselContent className="flex gap-3">
          {products.map((product) => {
            const isWishlisted = wishlistItems.includes(product._id);

            const handleAddToCart = async () => {
              await handleAddToCartUtil({
                product,
                quantity: 1,
                cartItems,
                dispatch,
              });
            };

            const handleToggleWishlist = (e: React.MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();

              dispatch(toggleWishlist(product._id));

              toast.success(
                isWishlisted
                  ? "Removed from wishlist"
                  : "Added to wishlist"
              );
            };

            return (
              <CarouselItem
                key={product._id}
                className="
                  basis-[85%]
                  sm:basis-1/2
                  lg:basis-1/3
                  xl:basis-3/4
                  shrink-0
                "
              >
                <div className="group w-full bg-white border rounded-xl shadow-sm overflow-hidden flex flex-col">

                  {/* IMAGE */}
                  <Link href={`/shop/${product._id}`}>
                    <div className="relative aspect-square w-full bg-slate-50 overflow-hidden">
                      <Image
                        src={product?.images?.[0]?.url || "/placeholder.png"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition"
                      />
                    </div>
                  </Link>

                  {/* BODY */}
                  <div className="p-3 flex flex-col flex-grow text-center">
                    <h3 className="text-sm font-semibold line-clamp-2">
                      {product.name}
                    </h3>

                    <p className="text-green-600 font-bold text-sm mt-1">
                      ৳{product.discountPrice || product.price}
                    </p>

                    

                    {/* ACTIONS */}
                    <div className="flex justify-center gap-3 mt-4  transition">
                      
                      {/* ❤️ Wishlist */}
                      <button
                        onClick={handleToggleWishlist}
                        className={`size-9 flex items-center justify-center rounded-full transition ${
                          isWishlisted
                            ? "bg-red-500 text-white"
                            : "bg-slate-200 hover:bg-green-600 hover:text-white"
                        }`}
                      >
                        <Heart
                          className="size-4"
                          fill={isWishlisted ? "currentColor" : "none"}
                        />
                      </button>

                      {/* 🛒 Cart */}
                      <button
                        onClick={handleAddToCart}
                        disabled={(product.stock?.quantity ?? 0) === 0}
                        className="size-9 flex items-center justify-center rounded-full bg-slate-200 hover:bg-green-600 hover:text-white transition disabled:opacity-50"
                      >
                        <ShoppingCart className="size-4" />
                      </button>

                      {/* 👁 View */}
                      <Link href={`/shop/${product._id}`}>
                        <button className="size-9 flex items-center justify-center rounded-full bg-slate-200 hover:bg-green-600 hover:text-white transition">
                          <Eye className="size-4" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2" />
        <CarouselNext className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2" />
      </Carousel>
    </div>
  );
}