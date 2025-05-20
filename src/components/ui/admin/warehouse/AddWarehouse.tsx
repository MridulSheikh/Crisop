'use client';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';

// Schema validation
const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  location: z.string().min(1, 'Location is required'),
  capacity: z.coerce.number().min(1, 'Capacity must be greater than 0'),
});

type FormValues = z.infer<typeof formSchema>;

type AddWarehouseProps = {
  onAdd: (warehouse: { name: string; location: string; capacity: number }) => void;
};

export default function AddWarehouse({ onAdd }: AddWarehouseProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      location: '',
      capacity: 0,
    },
  });

  const onSubmit = (data: FormValues) => {
    onAdd(data);
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="inline-flex items-center gap-2 bg-black text-white text-sm px-4 py-2 rounded-md hover:opacity-90">
          + Add Warehouse
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Warehouse</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register('name')} placeholder="Warehouse A" />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" {...register('location')} placeholder="New York" />
            {errors.location && (
              <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="capacity">Capacity</Label>
            <Input
              id="capacity"
              type="number"
              {...register('capacity')}
              placeholder="5000"
            />
            {errors.capacity && (
              <p className="text-sm text-red-500 mt-1">{errors.capacity.message}</p>
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
