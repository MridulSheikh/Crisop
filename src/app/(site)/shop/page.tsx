import ProductCard from "@/components/shared/card/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProductFillter from "@/components/ui/products/ProductFillter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const Products = () => {
  return (
    <div className=" max-w-screen-xl px-5 mx-auto mt-10">
      <div className=" flex justify-between items-center">
        <ProductFillter />
        <div className=" flex gap-x-4 items-center">
          <p className=" text-sm">Showing 1–12 of 24 item(s)</p>
          <Select>
            <SelectTrigger className="w-[180px] rounded-full border-black">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevency">Relevency</SelectItem>
              <SelectItem value="price_desc">Highest Price</SelectItem>
              <SelectItem value="price_asc">Lowest Price</SelectItem>
              <SelectItem value="date_desc">Most Recent</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <div className=" mt-10">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Products;
