"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

// Sample cart data
const initialCart = [
  {
    id: "p1",
    name: "Wireless Headphones",
    price: 120,
    quantity: 1,
    image: "https://purepng.com/public/uploads/large/purepng.com-headphoneelectronics-headset-headphone-941524669594jcbtd.png",
  },
  {
    id: "p2",
    name: "Smart Watch",
    price: 80,
    quantity: 2,
    image: "https://via.placeholder.com/100?text=Watch",
  },
];

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountedTotal = subtotal - discount;

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "SAVE10") {
      const discountAmount = subtotal * 0.1;
      setDiscount(discountAmount);
      setCouponMessage("Coupon applied: 10% off!");
    } else {
      setDiscount(0);
      setCouponMessage("Invalid coupon code.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="overflow-x-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="flex items-center gap-4 py-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                  </div>
                </TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Coupon and Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Coupon Section */}
        <div>
          <Label htmlFor="coupon">Coupon Code</Label>
          <div className="flex items-center gap-2 mt-2">
            <Input
              id="coupon"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon"
            />
            <Button onClick={applyCoupon}>Apply</Button>
          </div>
          {couponMessage && (
            <p className="text-sm mt-2 text-muted-foreground">{couponMessage}</p>
          )}
        </div>

        {/* Summary Section */}
        <div className="border rounded-lg p-4 bg-gray-50 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600 font-medium">
              <span>Discount:</span>
              <span>– ${discount.toFixed(2)}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>${discountedTotal.toFixed(2)}</span>
          </div>
          <Button className="w-full mt-4">Proceed to Checkout</Button>
        </div>
      </div>
    </div>
  );
}
