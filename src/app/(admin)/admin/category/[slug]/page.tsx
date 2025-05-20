'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Product = {
  id: string
  name: string
  price: number
  status: 'in-stock' | 'out-of-stock'
  category: string
}

export default function CategoryDetailPage() {
  const { categorySlug } = useParams()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // Replace this with your actual API call to fetch category-wise products
    const allProducts: Product[] = [
      {
        id: 'P001',
        name: 'Smartphone',
        price: 299.99,
        status: 'in-stock',
        category: 'electronics',
      },
      {
        id: 'P002',
        name: 'Laptop',
        price: 899.0,
        status: 'out-of-stock',
        category: 'electronics',
      },
      {
        id: 'P003',
        name: 'Shampoo',
        price: 8.99,
        status: 'in-stock',
        category: 'beauty',
      },
    ]

    const categoryProducts = allProducts.filter(
      (product) => product.category === categorySlug
    )

    setProducts(categoryProducts)
  }, [categorySlug])

  const getStatusBadge = (status: Product['status']) => {
    const styles = {
      'in-stock': 'bg-green-100 text-green-700',
      'out-of-stock': 'bg-red-100 text-red-700',
    }

    return (
      <span className={`px-2 py-1 text-xs rounded-full ${styles[status]}`}>
        {status.replace('-', ' ')}
      </span>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <Link href="/admin/category" className="text-blue-600 hover:underline text-sm">
          ← Back to Categories
        </Link>
      </div>

      <h1 className="text-2xl font-semibold capitalize mb-2">{categorySlug}</h1>
      <p className="text-sm text-gray-600 mb-6">
        Total Products: {products.length}
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3 border-b">Product ID</th>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Price</th>
              <th className="p-3 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="p-3">{product.id}</td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">${product.price.toFixed(2)}</td>
                <td className="p-3">{getStatusBadge(product.status)}</td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No products found in this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
