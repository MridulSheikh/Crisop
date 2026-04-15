"use client";

import AddWarehouse from "@/components/ui/admin/warehouse/AddWarehouse";
import DeleteWarehouseModal from "@/components/ui/admin/warehouse/DeleteWarehouseModal";
import EditWarehouse from "@/components/ui/admin/warehouse/EditWarehouseModal";
import { useGetWarehouseQuery } from "@/redux/features/warehouse/warehouseApi";
import { ErrorUi, LoadingUi } from "../team/page";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import LimitSelect from "@/components/shared/limitSelect/LimitSelect";
import SearchInput from "@/components/shared/searchInput/SearchInput";

export default function WarehousePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const pageNumber = Number(page) || 1;
  const limit = Number(searchParams.get("limit")) || 15;
  const { data, isLoading, error, isError } = useGetWarehouseQuery(
    { page: pageNumber, search: searchQuery, limit: limit },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    },
  );

  const warehouses = data?.data?.data;
  const meta = data?.data?.meta;

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Warehouses</h1>
        <div className=" flex gap-x-4 items-center">
          <div>
            <LimitSelect />
          </div>
          <div className="flex">
            <SearchInput
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder="🔍 Search Warehouse by name,location"
            />
          </div>
          <AddWarehouse />
        </div>
      </div>

      <div className="">
        <table className="min-w-full shadow-md bg-white rounded-md overflow-hidden text-left text-sm">
          <thead className="bg-black text-white sticky top-0">
            <tr>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Location</th>
              <th className="p-3 border-b">Capacity (units)</th>
              <th className="p-3 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody className=" bg-white">
            {warehouses?.map((wh, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition duration-150 border-b"
              >
                <td className="p-3 font-medium text-gray-800">{wh.name}</td>
                <td className="p-3 text-gray-600">{wh.location}</td>
                <td className="p-3 text-gray-600">{wh.capacity}</td>
                <td className="p-3 text-right space-x-3">
                  <EditWarehouse initialData={wh} />
                  <DeleteWarehouseModal id={wh._id} />
                </td>
              </tr>
            ))}

            {warehouses?.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No warehouses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {isLoading && <LoadingUi />}
        {isError && <ErrorUi error={error} />}
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
}
