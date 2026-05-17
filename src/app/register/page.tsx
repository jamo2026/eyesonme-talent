"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { IT_CATEGORIES, HW_CATEGORIES } from "@/lib/categories";
import { supabase } from "@/lib/supabase";

type Role = "seeker" | "company";
type Sector = "it" | "hw";

function RegisterForm() {
  const searchParams = useSearchParams();
  const initialSector = searchParams.get("sector") === "hw" ? "hw" : "it";
  const initialRole = searchParams.get("role") === "company" ? "company" : "seeker";

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [sector, setSector] = useState<Sector>(initialSector);
  const [role, setRole] = useState<Role>(initialRole);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationSent, setVerificationSent] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.name,
          role,
          sector,
          categories: selectedCategories,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setVerificationSent(true);
    setLoading(false);
  };

  const categories = sector === "it" ? IT_CATEGORIES : HW_CATEGORIES;

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const accentIt = "bg-brand-it";
  const accentHw = "bg-brand-hw";
  const accent = sector === "it" ? accentIt : accentHw;
  const accentText = sector === "it" ? "text-brand-it" : "text-brand-hw";
  const borderFocus = sector === "it"
    ? "focus:border-brand-it focus:ring-2 focus:ring-brand-it/15"
    : "focus:border-brand-hw focus:ring-2 focus:ring-brand-hw/15";

  const inputCls = `w-full rounded-xl border border-border bg-warm-gray px-4 py-3 text-sm text-navy placeholder:text-muted outline-none transition-all ${borderFocus}`;

  const steps = [
    { n: 1, label: "Daten" },
    { n: 2, label: "Plattform" },
    { n: 3, label: "Kategorien" },
    { n: 4, label: "Video" },
  ];

  return (
    <main className="min-h-screen bg-warm-gray flex flex-col overflow-x-hidden">

      {/* Dark header */}
      <div className="bg-black px-4 py-8 flex flex-col items-center border-b border-white/10">
        <Image src="/logo.png" width={72} height={72} alt="EyesOnMe Talent" className="logo-image mb-4" style={{ mixBlendMode: "screen", background: "transparent", border: "none" }} />
        <Link href="/" className="font-black text-xl tracking-tight">
          <span className="brand-eyes">Eyes</span><span className="brand-on">On</span><span className="brand-me">Me</span>
          {" "}<span className="brand-talent">Talent</span>
        </Link>
        <p className="text-sm mt-2 text-center" style={{ color: "rgba(255,255,255,0.55)" }}>
          Willkommen bei EyesOnMe Talent. Zeig wer du wirklich bist.
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center px-4 py-10">
        <Link href="/" className="flex items-center gap-2 text-sm text-muted hover:text-navy transition-colors mb-6 group">
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Zurück zur Startseite
        </Link>

        <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-border p-8 sm:p-10">

          {/* Step indicator */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((s, i) => (
              <div key={s.n} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step === s.n
                      ? `${accent} text-white shadow-md`
                      : step > s.n
                      ? "bg-green-500 text-white"
                      : "bg-warm-gray text-muted border border-border"
                  }`}>
                    {step > s.n ? "✓" : s.n}
                  </div>
                  <span className={`text-xs font-medium ${step === s.n ? "text-navy" : "text-muted"}`}>{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 mb-4 transition-all ${step > s.n ? "bg-green-400" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>

          {/* ── STEP 1: Persönliche Daten ── */}
          {step === 1 && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-black text-navy mb-1">Persönliche Daten</h2>
                <p className="text-sm text-muted">Schritt 1 von 4 · Deine Basis-Infos</p>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy mb-1.5">Vollständiger Name</label>
                  <input type="text" placeholder="Max Mustermann" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy mb-1.5">E-Mail-Adresse</label>
                  <input type="email" placeholder="name@example.de" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy mb-1.5">Passwort</label>
                  <input type="password" placeholder="Min. 8 Zeichen" value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required className={inputCls} />
                </div>
              </div>

              <button onClick={() => setStep(2)}
                className={`w-full py-3.5 rounded-xl text-white font-bold text-sm ${accent} hover:opacity-90 transition-all active:scale-95`}>
                Weiter →
              </button>
            </div>
          )}

          {/* ── STEP 2: Plattform wählen ── */}
          {step === 2 && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-black text-navy mb-1">Plattform wählen</h2>
                <p className="text-sm text-muted">Schritt 2 von 4 · IT oder Handwerk?</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setSector("it")}
                  className={`py-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${
                    sector === "it" ? "border-brand-it bg-brand-it-light" : "border-border hover:border-gray-300"
                  }`}>
                  <span className="text-3xl">💻</span>
                  <div className="text-center">
                    <p className="font-black text-navy text-sm">CodeOnMe</p>
                    <p className="text-xs text-muted mt-0.5">IT-Professionals</p>
                  </div>
                  {sector === "it" && <span className="text-xs font-bold text-brand-it">✓ Ausgewählt</span>}
                </button>
                <button onClick={() => setSector("hw")}
                  className={`py-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${
                    sector === "hw" ? "border-brand-hw bg-brand-hw-light" : "border-border hover:border-gray-300"
                  }`}>
                  <span className="text-3xl">🔧</span>
                  <div className="text-center">
                    <p className="font-black text-navy text-sm">HandsOnMe</p>
                    <p className="text-xs text-muted mt-0.5">Handwerk & Fachkräfte</p>
                  </div>
                  {sector === "hw" && <span className="text-xs font-bold text-brand-hw">✓ Ausgewählt</span>}
                </button>
              </div>

              <p className="text-xs font-bold text-muted uppercase tracking-wider mt-2">Ich bin …</p>
              <div className="grid grid-cols-2 gap-3">
                {(["seeker", "company"] as Role[]).map((r) => (
                  <button key={r} onClick={() => setRole(r)}
                    className={`py-4 rounded-2xl border-2 text-sm font-bold transition-all flex flex-col items-center gap-2 ${
                      role === r ? `${accent} text-white border-transparent shadow-sm` : "border-border text-muted hover:border-gray-300 hover:text-navy"
                    }`}>
                    <span className="text-2xl">{r === "seeker" ? "🙋" : "🏢"}</span>
                    <span>{r === "seeker" ? "Jobsuchender" : "Unternehmen"}</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-3 mt-2">
                <button onClick={() => setStep(1)}
                  className="flex-1 py-3 rounded-xl border border-border text-sm font-bold text-navy hover:bg-warm-gray transition-all">
                  ← Zurück
                </button>
                <button onClick={() => setStep(3)}
                  className={`flex-1 py-3 rounded-xl text-white font-bold text-sm ${accent} hover:opacity-90 transition-all`}>
                  Weiter →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Kategorien ── */}
          {step === 3 && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-black text-navy mb-1">Kategorien wählen</h2>
                <p className="text-sm text-muted">Schritt 3 von 4 · Was ist dein Bereich? (Mehrfachauswahl)</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => toggleCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      selectedCategories.includes(cat)
                        ? `${accent} text-white border-transparent`
                        : "border-border text-navy hover:border-gray-300 bg-warm-gray"
                    }`}>
                    {cat}
                  </button>
                ))}
              </div>

              {selectedCategories.length > 0 && (
                <p className={`text-xs font-semibold ${accentText}`}>
                  {selectedCategories.length} Kategorie{selectedCategories.length !== 1 ? "n" : ""} ausgewählt
                </p>
              )}

              <div className="flex gap-3 mt-2">
                <button onClick={() => setStep(2)}
                  className="flex-1 py-3 rounded-xl border border-border text-sm font-bold text-navy hover:bg-warm-gray transition-all">
                  ← Zurück
                </button>
                <button onClick={() => setStep(4)}
                  className={`flex-1 py-3 rounded-xl text-white font-bold text-sm ${accent} hover:opacity-90 transition-all`}>
                  Weiter →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 4: Video Pitch ── */}
          {step === 4 && !verificationSent && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-black text-navy mb-1">Video Pitch</h2>
                <p className="text-sm text-muted">Schritt 4 von 4 · Zeig wer du wirklich bist</p>
              </div>

              <div className="rounded-2xl border-2 border-dashed border-border bg-warm-gray p-8 flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-brand-it/10 flex items-center justify-center text-3xl">🎥</div>
                <div>
                  <p className="font-black text-navy mb-1">Video hochladen</p>
                  <p className="text-sm text-muted">Max. 60 Sekunden · MP4, MOV · bis 100 MB</p>
                </div>
                <button className={`px-6 py-2.5 rounded-xl text-white text-sm font-bold ${accent} hover:opacity-90 transition-all`}>
                  Video auswählen
                </button>
                <p className="text-xs text-muted">oder per Drag & Drop hierher ziehen</p>
              </div>

              <div className="bg-brand-it-light rounded-xl p-4 border border-brand-it/20">
                <p className="text-xs font-bold text-brand-it mb-1">💡 Tipp für deinen Video-Pitch</p>
                <p className="text-xs text-navy leading-relaxed">
                  Stell dich kurz vor, zeig deine Leidenschaft für dein Fach und erkläre was du suchst.
                  Kein perfektes Studio nötig — authentisch ist besser als perfekt.
                </p>
              </div>

              <p className="text-xs text-muted leading-relaxed">
                Mit der Registrierung stimmst du unseren{" "}
                <Link href="#" className={`${accentText} hover:underline font-semibold`}>AGB</Link>{" "}
                und der{" "}
                <Link href="#" className={`${accentText} hover:underline font-semibold`}>Datenschutzerklärung</Link> zu.
                DSGVO-konform · EU-Server · kostenlos.
              </p>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 font-medium">
                  ⚠️ {error}
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={() => setStep(3)}
                  className="flex-1 py-3 rounded-xl border border-border text-sm font-bold text-navy hover:bg-warm-gray transition-all">
                  ← Zurück
                </button>
                <button
                  onClick={handleSignUp}
                  disabled={loading}
                  className={`flex-1 py-3 rounded-xl text-white font-bold text-sm ${accent} hover:opacity-90 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed`}>
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Wird erstellt…
                    </span>
                  ) : "Konto erstellen ✓"}
                </button>
              </div>

              <p className="text-xs text-muted text-center">Du kannst das Video auch später hochladen.</p>
            </div>

          )}

          {/* ── SUCCESS: Email verification ── */}
          {verificationSent && (
            <div className="flex flex-col items-center gap-5 py-4 text-center">
              <div className="w-20 h-20 rounded-3xl bg-green-50 border border-green-200 flex items-center justify-center text-4xl">
                ✉️
              </div>
              <div>
                <h2 className="text-xl font-black text-navy mb-2">Fast geschafft!</h2>
                <p className="text-sm text-muted leading-relaxed">
                  Wir haben eine Bestätigungs-E-Mail an{" "}
                  <strong className="text-navy">{form.email}</strong> gesendet.
                </p>
                <p className="text-sm text-muted leading-relaxed mt-2">
                  Bitte klicke auf den Link in der E-Mail, um dein Konto zu aktivieren.
                </p>
              </div>
              <div className="bg-warm-gray rounded-2xl p-4 border border-border w-full text-left">
                <p className="text-xs font-bold text-navy mb-1">📬 Keine E-Mail erhalten?</p>
                <p className="text-xs text-muted">Prüfe deinen Spam-Ordner oder warte 1–2 Minuten.</p>
              </div>
              <Link
                href="/login"
                className={`w-full py-3 rounded-xl text-white font-bold text-sm text-center ${accent} hover:opacity-90 transition-all`}
              >
                Zur Anmeldung →
              </Link>
            </div>
          )}

          <p className="text-center text-xs text-muted mt-6">
            Bereits Mitglied?{" "}
            <Link href="/login" className={`${accentText} font-bold hover:underline`}>
              Anmelden →
            </Link>
          </p>
        </div>

        <div className="mt-6 flex items-center gap-4 text-xs text-muted">
          <span>🔒 DSGVO</span>
          <span className="w-px h-3 bg-border" />
          <span>🇩🇪 EU-Server</span>
          <span className="w-px h-3 bg-border" />
          <span>💶 Kostenlos starten</span>
        </div>
      </div>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-warm-gray flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-brand-it border-t-transparent animate-spin" />
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}
