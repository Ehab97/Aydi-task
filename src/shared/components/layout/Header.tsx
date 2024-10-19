"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const pathname = usePathname();
  const navItems = [
    { text: "Home", href: "/" },
    { text: "Barcodes", href: "/barcodes" },
  ];
  return (
    <header className=" bg-gray-800 border-b border-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center w-full ">
          <div className="text-2xl font-bold text-white">
            <Link href="/">MyLogo</Link>
          </div>

          <nav className="flex items-center space-x-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  href={item.href}
                  key={item.text}
                  className={`${
                    isActive
                      ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                      : "hover:bg-gray-700 hover:text-white"
                  } rounded-md px-3 py-2 text-sm font-medium text-gray-300`}
                >
                  {item.text}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
