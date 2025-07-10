"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, Folder, BarChart2, Settings, Menu, LogOut } from "lucide-react";
import clsx from "clsx";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

const navItems = [
  { name: "Time Log", href: "/dashboard", icon: Clock },
  { name: "Projects", href: "/projects", icon: Folder },
  { name: "Reports", href: "/reports", icon: BarChart2 },
  { name: "Settings", href: "/settings", icon: Settings },
];

const SideBar = () => {
  const { status } = useSession();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      {!open && (
        <button
          className="md:hidden fixed top-4 left-4 z-50 bg-[#153055] p-2 rounded-md"
          onClick={() => setOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu className="text-white" />
        </button>
      )}

      {/* Sidebar for desktop and mobile drawer */}
      <aside
        className={clsx(
          "fixed md:static top-0 left-0 md:h-screen h-full w-64 bg-[#153055] text-white p-4 z-40 transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:block"
        )}
      >
        {/* Close button on mobile */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-xl font-bold">🕒 TimeTrack</div>
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>
        <nav className="flex flex-col gap-2">
          {/* {status === "authenticated" &&
            navItems.map(({ name, href, icon: Icon }) => (
              <Link
                key={name}
                href={href}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#2e4e71] transition-colors",
                  pathname === href && "bg-[#2e4e71]"
                )}
                onClick={() => setOpen(false)} // close on mobile nav click
              >
                <Icon className="h-5 w-5" />
                <span>{name}</span>
              </Link>
            ))} */}
          {status === "authenticated" && (
            <>
              {navItems.map(({ name, href, icon: Icon }) => (
                <Link
                  key={name}
                  href={href}
                  className={clsx(
                    "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#2e4e71] transition-colors",
                    pathname === href && "bg-[#2e4e71]"
                  )}
                  onClick={() => setOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{name}</span>
                </Link>
              ))}
              <Button
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-600 transition-colors mt-4"
                onClick={() => signOut()}
                variant="ghost"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </Button>
            </>
          )}
          {status === "unauthenticated" && (
            <>
              <Link
                key={"Login"}
                href={"/sign-in"}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#2e4e71] transition-colors",
                  pathname === "/sign-in" && "bg-[#2e4e71]"
                )}
              >
                <span>Login</span>
              </Link>
              <Link
                key={"Register"}
                href={"/sign-up"}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#2e4e71] transition-colors",
                  pathname === "/sign-up" && "bg-[#2e4e71]"
                )}
                onClick={() => setOpen(false)} // close on mobile nav click
              >
                <span>Register</span>
              </Link>
            </>
          )}
        </nav>
      </aside>

      {/* Overlay for mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default SideBar;
