"use client";

import React from "react";
import Link from "next/link";
import { User, CreditCard, ShoppingBag, ShoppingCart } from "lucide-react"; // Icons
import Footer from "@/components/ui/layout/Navbar/Footer";
import NavBar from "@/components/ui/layout/Navbar/NavBar";

const Dashboard = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const menuItems = [
    { name: "Profile", href: "/profile", icon: <User size={18} /> },
    { name: "Cart", href: "/cart", icon: <ShoppingCart size={18} /> },
    { name: "Order", href: "/order", icon: <ShoppingBag size={18} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <NavBar />

      {/* Main Content */}
      <main className="flex flex-1 max-w-screen-xl w-full mx-auto px-5 py-6 gap-6">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow p-5 flex flex-col gap-3">
          <h2 className="text-lg font-semibold mb-3">Dashboard</h2>

          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition text-gray-800 dark:text-gray-100"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <section className="p-6 w-full">
          {children}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
