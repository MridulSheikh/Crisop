"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Heart,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { VscHeartFilled } from "react-icons/vsc";
import { TProduct } from "@/types/user";
import DOMPurify from "dompurify";

export default function ProductDetailsClient({
  product,
}: {
  product: TProduct;
}) {
  const { name, description, category, images, stock, price, discountPrice } =
    product;

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const increment = () => {
    if (quantity < stock.quantity) setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const createMarkup = (htmlContent: string) => {
    return { __html: DOMPurify.sanitize(htmlContent) };
  };

  return (
    <div className="min-h-screen bg-background text-foreground mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* IMAGE SECTION */}
          <div className="space-y-4">
            <Carousel setApi={setApi}>
              <CarouselContent>
                {images.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-square rounded-lg border bg-muted overflow-hidden">
                      <Image
                        src={img.url}
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* thumbnails */}
            <div className="flex gap-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`h-14 w-14 rounded-md border overflow-hidden ${
                    current === index ? "border-green-600" : "border-border"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt=""
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* INFO SECTION */}
          <div className="space-y-6">
            {/* category */}
            <p className="text-sm text-muted-foreground uppercase tracking-widest">
              {category.name}
            </p>

            {/* title + favorite */}
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-semibold tracking-tight">{name}</h1>

              <button onClick={() => setIsFavorite(!isFavorite)}>
                {isFavorite ? (
                  <VscHeartFilled className="text-green-600 text-xl" />
                ) : (
                  <Heart className="text-muted-foreground text-xl" />
                )}
              </button>
            </div>

            {/* price + unit */}
            <div className="flex flex-col gap-1">
              {discountPrice && discountPrice < price ? (
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold">
                    ${discountPrice.toFixed(2)}
                  </span>
                  <span className="text-muted-foreground line-through">
                    ${price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold">${price.toFixed(2)}</span>
              )}

              {/* unit */}
              <span className="text-sm text-muted-foreground">
                Per {stock.unit}
              </span>
            </div>

            {/* stock status */}
            <div className="text-sm">
              {stock.quantity > 0 ? (
                <span className="text-green-600 font-medium">
                  In Stock ({stock.quantity} {stock.unit})
                </span>
              ) : (
                <span className="text-red-500 font-medium">Out of Stock</span>
              )}

              {/* low stock warning */}
              {stock.quantity > 0 && stock.quantity <= 5 && (
                <p className="text-yellow-600 text-xs mt-1">
                  Only {stock.quantity} left — order soon
                </p>
              )}
            </div>

            <div className="border-t" />

            {/* quantity + cart */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border rounded-md">
                <button
                  onClick={decrement}
                  className="px-3 py-2 disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  -
                </button>

                <input
                  value={quantity}
                  readOnly
                  className="w-10 text-center bg-transparent"
                />

                <button
                  onClick={increment}
                  className="px-3 py-2 disabled:opacity-50"
                  disabled={quantity >= stock.quantity}
                >
                  +
                </button>
              </div>

              <Button
                disabled={stock.quantity === 0}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50"
              >
                <ShoppingCart className="mr-2" size={18} />
                {stock.quantity === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
            </div>

            <div className="border-t" />

            {/* trust */}
            <div className="grid grid-cols-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Truck size={16} /> Free Shipping
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} /> Warranty
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw size={16} /> Return
              </div>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-16 space-y-4">
          <h2 className="text-xl font-semibold">Product Details</h2>

          <div
            className="prose prose-sm max-w-none text-muted-foreground"
            dangerouslySetInnerHTML={createMarkup(description as string)}
          />
        </div>
      </div>
    </div>
  );
}
