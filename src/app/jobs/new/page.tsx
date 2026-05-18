"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const IT_SKILLS = ["React", "TypeScript", "Node.js", "Python", "Vue.js", "PHP", "Java", "SQL", "Docker", "AWS", "Figma", "DevOps", "Git"];
const HW_SKILLS = ["Elektroinstallation", "Holzbearbeitung", "Schweißen", "CNC", "Kfz-Diagnose", "Sanitär", "Heizungsanlagen", "Fliesenlegen", "Dachdecken", "Mauern", "Gartenbau", "Reinigung"];

type Sector = "it" | "hw";

export default function NewJobPage() {
  const router = useRouter();
  const [sector, setSector] = useState<Sector>("it");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [remote, setRemote] = useState(false);
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const skills = sector === "it" ? IT_SKILLS : HW_SKILLS;
  const accent = sector === "it" ? "bg-brand-it" : "bg-brand-hw";
  const focusRing = sector === "it"
    ? "focus:ring-2 focus:ring-brand-it/20 focus:border-brand-it"
    : "focus:ring-2 focus:ring-brand-hw/20 focus:border-brand-hw";
  const inputClass = `w-full rounded-xl border border-border bg-warm-gray px-4 py-3 text-sm text-navy outline-none transition-all ${focusRing}`;

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handlePublish = async () => {
    if (!title || !location || !description) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setDone(true);
  };

  const canSubmit = title.trim() && location.trim() && description.trim();

  if (done) {
    return (
      <div className="min-h-screen bg-warm-gray">
        <Navbar />
        <div className="max-w-sm mx-auto px-4 py-20 text-center">
          <div className="text-7xl mb-5">🎉</div>
          <h1 className="text-2xl font-black text-navy mb-2">Stelle ist live!</h1>
          <p className="text-muted text-sm mb-8">Passende Kandidaten werden sofort benachrichtigt.</p>
          <div className="flex flex-col gap-3">
            <Link href="/dashboard/company"
              className={`w-full py-4 rounded-2xl text-white font-black text-base ${accent} hover:opacity-90 transition-all block text-center`}>
              Zum Dashboard →
            </Link>
            <button onClick={() => { setDone(false); setTitle(""); setDescription(""); setSelectedSkills([]); setSalaryFrom(""); setSalaryTo(""); }}
              className="w-full py-3 rounded-2xl border border-border text-navy font-semibold text-sm hover:bg-white transition-all">
              Weitere Stelle einstellen
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-gray">
      <Navbar />

      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/dashboard/company" className="text-sm text-muted hover:text-navy flex items-center gap-1 mb-4 transition-colors">
            ← Zurück
          </Link>
          <h1 className="text-2xl font-black text-navy">Stelle einstellen</h1>
          <p className="text-sm text-muted mt-1">In 2 Minuten fertig · Sofort live</p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Sector */}
          <div className="bg-white rounded-3xl p-1 flex gap-1 border border-border shadow-sm">
            <button onClick={() => { setSector("it"); setSelectedSkills([]); }}
              className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-all ${sector === "it" ? "bg-brand-it text-white shadow-sm" : "text-muted hover:text-navy"}`}>
              💻 IT / Tech
            </button>
            <button onClick={() => { setSector("hw"); setSelectedSkills([]); }}
              className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-all ${sector === "hw" ? "bg-brand-hw text-white shadow-sm" : "text-muted hover:text-navy"}`}>
              🔧 Handwerk
            </button>
          </div>

          {/* Title */}
          <div className="bg-white rounded-3xl p-6 border border-border shadow-sm">
            <label className="block text-xs font-bold text-navy mb-1.5">Stellenbezeichnung *</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder={sector === "it" ? "z.B. React Developer, IT-Administrator" : "z.B. Elektriker, Schreiner, Dachdecker"}
              className={inputClass} />
          </div>

          {/* Location + Remote */}
          <div className="bg-white rounded-3xl p-6 border border-border shadow-sm flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-navy mb-1.5">Einsatzort *</label>
              <input value={location} onChange={(e) => setLocation(e.target.value)}
                placeholder="z.B. Stuttgart, Karlsruhe" className={inputClass} />
            </div>
            <button onClick={() => setRemote(!remote)}
              className="flex items-center gap-3 group">
              <div className={`w-12 h-6 rounded-full transition-all relative flex-shrink-0 ${remote ? accent : "bg-gray-200"}`}>
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${remote ? "left-6" : "left-0.5"}`} />
              </div>
              <span className={`text-sm font-semibold transition-colors ${remote ? "text-navy" : "text-muted group-hover:text-navy"}`}>
                Remote möglich
              </span>
            </button>
          </div>

          {/* Salary */}
          <div className="bg-white rounded-3xl p-6 border border-border shadow-sm">
            <label className="block text-xs font-bold text-navy mb-3">Gehalt (€/Jahr)</label>
            <div className="flex items-center gap-2">
              <input type="number" value={salaryFrom} onChange={(e) => setSalaryFrom(e.target.value)}
                placeholder="von" className="flex-1 rounded-xl border border-border bg-warm-gray px-4 py-3 text-sm text-navy outline-none" />
              <span className="text-muted font-semibold whitespace-nowrap">k —</span>
              <input type="number" value={salaryTo} onChange={(e) => setSalaryTo(e.target.value)}
                placeholder="bis" className="flex-1 rounded-xl border border-border bg-warm-gray px-4 py-3 text-sm text-navy outline-none" />
              <span className="text-muted font-semibold whitespace-nowrap">k €</span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-3xl p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-navy">Was suchen Sie? *</label>
              <span className={`text-xs font-semibold ${description.length > 185 ? "text-red-500" : "text-muted"}`}>
                {description.length}/200
              </span>
            </div>
            <textarea value={description} onChange={(e) => { if (e.target.value.length <= 200) setDescription(e.target.value); }}
              rows={4} maxLength={200}
              placeholder={sector === "hw"
                ? "z.B. Wir suchen einen Elektriker für Neubau-Projekte in der Region Stuttgart. Führerschein Klasse B erwünscht."
                : "z.B. Wir suchen einen React Developer für unser Produkt-Team. Agile Arbeitsweise, gute Englischkenntnisse."}
              className={`w-full rounded-xl border border-border bg-warm-gray px-4 py-3 text-sm text-navy outline-none resize-none transition-all ${focusRing}`} />
          </div>

          {/* Skills */}
          <div className="bg-white rounded-3xl p-6 border border-border shadow-sm">
            <h2 className="text-xs font-bold text-navy mb-3">Gesuchte Skills <span className="text-muted font-normal">(optional)</span></h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <button key={skill} onClick={() => toggleSkill(skill)}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${selectedSkills.includes(skill) ? `${accent} text-white border-transparent shadow-sm` : "border-border text-navy bg-warm-gray hover:border-gray-300"}`}>
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Publish */}
          <button onClick={handlePublish} disabled={loading || !canSubmit}
            className={`w-full py-4 rounded-2xl text-white font-black text-base ${accent} hover:opacity-90 transition-all active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100`}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Wird veröffentlicht…
              </span>
            ) : "🚀 Stelle veröffentlichen"}
          </button>

          {!canSubmit && (
            <p className="text-center text-xs text-muted -mt-2">Stellenbezeichnung, Ort und Beschreibung sind Pflichtfelder.</p>
          )}
        </div>
      </div>
    </div>
  );
}
