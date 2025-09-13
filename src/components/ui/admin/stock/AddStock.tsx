"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { use, useState } from "react";
import { useAddStocksMutation } from "@/redux/features/warehouse/stockApi";
import { toast } from "react-toastify";
import { SelectWarehouse } from "./SelectWarehouse";

// Schema
const stockSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  warehouse: z.string().min(1, "Select a warehouse"),
});

type StockFormValues = z.infer<typeof stockSchema>;

export default function AddStock() {
  const [open, setOpen] = useState(false);
  const [addStock] = useAddStocksMutation();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<StockFormValues>({
    resolver: zodResolver(stockSchema),
    defaultValues: {
      productName: "",
      quantity: 1,
      warehouse: "",
    },
  });

  const onSubmit = async (data: StockFormValues) => {
    const toastId = toast.loading("Adding Stock...");
    try {
      const response = await addStock(data).unwrap();
      // update the existing loading toast into success
      toast.update(toastId, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        position: "top-center",
      });
      // eslint-disable-next-line @typescript-eslint/no-exp
    } catch (error: any) {
      toast.update(toastId, {
        render:
          error?.data?.errorMessage ??
          "Something went wrong!",
        type: "error",
        isLoading: false,
        autoClose: 4000,
        position: "top-center",
      });
    }
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="inline-flex items-center gap-2 bg-black text-white text-sm px-4 py-2 rounded-md hover:opacity-90">
          + Add Stock
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Stock</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div>
            <Label htmlFor="product">Product Name</Label>
            <Input id="product" {...register("productName")} placeholder="e.g., Rice 50kg" />
            {errors.productName && (
              <p className="text-sm text-red-500 mt-1">{errors.productName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input id="quantity" type="number" {...register("quantity")} placeholder="100" />
            {errors.quantity && (
              <p className="text-sm text-red-500 mt-1">{errors.quantity.message}</p>
            )}
          </div>

          <div>
            <Controller
              name="warehouse"
              control={control}
              render={({ field }) => (
                <SelectWarehouse value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.warehouse && (
              <p className="text-sm text-red-500 mt-1">{errors.warehouse.message}</p>
            )}
          </div>

          <DialogFooter className="pt-4">
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
