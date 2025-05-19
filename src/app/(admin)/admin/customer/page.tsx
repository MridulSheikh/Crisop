'use client'

import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'
import Link from 'next/link'

type Customer = {
  id: string
  name: string
  email: string
  joinDate: string
  totalOrders: number
}

const CustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([])

  useEffect(() => {
    // Replace with your API call
    setCustomers([
      {
        id: 'CUS-001',
        name: 'Alice Smith',
        email: 'alice@example.com',
        joinDate: '2025-04-20',
        totalOrders: 5,
      },
      {
        id: 'CUS-002',
        name: 'John Doe',
        email: 'john@example.com',
        joinDate: '2025-03-15',
        totalOrders: 2,
      },
    ])
  }, [])

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Customers</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Join Date</th>
              <th className="p-3 border-b">Total Orders</th>
              <th className="p-3 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="hover:bg-gray-50 transition duration-150"
              >
                <td className="p-3 font-medium text-gray-800">{customer.name}</td>
                <td className="p-3 text-gray-600">{customer.email}</td>
                <td className="p-3 text-gray-600">{customer.joinDate}</td>
                <td className="p-3 text-gray-600">{customer.totalOrders}</td>
                <td className="p-3 text-right">
                  <Link
                    href={`/admin/customer/${customer.id}`}
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
                  >
                    <Eye size={16} />
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CustomersPage;