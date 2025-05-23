import { Eye, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = () => {
  return (
    <div className=" hover:shadow-[0px_4px_41px_6px_rgba(0,_0,_0,_0.1)] hover:outline-none ease-in-out duration-500 rounded-sm outline outline-1 outline-gray-200 cursor-pointer p-5 group">
      <div className="overflow-hidden relative group">
        <div className=" bg-red-600 inline p-0.5 absolute top-0 left-0 text-white text-sm">
          -10%
        </div>
        <Link href={`/shop/${1}`}>
          <div className=" h-60 relative ">
            <Image
              src={"/img/product.png"}
              alt="product_image"
              fill
              className=" object-contain object-center"
            />
          </div>
        </Link>
      </div>

      <div className=" mt-10 text-center">
        <h1 className=" text-md font-semibold group-hover:hidden">
          Double Bed & Side Tables
        </h1>
        <h2 className=" mt-5 text-sm">
          <span className="line-through">$200</span>
          <span className="font-bold"> / $150.00</span> (1.25kg)
        </h2>
      </div>
      <div className=" mt-5 group-hover:flex justify-center space-x-3 hidden ease-in-out duration-500">
        <button className=" size-10 flex justify-center items-center rounded-full bg-slate-200 hover:bg-[#86a628] hover:text-white ease-in-out duration-300">
          <Heart className=" size-5" />
        </button>
        <button className=" size-10 flex justify-center items-center rounded-full bg-slate-200 hover:bg-[#86a628] hover:text-white ease-in-out duration-300">
          <ShoppingCart className=" size-5" />
        </button>
        <Link href={`/shop/${1}`}>
          <button className=" size-10 flex justify-center items-center rounded-full bg-slate-200 hover:bg-[#86a628] hover:text-white ease-in-out duration-300">
            <Eye className=" size-5" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
