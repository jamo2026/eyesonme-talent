"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import VideoPlayer from "@/components/VideoPlayer";

type Sector = "it" | "hw";
type ProfileType = "seeker" | "company";

const DEMO_SEEKER = {
  name: "Alex Müller",
  jobTitle: "React Developer",
  city: "Stuttgart",
  available: "Ab sofort",
  remote: "Hybrid",
  salaryMin: "70.000",
  salaryMax: "90.000",
  sector: "it" as Sector,
  experience: "5 Jahre",
  topSkills: ["React", "TypeScript", "Node.js"],
  otherSkills: ["GraphQL", "Next.js", "Docker", "PostgreSQL", "Tailwind CSS"],
  bio: "Leidenschaftlicher Frontend-Entwickler mit 5 Jahren Erfahrung in modernen Web-Technologien. Ich bringe nicht nur Code, sondern auch UX-Denken und Teamgeist mit. Auf der Suche nach einer neuen Herausforderung in einem motivierten Team.",
  videoDuration: "1:38",
  checklist: [
    { label: "Skills eintragen", done: true },
    { label: "Gehaltswunsch angeben", done: true },
    { label: "Standort angeben", done: true },
    { label: "Profilfoto hochladen", done: false },
    { label: "Video-Pitch aufnehmen", done: false },
  ],
};

const DEMO_COMPANY = {
  name: "Mein Betrieb GmbH",
  industry: "IT & Software",
  city: "Stuttgart",
  size: "10–50 Mitarbeiter",
  founded: "2018",
  sector: "it" as Sector,
  description: "Wir entwickeln innovative Softwarelösungen für den Mittelstand. Unser Team besteht aus leidenschaftlichen Entwicklern und Designern, die gemeinsam an spannenden Projekten arbeiten.",
  jobs: [
    { id: 1, title: "Senior React Developer", location: "Remote", active: true },
    { id: 2, title: "DevOps Engineer", location: "Stuttgart", active: true },
    { id: 3, title: "UX Designer", location: "Hybrid", active: false },
  ],
  checklist: [
    { label: "Firmendaten eintragen", done: true },
    { label: "Branche angeben", done: true },
    { label: "Erste Stelle ausschreiben", done: true },
    { label: "Firmenlogo hochladen", done: false },
    { label: "Firmenbeschreibung ergänzen", done: false },
  ],
};

export default function MyProfilePage() {
  const router = useRouter();
  const [profileType, setProfileType] = useState<ProfileType>("seeker");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push("/login"); return; }
      setLoaded(true);
    });
  }, [router]);

  if (!loaded) {
    return (
      <div className="min-h-screen bg-warm-gray">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="w-8 h-8 rounded-full border-4 border-brand-it border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  const isSeeker = profileType === "seeker";
  const data = isSeeker ? DEMO_SEEKER : DEMO_COMPANY;
  const isIT = data.sector === "it";
  const checklist = data.checklist;
  const doneCnt = checklist.filter((c) => c.done).length;
  const pct = Math.round((doneCnt / checklist.length) * 100);

  return (
    <div className="min-h-screen bg-warm-gray">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-6 pb-10">

        {/* Page header + demo toggle */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-black text-navy">Mein Profil</h1>
          <div className="flex items-center gap-1 bg-white rounded-xl p-1 border border-border shadow-sm">
            <button
              onClick={() => setProfileType("seeker")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${isSeeker ? "bg-brand-it text-white shadow-sm" : "text-muted hover:text-navy"}`}
            >
              👤 Bewerber
            </button>
            <button
              onClick={() => setProfileType("company")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${!isSeeker ? "bg-brand-hw text-white shadow-sm" : "text-muted hover:text-navy"}`}
            >
              🏢 Betrieb
            </button>
          </div>
        </div>

        {/* Hero card */}
        <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden mb-4">
          <div className={`h-36 relative ${isIT ? "bg-brand-it" : "bg-brand-hw"}`}>
            <Link
              href="/profile/edit"
              className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all"
            >
              ✏️ Bearbeiten
            </Link>
            <div className="absolute bottom-0 left-6 translate-y-1/2">
              <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur text-white font-black text-4xl flex items-center justify-center border-4 border-white shadow-lg">
                {data.name.charAt(0)}
              </div>
            </div>
          </div>

          <div className="pt-16 px-6 pb-6">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-4">
              <div>
                <h2 className="text-2xl font-black text-navy">{data.name}</h2>
                <p className="text-muted text-sm mt-0.5">
                  {isSeeker
                    ? `${DEMO_SEEKER.jobTitle} · 📍 ${data.city}`
                    : `${DEMO_COMPANY.industry} · 📍 ${data.city}`}
                </p>
              </div>
              {isSeeker && (
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 ${isIT ? "bg-brand-it-light text-brand-it" : "bg-brand-hw-light text-brand-hw"}`}>
                  {DEMO_SEEKER.available === "Ab sofort" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 live-dot" />
                  )}
                  {DEMO_SEEKER.available}
                </span>
              )}
            </div>

            {isSeeker ? (
              <>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: "Gehalt", value: `${DEMO_SEEKER.salaryMin} – ${DEMO_SEEKER.salaryMax} €`, icon: "💶" },
                    { label: "Arbeitsort", value: DEMO_SEEKER.remote, icon: "🏠" },
                    { label: "Erfahrung", value: DEMO_SEEKER.experience, icon: "⭐" },
                  ].map((item) => (
                    <div key={item.label} className={`rounded-xl p-3 border ${isIT ? "bg-brand-it-light border-brand-it/20" : "bg-brand-hw-light border-brand-hw/20"}`}>
                      <span className="text-base">{item.icon}</span>
                      <p className="text-xs text-muted mt-1">{item.label}</p>
                      <p className="text-xs font-black text-navy mt-0.5">{item.value}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs font-black text-navy uppercase tracking-wide mb-2.5">Top Skills</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {DEMO_SEEKER.topSkills.map((s) => (
                    <span key={s} className={`px-4 py-2 rounded-xl text-sm font-black text-white ${isIT ? "bg-brand-it" : "bg-brand-hw"}`}>{s}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {DEMO_SEEKER.otherSkills.map((s) => (
                    <span key={s} className={`px-3 py-1.5 rounded-xl text-sm font-semibold ${isIT ? "bg-brand-it/8 text-brand-it" : "bg-brand-hw/10 text-brand-hw"}`}>{s}</span>
                  ))}
                </div>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3 mt-1">
                {[
                  { label: "Teamgröße", value: DEMO_COMPANY.size, icon: "👥" },
                  { label: "Gegründet", value: DEMO_COMPANY.founded, icon: "📅" },
                ].map((item) => (
                  <div key={item.label} className={`rounded-xl p-3 border ${isIT ? "bg-brand-it-light border-brand-it/20" : "bg-brand-hw-light border-brand-hw/20"}`}>
                    <span className="text-base">{item.icon}</span>
                    <p className="text-xs text-muted mt-1">{item.label}</p>
                    <p className="text-xs font-black text-navy mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bio / Über uns */}
        <div className="bg-white rounded-3xl border border-border shadow-sm p-6 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-black text-navy">{isSeeker ? "Über mich" : "Über uns"}</h3>
            <Link href="/profile/edit" className={`text-xs font-bold hover:underline ${isIT ? "text-brand-it" : "text-brand-hw"}`}>Bearbeiten →</Link>
          </div>
          <p className="text-muted text-sm leading-relaxed">
            {isSeeker ? DEMO_SEEKER.bio : DEMO_COMPANY.description}
          </p>
        </div>

        {/* Video Pitch — seeker only */}
        {isSeeker && (
          <div className="bg-white rounded-3xl border border-border shadow-sm p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-navy flex items-center gap-2">🎬 Video Pitch</h3>
              <Link href="/profile/edit" className={`text-xs font-bold hover:underline ${isIT ? "text-brand-it" : "text-brand-hw"}`}>Neu aufnehmen →</Link>
            </div>
            <VideoPlayer
              name={data.name}
              duration={DEMO_SEEKER.videoDuration}
              sector={data.sector}
              isOwn
            />
          </div>
        )}

        {/* Open Jobs — company only */}
        {!isSeeker && (
          <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden mb-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="font-black text-navy">💼 Offene Stellen</h3>
              <Link href="/jobs/new" className="text-xs text-brand-it font-bold hover:underline">+ Neue Stelle</Link>
            </div>
            {DEMO_COMPANY.jobs.map((job, i) => (
              <div
                key={job.id}
                className={`flex items-center gap-3 px-6 py-4 ${i < DEMO_COMPANY.jobs.length - 1 ? "border-b border-border" : ""}`}
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

        {/* Profile completion */}
        <div className="bg-white rounded-3xl border border-border shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-black text-navy">Profil vervollständigen</h3>
            <span className={`font-black text-lg ${isIT ? "text-brand-it" : "text-brand-hw"}`}>{pct}%</span>
          </div>
          <div className="w-full bg-warm-gray rounded-full h-2.5 mb-5">
            <div
              className={`h-2.5 rounded-full transition-all ${isIT ? "bg-brand-it" : "bg-brand-hw"}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex flex-col gap-3">
            {checklist.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? "bg-green-500" : "border-2 border-border"}`}>
                  {item.done && <span className="text-white text-xs font-black">✓</span>}
                </div>
                <span className={`text-sm font-medium ${item.done ? "text-muted line-through" : "text-navy"}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          {pct < 100 && (
            <Link
              href="/profile/edit"
              className={`mt-5 flex items-center justify-center py-3 rounded-2xl text-white text-sm font-bold hover:opacity-90 transition-all ${isIT ? "bg-brand-it" : "bg-brand-hw"}`}
            >
              Profil jetzt vervollständigen →
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}
