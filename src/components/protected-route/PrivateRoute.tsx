"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import LoadingScreen from "../shared/loadingui/LoadingScreen";

const allowedRoles = ["admin", "manager", "super"];

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const token = useAppSelector((state) => state.auth.token);
  const role = useAppSelector((state) => state.auth.user?.role);

  const isAdminRoute = pathname.startsWith("/admin");
  const isAllowedAdmin = !!role && allowedRoles.includes(role);

  useEffect(() => {
    if (!token) {
      router.replace(`/login?redirect=${pathname}`);
      return;
    }

    if (isAdminRoute && !isAllowedAdmin) {
      router.replace("/");
      return;
    }
  }, [token, pathname, isAdminRoute, isAllowedAdmin, router]);

  if (!token || (isAdminRoute && (!isAllowedAdmin))) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
