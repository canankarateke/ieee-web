"use client";

import React from "react";
import { useLocale } from "@/components/LocaleProvider";

export default function LanguageToggle() {
    const { locale, setLocale } = useLocale();

    return (
        <div className="ml-4">
            <button
                onClick={() => setLocale(locale === "en" ? "tr" : "en")}
                className="text-sm px-3 py-1 border rounded-md bg-white/60 hover:bg-white/80"
            >
                {locale === "en" ? "Türkçe" : "English"}
            </button>
        </div>
    );
}
