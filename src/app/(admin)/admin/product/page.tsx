"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AddProduct from "@/components/ui/admin/products/AddProduct";
import EditProduct from "@/components/ui/admin/products/EditeProductModal";
import DeleteProductAlert from "@/components/ui/admin/products/DeleteProductAlert";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: "active" | "inactive";
  image: string;
};

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch your real data here
    setProducts([
      {
        id: "1",
        name: "Fresh Apple",
        price: 1.99,
        stock: 50,
        status: "active",
        image: "/img/apple.jpg",
      },
      {
        id: "2",
        name: "Organic Milk",
        price: 2.49,
        stock: 20,
        status: "inactive",
        image: "/img/milk.jpg",
      },
    ]);
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Products</h1>
        <AddProduct />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3 border-b">Image</th>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Price</th>
              <th className="p-3 border-b">Stock</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 transition duration-150"
              >
                <td className="p-3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="rounded object-cover"
                  />
                </td>
                <td className="p-3 font-medium text-gray-800">
                  {product.name}
                </td>
                <td className="p-3 text-gray-600">
                  ${product.price.toFixed(2)}
                </td>
                <td className="p-3 text-gray-600">{product.stock}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      product.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="p-3 text-right space-x-2">
                  <EditProduct
                    product={{
                      name: product.name,
                      description: "",
                      category: "",
                      stockLocation: "",
                      status: "draft",
                      regularPrice: product.price.toString(),
                      discountPrice: undefined,
                      images: product.image,
                    }}
                  />
                  <DeleteProductAlert />
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
