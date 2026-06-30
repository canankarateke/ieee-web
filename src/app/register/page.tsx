"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useLocale } from "@/components/LocaleProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocalizedHeading from "@/components/LocalizedHeading";

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLocale();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      fullName: String(formData.get("fullName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      studentId: String(formData.get("studentId") || "").trim() || null,
    };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Server error");
      setSubmitted(true);
      form.reset();
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err?.message || "Failed to submit registration");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/30">
      {/* Navigation */}
      <Navbar />

      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#0A5DA6] to-[#0073B1] text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <LocalizedHeading section="register" light />
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16 flex-1 w-full flex items-center justify-center">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {submitted ? (
            <Alert className="mb-6 border-green-200 bg-green-50 text-green-800">
              <AlertTitle className="font-bold text-green-900 mb-1">Kayıt Gönderildi!</AlertTitle>
              <AlertDescription className="text-sm">
                Teşekkürler! Kayıt bilgilerinizi aldık. En kısa sürede sizinle iletişime geçeceğiz.
              </AlertDescription>
            </Alert>
          ) : null}

          {error ? (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle className="font-bold mb-1">Hata oluştu</AlertTitle>
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.register.fullName}</label>
              <input
                name="fullName"
                required
                className="block w-full rounded-xl border border-gray-200 shadow-sm/5% py-2.5 px-4 text-sm focus:border-[#0A5DA6] focus:ring-1 focus:ring-[#0A5DA6] outline-none transition-all"
                placeholder={t.register.fullName}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <input
                name="email"
                required
                type="email"
                className="block w-full rounded-xl border border-gray-200 shadow-sm/5% py-2.5 px-4 text-sm focus:border-[#0A5DA6] focus:ring-1 focus:ring-[#0A5DA6] outline-none transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.register.studentId}</label>
              <input
                name="studentId"
                className="block w-full rounded-xl border border-gray-200 shadow-sm/5% py-2.5 px-4 text-sm focus:border-[#0A5DA6] focus:ring-1 focus:ring-[#0A5DA6] outline-none transition-all"
                placeholder={t.register.studentId}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-50">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#0A5DA6] hover:bg-[#0073B1] text-white font-bold py-2.5 px-6 rounded-xl transition-colors tracking-wide text-xs cursor-pointer shadow-sm"
              >
                {t.register.register}
              </button>
              <Link href="/admin/login" className="text-xs text-gray-550 hover:text-[#0A5DA6] transition-colors">
                Zaten kaydınız varsa giriş yapın (YK Üyesi / Yönetici)
              </Link>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
