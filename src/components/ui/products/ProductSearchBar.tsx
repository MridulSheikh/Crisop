import React from "react";
import { FiSearch } from "react-icons/fi";
import { Button } from "../button";

const ProductSearchBar = () => {
  return (
    <div className="flex items-center bg-white border rounded-md overflow-hidden shadow-sm text-black w-full">
      <div className="pl-4 ">
        <FiSearch />
      </div>
      <input
        className="w-full px-3 py-3 outline-none text-sm"
        placeholder="Search products..."
      />
      <Button className="rounded-md bg-[#FF5F2C] hover:bg-[#e74e1d] mr-1">
        Search
      </Button>
    </div>
  );
};

export default ProductSearchBar;
