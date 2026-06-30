"use client";

import Link from "next/link";
import React from "react";
import { useLocale } from "@/components/LocaleProvider";

export default function NavClient() {
    const { t } = useLocale();

    return (
        <nav className="flex items-center gap-6">
            <Link href="/events" className="text-gray-600 hover:text-[#0A5DA6] transition-colors text-sm">{t.nav.events}</Link>
            <Link href="/committees" className="text-gray-600 hover:text-[#0A5DA6] transition-colors text-sm">{t.nav.committees}</Link>
            <Link href="/contact" className="text-gray-600 hover:text-[#0A5DA6] transition-colors text-sm">{t.nav.contact}</Link>
            <Link href="/register" className="text-gray-600 hover:text-[#0A5DA6] transition-colors text-sm">{t.nav.register}</Link>
            <Link href="/products/1" className="text-gray-600 hover:text-[#0A5DA6] transition-colors text-sm">{t.nav.products}</Link>
        </nav>
    );
}
