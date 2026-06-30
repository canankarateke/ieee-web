"use client";

import React, { useState, useEffect } from "react";

export default function AdminAboutPage() {
  const [activeTab, setActiveTab] = useState<"tr" | "en">("tr");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Form State Yapısı
  const [formData, setFormData] = useState({
    tr: { title: "", subtitle: "", missionTitle: "", missionText: "", visionTitle: "", visionText: "", storyTitle: "", storyText: "", value1Title: "", value1Text: "", value2Title: "", value2Text: "", value3Title: "", value3Text: "" },
    en: { title: "", subtitle: "", missionTitle: "", missionText: "", visionTitle: "", visionText: "", storyTitle: "", storyText: "", value1Title: "", value1Text: "", value2Title: "", value2Text: "", value3Title: "", value3Text: "" }
  });

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/pages?slug=about");
        if (res.ok) {
          const pageData = await res.json();
          if (pageData && pageData.content) {
            const parsed = typeof pageData.content === "string" ? JSON.parse(pageData.content) : pageData.content;
            setFormData(parsed);
          }
        }
      } catch (err) {
        console.error("Veri okunurken hata:", err);
      }
    }
    loadData();
  }, []);

  const handleChange = (lang: "tr" | "en", field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [lang]: { ...prev[lang], [field]: value }
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/pages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: "about",
          title: formData.tr.title || "Hakkımızda", // Genel başlık veritabanı kaydı için
          content: formData // Tüm nesneyi JSON olarak content kolonuna yolluyoruz
        }),
      });

      if (!res.ok) throw new Error("Update failed");
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-sm border border-gray-100 my-10">
      <div className="flex justify-between items-center mb-6 pb-3 border-b">
        <h1 className="text-2xl font-bold text-gray-900">Hakkımızda Sayfası Yönetimi</h1>

        {/* Dil Değiştirme Sekmeleri */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-gray-200">
          <button
            onClick={() => setActiveTab("tr")}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition ${activeTab === "tr" ? "bg-white text-[#0A5DA6] shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
          >
            Türkçe İçerik
          </button>
          <button
            onClick={() => setActiveTab("en")}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition ${activeTab === "en" ? "bg-white text-[#0A5DA6] shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
          >
            English Content
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {status === "success" && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl text-sm font-medium">
            Tüm dillerdeki sayfa içerikleri başarıyla güncellendi!
          </div>
        )}
        {status === "error" && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
            Kaydedilirken bir hata oluştu. Supabase ayarlarını kontrol edin.
          </div>
        )}

        {/* Dinamik Render Olan Dil Alanları */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Ana Başlık</label>
            <input type="text" value={formData[activeTab].title} onChange={e => handleChange(activeTab, "title", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border bg-white border-gray-200 text-sm outline-none text-gray-900" placeholder="Örn: Hakkımızda" required />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Alt Başlık (Subtitle)</label>
            <input type="text" value={formData[activeTab].subtitle} onChange={e => handleChange(activeTab, "subtitle", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border bg-white border-gray-200 text-sm outline-none text-gray-900" placeholder="Açıklama metni..." required />
          </div>
        </div>

        {/* Misyon & Vizyon */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <h3 className="font-bold text-gray-800 border-b pb-2 text-sm">Misyon Bölümü</h3>
            <input type="text" value={formData[activeTab].missionTitle} onChange={e => handleChange(activeTab, "missionTitle", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none text-gray-900" placeholder="Bölüm Başlığı" required />
            <textarea rows={4} value={formData[activeTab].missionText} onChange={e => handleChange(activeTab, "missionText", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none text-gray-900 resize-none" placeholder="Misyon açıklaması..." required />
          </div>

          <div className="space-y-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <h3 className="font-bold text-gray-800 border-b pb-2 text-sm">Vizyon Bölümü</h3>
            <input type="text" value={formData[activeTab].visionTitle} onChange={e => handleChange(activeTab, "visionTitle", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none text-gray-900" placeholder="Bölüm Başlığı" required />
            <textarea rows={4} value={formData[activeTab].visionText} onChange={e => handleChange(activeTab, "visionText", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none text-gray-900 resize-none" placeholder="Vizyon açıklaması..." required />
          </div>
        </div>

        {/* Hikayemiz */}
        <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-4">
          <h3 className="font-bold text-gray-800 border-b pb-2 text-sm">Hikayemiz (Story) Bölümü</h3>
          <input type="text" value={formData[activeTab].storyTitle} onChange={e => handleChange(activeTab, "storyTitle", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none text-gray-900" placeholder="Hikaye Başlığı" required />
          <textarea rows={5} value={formData[activeTab].storyText} onChange={e => handleChange(activeTab, "storyText", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none text-gray-900 resize-none" placeholder="Uzun hikaye detayları..." required />
        </div>

        {/* Alt Değerler Kartları */}
        <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-4">
          <h3 className="font-bold text-gray-800 border-b pb-2 text-sm">Alt Teklifler / Değerler Kartları</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50/50 border rounded-xl space-y-2">
              <input type="text" value={formData[activeTab].value1Title} onChange={e => handleChange(activeTab, "value1Title", e.target.value)} className="w-full px-3 py-2 text-xs font-semibold rounded-lg border text-gray-900" placeholder="1. Kart Başlık" required />
              <textarea rows={3} value={formData[activeTab].value1Text} onChange={e => handleChange(activeTab, "value1Text", e.target.value)} className="w-full px-3 py-2 text-xs rounded-lg border text-gray-900 resize-none" placeholder="1. Kart Açıklama" required />
            </div>
            <div className="p-4 bg-slate-50/50 border rounded-xl space-y-2">
              <input type="text" value={formData[activeTab].value2Title} onChange={e => handleChange(activeTab, "value2Title", e.target.value)} className="w-full px-3 py-2 text-xs font-semibold rounded-lg border text-gray-900" placeholder="2. Kart Başlık" required />
              <textarea rows={3} value={formData[activeTab].value2Text} onChange={e => handleChange(activeTab, "value2Text", e.target.value)} className="w-full px-3 py-2 text-xs rounded-lg border text-gray-900 resize-none" placeholder="2. Kart Açıklama" required />
            </div>
            <div className="p-4 bg-slate-50/50 border rounded-xl space-y-2">
              <input type="text" value={formData[activeTab].value3Title} onChange={e => handleChange(activeTab, "value3Title", e.target.value)} className="w-full px-3 py-2 text-xs font-semibold rounded-lg border text-gray-900" placeholder="3. Kart Başlık" required />
              <textarea rows={3} value={formData[activeTab].value3Text} onChange={e => handleChange(activeTab, "value3Text", e.target.value)} className="w-full px-3 py-2 text-xs rounded-lg border text-gray-900 resize-none" placeholder="3. Kart Açıklama" required />
            </div>
          </div>
        </div>

        <button type="submit" disabled={status === "loading"} className="w-full sm:w-auto px-6 py-3 bg-[#0A5DA6] hover:bg-[#0073B1] disabled:bg-gray-400 text-white font-medium rounded-xl transition shadow-sm min-w-[160px]">
          {status === "loading" ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
        </button>
      </form>
    </div>
  );
}
