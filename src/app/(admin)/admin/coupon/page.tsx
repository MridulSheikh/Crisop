'use client'

import { useEffect, useState } from 'react'
import { Edit, Eye, Plus } from 'lucide-react'
import Link from 'next/link'

type Coupon = {
  id: string
  code: string
  description: string
  discount: string // e.g., "10%" or "$5"
  expiryDate: string // ISO date string
  active: boolean
}

const CouponsPage = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([])

  useEffect(() => {
    // Replace with your API call
    setCoupons([
      {
        id: 'cpn-001',
        code: 'SPRING10',
        description: '10% off spring sale',
        discount: '10%',
        expiryDate: '2025-06-30',
        active: true,
      },
      {
        id: 'cpn-002',
        code: 'WELCOME5',
        description: '$5 off for new customers',
        discount: '$5',
        expiryDate: '2025-12-31',
        active: true,
      },
      {
        id: 'cpn-003',
        code: 'SUMMER15',
        description: '15% off summer special',
        discount: '15%',
        expiryDate: '2024-08-15',
        active: false,
      },
    ])
  }, [])

  // Helper to format date nicely
  function formatDate(dateStr: string) {
    const d = new Date(dateStr)
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Coupon</h1>
        <Link
          href="/admin/product/coupon"
          className="inline-flex items-center gap-2 bg-black text-white text-sm px-4 py-2 rounded-md hover:opacity-90"
        >
          <Plus size={16} /> Add Coupon
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3 border-b">Code</th>
              <th className="p-3 border-b">Description</th>
              <th className="p-3 border-b">Discount</th>
              <th className="p-3 border-b">Expiry Date</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr
                key={coupon.id}
                className="hover:bg-gray-50 transition duration-150"
              >
                <td className="p-3 font-medium text-gray-800">{coupon.code}</td>
                <td className="p-3 text-gray-600">{coupon.description}</td>
                <td className="p-3 text-gray-600">{coupon.discount}</td>
                <td className="p-3 text-gray-600">{formatDate(coupon.expiryDate)}</td>
                <td className={`p-3 font-semibold ${
                  coupon.active ? 'text-green-600' : 'text-red-600'
                }`}>
                  {coupon.active ? 'Active' : 'Expired'}
                </td>
                <td className="p-3 text-right space-x-3">
                  <Link
                    href={`/admin/coupon/${coupon.id}`}
                    className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    <Eye size={16} />
                    View
                  </Link>
                  <Link
                    href={`/admin/coupon/edit/${coupon.id}`}
                    className="inline-flex items-center gap-1 text-green-600 hover:underline"
                  >
                    <Edit size={16} />
                    Edit
                  </Link>
                </td>
              </tr>
            ))}

            {coupons.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No coupons found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CouponsPage;