"use client";
import Sidebar from "@/components/ui/admin/Sidebar";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(useCurrentUser);
  const router = useRouter();
  const pathname = usePathname();
  const allowedRules = ["admin", "manager", "super"];
  const isVlaidUser = allowedRules.includes(user?.role as string);
  useEffect(() => {
    if (!user?.email) {
      return router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    } else if (!isVlaidUser) {
      return router.replace(`/`);
    }
  }, [user?.role, router, pathname, user?.email, isVlaidUser]);

  if (!isVlaidUser) {
    return (
      <div className=" h-screen w-screen flex items-center justify-center">
        <ThreeDots
          visible={true}
          height="80"
          width="60"
          color="#4b5563"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen bg-[#f9f9f9]">
      <Sidebar />
      <div className="flex-1 h-screen overflow-y-scroll bg-white">
        {children}
      </div>
    </main>
  );
};

export default AdminLayout;
