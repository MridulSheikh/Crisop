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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

// Schema
const stockSchema = z.object({
  product: z.string().min(1, "Product name is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  warehouseId: z.string().min(1, "Select a warehouse"),
});

type StockFormValues = z.infer<typeof stockSchema>;

type UpdateStockProps = {
  stock: StockFormValues;
  onUpdate: (updatedStock: StockFormValues) => void;
  warehouses: { id: string; name: string }[];
};

export default function UpdateStock({
  stock,
  onUpdate,
  warehouses,
}: UpdateStockProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<StockFormValues>({
    resolver: zodResolver(stockSchema),
    defaultValues: stock,
  });

  useEffect(() => {
    if (open) {
      reset(stock);
    }
  }, [open, stock, reset]);

  const onSubmit = (data: StockFormValues) => {
    onUpdate(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <Pencil size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Stock</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div>
            <Label htmlFor="product">Product Name</Label>
            <Input
              id="product"
              {...register("product")}
              placeholder="e.g., Rice 50kg"
            />
            {errors.product && (
              <p className="text-sm text-red-500 mt-1">
                {errors.product.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              {...register("quantity")}
              placeholder="100"
            />
            {errors.quantity && (
              <p className="text-sm text-red-500 mt-1">
                {errors.quantity.message}
              </p>
            )}
          </div>

          <div>
            <Label>Warehouse</Label>
            <Select
              onValueChange={(val) => setValue("warehouseId", val)}
              defaultValue={stock.warehouseId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select warehouse" />
              </SelectTrigger>
              <SelectContent>
                {warehouses.map((wh) => (
                  <SelectItem key={wh.id} value={wh.id}>
                    {wh.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.warehouseId && (
              <p className="text-sm text-red-500 mt-1">
                {errors.warehouseId.message}
              </p>
            )}
          </div>

          <DialogFooter className="pt-4">
            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
