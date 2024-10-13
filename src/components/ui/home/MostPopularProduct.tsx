import React, { FC } from "react";
import { Button } from "../button";
import { IoIosArrowForward } from "react-icons/io";
import ProductCard from "@/components/shared/card/ProductCard";

const MostPopularProduct: FC = () => {
  return (
    <div className=" max-w-screen-xl px-5 mx-auto mt-[117px]">
      <div className=" text-center lg:text-left lg:flex justify-between items-center">
        <div>
          <h1 className="text-[36px] font-semibold text-[#2F2F2E]">
            Most Popular Products
          </h1>
          <p className=" text-sm mt-[20px] lg:w-2/3 mx-auto lg:ml-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            fringilla nunc in molestie feugiat. Nunc auctor consectetur elit,
            quis pulvina.
          </p>
        </div>

        <Button className="rounded-full mt-5 lg:mt-0">
          View All <IoIosArrowForward className="ml-3 h-4 w-4" />
        </Button>
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

export default MostPopularProduct;
