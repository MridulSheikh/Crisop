'use client'

import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'
import Link from 'next/link'

type Order = {
  id: string
  customer: string
  date: string
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled'
  total: number
}

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    // Replace this with your real API call
    setOrders([
      {
        id: 'ORD-001',
        customer: 'Alice Smith',
        date: '2025-05-18',
        status: 'pending',
        total: 49.99,
      },
      {
        id: 'ORD-002',
        customer: 'John Doe',
        date: '2025-05-17',
        status: 'shipped',
        total: 89.5,
      },
      {
        id: 'ORD-003',
        customer: 'Maria Wilson',
        date: '2025-05-15',
        status: 'delivered',
        total: 24.75,
      },
    ])
  }, [])

  const getStatusBadge = (status: Order['status']) => {
    const styles: Record<Order['status'], string> = {
      pending: 'bg-yellow-100 text-yellow-700',
      shipped: 'bg-blue-100 text-blue-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700',
    }
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${styles[status]}`}>
        {status}
      </span>
    )
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Orders</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3 border-b">Order ID</th>
              <th className="p-3 border-b">Customer</th>
              <th className="p-3 border-b">Date</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Total</th>
              <th className="p-3 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50 transition duration-150"
              >
                <td className="p-3 font-medium text-gray-800">{order.id}</td>
                <td className="p-3 text-gray-600">{order.customer}</td>
                <td className="p-3 text-gray-600">{order.date}</td>
                <td className="p-3">{getStatusBadge(order.status)}</td>
                <td className="p-3 text-gray-600">${order.total.toFixed(2)}</td>
                <td className="p-3 text-right">
                  <Link
                    href={`/admin/order/${order.id}`}
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
                  >
                    <Eye size={16} />
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
