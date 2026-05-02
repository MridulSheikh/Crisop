'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Package,
  ShoppingCart,
  Tag,
  Boxes,
  Warehouse,
  Settings,
  Menu,
  X,
} from 'lucide-react'

const Sidebar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { href: '/admin/product', label: 'Products', icon: Package },
    { href: '/admin/order', label: 'Orders', icon: ShoppingCart },
    { href: '/admin/category', label: 'Categories', icon: Tag },
    { href: '/admin/stock', label: 'Stock', icon: Boxes },
    { href: '/admin/warehouse', label: 'Warehouse', icon: Warehouse },
    { href: '/admin/team', label: 'Manage Team', icon: Settings },
  ]

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const sidebarContent = (
    <>
      <div className="relative mb-8 h-[60px] w-[120px]">
        <Image
          src="/img/logo.png"
          alt="logo"
          fill
          sizes="120px"
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
              className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition ${
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
    </>
  )

  return (
    <>
      <header className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between bg-white px-4 shadow-md lg:hidden">
        <div className="relative h-11 w-[96px]">
          <Image
            src="/img/logo.png"
            alt="logo"
            fill
            sizes="96px"
            className="object-contain"
          />
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
          aria-expanded={isOpen}
          className="inline-flex size-10 items-center justify-center rounded-md text-gray-800 transition hover:bg-gray-100"
        >
          {!isOpen && <Menu size={24} />}
        </button>
      </header>

      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 bg-white p-4 shadow-md transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:block`}
      >
        <div className="mb-4 flex justify-end lg:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
            className="inline-flex size-10 items-center justify-center rounded-md text-gray-800 transition hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        {sidebarContent}
      </aside>
    </>
  )
}

export default Sidebar
