"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";

export default function Footer() {
  const { t } = useLocale();

  return (
    <footer className="bg-gradient-to-br from-[#0A5DA6] to-[#0073B1] text-white pt-16 pb-8 mt-auto">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center font-bold text-white border border-white/20 select-none text-lg tracking-wider">
                IEEE
              </div>
              <span className="font-bold text-xl tracking-tight">IEEE Student Branch</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg border-b border-white/10 pb-2 inline-block pr-6">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-sm text-white/85">
              <li>
                <Link href="/" className="hover:text-white flex items-center gap-1 transition-colors">
                  <span>→</span> <span>{t.nav.home}</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white flex items-center gap-1 transition-colors">
                  <span>→</span> <span>{t.nav.about}</span>
                </Link>
              </li>
              <li>
                <Link href="/committees" className="hover:text-white flex items-center gap-1 transition-colors">
                  <span>→</span> <span>{t.nav.committees}</span>
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white flex items-center gap-1 transition-colors">
                  <span>→</span> <span>{t.nav.events}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg border-b border-white/10 pb-2 inline-block pr-6">
              {t.footer.connectWithUs}
            </h4>
            <p className="text-white/80 text-sm leading-relaxed max-w-sm">
              {t.footer.followUs}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.linkedin.com/in/ieee-firat-5b37b73a4?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20 transition-all hover:scale-105 cursor-pointer"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/ieeefiratsb?igsh=MWsycDZ3Y2JkdXJyZQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20 transition-all hover:scale-105 cursor-pointer"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20 transition-all hover:scale-105 cursor-pointer"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <p>© 2026 IEEE Student Branch. {t.footer.copyright}</p>
          <div className="flex gap-6">
            <Link href="/admin/login" className="hover:underline hover:text-white transition-colors">
              {t.common.admin}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
