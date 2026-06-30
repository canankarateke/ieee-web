"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Edit2, Trash2, X, Code, Cpu, Radio, Zap, Brain, Shield, Database, Globe } from "lucide-react";

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    Code, Cpu, Radio, Zap, Brain, Shield, Database, Globe,
  };
  const IconComponent = icons[name] || Code;
  return <IconComponent className={className} />;
};

type Committee = {
  id: string;
  name: string;
  description: string;
  activities: string[];
  color: string;
  iconColor: string;
  borderColor: string;
  icon: string;
};

export default function CommitteesManagement() {
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCommittee, setEditingCommittee] = useState<Committee | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    activities: "",
    color: "bg-blue-50",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200",
    icon: "Code",
  });

  const colorSchemes = [
    { color: "bg-blue-50", iconColor: "text-blue-600", borderColor: "border-blue-200", label: "Mavi" },
    { color: "bg-purple-50", iconColor: "text-purple-600", borderColor: "border-purple-200", label: "Mor" },
    { color: "bg-green-50", iconColor: "text-green-600", borderColor: "border-green-200", label: "Yeşil" },
    { color: "bg-yellow-50", iconColor: "text-yellow-600", borderColor: "border-yellow-200", label: "Sarı" },
    { color: "bg-red-50", iconColor: "text-red-600", borderColor: "border-red-200", label: "Kırmızı" },
    { color: "bg-indigo-50", iconColor: "text-indigo-600", borderColor: "border-indigo-200", label: "Çivit" },
    { color: "bg-orange-50", iconColor: "text-orange-600", borderColor: "border-orange-200", label: "Turuncu" },
    { color: "bg-teal-50", iconColor: "text-teal-600", borderColor: "border-teal-200", label: "Camgöbeği" },
  ];

  const iconOptions = ["Code", "Cpu", "Radio", "Zap", "Brain", "Shield", "Database", "Globe"];

  const fetchCommittees = useCallback(async () => {
    try {
      const res = await fetch("/api/committees");
      if (res.ok) {
        setCommittees(await res.json());
      }
    } catch (error) {
      console.error("Failed to fetch committees:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCommittees();
  }, [fetchCommittees]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.description.trim()) {
      setError("İsim ve açıklama gereklidir");
      return;
    }

    setSaving(true);
    setError(null);

    const committeeData = {
      name: formData.name,
      description: formData.description,
      activities: formData.activities.split(",").map((a) => a.trim()).filter(Boolean),
      color: formData.color,
      iconColor: formData.iconColor,
      borderColor: formData.borderColor,
      icon: formData.icon,
    };

    try {
      if (editingCommittee) {
        const res = await fetch(`/api/committees/${editingCommittee.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(committeeData),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Komite güncellenemedi");
        }
        await fetchCommittees();
      } else {
        const res = await fetch("/api/committees", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(committeeData),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Komite oluşturulamadı");
        }
        await fetchCommittees();
      }
      resetForm();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Bir hata oluştu";
      console.error("Failed to save committee:", message);
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      activities: "",
      color: "bg-blue-50",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200",
      icon: "Code",
    });
    setEditingCommittee(null);
    setIsModalOpen(false);
  };

  const handleEdit = (committee: Committee) => {
    setEditingCommittee(committee);
    setFormData({
      name: committee.name,
      description: committee.description,
      activities: committee.activities.join(", "),
      color: committee.color,
      iconColor: committee.iconColor,
      borderColor: committee.borderColor,
      icon: committee.icon,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu komiteyi silmek istediğinizden emin misiniz?")) return;

    try {
      const res = await fetch(`/api/committees/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchCommittees();
      }
    } catch (error) {
      console.error("Failed to delete committee:", error);
    }
  };

  const handleColorSchemeChange = (scheme: { color: string; iconColor: string; borderColor: string }) => {
    setFormData({
      ...formData,
      color: scheme.color,
      iconColor: scheme.iconColor,
      borderColor: scheme.borderColor,
    });
  };

  if (loading) {
    return <div className="text-gray-500">Komiteler yükleniyor...</div>;
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">Komite Yönetimi</h2>
          <p className="text-gray-600">Teknik komitelerinizi yönetin</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-br from-[#0A5DA6] to-[#0073B1] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Komite Ekle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {committees.map((committee) => (
          <div
            key={committee.id}
            className={`bg-white border-2 ${committee.borderColor} rounded-2xl p-6 hover:shadow-lg transition-all`}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-start gap-4">
                <DynamicIcon name={committee.icon} className={`w-10 h-10 ${committee.iconColor}`} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{committee.name}</h3>
                  <p className="text-gray-600 mt-1 text-sm">{committee.description}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleEdit(committee)}
                  className="flex items-center justify-center gap-2 px-3 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                >
                  <Edit2 className="w-4 h-4" />
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(committee.id)}
                  className="flex items-center justify-center gap-2 px-3 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  Sil
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {committee.activities.map((activity, idx) => (
                <span
                  key={idx}
                  className={`${committee.color} ${committee.iconColor} px-3 py-1 rounded-full text-xs font-medium`}
                >
                  {activity}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                {editingCommittee ? "Komiteyi Düzenle" : "Komite Ekle"}
              </h3>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                disabled={saving}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Komite Adı</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5DA6] text-gray-800"
                  placeholder="örnek: Bilgisayar Topluluğu"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Açıklama</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5DA6] text-gray-800"
                  rows={3}
                  placeholder="Komite açıklaması..."
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Etkinlikler (virgülle ayrılmış)</label>
                <input
                  type="text"
                  value={formData.activities}
                  onChange={(e) => setFormData({ ...formData, activities: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5DA6] text-gray-800"
                  placeholder="örnek: Kodlama Atölyeleri, Yapay Zeka Projeleri, Uygulama Geliştirme"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Simge</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5DA6] text-gray-800 bg-white"
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-3">Renk Şeması</label>
                <div className="grid grid-cols-4 gap-3">
                  {colorSchemes.map((scheme) => (
                    <button
                      key={scheme.label}
                      type="button"
                      onClick={() => handleColorSchemeChange(scheme)}
                      className={`p-4 ${scheme.color} ${scheme.iconColor} rounded-lg border-2 ${formData.color === scheme.color ? scheme.borderColor : "border-transparent"
                        } hover:border-gray-300 transition-all`}
                    >
                      <div className="text-center text-sm font-medium">{scheme.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
                  disabled={saving}
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-br from-[#0A5DA6] to-[#0073B1] text-white rounded-lg hover:shadow-lg transition-all font-medium disabled:opacity-50"
                  disabled={saving}
                >
                  {saving ? "Kaydediliyor..." : editingCommittee ? "Güncelle" : "Ekle"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
