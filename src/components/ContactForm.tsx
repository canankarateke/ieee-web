"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Mesaj gönderilirken bir hata oluştu.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6 w-full">

      {/* Durum Mesajları - Genişliği Tam Kaplar */}
      {status === "error" && (
        <div className="w-full bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
          {errorMessage}
        </div>
      )}

      {status === "success" && (
        <div className="w-full bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl text-sm font-medium">
          Mesajınız başarıyla iletildi! En kısa sürede dönüş yapılacaktır.
        </div>
      )}

      {/* Form Elemanları */}
      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm font-semibold text-gray-700">İsim</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#0A5DA6] transition text-gray-900 bg-slate-50/50"
          placeholder="Adınız Soyadınız"
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm font-semibold text-gray-700">E-posta</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#0A5DA6] transition text-gray-900 bg-slate-50/50"
          placeholder="ornek@domain.com"
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm font-semibold text-gray-700">Mesaj</label>
        <textarea
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#0A5DA6] transition text-gray-900 bg-slate-50/50 resize-none"
          placeholder="Sorularınızı veya mesajınızı buraya yazın..."
        />
      </div>

      {/* Gönder Butonu */}
      <div className="flex justify-start">
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 bg-[#0A5DA6] hover:bg-[#0073B1] disabled:bg-gray-400 text-white font-medium rounded-xl transition shadow-sm text-center min-w-[140px]"
        >
          {status === "loading" ? "Gönderiliyor..." : "Ekle"}
        </button>
      </div>

    </form>
  );
}
