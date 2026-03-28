"use client";

import AddStock from "@/components/ui/admin/stock/AddStock";
import DeleteStockModal from "@/components/ui/admin/stock/DeleteStockModal";
import UpdateStock from "@/components/ui/admin/stock/UpdateStockModal";
import { useGetStockQuery } from "@/redux/features/warehouse/stockApi";

const StockPage = () => {
   const { data, isLoading, error, isError } = useGetStockQuery({
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
      });

       const stock = data?.data;

  // Handler to update stock quantity locally (replace with API update)

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex items-center justify-between mb-6 bg-white sticky py-4 top-0">
        <h1 className="text-2xl font-semibold text-gray-800">
          Stock Management
        </h1>
        <AddStock />
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
            {stock?.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-gray-50 transition duration-150"
              >
                <td className="p-3 font-medium text-gray-800">
                  {item.productName}
                </td>
                <td className="p-3 text-gray-600">{item.sku}</td>
                <td className="p-3 text-gray-600">
                  {item.quantity}
                </td>
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

            {stock?.length === 0 && (
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
