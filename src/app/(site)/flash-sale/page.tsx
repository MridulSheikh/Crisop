"use client";
import ProductCard from "@/components/shared/card/ProductCard";
import React from "react";

const FlashSale = () => {
  return (
    <div className=" max-w-screen-xl px-5 mx-auto mt-10">
      <div className=" mt-10 text-[#2F2F2E]">
        <h2>Flash sale</h2>
      </div>
      <div className=" grid lg:grid-cols-4  gap-[29px] mt-[34px]">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default FlashSale;