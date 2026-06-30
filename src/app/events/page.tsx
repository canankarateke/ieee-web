import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";
import { createClient } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocalizedHeading from "@/components/LocalizedHeading";

export const metadata: Metadata = {
  title: "Etkinlikler | IEEE Öğrenci Kolu",
};

// Bileşeni asenkron (async) yapıyoruz
export default async function EventsPage() {
  const supabase = createClient();

  // Supabase'den events tablosundaki tüm verileri id'ye göre azalan (en yeni üstte) sırada çekiyoruz
  const { data: rows, error } = await supabase
    .from("events")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Supabase events fetch error:", error);
  }

  // db.js'deki mapEvent dönüşümünü doğrudan burada gerçekleştiriyoruz
  const events = (rows || []).map((row) => ({
    id: String(row.id),
    title: row.title,
    date: row.date,
    time: row.time,
    location: row.location,
    type: row.type,
    description: row.description || "",
    color: row.color,
    textColor: row.text_color, // Veritabanındaki snake_case alanı frontend camelCase'ine çeviriyoruz
    barColor: row.bar_color,   // Veritabanındaki snake_case alanı frontend camelCase'ine çeviriyoruz
  }));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/30">
      {/* Navigation */}
      <Navbar />

      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#0A5DA6] to-[#0073B1] text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <LocalizedHeading section="events" light />
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16 flex-1 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event: any) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:scale-[1.01] transition-all flex flex-col justify-between"
            >
              {/* Colored Top Bar */}
              <div className={`h-1.5 ${event.barColor || "bg-[#0A5DA6]"}`} />

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Tag Label */}
                  <span className={`inline-block ${event.color} ${event.textColor} px-3 py-1 rounded-full text-xs font-bold tracking-wide mb-4`}>
                    {event.type}
                  </span>

                  {/* Title */}
                  <h2 className="text-lg font-bold text-gray-900 mb-4 leading-snug line-clamp-2 min-h-[48px]">
                    {event.title}
                  </h2>

                  {/* Details */}
                  <div className="space-y-3 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-[#0A5DA6] shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-[#0A5DA6] shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-[#0A5DA6] shrink-0" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>

                  {event.description && (
                    <p className="text-gray-500 text-sm mt-4 pt-4 border-t border-gray-100 leading-relaxed">
                      {event.description}
                    </p>
                  )}
                </div>

                {/* Register Button */}
                <Link
                  href="/register"
                  className="w-full inline-flex items-center justify-center bg-[#0A5DA6] hover:bg-[#0073B1] text-white font-bold py-2.5 px-4 rounded-xl transition-colors tracking-wide text-xs cursor-pointer shadow-sm mt-6"
                >
                  Kayıt Ol
                </Link>
              </div>
            </div>
          ))}
        </div>

        {events.length === 0 && (
          <p className="text-center text-gray-500 py-16">Henüz planlanmış etkinlik yok.</p>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
