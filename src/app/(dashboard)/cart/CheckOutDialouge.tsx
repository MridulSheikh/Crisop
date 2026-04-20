"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppSelector } from "@/redux/hooks"; 
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  address: z.string().min(5, "Address is too short"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  number: z.string().min(10, "10 Digit Phone Number Required"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

interface CheckoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutDialog = ({ isOpen, onClose }: CheckoutDialogProps) => {
  // Retrieve user data from Redux store
  const user = useAppSelector((state) => state.auth.user); 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      address: "",
      email: "",
      number: "",
    },
  });

  // Populate form with user data when available
  useEffect(() => {
    if (user && isOpen) {
      reset({
        fullName: user.name || "",
        email: user.email || "",
      });
    }
  }, [user, isOpen, reset]);

  const onSubmit = (data: CheckoutFormValues) => {
    console.log("Order Submitted:", data);
    alert("Order placed successfully!");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              {...register("fullName")}
              className="w-full border p-2 rounded"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Shipping Address</label>
            <textarea
              {...register("address")}
              className="w-full border p-2 rounded"
            />
            {errors.address && (
              <p className="text-red-500 text-xs">{errors.address.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              {...register("email")}
              className="w-full border p-2 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Phone Number</label>
            <input
              {...register("number")}
              className="w-full border p-2 rounded"
            />
            {errors.number && (
              <p className="text-red-500 text-xs">{errors.number.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit">Place Order</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};