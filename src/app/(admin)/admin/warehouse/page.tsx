"use client";

import AddWarehouse from "@/components/ui/admin/warehouse/AddWarehouse";
import DeleteWarehouseModal from "@/components/ui/admin/warehouse/DeleteWarehouseModal";
import EditWarehouse from "@/components/ui/admin/warehouse/EditWarehouseModal";
import { useState, useEffect } from "react";

type Warehouse = {
  id: string;
  name: string;
  location: string;
  capacity: number; // e.g., max units it can store
};

export default function WarehousePage() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  useEffect(() => {
    // Replace with your API fetch
    setWarehouses([
      {
        id: "wh-001",
        name: "Warehouse A",
        location: "New York",
        capacity: 5000,
      },
      {
        id: "wh-002",
        name: "Warehouse B",
        location: "Los Angeles",
        capacity: 3000,
      },
      {
        id: "wh-003",
        name: "Warehouse C",
        location: "Chicago",
        capacity: 4000,
      },
    ]);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdate = (index: number, updatedWarehouse: any) => {
    console.log("Updated warehouse at index", index, ":", updatedWarehouse);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Warehouses</h1>
        <AddWarehouse
          onAdd={(newWarehouse) => {
            const id = `wh-${Math.random().toString(36).substr(2, 5)}`;
            setWarehouses((prev) => [...prev, { id, ...newWarehouse }]);
          }}
        />
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
            {warehouses.map((wh, index) => (
              <tr
                key={wh.id}
                className="hover:bg-gray-50 transition duration-150"
              >
                <td className="p-3 font-medium text-gray-800">{wh.name}</td>
                <td className="p-3 text-gray-600">{wh.location}</td>
                <td className="p-3 text-gray-600">{wh.capacity}</td>
                <td className="p-3 text-right space-x-3">
                  <EditWarehouse initialData={wh}  onUpdate={(updated) => handleUpdate(index, updated)} />
                  <DeleteWarehouseModal />
                </td>
              </tr>
            ))}

            {warehouses.length === 0 && (
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
