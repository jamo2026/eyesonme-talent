"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import ScoreRing from "@/components/ScoreRing";
import SectorBadge from "@/components/SectorBadge";

const skills = ["React", "TypeScript", "Node.js", "GraphQL", "Docker", "AWS", "Figma", "Agile"];

export default function ProfilePage() {
  const [sector] = useState<"it" | "hw">("it");
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "experience" | "settings">("overview");
  const [name, setName] = useState("Lukas Berger");
  const [bio, setBio] = useState("Leidenschaftlicher Senior React Developer mit 6 Jahren Erfahrung in der Entwicklung skalierbarer Web-Applikationen. Ich lege großen Wert auf Clean Code, Teamarbeit und kontinuierliche Weiterentwicklung.");

  const accentBg = sector === "it" ? "bg-brand-it" : "bg-brand-hw";
  const accentText = sector === "it" ? "text-brand-it" : "text-brand-hw";
  const borderFocus = sector === "it" ? "focus:border-brand-it focus:ring-brand-it/20" : "focus:border-brand-hw focus:ring-brand-hw/20";

  const tabs = [
    { id: "overview", label: "Übersicht" },
    { id: "experience", label: "Erfahrung" },
    { id: "settings", label: "Einstellungen" },
  ] as const;

  return (
    <div className="min-h-screen bg-warm-gray">
      <Navbar sector={sector} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile header card */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-6">
          {/* Cover */}
          <div className={`h-32 ${accentBg} relative opacity-90`}>
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
          </div>

          {/* Avatar & info */}
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-10 mb-4">
              <div className="flex items-end gap-4">
                {/* Avatar */}
                <div className={`w-20 h-20 rounded-2xl ${accentBg} text-white font-black text-3xl flex items-center justify-center border-4 border-white shadow-lg`}>
                  {name.charAt(0)}
                </div>
                <div className="mb-1">
                  {editing ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`text-xl font-black text-navy bg-transparent border-b-2 border-brand-it outline-none ${borderFocus}`}
                    />
                  ) : (
                    <h1 className="text-xl font-black text-navy">{name}</h1>
                  )}
                  <p className="text-sm text-muted">Senior React Developer · Stuttgart</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <SectorBadge sector={sector} />
                <button
                  onClick={() => setEditing(!editing)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${editing ? `${accentBg} text-white` : "border border-gray-200 text-navy hover:bg-gray-50"}`}
                >
                  {editing ? "Speichern ✓" : "Bearbeiten"}
                </button>
              </div>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-6 text-sm border-t border-gray-100 pt-4">
              {[
                { label: "Erfahrung", value: "6 Jahre" },
                { label: "Verfügbar ab", value: "sofort" },
                { label: "Gehaltsvorstellung", value: "75–90k €" },
                { label: "Arbeitsmodell", value: "Hybrid / Remote" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-xs text-muted">{s.label}</p>
                  <p className="font-semibold text-navy">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex gap-1 bg-white rounded-2xl p-1 shadow-sm mb-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === t.id ? `${accentBg} text-white shadow-sm` : "text-muted hover:text-navy"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2">
            {activeTab === "overview" && (
              <div className="flex flex-col gap-5">
                {/* Bio */}
                <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
                  <h2 className="font-bold text-navy mb-3">Über mich</h2>
                  {editing ? (
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      className={`w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-navy outline-none focus:ring-2 resize-none transition-all ${borderFocus}`}
                    />
                  ) : (
                    <p className="text-sm text-muted leading-relaxed">{bio}</p>
                  )}
                </div>

                {/* Skills */}
                <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
                  <h2 className="font-bold text-navy mb-4">Skills & Technologien</h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span key={skill} className={`px-3 py-1.5 rounded-xl text-sm font-semibold ${accentBg}/10 ${accentText}`}>
                        {skill}
                      </span>
                    ))}
                    {editing && (
                      <button className={`px-3 py-1.5 rounded-xl text-sm font-semibold border-2 border-dashed border-gray-200 text-muted hover:border-brand-it hover:text-brand-it transition-all`}>
                        + Skill hinzufügen
                      </button>
                    )}
                  </div>
                </div>

                {/* Video pitch */}
                <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-navy">🎥 Video-Pitch</h2>
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full font-medium">Hochgeladen</span>
                  </div>
                  <div className="bg-navy rounded-2xl overflow-hidden aspect-video flex items-center justify-center relative">
                    <div className="text-white text-center">
                      <span className="text-5xl block mb-2">▶</span>
                      <span className="text-sm font-medium">Video-Pitch · 1:23</span>
                    </div>
                    <div className="absolute bottom-3 right-3 flex gap-2">
                      <button className="bg-white/20 text-white text-xs px-3 py-1 rounded-lg hover:bg-white/30 transition-all">
                        Ansehen
                      </button>
                      <button className="bg-white/20 text-white text-xs px-3 py-1 rounded-lg hover:bg-white/30 transition-all">
                        Ersetzen
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "experience" && (
              <div className="flex flex-col gap-4">
                {[
                  { role: "Senior React Developer", company: "TechVision GmbH", period: "2021 – heute", desc: "Entwicklung und Wartung von React-Applikationen für 50.000+ Nutzer. Einführung von TypeScript und Testing-Strategie." },
                  { role: "Frontend Developer", company: "StartupLab BW", period: "2019 – 2021", desc: "Aufbau der Frontend-Infrastruktur von Grund auf. Enge Zusammenarbeit mit UX-Team und Product Management." },
                  { role: "Junior Developer", company: "Webworks Stuttgart", period: "2018 – 2019", desc: "Entwicklung responsiver Webseiten und erste Erfahrungen mit React und REST-APIs." },
                ].map((exp, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-sm border border-border p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-navy">{exp.role}</h3>
                        <p className={`text-sm font-semibold ${accentText}`}>{exp.company}</p>
                        <p className="text-xs text-muted mt-0.5">{exp.period}</p>
                      </div>
                      {i === 0 && <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full font-medium flex-shrink-0">Aktuell</span>}
                    </div>
                    <p className="text-sm text-muted mt-3 leading-relaxed">{exp.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-5">
                <h2 className="font-bold text-navy">Konto-Einstellungen</h2>

                {[
                  { label: "E-Mail-Adresse", value: "lukas.berger@example.de", type: "email" },
                  { label: "Telefonnummer", value: "+49 711 123456", type: "tel" },
                  { label: "Ort", value: "Stuttgart", type: "text" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-xs font-semibold text-navy mb-1.5">{field.label}</label>
                    <input
                      type={field.type}
                      defaultValue={field.value}
                      className={`w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-navy outline-none focus:ring-2 transition-all ${borderFocus}`}
                    />
                  </div>
                ))}

                <div className="pt-2 border-t border-gray-100">
                  <label className="block text-xs font-semibold text-navy mb-3">Datenschutz & Sichtbarkeit</label>
                  <div className="flex flex-col gap-3">
                    {["Profil öffentlich sichtbar", "Match-Vorschläge erhalten", "E-Mail-Benachrichtigungen"].map((opt) => (
                      <label key={opt} className="flex items-center justify-between cursor-pointer">
                        <span className="text-sm text-navy">{opt}</span>
                        <div className={`relative w-10 h-5 rounded-full ${accentBg} cursor-pointer`}>
                          <span className="absolute left-5 top-0.5 w-4 h-4 bg-white rounded-full shadow" />
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <button className={`w-full py-3 rounded-xl text-white font-semibold text-sm ${accentBg} hover:opacity-90 transition-all`}>
                  Einstellungen speichern
                </button>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div className="flex flex-col gap-5">
            {/* Score overview */}
            <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
              <h2 className="font-bold text-navy mb-4">KI-Profil-Score</h2>
              <div className="flex justify-center mb-4">
                <ScoreRing score={84} sector={sector} size={90} label="Gesamt" />
              </div>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "Profil-Vollständigkeit", score: 72 },
                  { label: "Skill-Match (Ø)", score: 88 },
                  { label: "Regionale Relevanz", score: 95 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted">{item.label}</span>
                      <span className="font-semibold text-navy">{item.score}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${accentBg} rounded-full`} style={{ width: `${item.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DSGVO notice */}
            <div className="bg-blue-50 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <span className="text-xl">🔒</span>
                <div>
                  <p className="text-sm font-bold text-navy">DSGVO-konform</p>
                  <p className="text-xs text-muted mt-1 leading-relaxed">
                    Ihre Daten werden auf EU-Servern in Deutschland gespeichert und niemals ohne Ihre Zustimmung weitergegeben.
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
