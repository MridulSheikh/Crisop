"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_XXXXXXXXXXXXXXXXXXXXXXXX"); // replace with your key

function StripeCardForm() {
  const stripe = useStripe();
  const elements = useElements();

//   const handleStripePayment = async () => {
//     const cardElement = elements?.getElement(CardElement);
//     if (!stripe || !cardElement) return;

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: cardElement,
//     });

//     if (error) {
//       alert(error.message);
//     } else {
//       alert(`Payment Successful! ID: ${paymentMethod.id}`);
//     }
//   };

  return (
    <div className="space-y-4 mt-4">
      <Label>Card Details</Label>
      <div className="border rounded-md p-3 bg-white">
        <CardElement />
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const subtotal = 280;
  const shipping = 20;
  const total = subtotal + shipping;

  const isFormValid = Object.values(form).every((val) => val.trim() !== "");

  const handleInputChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Reset payment method if any field is empty
    if (!isFormValid) setPaymentMethod("cod");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Form */}
      <div className="md:col-span-2 space-y-6">
        <h2 className="text-xl font-semibold">Shipping Details</h2>

        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              value={form.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Your full name"
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="example@email.com"
            />
          </div>
          <div>
            <Label>Phone</Label>
            <Input
              value={form.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="+880123456789"
            />
          </div>
          <div>
            <Label>Address</Label>
            <Input
              value={form.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Shipping address"
            />
          </div>

          {/* Payment Method (disable if form invalid) */}
          <div>
            <Label className="mb-1">Payment Method</Label>
            <RadioGroup
              value={paymentMethod}
              onValueChange={(val) => setPaymentMethod(val)}
              className="mt-2 space-y-2"
              disabled={!isFormValid}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cod" id="cod" disabled={!isFormValid} />
                <Label htmlFor="cod">Cash on Delivery</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="stripe"
                  id="stripe"
                  disabled={!isFormValid}
                />
                <Label htmlFor="stripe">Pay with Stripe</Label>
              </div>
            </RadioGroup>
            {!isFormValid && (
              <p className="text-sm text-red-500 mt-2">
                Please fill all fields to enable payment.
              </p>
            )}
          </div>

          {/* Stripe Card Element */}
          {paymentMethod === "stripe" && isFormValid && (
            <Elements stripe={stripePromise}>
              <StripeCardForm />
            </Elements>
          )}
          <Button>Confirm Order</Button>
        </div>
      </div>

      {/* Right: Order Summary */}
      <div className="border rounded-lg p-6 bg-gray-50 h-fit">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
