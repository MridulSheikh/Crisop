"use client";

import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import { Button } from "../../button";
import { TiShoppingCart } from "react-icons/ti";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const navigationData = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Categories",
    link: "/categories",
  },
  {
    name: "Products",
    link: "/products",
  },
  {
    name: "Flash Sale",
    link: "/flash-sale",
  },
  {
    name: "About us",
    link: "/about-us",
  },
  {
    name: "Contuct us",
    link: "/contuct-us",
  },
];

const NavBar: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [user, setUser] = useState<boolean>(true);
  const pathname = usePathname();
  return (
    <div
      className={cn("py-5 z-50 w-full top-0 ", {
        "bg-[#EFEEEE] ": isOpen || pathname != "/",
        "absolute ": pathname === "/",
      })}>
      <div className=" max-w-screen-xl mx-auto px-5 flex justify-between items-center">
        <div className=" w-[150px] h-[50px] relative">
          <Image
            src={"/img/logo.png"}
            alt="logo"
            fill
            className=" object-contain object-center"
          />
        </div>
        <ul className="  hidden lg:flex justify-center  items-center gap-x-7 h-full list-none">
          {navigationData.map((dt, i) => (
            <li key={i} className=" relative">
              <Link
                href={dt.link}
                className={cn(
                  " ease-in-out duration-300 font-semibold hover:text-[#F76364] after:content-[''] after:bg-[#F76364] after:h-[3px] after:w-[0%] after:left-0 after:-bottom-[5px] after:rounded-xl after:absolute after:duration-300",
                  {
                    "after:w-[100%] text-[#F76364] duration-300":
                      pathname === dt.link,
                  }
                )}>
                {dt.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className=" flex gap-x-4 items-center">
          <Link href={"/cart"} className="hidden lg:inline-block">
            <Button variant={"ghost"} className="relative">
              <div className=" absolute size-4 text-xs rounded-full top-0 right-0 bg-[#F76364] text-white">
                12
              </div>
              <TiShoppingCart className=" text-2xl" />
            </Button>
          </Link>
          {user ? (
            <UserAvatar className="hidden lg:inline-block mx-auto size-10 " />
          ) : (
            <Button className=" hidden lg:inline-block rounded-full">
              {" "}
              Login{" "}
            </Button>
          )}

          <Button
            onClick={() => setIsOpen((prev) => !prev)}
            variant={"ghost"}
            className=" lg:hidden">
            {isOpen ? (
              <MdClose className=" text-3xl" />
            ) : (
              <HiMenuAlt3 className=" text-3xl" />
            )}
          </Button>
        </div>
      </div>
      <motion.div
        variants={{
          visible: { x: 0, opacity: "100%" },
          hidden: { x: "1000%", display: "none" },
        }}
        initial={{ x: "1000%" }}
        animate={!isOpen ? "hidden" : "visible"}
        transition={{
          duration: 0.35,
          ease: "easeInOut",
          opacity: {
            duration: 0.8,
          },
        }}
        className="mt-5 lg:hidden overflow-hidden">
        <ul className="text-lg pb-5 text-center">
          {navigationData.map((dt, i) => (
            <li
              key={i}
              className=" hover:text-[#F76364] ease-in-out duration-300 hover:font-bold font-semibold px-5 py-4 bg-[#EFEEEE]">
              <Link href={dt.link}>{dt.name}</Link>
            </li>
          ))}
        </ul>
        <div className=" px-5 text-center">
          {user ? (
            <div className="">
              <UserAvatar className="mx-auto size-14 mb-5" />
              <Link href={"/cart"} className="mx-auto">
                <Button variant={"ghost"} className="relative">
                  <div className=" absolute size-4 text-xs rounded-full top-0 right-0 bg-[#F76364] text-white">
                    12
                  </div>
                  <TiShoppingCart className=" text-4xl" />
                </Button>
              </Link>
            </div>
          ) : (
            <Button className="w-full"> Login </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default NavBar;
