import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { FaRegEye } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";

const ProductCard = () => {
  return (
    <div>
      <div className="bg-[#f2efef] rounded-md overflow-hidden p-5 relative group">
        <div className=" absolute w-full h-full bg-white/30 backdrop-blur-sm z-10 top-0 left-0 hidden group-hover:flex justify-center items-center">
          <Button>
            <FaRegEye className=" text-xl mr-2" />
            view
          </Button>
        </div>
        <div className=" h-60 relative ">
          <Image
            src={"/img/product.png"}
            alt="product_image"
            fill
            className=" object-contain object-center"
          />
        </div>
      </div>

      <div className=" mt-[12px]">
        <h1 className=" text-[22px] font-normal">Double Bed & Side Tables</h1>
        <div className=" mt-5 flex justify-between items-center">
          <h2 className=" text-sm">
            <span className="font-bold">$150.00</span> (1.25kg)
          </h2>
          <Button variant={"ghost"}>
            <FiPlusCircle className=" text-xl" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
