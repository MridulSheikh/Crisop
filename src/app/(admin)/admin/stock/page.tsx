"use client";

import AddStock from "@/components/ui/admin/stock/AddStock";
import DeleteStockModal from "@/components/ui/admin/stock/DeleteStockModal";
import UpdateStock from "@/components/ui/admin/stock/UpdateStockModal";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { useGetStockQuery } from "@/redux/features/warehouse/stockApi";
import {useSearchParams } from "next/navigation";
import { useState } from "react";
import { ErrorUi, LoadingUi } from "../team/page";
import LimitSelect from "@/components/shared/limitSelect/LimitSelect";
import SearchInput from "@/components/shared/searchInput/SearchInput";
import { cn } from "@/lib/utils";

const StockPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const pageNumber = Number(page) || 1;
  const limit = Number(searchParams.get("limit")) || 15;
  const { data, isLoading, error, isError } = useGetStockQuery(
    { page: pageNumber, search: searchQuery, limit: limit },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    },
  );

  const stock = data?.data?.data;
  const meta = data?.data?.meta;

  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Stock Management
        </h1>
        <div className=" flex gap-x-4 items-center">
          <div>
            <LimitSelect />
          </div>

          <div className="flex">
            <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="🔍 Search Stock by Product Name" />
          </div>
          <AddStock />
        </div>
      </div>
      <div className="">
        {isError ? (
          <div className=" bg-white">
            <ErrorUi error={error} />
          </div>
        ) : (
          <table className="min-w-full shadow-md bg-white rounded-md overflow-hidden text-left text-sm">
            <thead className="bg-black text-white text-left">
              <tr>
                <th className="p-3 border-b">Product</th>
                <th className="p-3 border-b">SKU</th>
                <th className="p-3 border-b">Quantity</th>
                <th className="p-3 border-b">Warehouse</th>
                <th className="p-3 border-b flex justify-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stock?.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 transition duration-150 border-b"
                >
                  <td className="p-3 font-medium text-gray-800">
                    {item.productName}
                  </td>
                  <td className="p-3 text-gray-600">{item.sku}</td>
                  <td className="p-3 text-gray-600"><span className={cn("text-green-500",{
                    "text-red-500" : item.quantity < 10
                  })}>{item.quantity}</span> {item.unit}</td>
                  <td className="p-3 text-gray-600">{item.warehouse.name}</td>
                  <td className=" flex justify-end">
                    <UpdateStock
                      stock={item}
                    />
                    <DeleteStockModal stockId={item._id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {isLoading && <LoadingUi />}
      </div>
      {!isLoading && (
        <div className="mt-5">
          <PaginationWithLinks
            page={meta?.page as number}
            pageSize={meta?.limit as number}
            totalCount={meta?.total as number}
          />
        </div>
      )}
    </div>
  );
};
export default StockPage;
