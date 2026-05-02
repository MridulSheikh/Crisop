"use client";

import React from "react";

type Order = {
  id: string;
  customer: string;
  total: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  date: string;
};

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "John Doe",
    total: 120,
    status: "pending",
    date: "2026-04-19",
  },
  {
    id: "ORD-002",
    customer: "Alice Smith",
    total: 250,
    status: "processing",
    date: "2026-04-18",
  },
  {
    id: "ORD-003",
    customer: "Rahim Uddin",
    total: 90,
    status: "completed",
    date: "2026-04-17",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-600";
    case "processing":
      return "bg-blue-100 text-blue-600";
    case "completed":
      return "bg-green-100 text-green-600";
    case "cancelled":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function OrderPage() {
  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Orders</h1>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black text-sm text-white">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {mockOrders.map((order) => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4">${order.total}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="p-4 text-sm text-gray-500">
                  {order.date}
                </td>

                <td className="p-4 text-right space-x-2">
                  <button className="text-blue-500 hover:underline text-sm">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty state */}
        {mockOrders.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No orders found
          </div>
        )}
      </div>
    </div>
  );
}