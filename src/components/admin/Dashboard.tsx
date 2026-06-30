"use client";

import { useState, useEffect } from "react";
import { Calendar, Users, Menu, TrendingUp } from "lucide-react";

type Event = {
  id: string;
  type: string;
  title: string;
  date: string;
  time: string;
  color: string;
  textColor: string;
};

type Committee = {
  id: string;
  name: string;
  activities: string[];
  color: string;
  iconColor: string;
};

export default function Dashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [menuCount, setMenuCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [eventsRes, committeesRes, menusRes] = await Promise.all([
          fetch("/api/events"),
          fetch("/api/committees"),
          fetch("/api/menus"),
        ]);

        if (eventsRes.ok) setEvents(await eventsRes.json());
        if (committeesRes.ok) setCommittees(await committeesRes.json());
        if (menusRes.ok) {
          const menus = await menusRes.json();
          setMenuCount(menus.length);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const stats = [
    {
      label: "Total Events",
      value: events.length,
      icon: <Calendar className="w-8 h-8" />,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "Committees",
      value: committees.length,
      icon: <Users className="w-8 h-8" />,
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      label: "Menu Items",
      value: menuCount,
      icon: <Menu className="w-8 h-8" />,
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      label: "Total Views",
      value: "2.4K",
      icon: <TrendingUp className="w-8 h-8" />,
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  if (loading) {
    return <div className="text-gray-500">Gösterge paneli yükleniyor...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">Gösterge Paneli</h2>
        <p className="text-gray-600">Yönetici panelinize hoş geldiniz</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center ${stat.textColor}`}>
                {stat.icon}
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Events</h3>
          <div className="space-y-3">
            {events.slice(0, 5).map((event) => (
              <div
                key={event.id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#0A5DA6] transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className={`inline-block ${event.color} ${event.textColor} px-2 py-1 rounded text-xs font-semibold mb-2`}>
                      {event.type}
                    </div>
                    <h4 className="text-gray-900 font-medium mb-1">{event.title}</h4>
                    <p className="text-sm text-gray-500">{event.date} · {event.time}</p>
                  </div>
                </div>
              </div>
            ))}
            {events.length === 0 && (
              <p className="text-gray-500 text-sm">Henüz etkinlik yok.</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Committees</h3>
          <div className="space-y-3">
            {committees.slice(0, 5).map((committee) => (
              <div
                key={committee.id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#0A5DA6] transition-colors"
              >
                <h4 className="text-gray-900 font-medium mb-2">{committee.name}</h4>
                <div className="flex flex-wrap gap-2">
                  {committee.activities.slice(0, 2).map((activity, idx) => (
                    <span
                      key={idx}
                      className={`${committee.color} ${committee.iconColor} px-2 py-1 rounded text-xs font-medium`}
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {committees.length === 0 && (
              <p className="text-gray-500 text-sm">Henüz komite yok.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
