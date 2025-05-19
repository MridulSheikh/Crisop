'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Package,
  ShoppingCart,
  Users,
  Tag,
  BadgePercent,
  Boxes,
  Warehouse,
  Settings,
  LogOut,
} from 'lucide-react'

const Sidebar = () => {
  const pathname = usePathname()

  const links = [
    { href: '/admin/product', label: 'Products', icon: Package },
    { href: '/admin/order', label: 'Orders', icon: ShoppingCart },
    { href: '/admin/customer', label: 'Customers', icon: Users },
    { href: '/admin/category', label: 'Categories', icon: Tag },
    { href: '/admin/coupon', label: 'Coupons', icon: BadgePercent },
    { href: '/admin/stock', label: 'Stock', icon: Boxes },
    { href: '/admin/warehouse', label: 'Warehouse', icon: Warehouse },
    { href: '/admin/team', label: 'Manage Team', icon: Settings },
  ]

  return (
    <aside className="w-64 min-h-screen bg-[#f6f6f6] p-4 flex flex-col justify-between">
      <div>
        <div className="w-[120px] h-[60px] relative mb-8">
          <Image
            src="/img/logo.png"
            alt="logo"
            layout="fill"
            className="object-contain"
          />
        </div>

        <nav className="space-y-1">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition text-sm font-medium ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="pt-4 border-t mt-6">
        <button
          onClick={() => {
            // Replace this with your actual logout logic
            console.log('Logging out...')
          }}
          className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg transition text-sm font-medium text-red-600 hover:bg-red-100"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
