"use client";

import Image from "next/image";
import React from "react";

import { Button } from "../button";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

const Banner = () => {
  return (
    <div className="relative overflow-hidden bg-[#f6f7f6] xl:min-h-screen flex items-center">
      {/* blur bg */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[120px]" />
      <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-emerald-400/20 rounded-full blur-[120px]" />

      <div className="max-w-screen-2xl mx-auto px-5 w-full relative z-10">
        {/* FLEX CONTAINER */}
        <div className="flex flex-row items-center py-16 2xl:py-0 2xl:min-h-screen gap-10">
          {/* LEFT CONTENT */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border text-sm text-green-700 font-medium">
              🥬 Fresh Grocery Delivery
            </div>

            <h1 className="text-4xl lg:text-7xl font-bold leading-tight text-gray-900">
              Fresh & Organic <br />
              <span className="text-[#106D42]">Grocery</span> at Your Door
            </h1>

            <p className="text-gray-600 text-sm lg:text-base">
              Get fresh vegetables, fruits, and daily essentials delivered fast <br className="hidden md:inline" />
              with premium quality guarantee.
            </p>

            <div className="flex gap-4 justify-center md:justify-start">
              <Link href={"/shop"}>
                <Button className="bg-[#106D42] hover:bg-[#0c5132]">
                  <ShoppingBag />
                  Shop Now
                </Button>
              </Link>

              <a href="/#contact">
                <Button variant="outline">Get in Touch</Button>
              </a>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex-1 relative w-full hidden md:block md:h-[400px] lg:h-screen">
            {/* glow */}
            <div className="absolute bottom-0 w-[400px] h-[400px] bg-green-400/20 blur-[100px] rounded-full" />

            <Image
              src="/img/hero_2.png"
              alt="hero"
              fill
              className="object-contain object-bottom lg:object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
