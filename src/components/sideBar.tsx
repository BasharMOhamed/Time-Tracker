"use client";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { Clock, Folder, BarChart2, Settings } from "lucide-react";
import clsx from "clsx";

const navItems = [
  { name: "Time Log", href: "/dashboard", icon: Clock },
  { name: "Projects", href: "/projects", icon: Folder },
  { name: "Reports", href: "/reports", icon: BarChart2 },
  { name: "Settings", href: "/settings", icon: Settings },
];
const SideBar = () => {
  const pathname = usePathname();
  return (
    <aside className="w-64 min-h-screen bg-[#153055] text-white p-4">
      <div className="text-xl font-bold mb-6">🕒 TimeTrack</div>
      <nav className="flex flex-col gap-2">
        {navItems.map(({ name, href, icon: Icon }) => (
          <Link
            key={name}
            href={href}
            className={clsx(
              "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#2e4e71] transition-colors",
              pathname === href && "bg-[#2e4e71]"
            )}
          >
            <Icon className="h-5 w-5" />
            <span>{name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;
