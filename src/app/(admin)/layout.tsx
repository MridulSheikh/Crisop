"use client";
import Sidebar from "@/components/ui/admin/Sidebar";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(useCurrentUser);
  const router = useRouter();
  useEffect(() => {
    const allowedRules = ["admin", "manager"];
    if (!allowedRules.includes(user?.role as string)) {
      return router.push("/login")
    }
  }, [user?.role, router]);

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
