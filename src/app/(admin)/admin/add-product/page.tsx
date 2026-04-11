"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import ImgUpload from "@/components/shared/imgUpload/ImgUpload";
import StockSelect from "./StockSelect";

type FormValues = {
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  category: string;
  stock: string;
  tags: string;
  images: File[];
  isFeatured: boolean;
  isPublished: boolean;
};

const AddProductPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      discountPrice: 0,
      category: "",
      stock: "",
      tags: "",
      images: [],
      isFeatured: false,
      isPublished: true,
    },
  });

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", String(data.price));
    formData.append("discountPrice", String(data.discountPrice));
    formData.append("category", data.category);
    formData.append("stock", data.stock);

    if (data.tags) {
      data.tags
        .split(",")
        .map((tag) => tag.trim())
        .forEach((tag) => formData.append("tags", tag));
    }

    data.images.forEach((file) => {
      formData.append("images", file);
    });

    formData.append("isFeatured", String(data.isFeatured));
    formData.append("isPublished", String(data.isPublished));

    console.log("Final FormData:", formData);

    reset();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            {...register("name", { required: "Product name is required" })}
            className="w-full border p-2 rounded"
            placeholder="iPhone 15 Pro Max"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full border p-2 rounded"
            placeholder="Write product description..."
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            {...register("price", { required: "Price is required" })}
            className="w-full border p-2 rounded"
            placeholder="1000"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        {/* Discount */}
        <div>
          <label className="block mb-1 font-medium">Discount Price</label>
          <input
            type="number"
            {...register("discountPrice")}
            className="w-full border p-2 rounded"
            placeholder="900"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select category</option>
            <option value="electronics">Electronics</option>
            <option value="food">Food</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Stock */}
        <>
          <Controller
            name="stock"
            control={control}
            rules={{ required: "Select stock" }}
            render={({ field }) => <StockSelect {...field} />}
          />
          {errors.stock && (
            <p className="text-red-500 text-sm">{errors.stock.message}</p>
          )}
        </>

        {/* Tags */}
        <div>
          <label className="block mb-1 font-medium">Tags</label>
          <input
            {...register("tags")}
            className="w-full border p-2 rounded"
            placeholder="iphone, apple, mobile"
          />
        </div>

        {/* Images */}
        <div>
          <label className="block mb-2 font-medium">Product Images</label>
          <Controller
            name="images"
            control={control}
            rules={{ required: "At least 1 image required" }}
            render={({ field }) => (
              <ImgUpload value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.images && (
            <p className="text-red-500 text-sm">{errors.images.message}</p>
          )}
        </div>

        {/* Checkboxes */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("isFeatured")} />
            Featured Product
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("isPublished")} />
            Publish Product
          </label>
        </div>

        {/* Submit */}
        <button className="bg-black text-white px-6 py-2 rounded hover:opacity-90">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
