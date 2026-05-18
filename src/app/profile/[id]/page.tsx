"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import ScoreRing from "@/components/ScoreRing";
import VideoPlayer from "@/components/VideoPlayer";

type Sector = "it" | "hw";
type InterestState = "none" | "pending" | "matched";

interface SeekerProfile {
  kind: "seeker";
  id: number;
  name: string;
  role: string;
  sector: Sector;
  score: number;
  city: string;
  available: string;
  salary: string;
  remote: string;
  experience: string;
  skills: string[];
  about: string;
  videoDuration: string;
}

interface CompanyProfile {
  kind: "company";
  id: number;
  name: string;
  industry: string;
  sector: Sector;
  score: number;
  city: string;
  size: string;
  founded: string;
  description: string;
  jobs: { id: number; title: string; location: string; active: boolean }[];
}

type AnyProfile = SeekerProfile | CompanyProfile;

const PROFILES: Record<number, AnyProfile> = {
  // ── Seekers ──────────────────────────────────────────────
  1: {
    kind: "seeker", id: 1, name: "Thomas Berger", role: "Elektriker", sector: "hw", score: 94,
    city: "Stuttgart", available: "Ab sofort", salary: "38–48k € / Jahr", remote: "Vor Ort", experience: "8 Jahre",
    skills: ["Elektroinstallation", "Heizungsanlagen", "Sanitär", "Photovoltaik", "Schaltschrankbau"],
    about: "Erfahrener Elektriker mit Spezialisierung auf Industrie- und Wohngebäude. Leidenschaftlich am Handwerk seit meiner Ausbildung 2016. Verlässlich, pünktlich und ein echter Teamplayer.",
    videoDuration: "1:42",
  },
  2: {
    kind: "seeker", id: 2, name: "Lisa Maier", role: "React Developer", sector: "it", score: 87,
    city: "Karlsruhe", available: "In 1 Monat", salary: "60–80k € / Jahr", remote: "Hybrid", experience: "5 Jahre",
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "Next.js"],
    about: "Leidenschaftliche Frontend-Entwicklerin mit Fokus auf moderne Web-Applikationen. Ich bringe nicht nur Code, sondern auch UX-Denken mit. Agile Arbeitsweise ist für mich selbstverständlich.",
    videoDuration: "2:08",
  },
  3: {
    kind: "seeker", id: 3, name: "Marco Schulz", role: "Schreiner", sector: "hw", score: 81,
    city: "Freiburg", available: "In 2 Wochen", salary: "34–44k € / Jahr", remote: "Vor Ort", experience: "12 Jahre",
    skills: ["Holzbearbeitung", "CNC", "Schweißen", "Restaurierung", "Innenausbau"],
    about: "Handwerksmeister mit 12 Jahren Berufserfahrung. Vom klassischen Möbelbau bis zum modernen Innenausbau – Qualität und Präzision sind mein Markenzeichen.",
    videoDuration: "1:55",
  },
  4: {
    kind: "seeker", id: 4, name: "Sarah Klein", role: "DevOps Engineer", sector: "it", score: 76,
    city: "Stuttgart", available: "Ab sofort", salary: "70–90k € / Jahr", remote: "Remote", experience: "4 Jahre",
    skills: ["Docker", "AWS", "Kubernetes", "CI/CD", "Terraform"],
    about: "DevOps-Ingenieurin mit Leidenschaft für stabile, skalierbare Infrastruktur. Ich automatisiere was automatisierbar ist – damit das Team sich aufs Wesentliche konzentrieren kann.",
    videoDuration: "1:28",
  },
  5: {
    kind: "seeker", id: 5, name: "Jan Fischer", role: "Dachdecker", sector: "hw", score: 72,
    city: "Heidelberg", available: "In 3 Wochen", salary: "32–42k € / Jahr", remote: "Vor Ort", experience: "6 Jahre",
    skills: ["Dachdecken", "Mauern", "Wärmedämmung", "Flachdach", "Kupferarbeiten"],
    about: "Dachdecker mit Ausbildung und 6 Jahren Berufspraxis. Sorgfalt und Sicherheit stehen bei mir an erster Stelle. Auch Baustellen mit schwierigen Zugängen schrecken mich nicht ab.",
    videoDuration: "1:15",
  },
  // ── Companies (IDs 11–13, linked from seeker dashboard match.id + 10) ──
  11: {
    kind: "company", id: 11, name: "Müller Elektro GmbH", industry: "Elektrohandwerk", sector: "hw", score: 94,
    city: "Stuttgart", size: "10–50 Mitarbeiter", founded: "2008",
    description: "Familiengeführter Elektrobetrieb mit über 15 Jahren Erfahrung in Industrie- und Wohngebäuden. Wir stehen für Qualität, Zuverlässigkeit und partnerschaftliche Zusammenarbeit auf Augenhöhe.",
    jobs: [
      { id: 1, title: "Elektriker (m/w/d)", location: "Stuttgart", active: true },
      { id: 2, title: "Elektroniker Energie- & Gebäudetechnik", location: "Stuttgart", active: true },
    ],
  },
  12: {
    kind: "company", id: 12, name: "TechVision GmbH", industry: "IT & Software", sector: "it", score: 87,
    city: "Karlsruhe", size: "50–200 Mitarbeiter", founded: "2015",
    description: "Wir entwickeln innovative Softwarelösungen für den Mittelstand. Agile Teams, moderne Technik und echte Eigenverantwortung – bei uns gestaltest du aktiv mit, nicht nur mit.",
    jobs: [
      { id: 1, title: "Senior React Developer", location: "Remote", active: true },
      { id: 2, title: "DevOps Engineer", location: "Karlsruhe", active: true },
      { id: 3, title: "UX Designer", location: "Hybrid", active: false },
    ],
  },
  13: {
    kind: "company", id: 13, name: "Holzbau Bayer GmbH", industry: "Holz & Innenausbau", sector: "hw", score: 78,
    city: "Freiburg", size: "20–50 Mitarbeiter", founded: "1998",
    description: "Traditionelles Handwerk trifft moderne CNC-Technologie. Mit über 25 Jahren Erfahrung sind wir einer der führenden Schreinereibetriebe in der Region Freiburg.",
    jobs: [
      { id: 1, title: "Schreiner / Tischler (m/w/d)", location: "Freiburg", active: true },
      { id: 2, title: "CNC-Fachkraft", location: "Freiburg", active: true },
    ],
  },
};

export default function ProfileViewPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const profile = PROFILES[id];

  const [interest, setInterest] = useState<InterestState>("none");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push("/login");
    });
    const saved = localStorage.getItem(`interest_${id}`);
    if (saved === "pending" || saved === "matched") setInterest(saved);
  }, [router, id]);

  const handleInterest = async () => {
    setInterest("pending");
    localStorage.setItem(`interest_${id}`, "pending");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await supabase.from("matches").upsert({
          user_id: session.user.id,
          profile_id: id,
          status: "pending",
        });
      }
    } catch {}
    if (Math.random() > 0.55) {
      setTimeout(() => {
        setInterest("matched");
        localStorage.setItem(`interest_${id}`, "matched");
      }, 2200);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-warm-gray">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <p className="text-xl font-black text-navy mb-2">Profil nicht gefunden</p>
            <Link href="/match" className="text-brand-it text-sm font-bold hover:underline">← Zurück zu Matches</Link>
          </div>
        </div>
      </div>
    );
  }

  const isIT = profile.sector === "it";
  const isSeeker = profile.kind === "seeker";

  return (
    <div className="min-h-screen bg-warm-gray">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-6 pb-36">
        <Link href="/match" className="flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-navy transition-colors mb-6">
          ← Zurück
        </Link>

        {/* ── Hero card ── */}
        <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden mb-4">
          <div className={`h-36 relative ${isIT ? "bg-brand-it" : "bg-brand-hw"}`}>
            <div className="absolute bottom-0 left-6 translate-y-1/2">
              <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur text-white font-black text-3xl flex items-center justify-center border-4 border-white shadow-lg">
                {profile.name.charAt(0)}
              </div>
            </div>
            <div className="absolute bottom-3 right-5">
              <ScoreRing score={profile.score} sector={profile.sector} size={68} label="Match"
                live={isSeeker && (profile as SeekerProfile).available === "Ab sofort"} />
            </div>
          </div>

          <div className="pt-14 px-6 pb-6">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-4">
              <div>
                <h1 className="text-2xl font-black text-navy">{profile.name}</h1>
                <p className="text-muted text-sm mt-0.5">
                  {isSeeker
                    ? `${(profile as SeekerProfile).role} · 📍 ${profile.city}`
                    : `${(profile as CompanyProfile).industry} · 📍 ${profile.city}`}
                </p>
              </div>
              {isSeeker && (
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 ${isIT ? "bg-brand-it-light text-brand-it" : "bg-brand-hw-light text-brand-hw"}`}>
                  {(profile as SeekerProfile).available === "Ab sofort" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 live-dot" />
                  )}
                  {(profile as SeekerProfile).available}
                </span>
              )}
            </div>

            {isSeeker ? (
              <>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: "Gehalt", value: (profile as SeekerProfile).salary, icon: "💶" },
                    { label: "Arbeitsort", value: (profile as SeekerProfile).remote, icon: "🏠" },
                    { label: "Erfahrung", value: (profile as SeekerProfile).experience, icon: "⭐" },
                  ].map((item) => (
                    <div key={item.label} className={`rounded-xl p-3 border ${isIT ? "bg-brand-it-light border-brand-it/20" : "bg-brand-hw-light border-brand-hw/20"}`}>
                      <span className="text-base">{item.icon}</span>
                      <p className="text-xs text-muted mt-1 font-medium">{item.label}</p>
                      <p className="text-xs font-black text-navy mt-0.5">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {(profile as SeekerProfile).skills.map((skill) => (
                    <span key={skill} className={`px-3 py-1.5 rounded-xl text-sm font-semibold ${isIT ? "bg-brand-it/8 text-brand-it" : "bg-brand-hw/10 text-brand-hw"}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Teamgröße", value: (profile as CompanyProfile).size, icon: "👥" },
                  { label: "Gegründet", value: (profile as CompanyProfile).founded, icon: "📅" },
                ].map((item) => (
                  <div key={item.label} className={`rounded-xl p-3 border ${isIT ? "bg-brand-it-light border-brand-it/20" : "bg-brand-hw-light border-brand-hw/20"}`}>
                    <span className="text-base">{item.icon}</span>
                    <p className="text-xs text-muted mt-1 font-medium">{item.label}</p>
                    <p className="text-xs font-black text-navy mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Video Pitch — seekers only ── */}
        {isSeeker && (
          <div className="bg-white rounded-3xl border border-border shadow-sm p-6 mb-4">
            <h2 className="font-black text-navy mb-4">🎬 Video Pitch</h2>
            <VideoPlayer
              name={profile.name}
              duration={(profile as SeekerProfile).videoDuration}
              sector={profile.sector}
            />
          </div>
        )}

        {/* ── About / Description ── */}
        <div className="bg-white rounded-3xl border border-border shadow-sm p-6 mb-4">
          <h2 className="font-black text-navy mb-3">{isSeeker ? "Über mich" : "Über uns"}</h2>
          <p className="text-muted text-sm leading-relaxed">
            {isSeeker
              ? (profile as SeekerProfile).about
              : (profile as CompanyProfile).description}
          </p>
        </div>

        {/* ── Open Jobs — companies only ── */}
        {!isSeeker && (
          <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden mb-4">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="font-black text-navy">💼 Offene Stellen</h2>
            </div>
            {(profile as CompanyProfile).jobs.map((job, i) => (
              <div
                key={job.id}
                className={`flex items-center gap-3 px-6 py-4 ${i < (profile as CompanyProfile).jobs.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${job.active ? "bg-green-500" : "bg-border"}`} />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-navy truncate">{job.title}</p>
                  <p className="text-xs text-muted">📍 {job.location}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${job.active ? "bg-green-50 text-green-700" : "bg-warm-gray text-muted"}`}>
                  {job.active ? "Aktiv" : "Pausiert"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Sticky CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-warm-gray via-warm-gray to-transparent">
        <div className="max-w-2xl mx-auto">

          {interest === "none" && (
            <div className="flex flex-col gap-2">
              <p className="text-xs text-muted text-center px-2">
                Erst nach gegenseitigem Match wird der Chat freigeschaltet.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/match"
                  className="flex-1 py-4 rounded-2xl bg-white border-2 border-border text-muted font-bold text-sm text-center hover:border-red-200 hover:text-red-500 transition-all"
                >
                  ✕ Kein Interesse
                </Link>
                <button
                  onClick={handleInterest}
                  className={`flex-1 py-4 rounded-2xl text-white font-black text-sm hover:opacity-90 transition-all shadow-md ${isIT ? "bg-brand-it" : "bg-brand-hw"}`}
                >
                  ✓ Interesse bekunden
                </button>
              </div>
            </div>
          )}

          {interest === "pending" && (
            <div className="bg-white rounded-2xl border border-amber-200 shadow-sm p-4 text-center">
              <p className="text-amber-600 font-bold text-sm">⏳ Interesse gesendet – warte auf Antwort</p>
              <p className="text-xs text-muted mt-1">Du wirst benachrichtigt, sobald {profile.name} ebenfalls Interesse bekundet.</p>
              <button disabled className="mt-3 w-full py-3 rounded-xl bg-warm-gray text-muted font-bold text-sm cursor-not-allowed">
                Chat gesperrt
              </button>
            </div>
          )}

          {interest === "matched" && (
            <div className="bg-white rounded-2xl border border-green-200 shadow-sm p-4 match-pop">
              <div className="text-center mb-3">
                <p className="text-3xl mb-1">🎉</p>
                <p className="font-black text-navy">Match! Chat ist jetzt freigeschaltet.</p>
                <p className="text-xs text-muted mt-0.5">{profile.name} hat ebenfalls Interesse bekundet.</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Link
                  href={`/chat/${profile.id}`}
                  className={`flex-1 py-3 rounded-xl text-white font-black text-sm flex items-center justify-center gap-1.5 hover:opacity-90 transition-all ${isIT ? "bg-brand-it" : "bg-brand-hw"}`}
                >
                  💬 Nachricht
                </Link>
                <Link
                  href={`/videocall/${profile.id}`}
                  className="flex-1 py-3 rounded-xl bg-navy text-white font-black text-sm flex items-center justify-center gap-1.5 hover:opacity-90 transition-all"
                >
                  📹 Video Call
                </Link>
                <Link
                  href="/kalender"
                  className="w-full py-3 rounded-xl bg-green-500 text-white font-black text-sm flex items-center justify-center gap-1.5 hover:opacity-90 transition-all"
                >
                  📅 Speed Meeting vereinbaren
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
