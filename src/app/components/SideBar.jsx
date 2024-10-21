"use client";

import { useState } from "react";
import {
  FaBars,
  FaUser,
  FaSignOutAlt,
  FaClipboardList,
  FaBusAlt,
} from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { usePathname } from "next/navigation";
import Link from "next/link";

const menuItems = [
  { icon: <AiFillHome />, label: "Dashboard", href: "/dashboard" },
  { icon: <FaClipboardList />, label: "Laporan", href: "/reports" },
  { icon: <FaBusAlt />, label: "Hasil Deteksi", href: "/streams" },
];

export default function SideBar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  const pathname = usePathname();

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <FaBars className="w-6 h-6" />
              <span className="sr-only">Open sidebar</span>
            </button>

            <a href="/dashboard" className="flex items-center">
              <img
                src="/images/logo.svg"
                className="h-12 ml-4"
                alt="FlowBite Logo"
              />
            </a>
          </div>

          <div className="relative">
            <button
              onClick={() => setProfileOpen(!isProfileOpen)}
              className="flex center text-sm rounded-full focus:ring-4 focus:ring-slate-200 dark:focus:ring-gray-600">
              <img
                src="/images/logo-circle.svg"
                alt="profile"
                height={42}
                width={42}
              />
              <span className="sr-only">Open user menu</span>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600">
                <div className="px-4 py-3">
                  <p className="text-sm text-gray-900 dark:text-white font-bold">
                    Afix Vega Praditya
                  </p>
                  <p className="text-sm font-medium text-gray-500 truncate dark:text-gray-300">
                    afix@gmail.com
                  </p>
                </div>
                <ul className="py-1">
                  <li>
                    <Link
                      href="/"
                      className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">
                      <FaSignOutAlt className="me-2" /> Sign out
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <ul className="space-y-1 font-medium mt-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`flex items-center py-4 px-3 rounded-lg  ${
                    pathname === item.href
                      ? "bg-[#2F4674] text-white hover:opacity-80"
                      : "text-slate-400  hover:bg-gray-100"
                  }`}>
                  {item.icon}
                  <span className="ms-3">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
