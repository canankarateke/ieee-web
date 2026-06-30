"use client";

import React from "react";
import { useLocale } from "@/components/LocaleProvider";

export default function ProductDetailsClient({ product }: { product: any }) {
    const { t } = useLocale();

    if (!product) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900">{t.product.notFound}</h2>
                <p className="text-sm text-gray-600 mt-2">{t.product.notFoundDesc}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h1>
                <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                    {product.features.map((f: string) => (
                        <li key={f}>{f}</li>
                    ))}
                </ul>
            </div>

            <aside className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="text-2xl font-semibold text-gray-900">{product.price}</div>
                <button className="mt-4 w-full bg-[#0A5DA6] text-white px-4 py-2 rounded-lg">{t.product.buy}</button>
                <div className="mt-6 text-sm text-gray-600">{t.product.ships}</div>
            </aside>
        </div>
    );
}
