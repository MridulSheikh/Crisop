"use client";

import AddStock from "@/components/ui/admin/stock/AddStock";
import DeleteStockModal from "@/components/ui/admin/stock/DeleteStockModal";
import UpdateStock from "@/components/ui/admin/stock/UpdateStockModal";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { useGetStockQuery } from "@/redux/features/warehouse/stockApi";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { ErrorUi, LoadingUi } from "../team/page";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

const StockPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
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

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleLimitChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("limit", value);
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Stock Management
        </h1>
        <div className=" flex gap-x-4 items-center">
          <div>
            <Select value={String(limit)} onValueChange={handleLimitChange}>
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Select Item Per Page" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Item</SelectLabel>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex">
            <Input
              type="search"
              className=" min-w-60"
              placeholder="🔍 Search Stock by name, sku"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <AddStock />
        </div>
      </div>
      <div className="overflow-x-auto">
        {isError ? (
          <div className=" bg-white">
            <ErrorUi error={error} />
          </div>
        ) : (
          <table className="min-w-full bg-white border border-gray-200 text-sm">
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
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="p-3 font-medium text-gray-800">
                    {item.productName}
                  </td>
                  <td className="p-3 text-gray-600">{item.sku}</td>
                  <td className="p-3 text-gray-600">{item.quantity}</td>
                  <td className="p-3 text-gray-600">{item.warehouse.name}</td>
                  <td className=" flex justify-end">
                    <UpdateStock
                      stock={{
                        product: "Sugar 25kg",
                        quantity: 50,
                        warehouseId: "wh-1",
                      }}
                      warehouses={[
                        { id: "wh-1", name: "Dhaka Warehouse" },
                        { id: "wh-2", name: "Chittagong Warehouse" },
                      ]}
                      onUpdate={(updatedStock) => {
                        console.log("Updated stock:", updatedStock);
                      }}
                    />
                    <DeleteStockModal />
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
