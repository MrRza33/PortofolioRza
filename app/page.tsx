import { redirect } from "next/navigation";

export default function Home() {
  // Automatically redirect root to admin login for this demo
  redirect("/admin/login");
}