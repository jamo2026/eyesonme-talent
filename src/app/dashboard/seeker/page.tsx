"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import ScoreRing from "@/components/ScoreRing";
import SectorBadge from "@/components/SectorBadge";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const mockJobs = [
  { id: 1, company: "TechVision GmbH", role: "Senior Frontend Developer", score: 92, city: "Stuttgart", salary: "70–90k €", remote: true, hasVideo: true },
  { id: 2, company: "DataBridge AG", role: "Full-Stack Entwickler", score: 84, city: "Karlsruhe", salary: "65–80k €", remote: false, hasVideo: false },
  { id: 3, company: "CloudForge Studios", role: "React Native Developer", score: 77, city: "Freiburg", salary: "60–75k €", remote: true, hasVideo: true },
];

const scoreBreakdown = [
  { label: "Skills-Match", score: 91 },
  { label: "Erfahrung", score: 85 },
  { label: "Kulturfit", score: 78 },
  { label: "Region", score: 95 },
];

export default function SeekerDashboard() {
  const [sector] = useState<"it" | "hw">("it");
  const [videoPitch, setVideoPitch] = useState(false);
  const profileCompletion = 72;
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

  return (
    <div className="min-h-screen bg-warm-gray">
      <Navbar sector={sector} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <SectorBadge sector={sector} size="sm" />
              <span className="text-xs text-muted font-medium">Jobsucher-Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-navy">Nicht ein Lebenslauf. Du. 👋</h1>
            <p className="text-sm text-muted mt-0.5">Stuttgart · Senior React Developer · sofort verfügbar</p>
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
              Jobs suchen
            </Link>
            <Link
              href="/profile"
              className="px-5 py-2.5 border-2 border-brand-it text-brand-it text-sm font-bold rounded-xl hover:bg-brand-it hover:text-white transition-all"
            >
              Profil bearbeiten
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left — main content */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Profile strength */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-black text-navy">Profil-Stärke</h2>
                <span className="text-sm font-black text-brand-it">{profileCompletion}%</span>
              </div>
              <div className="h-2.5 bg-warm-gray rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-brand-it rounded-full transition-all duration-700"
                  style={{ width: `${profileCompletion}%` }}
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Basisdaten", done: true },
                  { label: "Skills & CV", done: true },
                  { label: "Video-Pitch", done: false, cta: true },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-2 text-xs rounded-xl px-3 py-2.5 font-medium border ${
                      item.done
                        ? "bg-green-50 text-green-700 border-green-100"
                        : "bg-brand-it/5 text-brand-it border-brand-it/20"
                    }`}
                  >
                    <span>{item.done ? "✓" : "○"}</span>
                    <span>{item.label}</span>
                    {item.cta && <span className="ml-auto font-bold">→</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Video Pitch — hero element */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-black text-navy flex items-center gap-2">
                    🎥 Dein Video-Pitch
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">+3× mehr Anfragen</span>
                  </h2>
                  <p className="text-xs text-muted mt-0.5">Zeig, wer du wirklich bist – in 90 Sekunden</p>
                </div>
              </div>

              {videoPitch ? (
                <div className="relative bg-navy rounded-2xl overflow-hidden aspect-video flex items-center justify-center group">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-it/20 to-transparent" />
                  <div className="relative text-white text-center">
                    <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold">Dein Video-Pitch · 1:23</p>
                  </div>
                  {/* Name bar */}
                  <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur rounded-xl px-4 py-2.5 flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm font-bold">Lukas Berger</p>
                      <p className="text-white/60 text-xs">Senior React Developer · Stuttgart</p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-brand-it/20 rounded-lg px-2.5 py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-it live-dot" />
                      <span className="text-brand-it text-xs font-bold">Live</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setVideoPitch(false)}
                    className="absolute top-3 right-3 bg-white/20 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-white/30 transition-all font-semibold"
                  >
                    Neu aufnehmen
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setVideoPitch(true)}
                  className="w-full border-2 border-dashed border-gray-200 rounded-2xl py-14 flex flex-col items-center gap-4 hover:border-brand-it hover:bg-brand-it/3 transition-all group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-brand-it/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <span className="text-3xl">🎥</span>
                  </div>
                  <div className="text-center">
                    <p className="text-base font-black text-navy">Video aufnehmen oder hochladen</p>
                    <p className="text-xs text-muted mt-1">Max. 90 Sekunden · MP4, MOV · KI-Feedback inklusive</p>
                  </div>
                  <span className="px-5 py-2 bg-brand-it text-white text-sm font-bold rounded-xl group-hover:opacity-90 transition-all">
                    Jetzt aufnehmen →
                  </span>
                </button>
              )}
            </div>

            {/* KI Job Matches */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-black text-navy flex items-center gap-2">
                  🤖 Deine KI-Match-Jobs
                  <span className="flex items-center gap-1 text-xs bg-brand-it/10 text-brand-it px-2 py-0.5 rounded-full font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-it live-dot" /> Live
                  </span>
                </h2>
                <Link href="/search" className="text-xs text-brand-it font-bold hover:underline">Alle anzeigen →</Link>
              </div>
              <div className="flex flex-col gap-3">
                {mockJobs.map((job) => (
                  <div key={job.id} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-brand-it/40 hover:shadow-md transition-all cursor-pointer group">
                    <div className="w-11 h-11 rounded-xl bg-brand-it/10 text-brand-it font-black flex items-center justify-center flex-shrink-0 text-base group-hover:bg-brand-it group-hover:text-white transition-all">
                      {job.company.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-navy">{job.role}</p>
                      <p className="text-xs text-muted">{job.company} · {job.city}</p>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="text-xs font-semibold text-navy">{job.salary}</span>
                        {job.remote && <span className="text-xs bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded-full font-medium">Remote</span>}
                        {job.hasVideo && <span className="text-xs bg-brand-it/10 text-brand-it px-2 py-0.5 rounded-full font-medium">🎥 Video-Pitch möglich</span>}
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 flex-shrink-0">
                      <ScoreRing score={job.score} sector={sector} size={56} live />
                      <Link href="/chat" className="text-xs px-3 py-1 bg-brand-it text-white rounded-lg font-bold hover:opacity-90 transition-all">Bewerben</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="flex flex-col gap-5">
            {/* Overall score */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <h2 className="font-black text-navy mb-4 flex items-center gap-2">
                Dein KI-Score
                <span className="flex items-center gap-1 text-xs bg-brand-it/10 text-brand-it px-2 py-0.5 rounded-full font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-it live-dot" /> Live
                </span>
              </h2>
              <div className="flex justify-center mb-5">
                <ScoreRing score={84} sector={sector} size={110} label="Gesamt-Match" live />
              </div>
              <div className="flex flex-col gap-3">
                {scoreBreakdown.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-muted font-medium">{item.label}</span>
                      <span className="font-black text-navy">{item.score}%</span>
                    </div>
                    <div className="h-1.5 bg-warm-gray rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-it rounded-full transition-all duration-700"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
              <h2 className="font-black text-navy mb-3">Schnellzugriff</h2>
              <div className="flex flex-col gap-1.5">
                {[
                  { href: "/search", icon: "🔍", label: "Jobs durchsuchen" },
                  { href: "/chat", icon: "💬", label: "Nachrichten öffnen" },
                  { href: "/chat", icon: "📹", label: "Video-Call starten" },
                  { href: "/profile", icon: "👤", label: "Profil vervollständigen" },
                ].map((item) => (
                  <Link
                    key={`${item.href}-${item.label}`}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-navy hover:bg-brand-it/5 hover:text-brand-it transition-all"
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* DSGVO notice */}
            <div className="bg-brand-it-light rounded-2xl border border-brand-it/15 p-4">
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0">🔒</span>
                <div>
                  <p className="text-sm font-black text-navy">DSGVO-konform</p>
                  <p className="text-xs text-muted mt-1 leading-relaxed">
                    EU-Server · Deutschland. Deine Daten werden niemals ohne Zustimmung weitergegeben.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
