"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Heart, ShoppingCart } from "lucide-react";
import { VscHeartFilled } from "react-icons/vsc";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const product = {
  id: "p1",
  name: "Wireless Headphones",
  description:
    "These low-profile headphones are your perfect casual wear companion. Featuring a durable rubber outer shell, they'll withstand everything the weather can offer.",
  category: "Electronics",
  images: [
    "/img/product.png",
    "/img/product.png",
    "/img/product.png",
  ],
  stock: 15,
  regularPrice: 120,
  discountPrice: 90,
};

export default function ProductDetailsPage() {
  const {
    name,
    description,
    category,
    images,
    stock,
    regularPrice,
    discountPrice,
  } = product;

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const increment = () => {
    if (quantity < stock) setQuantity(quantity + 1);
  };
  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const toggleFavorite = () => setIsFavorite(!isFavorite);

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Carousel Section */}
          <div>
            <Carousel className="w-full max-w-md mx-auto">
              <CarouselContent>
                {images.map((img, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={img}
                      alt={`Image ${index + 1}`}
                      className="rounded-xl border object-cover aspect-square w-full"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col justify-evenly">
            <div className="flex justify-between items-start">
              <CardHeader className="p-0">
                <CardTitle className="text-3xl font-bold">{name}</CardTitle>
              </CardHeader>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFavorite}
                aria-label="Add to favorites"
              >
                {isFavorite ? (
                  <VscHeartFilled className="text-red-500 text-xl" />
                ) : (
                  <Heart />
                )}
              </Button>
            </div>

            <p className="text-muted-foreground">{description}</p>

            <Separator />

            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-semibold">Category:</span> {category}
              </p>
              <p>
                <span className="font-semibold">Stock:</span>{" "}
                {stock > 0 ? `${stock} available` : "Out of stock"}
              </p>
            </div>

            <div className="text-2xl font-semibold">
              {discountPrice < regularPrice ? (
                <>
                  <span className="text-red-600">
                    ${discountPrice.toFixed(2)}
                  </span>{" "}
                  <span className="line-through text-muted-foreground text-lg">
                    ${regularPrice.toFixed(2)}
                  </span>
                </>
              ) : (
                <span>${regularPrice.toFixed(2)}</span>
              )}
            </div>

            <div className=" flex gap-x-2 items-center">
              <div className="flex items-center space-x-4 max-w-xs">
                <Label htmlFor="quantity" className="font-medium">
                  Quantity
                </Label>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={decrement}
                    disabled={quantity <= 1}
                    className="px-3"
                  >
                    –
                  </Button>
                  <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    readOnly
                    className="w-16 text-center border-0 focus:ring-0"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={increment}
                    disabled={quantity >= stock}
                    className="px-3"
                  >
                    +
                  </Button>
                </div>
              </div>

              <Button disabled={stock === 0} className="w-full" size="lg">
                <ShoppingCart />
                {stock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
}
