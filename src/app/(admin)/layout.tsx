import Sidebar from "@/components/ui/admin/Sidebar";
import React, { ReactNode} from "react";


const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <div className="min-h-screen bg-[#f6f6f6]">
        <Sidebar />
        <div className="min-h-screen bg-[#f6f6f6] pt-16 lg:ml-72 lg:pt-0">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AdminLayout;
