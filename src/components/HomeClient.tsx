"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Sparkles,
  Users,
  Calendar,
  Award,
  Clock,
  MapPin,
  Code,
  Cpu,
  Radio,
  Zap,
  Brain,
  Shield,
  Database,
  Globe,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Code,
  Cpu,
  Radio,
  Zap,
  Brain,
  Shield,
  Database,
  Globe,
};

type EventType = {
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

type CommitteeType = {
  id: string;
  name: string;
  description: string;
  activities: string[];
  color: string;
  iconColor: string;
  borderColor: string;
  icon: string;
};

interface HomeClientProps {
  initialEvents: EventType[];
  initialCommittees: CommitteeType[];
}

export default function HomeClient({ initialEvents, initialCommittees }: HomeClientProps) {
  const { t } = useLocale();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/30">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A5DA6] to-[#0073B1] text-white py-24 sm:py-32">
        {/* Subtle Tech Grids & Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="absolute inset-0 bg-radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08)_0%,transparent_60%) pointer-events-none"></div>

        <div className="relative max-w-6xl mx-auto px-6 text-center z-10 flex flex-col items-center">
          {/* Tag Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-medium tracking-wide mb-8 animate-pulse">
            <Sparkles className="w-4 h-4 text-blue-200 fill-blue-200/20" />
            <span>{t.home_hero.tag}</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6 drop-shadow-sm">
            {t.home_hero.title}
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            {t.home_hero.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">
            <Link
              href="/events"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#0A5DA6] font-bold rounded-xl shadow-lg shadow-black/10 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              {t.home_hero.viewEvents}
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              {t.home_hero.learnMore}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-gray-100 py-12 relative z-20 shadow-sm/5%">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Members Stat */}
          <div className="flex flex-col items-center text-center p-6 bg-white transition-transform hover:scale-[1.02] duration-200">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-[#0A5DA6] mb-4">
              <Users className="w-8 h-8" />
            </div>
            <span className="text-4xl font-extrabold text-gray-900 tracking-tight mb-1">500+</span>
            <span className="text-sm font-semibold text-gray-500 tracking-wide uppercase">
              {t.home_stats.members}
            </span>
          </div>

          {/* Events Stat */}
          <div className="flex flex-col items-center text-center p-6 bg-white transition-transform hover:scale-[1.02] duration-200">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-[#0A5DA6] mb-4">
              <Calendar className="w-8 h-8" />
            </div>
            <span className="text-4xl font-extrabold text-gray-900 tracking-tight mb-1">50+</span>
            <span className="text-sm font-semibold text-gray-500 tracking-wide uppercase">
              {t.home_stats.events}
            </span>
          </div>

          {/* Awards Stat */}
          <div className="flex flex-col items-center text-center p-6 bg-white transition-transform hover:scale-[1.02] duration-200">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-[#0A5DA6] mb-4">
              <Award className="w-8 h-8" />
            </div>
            <span className="text-4xl font-extrabold text-gray-900 tracking-tight mb-1">15+</span>
            <span className="text-sm font-semibold text-gray-500 tracking-wide uppercase">
              {t.home_stats.awards}
            </span>
          </div>
        </div>
      </section>

      {/* Focus Areas (Technical Committees) Section */}
      <section className="py-20 bg-slate-50/50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* Section Titles */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-[#0A5DA6] text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100/50">
            {t.home_committees.tag}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {t.home_committees.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg mb-16 leading-relaxed">
            {t.home_committees.description}
          </p>

          {/* Committees Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {initialCommittees.map((committee) => {
              const Icon = iconMap[committee.icon] || Code;
              return (
                <div
                  key={committee.id}
                  className={`bg-white rounded-2xl p-6 shadow-sm border-2 ${committee.borderColor} hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row gap-5 items-start hover:scale-[1.01]`}
                >
                  <div
                    className={`w-14 h-14 ${committee.color} ${committee.iconColor} rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{committee.name}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                      {committee.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {committee.activities.map((act, i) => (
                        <span
                          key={i}
                          className="text-xs bg-slate-50 border border-slate-100 text-gray-600 px-3 py-1 rounded-full font-medium"
                        >
                          {act}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* Section Titles */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-wider mb-4 border border-purple-100/50">
            {t.home_events.tag}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {t.home_events.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg mb-16 leading-relaxed">
            {t.home_events.description}
          </p>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {initialEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:scale-[1.01] transition-all flex flex-col justify-between"
              >
                {/* Colored Top Bar */}
                <div className={`h-1.5 ${event.barColor || "bg-[#0A5DA6]"}`} />

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Tag Label */}
                    <span
                      className={`inline-block ${event.color} ${event.textColor} px-3 py-1 rounded-full text-xs font-bold tracking-wide mb-4`}
                    >
                      {event.type}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-4 leading-snug line-clamp-2 min-h-[48px]">
                      {event.title}
                    </h3>

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
                  </div>

                  {/* Register Button */}
                  <Link
                    href="/register"
                    className="w-full inline-flex items-center justify-center bg-[#0A5DA6] hover:bg-[#0073B1] text-white font-bold py-2.5 px-4 rounded-xl transition-colors tracking-wide text-xs cursor-pointer shadow-sm"
                  >
                    {t.home_events.registerNow}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
