"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Edit2, Trash2, X, Calendar, Clock, MapPin } from "lucide-react";

type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  description: string;
  color: string;
  textColor: string;
  barColor: string;
};

export default function EventsManagement() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    type: "Workshop",
    description: "",
    color: "bg-blue-100",
    textColor: "text-blue-700",
    barColor: "bg-blue-500",
  });

  const eventTypes = [
    { value: "Workshop", color: "bg-blue-100", textColor: "text-blue-700", barColor: "bg-blue-500" },
    { value: "Summit", color: "bg-purple-100", textColor: "text-purple-700", barColor: "bg-purple-500" },
    { value: "Competition", color: "bg-green-100", textColor: "text-green-700", barColor: "bg-green-500" },
    { value: "Seminar", color: "bg-orange-100", textColor: "text-orange-700", barColor: "bg-orange-500" },
    { value: "Conference", color: "bg-red-100", textColor: "text-red-700", barColor: "bg-red-500" },
  ];

    const fetchEvents = useCallback(async () => {
      try {
        const res = await fetch("/api/events");
        if (res.ok) {
          setEvents(await res.json());
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    }, []);

    useEffect(() => {
      fetchEvents();
    }, [fetchEvents]);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!formData.title.trim()) {
        setError("Title is required");
        return;
      }

      setSaving(true);
      setError(null);

      try {
        if (editingEvent) {
          const res = await fetch(`/api/events/${editingEvent.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
          if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || "Failed to update event");
          }
          await fetchEvents();
        } else {
          const res = await fetch("/api/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
          if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || "Failed to create event");
          }
          await fetchEvents();
        }
        resetForm();
      } catch (error) {
        const message = error instanceof Error ? error.message : "An error occurred";
        console.error("Failed to save event:", message);
        setError(message);
      } finally {
        setSaving(false);
      }
    };

    const resetForm = () => {
      setFormData({
        title: "",
        date: "",
        time: "",
        location: "",
        type: "Workshop",
        description: "",
        color: "bg-blue-100",
        textColor: "text-blue-700",
        barColor: "bg-blue-500",
      });
      setEditingEvent(null);
      setIsModalOpen(false);
    };

    const handleEdit = (event: Event) => {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
        type: event.type,
        description: event.description || "",
        color: event.color,
        textColor: event.textColor,
        barColor: event.barColor || "bg-blue-500",
      });
      setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
      if (!confirm("Are you sure you want to delete this event?")) return;

      try {
        const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
        if (res.ok) {
          await fetchEvents();
        }
      } catch (error) {
        console.error("Failed to delete event:", error);
      }
    };

    const handleTypeChange = (type: string) => {
      const typeConfig = eventTypes.find((t) => t.value === type);
      if (typeConfig) {
        setFormData({
          ...formData,
          type,
          color: typeConfig.color,
          textColor: typeConfig.textColor,
          barColor: typeConfig.barColor,
        });
      }
    };

    if (loading) {
      return <div className="text-gray-500">Loading events...</div>;
    }

    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-2">Events Management</h2>
            <p className="text-gray-600">Manage your events and workshops</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-br from-[#0A5DA6] to-[#0073B1] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all hover:scale-105 font-medium"
          >
            <Plus className="w-5 h-5" />
            Etkinlik Ekle
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className={`h-2 ${event.barColor}`}></div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className={`inline-block ${event.color} ${event.textColor} px-3 py-1 rounded-full text-xs font-semibold mb-4`}>
                    {event.type}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{event.title}</h3>

                  <div className="space-y-2.5 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-[#0A5DA6] flex-shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-[#0A5DA6] flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-[#0A5DA6] flex-shrink-0" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>
                  {event.description && (
                    <p className="text-gray-500 text-xs line-clamp-2 mb-4 border-t border-gray-100 pt-3">
                      {event.description}
                    </p>
                  )}
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-100 mt-auto">
                  <button
                    onClick={() => handleEdit(event)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                  >
                    <Edit2 className="w-4 h-4" />
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 my-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {editingEvent ? "Etkinliği Düzenle" : "Etkinlik Ekle"}
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
                  <label className="block text-gray-700 font-medium mb-2">Event Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5DA6] text-gray-800"
                    placeholder="örnek: Yapay Zeka Atölyesi"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Date</label>
                    <input
                      type="text"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5DA6] text-gray-800"
                      placeholder="örnek: 25 Mayıs 2026"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Time</label>
                    <input
                      type="text"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5DA6] text-gray-800"
                      placeholder="örnek: 14:00 - 17:00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5DA6] text-gray-800"
                    placeholder="örnek: Mühendislik Binası, Oda 301"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Event Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleTypeChange(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5DA6] text-gray-800 bg-white"
                  >
                    {eventTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.value}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Description (Optional)</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5DA6] text-gray-800"
                    rows={3}
                    placeholder="Event description..."
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
                    {saving ? "Kaydediliyor..." : editingEvent ? "Güncelle" : "Ekle"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
