import React from "react";
import { Code, Cpu, Radio, Zap, Brain, Shield, Database, Globe, LucideIcon } from "lucide-react";
import { createClient } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const iconMap: Record<string, LucideIcon> = { Code, Cpu, Radio, Zap, Brain, Shield, Database, Globe };

export const metadata = {
  title: "Komiteler | IEEE Öğrenci Kolu",
};

// Sunucuda asenkron veri çekebilmek için fonksiyonu async yapıyoruz
export default async function CommitteesPage() {
  const supabase = createClient();

  // Supabase'den committees tablosundaki tüm verileri çekiyoruz
  const { data: rows, error } = await supabase
    .from("committees")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Supabase committees fetch error:", error);
  }

  // db.js'deki mapCommittee mantığını burada uygulayarak veriyi frontend formatına sokuyoruz
  const committees = (rows || []).map((row) => ({
    id: String(row.id),
    name: row.name,
    description: row.description,
    activities: JSON.parse(row.activities || "[]"), // Metin olarak gelen JSON dizisini array'e çeviriyoruz
    color: row.color,
    iconColor: row.icon_color,
    borderColor: row.border_color,
    icon: row.icon,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/30">
      {/* Navigation */}
      <Navbar />

      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#0A5DA6] to-[#0073B1] text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 text-white">Teknik Komiteler</h1>
          <p className="text-blue-100 max-w-xl mx-auto text-sm font-light">IEEE teknik topluluklarımızı ve öğrenci faaliyetlerini keşfedin.</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16 flex-1 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {committees.map((committee: any) => {
            const Icon = iconMap[committee.icon] || Code;
            return (
              <div
                key={committee.id}
                className={`bg-white border-2 ${committee.borderColor} rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row gap-5 items-start`}
              >
                <div className={`w-14 h-14 ${committee.color} rounded-xl flex items-center justify-center flex-shrink-0 ${committee.iconColor} shadow-inner`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{committee.name}</h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{committee.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {committee.activities.map((activity: any, idx: any) => (
                      <span
                        key={idx}
                        className={`${committee.color} ${committee.iconColor} px-3 py-1 rounded-full text-xs font-semibold`}
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {committees.length === 0 && (
          <p className="text-center text-gray-500 py-16">Henüz listelenen komite yok.</p>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
