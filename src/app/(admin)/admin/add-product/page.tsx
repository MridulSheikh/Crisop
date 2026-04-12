"use client";

import React, { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";

import ImgUpload from "@/components/shared/imgUpload/ImgUpload";
import StockSelect from "./StockSelect";
import ProductTagInput from "./ProductTagInput";
import CategorySelect from "./CategorySelect";
import TiptapEditor from "@/components/shared/TiptapEditor";

type FormValues = {
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  category: string;
  stock: string;
  tags: string[];
  images: File[];
  isFeatured: boolean;
  isPublished: boolean;
};

const AddProductPage = () => {
  const isDiscountTouched = useRef(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      discountPrice: 0,
      category: "",
      stock: "",
      tags: [],
      images: [],
      isFeatured: false,
      isPublished: true,
    },
  });

  const price = watch("price");

  // ✅ Auto sync price → discountPrice (only if admin didn't override)
  useEffect(() => {
    if (!isDiscountTouched.current) {
      setValue("discountPrice", price || 0);
    }
  }, [price, setValue]);

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", String(data.price));
    formData.append("discountPrice", String(data.discountPrice));
    formData.append("category", data.category);
    formData.append("stock", data.stock);

    // ✅ tags array
    data.tags.forEach((tag) => {
      formData.append("tags", tag);
    });

    // ✅ images
    data.images.forEach((file) => {
      formData.append("images", file);
    });

    formData.append("isFeatured", String(data.isFeatured));
    formData.append("isPublished", String(data.isPublished));

    console.log("Final FormData:");
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    reset();
  };

  return (
    <div className="p-6 mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 grid lg:grid-cols-2 gap-x-10"
      >
        <div className=" flex flex-col gap-y-5">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Product Name</label>
            <input
              {...register("name", { required: "Product name is required" })}
              className="w-full border p-2 rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TiptapEditor value={field.value} onChange={field.onChange} />
              )}
            />
          </div>
        </div>
        <div className=" flex flex-col gap-y-5">
          {/* Price */}
          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              min="0"
              type="number"
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price cannot be negative" },
              })}
              className="w-full border p-2 rounded"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

          {/* Discount Price */}
          <div>
            <label className="block mb-1 font-medium">Discount Price</label>
            <input
              min="0"
              type="number"
              {...register("discountPrice", {
                min: { value: 0, message: "Cannot be negative" },
              })}
              onChange={() => {
                isDiscountTouched.current = true; // 👈 user override detected
              }}
              className="w-full border p-2 rounded"
            />
            {errors.discountPrice && (
              <p className="text-red-500 text-sm">
                {errors.discountPrice.message}
              </p>
            )}
          </div>
          {/* Category */}
          <div>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Select category" }}
              render={({ field }) => <CategorySelect {...field} />}
            />

            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          {/* Stock */}
          <div>
            <Controller
              name="stock"
              control={control}
              rules={{ required: "Select stock" }}
              render={({ field }) => <StockSelect {...field} />}
            />
            {errors.stock && (
              <p className="text-red-500 text-sm">{errors.stock.message}</p>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block mb-1 font-medium">Tags</label>

            <Controller
              name="tags"
              control={control}
              rules={{ required: "At least 1 tag required" }}
              render={({ field }) => (
                <ProductTagInput
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            {errors.tags && (
              <p className="text-red-500 text-sm">{errors.tags.message}</p>
            )}
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
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
