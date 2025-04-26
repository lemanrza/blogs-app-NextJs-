"use client"
import { Home, FileText, MessageCircle, Users, LogOut, Sun } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname()
  const isActive = (path: string) => path === pathname;

  return (
    <aside className="h-screen w-64 border-r dark:bg-black bg-white flex flex-col justify-between p-4">
      <div>
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

        <nav className="flex flex-col gap-2">
          <Link
            href="/admin"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${isActive("/admin/dashboard") ? "dark:bg-white" : "dark:text-white"} text-gray-700  dark:hover:bg-gray-600 hover:bg-gray-100 transition`}
          >
            <Home size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/admin/blogs"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${isActive("/admin/blogs") ? "bg-gray-100" : "dark:text-white"} text-gray-700 dark:hover:bg-gray-600 hover:bg-gray-100 transition`}
          >
            <FileText size={20} />
            <span>Blogs</span>
          </Link>
          <Link
            href="/admin/comments"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${isActive("/admin/comments") ? "bg-gray-100" : "dark:text-white"}  text-gray-700 dark:hover:bg-gray-600 hover:bg-gray-100 transition`}
          >
            <MessageCircle size={20} />
            <span>Comments</span>
          </Link>
          <Link
            href="/admin/contact"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${isActive("/admin/contact") ? "bg-gray-100" : "dark:text-white"} text-gray-700 dark:hover:bg-gray-600 hover:bg-gray-100 transition`}
          >
            <Users size={20} />
            <span>Contacts</span>
          </Link>
        </nav>
      </div>

      <div className="flex gap-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg dark:text-white text-gray-700 dark:hover:bg-gray-500 transition"
        >
          <LogOut size={20} />
          <span>Back to Site</span>
        </Link>
        <button
          className="flex items-center gap-3 px-3 py-2 rounded-lg dark:text-white text-gray-700 transition"
        >
          <ModeToggle />
        </button>
      </div>
    </aside>
  );
}
