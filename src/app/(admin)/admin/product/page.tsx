"use client";

import { useState } from "react";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { useSearchParams } from "next/navigation";
import { useGetProductQuery } from "@/redux/features/product/productApi";
import { LoadingUi, ErrorUi } from "../team/page"; // assuming you have loading/error components
import SearchInput from "@/components/shared/searchInput/SearchInput";
import LimitSelect from "@/components/shared/limitSelect/LimitSelect";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";

export default function ProductPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const { data, isLoading, isError, error } = useGetProductQuery({
    page,
    limit,
    search: searchQuery,
  });

  const products = data?.data;
  const meta = data?.meta;

  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Product Management
        </h1>
        <div className="flex gap-x-6">
          <LimitSelect />

          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="🔍 Search Product by Name"
          />

          <Link href={"/admin/add-product"}>
              <Button>Add New Product</Button>          
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        {isError ? (
          <ErrorUi error={error} />
        ) : (
          <table className="min-w-full border border-gray-200 bg-white text-sm rounded-md overflow-hidden">
            <thead className="bg-black text-white text-left">
              <tr>
                <th className="p-3 border-b">Image</th>
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Category</th>
                <th className="p-3 border-b">Price</th>
                <th className="p-3 border-b">Stock</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                 <ProductCard product={product} key={product._id} />
              ))}
              {products?.length === 0 && !isLoading && (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {isLoading && <LoadingUi />}

        {!isLoading && meta && (
          <div className="mt-5">
            <PaginationWithLinks
              page={meta.page}
              pageSize={meta.limit}
              totalCount={meta.total}
            />
          </div>
        )}
      </div>
    </div>
  );
}
