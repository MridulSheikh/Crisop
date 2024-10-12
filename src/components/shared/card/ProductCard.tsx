import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { FiPlusCircle } from "react-icons/fi";

const ProductCard = () => {
  return (
    <div>
      <div className="bg-[#f2efef] rounded-md overflow-hidden p-5">
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
          <h2 className=" text-sm">$150.00</h2>
          <Button variant={"ghost"}>
            <FiPlusCircle className=" text-xl" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
