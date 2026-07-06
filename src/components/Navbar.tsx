"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/LocaleProvider";
import { Menu, X, Globe } from "lucide-react";

export default function Navbar() {
  const { locale, t, setLocale } = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/committees", label: t.nav.committees },
    { href: "/events", label: t.nav.events },
    { href: "/contact", label: t.nav.contact },
    { href: "/admin/login", label: t.nav.admin || "Admin" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "tr" : "en");
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-sm/5% backdrop-blur-md bg-white/95">
      <div className="w-full px-6 sm:px-12 py-4 flex items-center justify-between">

        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-4 group">
          {/* Logo görseli eklendi */}
          <img
            src="/logo.png"
            alt="IEEE Fırat Logo"
            className="w-60 h-16 object-contain shrink-0"
          />

          <div className="flex flex-col text-left">
            <span className="font-bold text-gray-900 leading-tight text-xl tracking-tight group-hover:text-[#0A5DA6] transition-colors">
              IEEE Fırat Student Branch
            </span>
            <span className="text-xs text-gray-500 font-semibold tracking-wider uppercase">
              Advancing Technology
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all duration-200 rounded-lg px-4 py-2 ${
                  active
                    ? "bg-[#0A5DA6] text-white shadow-md shadow-blue-500/10 hover:bg-[#0073B1]"
                    : "text-gray-600 hover:text-[#0A5DA6] hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <button
            onClick={toggleLanguage}
            className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-800 hover:text-[#0A5DA6] hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{locale === "en" ? "TR" : "EN"}</span>
          </button>

          <Link
            href="/admin"
            className="text-xs font-bold bg-[#E0F2FE] hover:bg-[#0A5DA6] text-[#0A5DA6] hover:text-white px-4 py-2 rounded-lg transition-all border border-[#BDE0FE]/40 cursor-pointer shadow-sm hover:shadow"
          >
            {locale === "en" ? "Admin" : "Yönetici"}
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-2 shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium rounded-lg px-4 py-2.5 text-gray-600 hover:bg-gray-50"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
