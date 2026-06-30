"use client"; // Next.js'te form hareketleri ve state kullanabilmek için şart!

import { useState } from "react";
import { useRouter } from "next/navigation"; // react-router yerine Next.js router'ı
import { Lock, User, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");


    if (username === process.env.NEXT_PUBLIC_ADMIN_USERNAME && password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD)  {
      localStorage.setItem("ieee_admin_auth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Geçersiz kullanıcı adı veya şifre!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A5DA6] via-[#0073B1] to-[#0A5DA6] flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#0A5DA6] to-[#0073B1] rounded-xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
              <span className="text-2xl font-bold">IEEE</span>
            </div>
            <h1 className="text-3xl text-gray-900 mb-2">Admin Panel</h1>
            <p className="text-gray-600">Web sitenizi yönetmek için giriş yapın</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Kullanıcı Adı</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5DA6] focus:border-transparent text-gray-800"
                  placeholder="Kullanıcı adınızı girin"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Şifre</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5DA6] focus:border-transparent text-gray-800"
                  placeholder="Şifrenizi girin"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-br from-[#0A5DA6] to-[#0073B1] text-white py-3 rounded-lg hover:shadow-lg transition-all hover:scale-105 font-medium"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
