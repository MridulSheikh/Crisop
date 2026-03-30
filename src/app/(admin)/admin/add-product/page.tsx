"use client";

import React from "react";
import SelectStockCommand from "@/components/shared/command/SelectStockCommad";
import { useForm, Controller } from "react-hook-form";

type FormValues = {
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  category: string;
  stock: string;
  tags: string;
  images: FileList;
  isFeatured: boolean;
  isPublished: boolean;
};

const AddProductPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      discountPrice: 0,
      category: "",
      stock: "",
      tags: "",
      isFeatured: false,
      isPublished: true,
    },
  });

  /* ---------------- Submit ---------------- */
  const onSubmit = (data: FormValues) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", String(data.price));
    formData.append("discountPrice", String(data.discountPrice));
    formData.append("category", data.category);
    formData.append("stock", data.stock);

    /* tags -> array */
    if (data.tags) {
      const tagsArray = data.tags.split(",").map((tag) => tag.trim());
      tagsArray.forEach((tag) => formData.append("tags", tag));
    }

    /* multiple images */
    if (data.images) {
      Array.from(data.images).forEach((file) => {
        formData.append("images", file);
      });
    }

    formData.append("isFeatured", String(data.isFeatured));
    formData.append("isPublished", String(data.isPublished));

    console.log("Final FormData:", formData);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Product Name */}
        <div>
          <label className="block mb-1">Product Name</label>
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
          <label className="block mb-1">Description</label>
          <textarea
            {...register("description")}
            className="w-full border p-2 rounded"
            placeholder="Write product description..."
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1">Price</label>
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

        {/* Discount Price */}
        <div>
          <label className="block mb-1">Discount Price</label>
          <input
            type="number"
            {...register("discountPrice")}
            className="w-full border p-2 rounded"
            placeholder="900"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select category</option>
            <option value="electronics">Electronics</option>
            <option value="food">Food</option>
            <option value="clothing">Clothing</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Stock Select (IMPORTANT PART) */}
        <div>
          <Controller
            name="stock"
            control={control}
            rules={{ required: "Select a stock item" }}
            render={({ field }) => (
              <SelectStockCommand
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          {errors.stock && (
            <p className="text-red-500 text-sm">{errors.stock.message}</p>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-1">Tags (comma separated)</label>
          <input
            {...register("tags")}
            className="w-full border p-2 rounded"
            placeholder="iphone, apple, mobile"
          />
        </div>

        {/* Images */}
        <div>
          <label className="block mb-1">Product Images</label>
          <input
            type="file"
            multiple
            {...register("images", {
              required: "At least one image is required",
            })}
            className="w-full border p-2 rounded"
          />
          {errors.images && (
            <p className="text-red-500 text-sm">{errors.images.message}</p>
          )}
        </div>

        {/* Featured */}
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("isFeatured")} />
          <label>Featured Product</label>
        </div>

        {/* Published */}
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("isPublished")} />
          <label>Publish Product</label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded hover:opacity-90"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;