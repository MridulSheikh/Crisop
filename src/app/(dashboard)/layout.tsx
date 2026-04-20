"use client";

import React from "react";
import Footer from "@/components/ui/layout/Navbar/Footer";
import NavBar from "@/components/ui/layout/Navbar/NavBar";

const Dashboard = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <NavBar />

      {/* Main Content */}
      <main className="pt-20 bg-[#f6f6f6]">

        {/* Main Content Area */}
        <section className="p-6 w-full">{children}</section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
