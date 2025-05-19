"use client";

import { Plus } from "lucide-react";
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

  // Dummy handlers
  const handleAdd = () => {
    alert("Add Warehouse form goes here");
  };

  const handleEdit = (id: string) => {
    alert(`Edit Warehouse ${id} form goes here`);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this warehouse?")) {
      setWarehouses((prev) => prev.filter((wh) => wh.id !== id));
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Warehouses</h1>
        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-2 bg-black text-white text-sm px-4 py-2 rounded-md hover:opacity-90"
        >
          <Plus size={16} /> Add Warehouse
        </button>
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
            {warehouses.map((wh) => (
              <tr
                key={wh.id}
                className="hover:bg-gray-50 transition duration-150"
              >
                <td className="p-3 font-medium text-gray-800">{wh.name}</td>
                <td className="p-3 text-gray-600">{wh.location}</td>
                <td className="p-3 text-gray-600">{wh.capacity}</td>
                <td className="p-3 text-right space-x-3">
                  <button
                    onClick={() => handleEdit(wh.id)}
                    className="text-green-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(wh.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
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
