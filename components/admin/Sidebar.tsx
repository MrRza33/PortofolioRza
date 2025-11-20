"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  Briefcase, 
  PenTool, 
  Image as ImageIcon, 
  Users, 
  Settings, 
  LogOut, 
  Layers, 
  Hexagon,
  FileText
} from "lucide-react";
import { cn } from "../../lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin" },
  { icon: Briefcase, label: "Projects", href: "/admin/projects" },
  { icon: PenTool, label: "Blog Posts", href: "/admin/blog" },
  { icon: Layers, label: "Experience", href: "/admin/experience" },
  { icon: Hexagon, label: "Brands", href: "/admin/brands" },
  { icon: ImageIcon, label: "Media", href: "/admin/media" },
  { icon: FileText, label: "Pages", href: "/admin/pages" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen sticky top-0 border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col">
      <div className="p-6 border-b border-gray-100 dark:border-zinc-800">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-lg flex items-center justify-center">
            <span className="text-sm">V</span>
          </div>
          <span>Admin</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer",
                isActive 
                  ? "bg-gray-100 dark:bg-zinc-900 text-black dark:text-white" 
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-900/50 hover:text-black dark:hover:text-white"
              )}
            >
              <Icon size={18} className={isActive ? "text-black dark:text-white" : "text-gray-400 dark:text-gray-500"} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100 dark:border-zinc-800">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}