"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

interface MatchCard {
  id: number;
  score: number;
  label: string;
  sublabel: string;
  city: string;
  skills: string[];
  badge?: string;
  extra?: string;
}

const CANDIDATES: MatchCard[] = [
  { id: 1, score: 94, label: "Thomas Berger", sublabel: "Elektriker · 8 J. Erfahrung", city: "Stuttgart", skills: ["Elektroinstallation", "Heizungsanlagen", "Sanitär"], badge: "Ab sofort" },
  { id: 2, score: 87, label: "Lisa Maier", sublabel: "React Developer · 5 J. Erfahrung", city: "Karlsruhe", skills: ["React", "TypeScript", "Node.js"], badge: "In 1 Monat" },
  { id: 3, score: 81, label: "Marco Schulz", sublabel: "Schreiner · 12 J. Erfahrung", city: "Freiburg", skills: ["Holzbearbeitung", "CNC", "Schweißen"] },
  { id: 4, score: 76, label: "Sarah Klein", sublabel: "DevOps Engineer · 4 J. Erfahrung", city: "Stuttgart", skills: ["Docker", "AWS", "Kubernetes"], badge: "Ab sofort" },
  { id: 5, label: "Jan Fischer", sublabel: "Dachdecker · 6 J. Erfahrung", city: "Heidelberg", score: 72, skills: ["Dachdecken", "Mauern"] },
];

const JOBS: MatchCard[] = [
  { id: 1, score: 91, label: "Elektriker (m/w/d)", sublabel: "Müller Elektro GmbH", city: "Stuttgart", skills: ["Elektroinstallation", "Heizungsanlagen"], extra: "45–60k € · Vollzeit" },
  { id: 2, score: 84, label: "Senior React Developer", sublabel: "TechVision GmbH", city: "Karlsruhe", skills: ["React", "TypeScript"], extra: "70–90k € · Remote möglich" },
  { id: 3, score: 78, label: "Schreiner / Tischler", sublabel: "Holzbau Bayer GmbH", city: "Freiburg", skills: ["Holzbearbeitung", "CNC"], extra: "38–48k € · Vollzeit" },
  { id: 4, score: 69, label: "Kfz-Mechatroniker", sublabel: "Auto-Service Zentrum", city: "Heidelberg", skills: ["Kfz-Diagnose", "Schweißen"], extra: "36–45k € · Vollzeit" },
];

type ViewMode = "company" | "seeker";

export default function MatchPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("company");
  const [index, setIndex] = useState(0);
  const [swipeDir, setSwipeDir] = useState<"left" | "right" | null>(null);
  const [showMatch, setShowMatch] = useState(false);
  const [likedIds, setLikedIds] = useState<number[]>([]);

  const cards = viewMode === "company" ? CANDIDATES : JOBS;
  const card = cards[index];
  const done = index >= cards.length;
  const isIT = viewMode === "seeker";
  const accent = isIT ? "bg-brand-it" : "bg-brand-hw";
  const accentText = isIT ? "text-brand-it" : "text-brand-hw";

  const handleSwipe = (dir: "left" | "right") => {
    if (swipeDir) return;
    setSwipeDir(dir);

    if (dir === "right") {
      setLikedIds((prev) => [...prev, card.id]);
      if (Math.random() > 0.45) {
        setTimeout(() => {
          setSwipeDir(null);
          setIndex((i) => i + 1);
          setShowMatch(true);
        }, 320);
        return;
      }
    }

    setTimeout(() => {
      setSwipeDir(null);
      setIndex((i) => i + 1);
    }, 320);
  };

  const reset = () => {
    setIndex(0);
    setSwipeDir(null);
    setLikedIds([]);
  };

  return (
    <div className="min-h-screen bg-warm-gray">
      <Navbar />

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-black text-navy">Matches</h1>
            <p className="text-xs text-muted mt-0.5">
              {done ? "Alle gesehen" : `${cards.length - index} übrig`}
            </p>
          </div>
          {likedIds.length > 0 && (
            <span className="flex items-center gap-1.5 bg-green-50 border border-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">
              ✓ {likedIds.length} Interesse
            </span>
          )}
        </div>

        {/* View toggle */}
        <div className="bg-white rounded-2xl p-1 flex gap-1 mb-6 border border-border shadow-sm">
          <button onClick={() => { setViewMode("company"); reset(); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${viewMode === "company" ? "bg-brand-hw text-white shadow-sm" : "text-muted hover:text-navy"}`}>
            🏢 Kandidaten
          </button>
          <button onClick={() => { setViewMode("seeker"); reset(); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${viewMode === "seeker" ? "bg-brand-it text-white shadow-sm" : "text-muted hover:text-navy"}`}>
            💼 Jobs
          </button>
        </div>

        {/* Match popup */}
        {showMatch && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center match-pop shadow-2xl">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-black text-navy mb-2">Neues Match!</h2>
              <p className="text-muted text-sm mb-1">Gegenseitiges Interesse!</p>
              <p className="text-muted text-sm mb-6">Der Chat ist jetzt freigeschaltet.</p>
              <div className="flex flex-col gap-3">
                <Link href="/chat" onClick={() => setShowMatch(false)}
                  className="w-full py-3.5 rounded-2xl bg-brand-it text-white font-black text-sm hover:opacity-90 transition-all block text-center">
                  💬 Jetzt chatten →
                </Link>
                <button onClick={() => setShowMatch(false)}
                  className="w-full py-3 rounded-2xl border border-border text-navy font-semibold text-sm hover:bg-warm-gray transition-all">
                  Weiter anschauen
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Finished state */}
        {done ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-border shadow-sm">
            <div className="text-5xl mb-4">👀</div>
            <h2 className="text-lg font-black text-navy mb-2">Alle gesehen!</h2>
            <p className="text-sm text-muted mb-6">
              Neue {viewMode === "company" ? "Kandidaten" : "Jobs"} werden täglich hinzugefügt.
            </p>
            <button onClick={reset}
              className={`px-8 py-3 rounded-xl text-white font-bold text-sm ${accent} hover:opacity-90 transition-all`}>
              Nochmal von vorne
            </button>
          </div>
        ) : (
          <div className="relative">
            {/* Card stack behind */}
            {index + 1 < cards.length && (
              <div className="absolute inset-0 bg-white rounded-3xl border border-border shadow-sm translate-y-3 scale-95 opacity-70 pointer-events-none" />
            )}
            {index + 2 < cards.length && (
              <div className="absolute inset-0 bg-white rounded-3xl border border-border shadow-sm translate-y-6 scale-90 opacity-40 pointer-events-none" />
            )}

            {/* Main card */}
            <div className={`relative bg-white rounded-3xl border border-border shadow-lg overflow-hidden transition-none ${swipeDir === "left" ? "swipe-left" : swipeDir === "right" ? "swipe-right" : ""}`}>

              {/* Card header */}
              <div className={`h-40 ${accent} flex items-center justify-center relative`}>
                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur text-white font-black text-4xl flex items-center justify-center border-4 border-white/30 shadow-inner">
                  {card.label.charAt(0)}
                </div>

                {/* Score badge */}
                <div className="absolute top-4 right-4 bg-white rounded-2xl px-3 py-1.5 shadow-md flex items-center gap-1.5">
                  <span className="text-xs text-muted font-semibold">Match</span>
                  <span className={`text-base font-black ${accentText}`}>{card.score}%</span>
                </div>

                {card.badge && (
                  <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                    {card.badge}
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="p-6">
                <h2 className="text-xl font-black text-navy leading-tight">{card.label}</h2>
                <p className="text-sm text-muted mt-0.5 mb-1">{card.sublabel}</p>
                <p className="text-xs text-muted mb-2">📍 {card.city}</p>
                {card.extra && (
                  <p className="text-sm font-bold text-navy mb-3">💶 {card.extra}</p>
                )}

                <div className="flex flex-wrap gap-2 mt-3">
                  {card.skills.map((skill) => (
                    <span key={skill}
                      className={`px-3 py-1.5 rounded-xl text-sm font-semibold ${isIT ? "bg-brand-it/10 text-brand-it" : "bg-brand-hw/10 text-brand-hw"}`}>
                      {skill}
                    </span>
                  ))}
                </div>

                {viewMode === "company" && (
                  <Link
                    href={`/profile/${card.id}`}
                    className="mt-4 flex items-center gap-1 text-xs font-bold text-brand-hw hover:underline"
                  >
                    Vollständiges Profil ansehen →
                  </Link>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex gap-4 px-6 pb-6">
                <button onClick={() => handleSwipe("left")}
                  className="flex-1 py-4 rounded-2xl bg-red-50 border-2 border-red-100 text-red-500 text-2xl font-black hover:bg-red-100 active:scale-95 transition-all">
                  ✕
                </button>
                <button onClick={() => handleSwipe("right")}
                  className="flex-1 py-4 rounded-2xl bg-green-50 border-2 border-green-100 text-green-600 text-lg font-black hover:bg-green-100 active:scale-95 transition-all">
                  ✓ Interesse
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Progress dots */}
        {!done && (
          <div className="flex gap-1.5 justify-center mt-6">
            {cards.map((_, i) => (
              <div key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${i < index ? accentText.replace("text-", "bg-") : i === index ? accent : "bg-gray-200"}`}
                style={{ width: i === index ? "24px" : "8px" }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
