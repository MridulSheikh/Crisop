"use client";

import { useState } from "react";
import Image from "next/image";
import EditProduct from "@/components/ui/admin/products/EditeProductModal";
import DeleteProductAlert from "@/components/ui/admin/products/DeleteProductAlert";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { useSearchParams } from "next/navigation";
import { useGetProductQuery } from "@/redux/features/product/productApi";
import { LoadingUi, ErrorUi } from "../team/page"; // assuming you have loading/error components
import SearchInput from "@/components/shared/searchInput/SearchInput";
import LimitSelect from "@/components/shared/limitSelect/LimitSelect";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

  console.log(products);

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
          <table className="min-w-full border border-gray-200 bg-white text-sm">
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
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="p-3">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="rounded object-cover"
                    />
                  </td>
                  <td className="p-3 font-medium text-gray-800">
                    {product.name}
                  </td>
                  <td className="p-3 font-medium text-gray-800">
                    {product.category.name}
                  </td>
                  <td className="p-3 text-gray-600">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="p-3 text-gray-600">
                    {product.stock.quantity}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        product.isPublished === true
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {product.isPublished === true ? "Published" : "Pending"}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    {/* <EditProduct
                      product={{
                        name: product.name,
                        description: product.description || "",
                        category: product.category || "",
                        stockLocation: product.stockLocation || "",
                        status: product.status,
                        regularPrice: product.price.toString(),
                        discountPrice: product.discountPrice?.toString(),
                        images: product.image,
                      }}
                    /> */}
                    {/* <DeleteProductAlert productId={product._id} /> */}
                  </td>
                </tr>
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
