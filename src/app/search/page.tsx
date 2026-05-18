"use client";

import { useState } from "react";
import Image from "next/image";
import AppLayout from "@/components/AppLayout";
import ScoreRing from "@/components/ScoreRing";
import SectorBadge from "@/components/SectorBadge";
import Link from "next/link";
import { IT_CATEGORIES, HW_CATEGORIES } from "@/lib/categories";

type Sector = "it" | "hw";

const allResults = {
  it: [
    { id: 1, name: "TechVision GmbH", role: "Senior React Developer", city: "Stuttgart", score: 94, salary: "70–90k €", remote: true, tags: ["React", "TypeScript", "AWS"], category: "Softwareentwicklung" },
    { id: 2, name: "DataBridge AG", role: "Data Engineer", city: "Karlsruhe", score: 88, salary: "65–80k €", remote: false, tags: ["Python", "Spark", "SQL"], category: "KI / Artificial Intelligence" },
    { id: 3, name: "CloudForge Studios", role: "UX Designer", city: "Freiburg", score: 81, salary: "55–70k €", remote: true, tags: ["Figma", "User Research"], category: "Webdesign / Webentwicklung" },
    { id: 4, name: "Startup Lab BW", role: "Product Manager", city: "Stuttgart", score: 75, salary: "60–78k €", remote: false, tags: ["Agile", "Roadmapping"], category: "IT-Beratung" },
    { id: 5, name: "SecureNet GmbH", role: "Cybersecurity Analyst", city: "Mannheim", score: 69, salary: "62–78k €", remote: true, tags: ["SIEM", "Pen Testing"], category: "Cybersecurity / IT-Sicherheit" },
  ],
  hw: [
    { id: 1, name: "Bau & Handwerk BW", role: "Elektriker (m/w/d)", city: "Stuttgart", score: 91, salary: "3.200–4.000 €/Mo.", remote: false, tags: ["Elektro", "SPS", "Schaltschrankbau"], category: "Elektriker" },
    { id: 2, name: "Haustechnik Süd", role: "Sanitär & Heizung", city: "Freiburg", score: 85, salary: "3.000–3.800 €/Mo.", remote: false, tags: ["SHK", "Wartung"], category: "Sanitär / Heizung / Klima" },
    { id: 3, name: "Schreinerei Meier", role: "Schreiner / Tischler", city: "Karlsruhe", score: 79, salary: "2.800–3.500 €/Mo.", remote: false, tags: ["CNC", "Massivholz"], category: "Schreiner / Tischler" },
    { id: 4, name: "KFZ Werkstatt Nord", role: "KFZ-Mechatroniker", city: "Mannheim", score: 72, salary: "2.900–3.600 €/Mo.", remote: false, tags: ["Diagnose", "E-Mobilität"], category: "Kfz-Werkstatt" },
  ],
};

const cities = ["Alle Städte", "Stuttgart", "Karlsruhe", "Freiburg", "Mannheim", "Heidelberg"];

export default function SearchPage() {
  const [sector, setSector] = useState<Sector>("it");
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("Alle Städte");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [minScore, setMinScore] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = sector === "it" ? IT_CATEGORIES : HW_CATEGORIES;

  const results = allResults[sector].filter((r) =>
    (query === "" || r.role.toLowerCase().includes(query.toLowerCase()) || r.name.toLowerCase().includes(query.toLowerCase())) &&
    (city === "Alle Städte" || r.city === city) &&
    (!remoteOnly || ("remote" in r && r.remote)) &&
    r.score >= minScore &&
    (!selectedCategory || r.category === selectedCategory)
  );

  const accentClass = sector === "it" ? "bg-brand-it" : "bg-brand-hw";
  const accentText = sector === "it" ? "text-brand-it" : "text-brand-hw";
  const borderFocus = sector === "it" ? "focus:border-brand-it focus:ring-2 focus:ring-brand-it/15" : "focus:border-brand-hw focus:ring-2 focus:ring-brand-hw/15";

  const resetFilters = () => {
    setQuery("");
    setCity("Alle Städte");
    setRemoteOnly(false);
    setMinScore(0);
    setSelectedCategory("");
  };

  return (
    <AppLayout>

      {/* Dark search hero */}
      <section className="bg-black px-4 py-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,107,26,0.12) 0%, transparent 70%)", transform: "translate(-30%, 50%)" }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(123,94,252,0.12) 0%, transparent 70%)", transform: "translate(30%, 50%)" }} />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center">
          <Image src="/logo.png" width={60} height={60} alt="EyesOnMe Talent" className="logo-image mb-4" style={{ mixBlendMode: "screen", background: "transparent", border: "none" }} />
          <h1 className="font-serif text-3xl sm:text-4xl text-white mb-2">Stellen & Talente suchen</h1>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
            Baden-Württemberg · {results.length} Ergebnisse
          </p>

          {/* Big search bar */}
          <div className="w-full relative mb-6">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "rgba(255,255,255,0.4)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="z.B. Elektriker Stuttgart oder React Developer Remote..."
              className="w-full rounded-2xl pl-12 pr-4 py-4 text-sm outline-none transition-all"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "white" }}
            />
          </div>

          {/* Sector toggle */}
          <div className="flex rounded-xl overflow-hidden border border-white/20 mb-4 w-full max-w-sm">
            <button
              onClick={() => { setSector("it"); setSelectedCategory(""); }}
              className={`flex-1 py-2.5 text-sm font-semibold transition-all ${sector === "it" ? "bg-brand-it text-white" : "text-white/60 hover:text-white hover:bg-white/10"}`}
            >
              💻 IT
            </button>
            <button
              onClick={() => { setSector("hw"); setSelectedCategory(""); }}
              className={`flex-1 py-2.5 text-sm font-semibold transition-all ${sector === "hw" ? "bg-brand-hw text-white" : "text-white/60 hover:text-white hover:bg-white/10"}`}
            >
              🔧 Handwerk
            </button>
          </div>
        </div>
      </section>

      {/* Category chips */}
      <div className="bg-black border-b border-white/10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          <button
            onClick={() => setSelectedCategory("")}
            className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${!selectedCategory ? `${accentClass} text-white border-transparent` : "border-white/20 text-white/60 hover:text-white hover:border-white/40"}`}
          >
            Alle Kategorien
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(selectedCategory === cat ? "" : cat)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${selectedCategory === cat ? `${accentClass} text-white border-transparent` : "border-white/20 text-white/60 hover:text-white hover:border-white/40"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-border p-5 sticky top-[88px]">
              <h2 className="font-bold text-navy mb-4">Filter</h2>

              <div className="mb-5">
                <label className="block text-xs font-semibold text-navy mb-1.5">Stadt</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={`w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:ring-2 transition-all ${borderFocus}`}
                >
                  {cities.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div className="mb-5">
                <label className="block text-xs font-semibold text-navy mb-1.5">
                  Min. KI-Score: <span className={sector === "it" ? "text-brand-it" : "text-brand-hw"}>{minScore}%</span>
                </label>
                <input
                  type="range" min={0} max={90} step={5} value={minScore}
                  onChange={(e) => setMinScore(Number(e.target.value))}
                  className="w-full accent-brand-it"
                />
                <div className="flex justify-between text-xs text-muted mt-1">
                  <span>0%</span><span>90%+</span>
                </div>
              </div>

              {sector === "it" && (
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-navy">Nur Remote</label>
                  <button
                    onClick={() => setRemoteOnly(!remoteOnly)}
                    className={`relative w-10 h-5 rounded-full transition-all ${remoteOnly ? "bg-brand-it" : "bg-gray-200"}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${remoteOnly ? "left-5" : "left-0.5"}`} />
                  </button>
                </div>
              )}

              <button onClick={resetFilters} className="mt-5 w-full text-xs text-muted hover:text-navy underline">
                Filter zurücksetzen
              </button>
            </div>
          </aside>

          {/* Results */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {results.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <span className="text-4xl block mb-3">🔍</span>
                <p className="text-navy font-bold">Keine Ergebnisse gefunden</p>
                <p className="text-sm text-muted mt-1">Passe die Filter an oder ändere den Suchbegriff.</p>
              </div>
            ) : (
              results.map((r) => (
                <div
                  key={r.id}
                  className="bg-white rounded-2xl shadow-sm border border-border p-5 flex items-start gap-4 hover:shadow-md transition-all cursor-pointer hover:border-brand-it/40 card-hover"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-lg ${sector === "it" ? "bg-brand-it/10 text-brand-it" : "bg-brand-hw/10 text-brand-hw"}`}>
                    {r.name.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <h3 className="font-bold text-navy">{r.role}</h3>
                      <SectorBadge sector={sector} size="sm" />
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${sector === "it" ? "bg-brand-it/8 text-brand-it" : "bg-brand-hw/8 text-brand-hw"}`}>
                        {r.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted mb-2">{r.name} · {r.city}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {r.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 bg-gray-100 text-navy text-xs rounded-full font-medium">{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold text-navy">{r.salary}</span>
                      {"remote" in r && r.remote && (
                        <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">Remote</span>
                      )}
                      <Link href="/chat" className={`text-xs font-semibold hover:underline ${accentText}`}>
                        Jetzt bewerben →
                      </Link>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <ScoreRing score={r.score} sector={sector} size={64} label="Match" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
