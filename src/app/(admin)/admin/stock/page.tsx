"use client";

import AddStock from "@/components/ui/admin/stock/AddStock";
import DeleteStockModal from "@/components/ui/admin/stock/DeleteStockModal";
import UpdateStock from "@/components/ui/admin/stock/UpdateStockModal";
import { useEffect, useState } from "react";

type StockItem = {
  id: string;
  productName: string;
  sku: string;
  quantity: number;
  warehouse: string;
};

const warehouses = [
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
];

const StockPage = () => {
  const [stockItems, setStockItems] = useState<StockItem[]>([]);

  useEffect(() => {
    // Replace with your API call
    setStockItems([
      {
        id: "prod-001",
        productName: "Apple",
        sku: "APL-001",
        quantity: 120,
        warehouse: "Warehouse A",
      },
      {
        id: "prod-002",
        productName: "Banana",
        sku: "BAN-002",
        quantity: 80,
        warehouse: "Warehouse B",
      },
      {
        id: "prod-003",
        productName: "Cheese",
        sku: "CHS-003",
        quantity: 50,
        warehouse: "Warehouse A",
      },
    ]);
  }, []);

  // Handler to update stock quantity locally (replace with API update)
  const handleQuantityChange = (id: string, newQuantity: number) => {
    setStockItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Stock Management
        </h1>
        <AddStock
          warehouses={warehouses.map((wh) => ({ id: wh.id, name: wh.name }))}
          onAdd={(stockData) => {
            console.log("Stock added:", stockData);
            // Add stock logic here (e.g., API call or local update)
          }}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3 border-b">Product</th>
              <th className="p-3 border-b">SKU</th>
              <th className="p-3 border-b">Quantity</th>
              <th className="p-3 border-b">Warehouse</th>
              <th className="p-3 border-b flex justify-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stockItems.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 transition duration-150"
              >
                <td className="p-3 font-medium text-gray-800">
                  {item.productName}
                </td>
                <td className="p-3 text-gray-600">{item.sku}</td>
                <td className="p-3 text-gray-600">
                  <input
                    type="number"
                    value={item.quantity}
                    min={0}
                    onChange={(e) =>
                      handleQuantityChange(item.id, Number(e.target.value))
                    }
                    className="w-20 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </td>
                <td className="p-3 text-gray-600">{item.warehouse}</td>
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

            {stockItems.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No stock data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default StockPage;
