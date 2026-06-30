"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getTranslations, SUPPORTED_LOCALES } from "@/lib/i18n";

const LocaleContext = createContext({ locale: "en", t: getTranslations("en"), setLocale: (l: string) => { } });

export function LocaleProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocale] = useState<string>("en");
    const [t, setT] = useState(() => getTranslations("en"));

    useEffect(() => {
        const stored = typeof window !== "undefined" ? localStorage.getItem("locale") : null;
        if (stored && SUPPORTED_LOCALES.includes(stored)) {
            setLocale(stored);
            setT(getTranslations(stored));
        }
    }, []);

    const updateLocale = (l: string) => {
        if (!SUPPORTED_LOCALES.includes(l)) return;
        setLocale(l);
        setT(getTranslations(l));
        localStorage.setItem("locale", l);
    };

    return <LocaleContext.Provider value={{ locale, t, setLocale: updateLocale }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
    return useContext(LocaleContext);
}
