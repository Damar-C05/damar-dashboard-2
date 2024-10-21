"use client";

import SideBar from "./SideBar";
import { usePathname } from "next/navigation";

export default function SidebarWrapper() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return <SideBar />;
}
