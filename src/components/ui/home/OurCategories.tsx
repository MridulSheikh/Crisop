"use client";

import Image from "next/image";
import React from "react";

const categories = [
  {
    name: "Vegetables",
    img: "/img/vagitable_category.png",
    large: true,
  },
  {
    name: "Meat",
    img: "/img/meat_category.png",
  },
  {
    name: "Fruits",
    img: "/img/fruits_category.png",
  },
  {
    name: "Fish",
    img: "/img/fish_category.png",
    large: true,
  },
];

const OurCategories = () => {
  return (
    <section id="categories" className="max-w-screen-2xl mx-auto px-5 mt-28">

      {/* HEADER */}
      <div className="text-center mb-14">
        <h1 className="text-5xl font-bold text-[#106D42]">
          Our Categories
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Fresh groceries, meat, fish and fruits delivered with premium quality.
          Choose your favorite category and start shopping.
        </p>
      </div>

      {/* GRID */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* LEFT BIG */}
        <div className="relative h-[250px] lg:h-[520px] rounded-2xl overflow-hidden group cursor-pointer">

          <Image
            src={categories[0].img}
            alt={categories[0].name}
            fill
            className="object-cover group-hover:scale-110 transition duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          <h1 className="absolute bottom-5 left-5 text-white text-2xl font-semibold">
            {categories[0].name}
          </h1>
        </div>

        {/* MIDDLE */}
        <div className="grid gap-6">

          {[categories[1], categories[2]].map((item, i) => (
            <div
              key={i}
              className="relative h-[180px] lg:h-[250px] rounded-2xl overflow-hidden group cursor-pointer"
            >
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-110 transition duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              <h1 className="absolute bottom-4 left-4 text-white text-xl font-medium">
                {item.name}
              </h1>
            </div>
          ))}
        </div>

        {/* RIGHT BIG */}
        <div className="relative h-[250px] lg:h-[520px] rounded-2xl overflow-hidden group cursor-pointer">

          <Image
            src={categories[3].img}
            alt={categories[3].name}
            fill
            className="object-cover group-hover:scale-110 transition duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          <h1 className="absolute bottom-5 left-5 text-white text-2xl font-semibold">
            {categories[3].name}
          </h1>
        </div>

      </div>
    </section>
  );
};

export default OurCategories;