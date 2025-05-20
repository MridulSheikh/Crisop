"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type Product = {
  name: string;
  price: number;
  quantity: number;
};

type OrderDetails = {
  orderId: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  total: number;
  products: Product[];
  customer: {
    name: string;
    email: string;
    address: string;
    phone: string;
  };
};

// Mock order data
const order: OrderDetails = {
  orderId: "ORD123456",
  date: "2025-05-18",
  status: "Delivered",
  total: 199.99,
  customer: {
    name: "John Doe",
    email: "john@example.com",
    address: "123 Main Street, Dhaka, Bangladesh",
    phone: "+880 1883992408",
  },
  products: [
    { name: "Wireless Headphones", price: 99.99, quantity: 1 },
    { name: "Bluetooth Speaker", price: 50, quantity: 2 },
  ],
};

const getStatusColor = (status: OrderDetails["status"]) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    case "Processing":
      return "bg-yellow-100 text-yellow-700";
    case "Shipped":
      return "bg-blue-100 text-blue-700";
    default:
      return "";
  }
};

export default function OrderDetailsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
        <Link href="/my-order">
          <Button variant="outline">← Back to Orders</Button>
        </Link>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700 font-medium">Order ID</p>
              <p className="text-lg font-semibold text-gray-900">{order.orderId}</p>
            </div>
            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700 font-medium">Order Date</p>
              <p>{new Date(order.date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Total Amount</p>
              <p className="font-semibold text-gray-900">${order.total.toFixed(2)}</p>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-gray-700 font-medium mb-2">Customer Information</p>
            <p className="font-semibold">{order.customer.name}</p>
            <p>{order.customer.email}</p>
            <p>{order.customer.phone}</p>
            <p>{order.customer.address}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Ordered Products</h2>
          <ul className="space-y-4">
            {order.products.map((product, index) => (
              <li
                key={index}
                className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">
                    Quantity: {product.quantity}
                  </p>
                </div>
                <p className="font-semibold text-gray-800">
                  ${(product.price * product.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
