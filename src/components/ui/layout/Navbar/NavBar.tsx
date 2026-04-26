"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../../button";
import { FiShoppingCart } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import ProductSearchBar from "../../products/ProductSearchBar";
import { ClipboardList, Heart, ShoppingBag, ShoppingCart } from "lucide-react";

const navigationData = [{ name: "Shop", link: "/shop" }];
const bottomNav = [
  { name: "Shop", link: "/shop", icon: ShoppingBag },
  { name: "Cart", link: "/cart", icon: ShoppingCart },
  { name: "Orders", link: "/order", icon: ClipboardList },
  { name: "Wishlist", link: "/wishlist", icon: Heart },
];


const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.products);

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
    <>
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
      <div className="max-w-screen-2xl mx-auto px-5 flex justify-between items-center py-2 lg:py-4 gap-x-2 lg:gap-x-5">
        {/* LEFT */}
        <div className="flex items-center gap-x-5">
          <Link href={"/"}>
            <div className="w-[90px] h-[45px] lg:w-[140px] lg:h-[45px] relative">
              <Image
                src={"/img/logo.png"}
                alt="logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-x-2 lg:gap-x-5 lg:w-full">
          {/* 🔥 SEARCH BAR CONDITION */}
          {showSearch && (
            <div className="w-full ">
              <ProductSearchBar />
            </div>
          )}

          <ul className="items-center gap-x-8 ml-auto hidden lg:flex">
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

          {/* Wishlist */}
          <Link href="/wishlist" className="hidden lg:block">
            <div className="relative">
              <Heart className="text-2xl" />
              {wishlistItems?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlistItems?.length}
                </span>
              )}
            </div>
          </Link>

          {/* Cart */}
          <Link href="/cart" className="hidden lg:block">
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
              className="inline-block size-9"
              userName={user.name}
            />
          ) : (
            <Link href="/login">
              <Button className="hidden lg:inline-block rounded-full">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
     <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md md:hidden flex justify-around items-center py-2 z-50">
        {bottomNav.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.link}
              href={item.link}
              className={cn(
                "flex flex-col items-center text-xs",
                pathname === item.link ? "text-green-600" : "text-gray-500"
              )}
            >
              <div className="relative">
                <Icon size={20} />

                {item.name === "Cart" && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}

                {item.name === "Wishlist" && wishlistItems?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {wishlistItems.length}
                  </span>
                )}
              </div>

              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* spacing for bottom nav */}
      <div className="h-16 md:hidden" />
    </>
  );
};

export default NavBar;
