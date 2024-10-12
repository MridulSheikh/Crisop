import NavBar from "@/components/ui/layout/Navbar/NavBar";
import React from "react";

const NormalLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
    </div>
  );
};

export default NormalLayout;
