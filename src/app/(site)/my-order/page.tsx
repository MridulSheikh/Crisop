"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type OrderSummary = {
  orderId: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  total: number;
};

const ordersData: OrderSummary[] = [
  { orderId: "ORD123456", date: "2025-05-18", status: "Delivered", total: 199.99 },
  { orderId: "ORD123457", date: "2025-05-15", status: "Processing", total: 89.49 },
  { orderId: "ORD123458", date: "2025-05-10", status: "Cancelled", total: 45.0 },
  { orderId: "ORD123459", date: "2025-05-19", status: "Shipped", total: 120.0 },
];

const STATUS_OPTIONS = ["All", "Processing", "Shipped", "Delivered", "Cancelled"] as const;

export default function MyOrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<typeof STATUS_OPTIONS[number]>("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredOrders = useMemo(() => {
    return ordersData.filter((order) => {
      const matchesStatus = statusFilter === "All" || order.status === statusFilter;
      const matchesSearch = order.orderId.toLowerCase().includes(search.toLowerCase());

      const orderDate = new Date(order.date);
      const isAfterStart = startDate ? orderDate >= new Date(startDate) : true;
      const isBeforeEnd = endDate ? orderDate <= new Date(endDate) : true;

      return matchesStatus && matchesSearch && isAfterStart && isBeforeEnd;
    });
  }, [search, statusFilter, startDate, endDate]);

  return (
    <div className="max-w-screen-xl mx-auto p-6 bg-white">

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <Label>Search Order ID</Label>
          <Input
            placeholder="e.g., ORD123456"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div>
          <Label>Status</Label>
          <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val as typeof STATUS_OPTIONS[number])}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Start Date</Label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div>
          <Label>End Date</Label>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* Orders Table */}
      {filteredOrders.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-6 py-3 text-left text-gray-700 font-semibold">Order ID</th>
                <th className="border border-gray-300 px-6 py-3 text-left text-gray-700 font-semibold">Date</th>
                <th className="border border-gray-300 px-6 py-3 text-left text-gray-700 font-semibold">Status</th>
                <th className="border border-gray-300 px-6 py-3 text-right text-gray-700 font-semibold">Total</th>
                <th className="border border-gray-300 px-6 py-3 text-center text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.orderId} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="border border-gray-300 px-6 py-4 text-gray-800 font-medium">{order.orderId}</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-600">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className={`border border-gray-300 px-6 py-4 font-semibold ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Cancelled"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}>
                    {order.status}
                  </td>
                  <td className="border border-gray-300 px-6 py-4 text-right font-semibold text-gray-800">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-6 py-4 text-center">
                    <Link
                      href={`/my-order/${order.orderId}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
