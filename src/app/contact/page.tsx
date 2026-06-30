import React from "react";
import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocalizedHeading from "@/components/LocalizedHeading";

export const metadata: Metadata = {
  title: "Contact | IEEE Student Branch",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/30">
      {/* Navigation */}
      <Navbar />

      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#0A5DA6] to-[#0073B1] text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <LocalizedHeading section="contact" light />
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16 flex-1 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            <ContactForm />
          </div>

          <aside className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col min-h-[400px]">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                İletişim Bilgileri
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong>IEEE Öğrenci Kolu</strong>
                <br />
                Mühendislik Fakültesi
                <br />
                Üniversite Kampüsü, Türkiye
              </p>

              <div className="mt-6 space-y-3.5 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800">E-posta:</span>
                  <a href="mailto:ieeefirateee@gmail.com" className="text-[#0A5DA6] hover:underline">
                    ieeefirateee@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800">Telefon:</span>
                  <a href="tel:" className="text-gray-600 hover:text-gray-900">
                    
                  </a>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Çalışma Saatleri</h4>
                <p className="text-sm text-gray-600">Pazartesi – Cuma: 09:00 — 17:00</p>
              </div>
            </div>

            {/* Harita Alanı */}
            <div className="mt-8 overflow-hidden rounded-xl border border-gray-100 shadow-inner flex-1">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3114.9595094903384!2d39.189033699999996!3d38.6727986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4076c03ed3e33d0d%3A0xd1d31031c6bd5182!2sFirat%20%C3%9Cniversitesi%20bilgisayar%20m%C3%BChendisli%C4%9Fi%20fak%C3%BCltesi!5e0!3m2!1str!2str!4v1782834181128!5m2!1str!2str"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
