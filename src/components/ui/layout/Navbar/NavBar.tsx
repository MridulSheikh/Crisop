"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../../button";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import ProductSearchBar from "../../products/ProductSearchBar";

const navigationData = [
  { name: "Home", link: "/" },
  { name: "Shop", link: "/shop" },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const cartItems = useAppSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const user = useAppSelector(useCurrentUser);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const currentScrollY = window.scrollY;

    // Initialize states
    setScrolled(currentScrollY > 20);
    // Set initial search bar visibility
    setShowSearch(isHome ? currentScrollY > 120 : true);

    let lastScrollY = currentScrollY;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // 1. Logic for Navbar visibility (always run)
      setScrolled(scrollY > 20);
      if (scrollY > lastScrollY && scrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      // 2. Logic for Search Bar visibility
      // On home, only show > 120px. On other pages, keep it visible (true)
      if (isHome) {
        setShowSearch(scrollY > 120);
      } else {
        setShowSearch(true);
      }

      lastScrollY = scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <motion.div
      initial={false}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={
        showNavbar ? { duration: 0.3, ease: "easeInOut" } : { duration: 0 }
      }
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all bg-[#f6f6f6]",
        {
          "bg-transparent": !scrolled && !isOpen && isHome,
          "bg-white/90 backdrop-blur-md shadow-sm": scrolled || isOpen,
        },
      )}
    >
      <div className="max-w-screen-2xl mx-auto px-5 flex justify-between items-center py-4 gap-x-5">
        {/* LEFT */}
        <div className="flex items-center gap-x-5">
          <div className="w-[140px] h-[45px] relative">
            <Image
              src={"/img/logo.png"}
              alt="logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-x-5 w-full">
          {/* 🔥 SEARCH BAR CONDITION */}
          {showSearch && (
            <div className="w-full">
              <ProductSearchBar />
            </div>
          )}

          <ul className="hidden lg:flex items-center gap-x-8 ml-auto">
            {navigationData.map((item) => (
              <li key={item.link}>
                <Link
                  href={item.link}
                  className={cn(
                    "font-semibold transition hover:text-green-700",
                    pathname === item.link && "text-green-700",
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* CART */}
          <Link href="/cart">
            <div className="relative">
              <FiShoppingCart className="text-2xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>

          {/* USER */}
          {user ? (
            <UserAvatar
              className="hidden lg:inline-block size-9"
              userName={user.name}
            />
          ) : (
            <Link href="/login">
              <Button className="hidden lg:inline-block rounded-full">
                Login
              </Button>
            </Link>
          )}

          {/* MOBILE */}
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant="ghost"
            className="lg:hidden"
          >
            {isOpen ? (
              <MdClose className="text-3xl" />
            ) : (
              <HiMenuAlt3 className="text-3xl" />
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default NavBar;
