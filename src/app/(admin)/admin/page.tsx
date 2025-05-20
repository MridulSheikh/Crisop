// app/admin/page.tsx
import { redirect } from "next/navigation";

export default function AdminPage() {
  // You can conditionally redirect based on role or preference
  redirect("/admin/product"); // or "/admin/orders"
}
