import React, { FC } from "react";
import { Button } from "../button";
import { IoIosArrowForward } from "react-icons/io";
import ProductCard from "@/components/shared/card/ProductCard";

const FlashSell: FC = () => {
  return (
    <div className=" max-w-screen-xl px-5 mx-auto mt-[62px]">
      <div className=" flex justify-between items-center">
        <h1 className=" text-[36px] font-semibold text-[#2F2F2E]">
          Flash Sales
        </h1>
        <Button className="rounded-full">
          View All <IoIosArrowForward className="ml-3 h-4 w-4" />
        </Button>
      </div>
      <div className=" grid lg:grid-cols-4 gap-y-3 lg:gap-y-0 gap-x-3 mt-[34px]">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default FlashSell;
