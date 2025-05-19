'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../sheet';
import { Button } from '../../button';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Label } from '../../label';
import { Input } from '../../input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../select';
import { Switch } from '../../switch';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  stockLocation: z.string().min(1, 'Stock location is required'),
  images: z
    .any()
    .refine((files) => files?.length > 0, 'At least one image is required'),
  status: z.enum(['draft', 'publish']),
  regularPrice: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Enter a valid price'),
  discountPrice: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Enter a valid discount price')
    .optional(),
});

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
      stockLocation: '',
      images: [],
      status: 'draft',
      regularPrice: '',
      discountPrice: '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('Submitted Product:', data);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="border-black rounded-full">
          <Plus size={16} /> Add Product
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add Product</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {/* Name */}
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" {...register('name')} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <ReactQuill
              theme="snow"
              value={watch('description')}
              onChange={(val) => setValue('description', val)}
              className="bg-white"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <Label>Category</Label>
            <Select
              onValueChange={(value) => setValue('category', value)}
              defaultValue={watch('category')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fruits">Fruits</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="dairy">Dairy</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          {/* Stock Location */}
          <div>
            <Label>Stock Location</Label>
            <Select
              onValueChange={(value) => setValue('stockLocation', value)}
              defaultValue={watch('stockLocation')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select stock location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main">Main Warehouse</SelectItem>
                <SelectItem value="secondary">Secondary Warehouse</SelectItem>
                <SelectItem value="storefront">Storefront</SelectItem>
              </SelectContent>
            </Select>
            {errors.stockLocation && (
              <p className="text-red-500 text-sm">{errors.stockLocation.message}</p>
            )}
          </div>

          {/* Regular Price */}
          <div>
            <Label>Regular Price ($)</Label>
            <Input type="number" step="0.01" {...register('regularPrice')} />
            {errors.regularPrice && (
              <p className="text-red-500 text-sm">{errors.regularPrice.message}</p>
            )}
          </div>

          {/* Discount Price */}
          <div>
            <Label>Discount Price ($)</Label>
            <Input type="number" step="0.01" {...register('discountPrice')} />
            {errors.discountPrice && (
              <p className="text-red-500 text-sm">{errors.discountPrice.message}</p>
            )}
          </div>

          {/* Images */}
          <div>
            <Label>Product Images</Label>
            <Input
              type="file"
              multiple
              accept="image/*"
              {...register('images')}
            />
            {errors.images && (
              <p className="text-red-500 text-sm">{errors.images.message as string}</p>
            )}
          </div>

          {/* Status */}
          <div className="flex items-center justify-between">
            <Label>Status</Label>
            <div className="flex items-center gap-2">
              <Switch
                checked={watch('status') === 'publish'}
                onCheckedChange={(checked) =>
                  setValue('status', checked ? 'publish' : 'draft')
                }
              />
              <span className="text-sm text-muted-foreground">
                {watch('status') === 'publish' ? 'Published' : 'Draft'}
              </span>
            </div>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full mt-4">
            Submit
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default AddProduct;
