'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

type Order = {
  id: string
  customer: string
  date: string
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled'
  total: number
}

export default function CustomerDetailPage() {
  const params = useParams()

  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    // Replace this with your actual API call filtered by customer
    const allOrders: Order[] = [
      {
        id: 'CUS-001',
        customer: 'Alice Smith',
        date: '2025-05-18',
        status: 'pending',
        total: 49.99,
      },
      {
        id: 'CUS-002',
        customer: 'Alice Smith',
        date: '2025-05-10',
        status: 'delivered',
        total: 25.5,
      },
      {
        id: 'ORD-002',
        customer: 'John Doe',
        date: '2025-05-17',
        status: 'shipped',
        total: 89.5,
      },
    ]

    const customerOrders = allOrders.filter(
      (order) => order.id === params.id
    )

    setOrders(customerOrders)
  }, [params])

  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0)

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
    <div className="p-6">
      <div className="mb-4">
        <Link
          href="/admin/customer"
          className="text-blue-600 hover:underline text-sm"
        >
          ← Back to Customers
        </Link>
      </div>

      <h1 className="text-2xl font-semibold mb-2">{orders[0]?.customer}</h1>

      <p className="text-sm text-gray-600 mb-6">
        Orders: {orders.length} | Total Spent: ${totalSpent.toFixed(2)}
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3 border-b">Order ID</th>
              <th className="p-3 border-b">Date</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Total</th>
              <th className="p-3 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.date}</td>
                <td className="p-3">{getStatusBadge(order.status)}</td>
                <td className="p-3">${order.total.toFixed(2)}</td>
                <td className="p-3 text-right">
                  <Link
                    href={`/admin/order/${order.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Order
                  </Link>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No orders found for this customer.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
