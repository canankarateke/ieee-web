"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";
import { Users, Compass, BookOpen, Network, ShieldCheck } from "lucide-react";

// Varsayılan İçerikler (Veritabanında veri yoksa burası görünür)
const defaultContent = {
  en: {
    title: "About Us",
    subtitle: "Discover our mission, vision, and how we are advancing technology for humanity.",
    missionTitle: "Our Mission",
    missionText: "To foster technological innovation and excellence for the benefit of humanity through workshops, projects, and active collaboration.",
    visionTitle: "Our Vision",
    visionText: "To build a vibrant community of future engineers and researchers who are equipped to solve the most pressing challenges of the digital age.",
    storyTitle: "Our Story",
    storyText: "IEEE Student Branch was established with the goal of creating an open, collaborative ecosystem for students interested in engineering, technology, and science.",
    value1Title: "Technical Development",
    value1Text: "Practical, hands-on learning through specialized student societies.",
    value2Title: "Leadership & Growth",
    value2Text: "Opportunities to manage projects, lead teams, and speak at conferences.",
    value3Title: "Global Network",
    value3Text: "Access to IEEE's massive international network of professionals and resources."
  },
  tr: {
    title: "Hakkımızda",
    subtitle: "Misyonumuzu, vizyonumuzu ve insanlık için teknolojiyi nasıl ilerlettiğimizi keşfedin.",
    missionTitle: "Misyonumuz",
    missionText: "Atölyeler, projeler ve aktif iş birliği yoluyla insanlığın yararına teknolojik inovasyonu ve mükemmelliği teşvik etmek.",
    visionTitle: "Vizyonumuz",
    visionText: "Dijital çağın en acil sorunlarını çözmek için donatılmış geleceğin mühendisleri ve araştırmacılarından oluşan canlı bir topluluk oluşturmak.",
    storyTitle: "Hikayemiz",
    storyText: "IEEE Öğrenci Kolu, mühendislik, teknoloji ve fen bilimlerine ilgi duyan öğrenciler için açık, iş birliğine dayalı bir ekosistem oluşturmak amacıyla kurulmuştur.",
    value1Title: "Teknik Gelişim",
    value1Text: "Özel öğrenci komitelerimiz aracılığıyla pratik ve uygulamalı öğrenim.",
    value2Title: "Liderlik ve Gelişim",
    value2Text: "Proje yönetme, ekiplere liderlik etme ve konferanslarda sunum yapma fırsatları.",
    value3Title: "Küresel Ağ",
    value3Text: "IEEE'nin profesyonellerden ve kaynaklardan oluşan geniş uluslararası ağına erişim."
  }
};

export default function AboutPage() {
  const { locale } = useLocale();
  const [dynamicContent, setDynamicContent] = useState(defaultContent);

  useEffect(() => {
    async function loadAboutData() {
      try {
        const res = await fetch("/api/pages?slug=about");
        if (res.ok) {
          const pageData = await res.json();
          if (pageData && pageData.content) {
            const parsedContent = typeof pageData.content === "string"
              ? JSON.parse(pageData.content)
              : pageData.content;

            setDynamicContent(parsedContent);
          }
        }
      } catch (err) {
        console.error("Dinamik içerik yüklenirken hata oluştu, varsayılan içerik getiriliyor:", err);
      }
    }
    loadAboutData();
  }, []);

  const activeContent = locale === "en" ? dynamicContent.en : dynamicContent.tr;

  return (
    // Arka planı tamamen canlandırmak için yumuşak, modern bir slate-50 tonuna çektik
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-[#0A5DA6] to-[#0073B1] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white">
            {activeContent.title}
          </h1>
          <p className="text-lg text-blue-50 max-w-2xl mx-auto font-light leading-relaxed whitespace-pre-line">
            {activeContent.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16 flex-1 space-y-16 w-full">
        {/* Mission & Vision Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-md shadow-slate-200/50 flex gap-5 items-start hover:border-blue-100 transition-colors">
            <div className="w-12 h-12 bg-blue-50 text-[#0A5DA6] rounded-xl flex items-center justify-center shrink-0 shadow-inner">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">{activeContent.missionTitle}</h2>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{activeContent.missionText}</p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-md shadow-slate-200/50 flex gap-5 items-start hover:border-blue-100 transition-colors">
            <div className="w-12 h-12 bg-blue-50 text-[#0A5DA6] rounded-xl flex items-center justify-center shrink-0 shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">{activeContent.visionTitle}</h2>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{activeContent.visionText}</p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <section className="bg-white rounded-2xl border border-slate-100 p-8 sm:p-12 shadow-md shadow-slate-200/50 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              {activeContent.storyTitle}
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base whitespace-pre-line">
              {activeContent.storyText}
            </p>
          </div>
          {/* Gri kutuyu tamamen IEEE Mavisi ve Soft Mavi geçişli çok şık bir alana dönüştürdük */}
          <div className="w-full md:w-80 shrink-0 bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm">
            <div className="w-16 h-16 bg-[#0A5DA6] text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-md mb-4 select-none">
              IEEE
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Established</span>
            <span className="text-2xl font-extrabold text-[#0A5DA6]">2018</span>
          </div>
        </section>

        {/* Core Values / Features */}
        <section className="space-y-10">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Our Core Offerings</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-md shadow-slate-200/50 text-center flex flex-col items-center hover:border-blue-100 transition-colors">
              <div className="w-14 h-14 bg-blue-50 text-[#0A5DA6] rounded-xl flex items-center justify-center mb-4 shadow-inner">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{activeContent.value1Title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed whitespace-pre-line">{activeContent.value1Text}</p>
            </div>

            {/* Value 2 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-md shadow-slate-200/50 text-center flex flex-col items-center hover:border-blue-100 transition-colors">
              <div className="w-14 h-14 bg-blue-50 text-[#0A5DA6] rounded-xl flex items-center justify-center mb-4 shadow-inner">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{activeContent.value2Title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed whitespace-pre-line">{activeContent.value2Text}</p>
            </div>

            {/* Value 3 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-md shadow-slate-200/50 text-center flex flex-col items-center hover:border-blue-100 transition-colors">
              <div className="w-14 h-14 bg-blue-50 text-[#0A5DA6] rounded-xl flex items-center justify-center mb-4 shadow-inner">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{activeContent.value3Title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed whitespace-pre-line">{activeContent.value3Text}</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
