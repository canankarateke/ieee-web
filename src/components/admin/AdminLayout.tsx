"use client"; // Next.js'te useEffect ve useState kullanabilmek için şart!

import { useState, useEffect } from "react";
import { LayoutDashboard, Menu as MenuIcon, Calendar, Users, LogOut, ChevronLeft, FileText } from "lucide-react";
import { useRouter, usePathname } from "next/navigation"; // react-router yerine Next.js router'ı
import Link from "next/link"; // Dümdüz linkler yerine Next.js Link bileşeni

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const authed = localStorage.getItem("ieee_admin_auth") === "true";
    setIsAuthenticated(authed);
    setAuthChecked(true);

    if (!authed) {
      router.push("/admin/login");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("ieee_admin_auth");
    setIsAuthenticated(false);
    router.push("/admin/login");
  };

  const menuItems = [
    { to: "/admin/dashboard", label: "Gösterge Paneli", icon: <LayoutDashboard className="w-5 h-5" /> },
    { to: "/admin/menus", label: "Menüler", icon: <MenuIcon className="w-5 h-5" /> },
    { to: "/admin/events", label: "Etkinlikler", icon: <Calendar className="w-5 h-5" /> },
    { to: "/admin/committees", label: "Komiteler", icon: <Users className="w-5 h-5" /> },
    { to: "/admin/about", label: "Hakkımızda", icon: <FileText className="w-5 h-5" /> }, // 👈 Yeni eklenen satır
  ];

  if (!authChecked || !isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-gradient-to-br from-[#0A5DA6] to-[#0073B1] text-white transition-all duration-300 z-50 ${sidebarOpen ? "w-64" : "w-20"
          }`}
      >
        {/* Üst Menü İçerik Alanı */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            {sidebarOpen && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20">
                  <span className="text-sm font-bold">IEEE</span>
                </div>
                <div>
                  <div className="text-sm">Yönetici Paneli</div>
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronLeft className={`w-5 h-5 transition-transform ${!sidebarOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Menü Linkleri */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              // Eğer tarayıcıdaki link, menüdeki linkle eşleşiyorsa o buton "aktif" olur
              const isActive = pathname === item.to;

              return (
                <Link
                  key={item.to}
                  href={item.to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                    ? "bg-white/20 backdrop-blur-md border border-white/30"
                    : "hover:bg-white/10"
                    } ${!sidebarOpen ? "justify-center" : ""}`}
                >
                  {item.icon}
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div> {/* <--- Rezaleti çözen, az önce silinen kritik div burasıydı! */}

        {/* Alt Kısım - Logout Butonu */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/20">
          <button
            onClick={logout}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors w-full ${!sidebarOpen ? "justify-center" : ""
              }`}
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl text-gray-900">IEEE Admin Panel</h1>
              <h1 className="text-2xl text-gray-900">IEEE Yönetici Paneli</h1>
              <Link
                href="/"
                className="text-[#0A5DA6] hover:text-[#0073B1] transition-colors"
              >
                Siteyi Görüntüle →
              </Link>
              {sidebarOpen && <span>Çıkış Yap</span>}
            </div>
          </div>
        </header>

        {/* Dinamik Olarak Gelecek Sayfa İçeriği */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
