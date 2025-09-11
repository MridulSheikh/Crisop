"use client";

import AddWarehouse from "@/components/ui/admin/warehouse/AddWarehouse";
import DeleteWarehouseModal from "@/components/ui/admin/warehouse/DeleteWarehouseModal";
import EditWarehouse from "@/components/ui/admin/warehouse/EditWarehouseModal";
import { useGetWarehouseQuery } from "@/redux/features/warehouse/warehouseApi";
import { ErrorUi, LoadingUi } from "../team/page";

type Warehouse = {
  id: string;
  name: string;
  location: string;
  capacity: number; // e.g., max units it can store
};

export default function WarehousePage() {
   const { data, isLoading, error, isError } = useGetWarehouseQuery({
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    });

    const warehouses = data?.data

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Warehouses</h1>
        <AddWarehouse />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Location</th>
              <th className="p-3 border-b">Capacity (units)</th>
              <th className="p-3 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isError && <ErrorUi error={error} />}
                {isLoading && <LoadingUi />}
            {warehouses?.map((wh, index) => (
              <tr
                key={wh._id}
                className="hover:bg-gray-50 transition duration-150"
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
      </div>
    </div>
  );
}
