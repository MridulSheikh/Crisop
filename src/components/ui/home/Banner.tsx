"use client";

import Image from "next/image";
import React from "react";

import { Button } from "../button";


const Banner = () => {
  return (
    <div className="relative overflow-hidden bg-[#f6f7f6] min-h-[85vh] flex items-center">

      {/* 🌿 green blur background */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[120px]" />
      <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-emerald-400/20 rounded-full blur-[120px]" />

      <div className="max-w-screen-2xl mx-auto px-5 grid lg:grid-cols-12 items-center relative z-10">

        {/* LEFT CONTENT */}
        <div className="col-span-5 space-y-6">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border text-sm text-green-700 font-medium">
            🥬 Fresh Grocery Delivery
          </div>

          <h1 className="text-4xl lg:text-7xl font-bold leading-tight text-gray-900">
            Fresh & Organic <br />
            <span className="text-[#106D42]">Grocery</span> at Your Door
          </h1>

          <p className="text-gray-600 text-sm lg:text-base">
            Get fresh vegetables, fruits, and daily essentials delivered fast with premium quality guarantee.
          </p>

          <div className="flex gap-4">
            <Button className="bg-[#106D42] hover:bg-[#0c5132]">
              Shop Now
            </Button>
            <Button variant="outline">Explore</Button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="col-span-7 relative flex justify-center lg:justify-end">

          {/* floating glow behind image */}
          <div className="absolute w-[450px] h-[450px] bg-green-400/20 blur-[100px] rounded-full" />

          <Image
            src="/img/hero.png"
            alt="hero"
            width={700}
            height={700}
            className="object-contain relative z-10 lg:translate-y-10 scale-110 lg:scale-125"
          />
        </div>

      </div>
    </div>
  );
};

export default Banner;