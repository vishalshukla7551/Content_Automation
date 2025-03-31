"use client";
import { FileClock, Home, Settings, WalletCards } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import UsageTrack from "./UsageTrack";

function SideNav() {
  const MenuList = [
    { name: "Home", icon: Home, path: "/dashboard" },
    { name: "History", icon: FileClock, path: "/dashboard/history" },
    { name: "Billing", icon: WalletCards, path: "/dashboard/billing" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  const path = usePathname();

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-black 
      text-white shadow-lg border-r border-gray-700 p-6 flex flex-col">
      
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <Image src={"/logo.png"} alt="logo" width={100} height={40} className="rounded-xl" />
      </div>

      <hr className="border-gray-700 opacity-50" />

      {/* Navigation Links */}
      <nav className="mt-6 flex flex-col gap-2">
        {MenuList.map((menu, index) => (
          <Link key={index} href={menu.path}>
            <div
              className={`flex gap-3 items-center px-4 py-3 rounded-lg 
              transition-all duration-300 cursor-pointer hover:bg-white/10
              ${path === menu.path ? "bg-white/20 text-blue-400" : "text-gray-300"}
              `}
            >
              <menu.icon className="h-6 w-6" />
              <h2 className="text-lg">{menu.name}</h2>
            </div>
          </Link>
        ))}
      </nav>

      {/* Usage Track (Always at Bottom) */}
      <div className="mt-auto">
        <UsageTrack />
      </div>
    </div>
  );
}

export default SideNav;
