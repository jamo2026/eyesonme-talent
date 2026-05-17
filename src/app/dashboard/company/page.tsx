"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import ScoreRing from "@/components/ScoreRing";
import SectorBadge from "@/components/SectorBadge";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const mockMatches = [
  { id: 1, name: "Lukas Berger", role: "Senior React Developer", score: 94, city: "Stuttgart", tags: ["React", "TypeScript", "Node.js"], available: true, video: true },
  { id: 2, name: "Fatima Al-Hassan", role: "UX/UI Designerin", score: 87, city: "Karlsruhe", tags: ["Figma", "Design Systems", "Research"], available: true, video: true },
  { id: 3, name: "Jonas Müller", role: "DevOps Engineer", score: 81, city: "Freiburg", tags: ["Docker", "Kubernetes", "CI/CD"], available: false, video: false },
  { id: 4, name: "Maria Schmidt", role: "Data Scientist", score: 76, city: "Stuttgart", tags: ["Python", "ML", "SQL"], available: true, video: false },
];

const stats = [
  { label: "Aktive Matches", value: "24", delta: "+3 heute", icon: "🎯", color: "brand-it" },
  { label: "Neue Bewerbungen", value: "8", delta: "+5 diese Woche", icon: "📬", color: "brand-hw" },
  { label: "Interviews geplant", value: "3", delta: "nächste 7 Tage", icon: "📅", color: "brand-it" },
  { label: "Stellen offen", value: "5", delta: "Baden-Württemberg", icon: "💼", color: "brand-hw" },
];

const activity = [
  { text: "Lukas Berger hat deinen Video-Pitch angesehen", time: "vor 2 Std.", icon: "🎥" },
  { text: "Neue Bewerbung von Maria Schmidt eingegangen", time: "vor 4 Std.", icon: "📬" },
  { text: "Video-Call mit Jonas Müller — Mittwoch 14:00 Uhr", time: "gestern", icon: "📹" },
  { text: "KI-Match aktualisiert: 3 neue Top-Kandidaten", time: "gestern", icon: "🤖" },
];

export default function CompanyDashboard() {
  const [sector] = useState<"it" | "hw">("it");
  const [activeFilter, setActiveFilter] = useState("alle");
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push("/login");
    });
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const filters = ["alle", "verfügbar", "top match", "mit video"];

  const filtered = mockMatches.filter((m) => {
    if (activeFilter === "verfügbar") return m.available;
    if (activeFilter === "top match") return m.score >= 85;
    if (activeFilter === "mit video") return m.video;
    return true;
  });

  return (
    <div className="min-h-screen bg-warm-gray">
      <Navbar sector={sector} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <SectorBadge sector={sector} size="sm" />
              <span className="text-xs text-muted font-medium">Unternehmens-Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-navy">Guten Morgen, Mustermann GmbH 👋</h1>
            <p className="text-sm text-muted mt-0.5">Baden-Württemberg · Stuttgart · Plan Pro aktiv</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 bg-white border border-border text-muted text-sm font-semibold rounded-xl hover:bg-warm-gray hover:text-navy transition-all"
            >
              Abmelden
            </button>
            <Link
              href="/search"
              className="px-5 py-2.5 bg-white border border-border text-navy text-sm font-semibold rounded-xl hover:bg-warm-gray transition-all"
            >
              Talente suchen
            </Link>
            <Link
              href="/search"
              className="px-5 py-2.5 bg-brand-it text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all shadow-sm shadow-brand-it/20"
            >
              + Stelle ausschreiben
            </Link>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-5 border border-border shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl">{s.icon}</span>
                <span className={`text-xs font-semibold text-${s.color} bg-${s.color}/10 px-2 py-0.5 rounded-full`}>
                  {s.delta}
                </span>
              </div>
              <span className="text-4xl font-black text-navy block mb-0.5">{s.value}</span>
              <span className="text-xs text-muted">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main – KI Matches */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-black text-navy flex items-center gap-2">
                    🤖 KI-Match-Vorschläge
                    <span className="flex items-center gap-1 text-xs bg-brand-it/10 text-brand-it px-2 py-0.5 rounded-full font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-it live-dot" />
                      Live
                    </span>
                  </h2>
                  <p className="text-xs text-muted mt-0.5">Echtzeit-Analyse · transparent · kein Blackbox</p>
                </div>
                {/* Filter pills */}
                <div className="flex flex-wrap gap-1">
                  {filters.map((f) => (
                    <button
                      key={f}
                      onClick={() => setActiveFilter(f)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all capitalize ${
                        activeFilter === f
                          ? "bg-brand-it text-white"
                          : "bg-warm-gray text-muted hover:text-navy border border-border"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {filtered.map((match) => (
                  <div
                    key={match.id}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-brand-it/40 hover:shadow-md transition-all cursor-pointer group"
                  >
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-xl bg-brand-it/10 flex items-center justify-center flex-shrink-0 text-brand-it font-black text-lg group-hover:bg-brand-it group-hover:text-white transition-all">
                      {match.name.charAt(0)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="font-bold text-sm text-navy">{match.name}</span>
                        {match.available && (
                          <span className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 live-dot" /> verfügbar
                          </span>
                        )}
                        {match.video && (
                          <span className="text-xs bg-brand-it/10 text-brand-it px-1.5 py-0.5 rounded-full font-medium">🎥 Video</span>
                        )}
                      </div>
                      <p className="text-xs text-muted mb-2">{match.role} · {match.city}</p>
                      <div className="flex flex-wrap gap-1">
                        {match.tags.map((t) => (
                          <span key={t} className="px-2 py-0.5 bg-warm-gray border border-border text-navy text-xs rounded-lg font-medium">{t}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-2 flex-shrink-0">
                      <ScoreRing score={match.score} sector={sector} size={60} live />
                      <div className="flex gap-1">
                        <Link href="/chat" className="text-xs px-2 py-1 bg-brand-it text-white rounded-lg font-semibold hover:opacity-90 transition-all">
                          Chat
                        </Link>
                        <Link href="/chat" className="text-xs px-2 py-1 bg-warm-gray border border-border text-navy rounded-lg font-semibold hover:bg-gray-100 transition-all">
                          📹
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Flat fee banner */}
            <div className="bg-navy rounded-2xl p-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-white font-black text-lg">💶 Flat Fee — Zero Provision</p>
                <p className="text-white/60 text-sm mt-0.5">
                  Andere zahlen <span className="line-through text-white/40">749€+</span> pro Stelle. Sie: ab 99€/Monat — unbegrenzt.
                </p>
              </div>
              <Link href="/#pricing" className="flex-shrink-0 px-4 py-2 bg-brand-it text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all">
                Preise ansehen
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5">
            {/* Activity */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
              <h2 className="font-black text-navy mb-4">Letzte Aktivitäten</h2>
              <div className="flex flex-col gap-3">
                {activity.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
                    <span className="text-lg flex-shrink-0">{a.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-navy leading-snug">{a.text}</p>
                      <p className="text-xs text-muted mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* USP card */}
            <div className="rounded-2xl border-2 border-brand-it/20 bg-brand-it-light p-5">
              <p className="font-black text-navy text-sm mb-3">Warum EyesOnMe Talent?</p>
              <ul className="flex flex-col gap-2">
                {[
                  "Kein Pay-per-Click. Flat Fee.",
                  "Transparenter KI-Match-Score",
                  "Video-Pitch statt Anschreiben",
                  "Direkt-Video-Call inklusive",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-navy">
                    <span className="w-4 h-4 rounded-full bg-brand-it text-white flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
