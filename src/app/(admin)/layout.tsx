import Sidebar from "@/components/ui/admin/Sidebar";
import React, { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen bg-[#f9f9f9]">
      <Sidebar />
      <div className="flex-1 h-screen overflow-y-scroll bg-white">{children}</div>
    </main>
  );
};

export default AdminLayout;

