"use client";

import React from "react";
import { useLocale } from "@/components/LocaleProvider";

export default function LocalizedHeading({ section, light = false }: { section: string; light?: boolean }) {
    const { t } = useLocale();

    const titleClass = light ? "text-white" : "text-gray-900";
    const subtitleClass = light ? "text-blue-100" : "text-gray-600";

    if (section === "contact") {
        return (
            <>
                <h1 className={`text-3xl font-bold ${titleClass} mb-2`}>{t.contact.title}</h1>
                <p className={`${subtitleClass} mb-8`}>{t.contact.subtitle}</p>
            </>
        );
    }

    if (section === "register") {
        return (
            <>
                <h1 className={`text-3xl font-bold ${titleClass} mb-2`}>{t.register.title}</h1>
                <p className={`${subtitleClass} mb-8`}>{t.register.subtitle}</p>
            </>
        );
    }

    if (section === "events") {
        return (
            <>
                <h1 className={`text-3xl font-bold ${titleClass} mb-2`}>{t.events.title}</h1>
                <p className={`${subtitleClass} mb-8`}>{t.events.subtitle}</p>
            </>
        );
    }

    return null;
}
