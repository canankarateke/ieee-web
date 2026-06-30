"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";

type MenuItem = {
  id: string;
  label: string;
  to: string;
  order: number;
};

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    label: "",
    to: "",
    order: 1,
  });

  const fetchMenus = useCallback(async () => {
    try {
      const res = await fetch("/api/menus");
      if (res.ok) {
        setMenuItems(await res.json());
      }
    } catch (error) {
      console.error("Failed to fetch menus:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  const handleOpenAddModal = () => {
    setFormData({
      label: "",
      to: "",
      order: menuItems.length + 1,
    });
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.label.trim() || !formData.to.trim()) {
      setError("Label and Path are required");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      if (editingItem) {
        const res = await fetch(`/api/menus/${editingItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to update menu item");
        }
        await fetchMenus();
      } else {
        const res = await fetch("/api/menus", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to create menu item");
        }
        await fetchMenus();
      }
      resetForm();
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred";
      console.error("Failed to save menu item:", message);
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({ label: "", to: "", order: menuItems.length + 1 });
    setEditingItem(null);
    setIsModalOpen(false);
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({ label: item.label, to: item.to, order: item.order });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this menu item?")) return;

    try {
      const res = await fetch(`/api/menus/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchMenus();
      }
    } catch (error) {
      console.error("Failed to delete menu item:", error);
    }
  };

  if (loading) {
    return <div className="text-gray-500">Loading menu items...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">Menü Yönetimi</h2>
          <p className="text-gray-600">Web sitesi gezinme menünüzü yönetin</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 bg-gradient-to-br from-[#0A5DA6] to-[#0073B1] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all hover:scale-105 font-medium"
        >
          <Plus className="w-5 h-5" />
          Menü Öğesi Ekle
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Label</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Path</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Order</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {menuItems
                .sort((a, b) => a.order - b.order)
                .map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.label}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">{item.to}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {item.order}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Öğeyi Düzenle"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Öğeyi Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              {menuItems.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                    Menü öğesi bulunamadı. Oluşturmak için "Menü Öğesi Ekle"ye tıklayın.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                {editingItem ? "Menü Öğesini Düzenle" : "Menü Öğesi Ekle"}
              </h3>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
                <label className="block text-gray-700 font-medium mb-2">Etiket</label>
                <input
                  type="text"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5DA6] text-gray-800"
                  placeholder="örnek: Hakkımızda"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Yol</label>
                <input
                  type="text"
                  value={formData.to}
                  onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5DA6] text-gray-800 font-mono"
                  placeholder="örnek: /hakkimizda"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Sıra</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5DA6] text-gray-800"
                  min="1"
                  required
                />
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
                  {saving ? "Kaydediliyor..." : editingItem ? "Güncelle" : "Ekle"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
