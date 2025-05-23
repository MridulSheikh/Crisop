"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import Link from "next/link";
import AddCategory from "@/components/ui/admin/category/AddCategory";
import EditCategoryModal from "@/components/ui/admin/category/EditeCategoryModal";
import DeleteCategoryAlert from "@/components/ui/admin/category/DeleteCategoryConfirmModal";

type Category = {
  id: string;
  name: string;
  description: string;
  productCount: number;
};

const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Replace with your real API call
    setCategories([
      {
        id: "cat-001",
        name: "Fruits",
        description: "Fresh and organic fruits",
        productCount: 25,
      },
      {
        id: "cat-002",
        name: "Vegetables",
        description: "Seasonal and fresh vegetables",
        productCount: 40,
      },
      {
        id: "cat-003",
        name: "Dairy",
        description: "Milk, cheese, and other dairy products",
        productCount: 15,
      },
    ]);
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Categories</h1>
        <AddCategory onAdd={(data) => {console.log(data)}} />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Description</th>
              <th className="p-3 border-b">Products</th>
              <th className="p-3 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id}
                className="hover:bg-gray-50 transition duration-150"
              >
                <td className="p-3 font-medium text-gray-800">
                  {category.name}
                </td>
                <td className="p-3 text-gray-600">{category.description}</td>
                <td className="p-3 text-gray-600">{category.productCount}</td>
                <td className="p-3 text-right flex justify-end space-x-3">
                  <Link
                    href={`/admin/category/${category.id}`}
                    className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    <Eye size={16} />
                    View
                  </Link>
                  <EditCategoryModal />
                  <DeleteCategoryAlert />
                </td>
              </tr>
            ))}

            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryPage;
