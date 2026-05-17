"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [sector, setSector] = useState<"it" | "hw">("it");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isIT = sector === "it";
  const accent = isIT ? "bg-brand-it" : "bg-brand-hw";
  const accentText = isIT ? "text-brand-it" : "text-brand-hw";
  const accentLight = isIT ? "bg-brand-it-light border-brand-it/20" : "bg-brand-hw-light border-brand-hw/20";
  const borderFocus = isIT
    ? "focus:border-brand-it focus:ring-2 focus:ring-brand-it/15"
    : "focus:border-brand-hw focus:ring-2 focus:ring-brand-hw/15";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(
        error.message === "Invalid login credentials"
          ? "E-Mail oder Passwort falsch. Bitte versuche es erneut."
          : error.message
      );
      setLoading(false);
      return;
    }

    const role = data.user?.user_metadata?.role;
    router.push(role === "company" ? "/dashboard/company" : "/dashboard/seeker");
  };

  return (
    <main className="min-h-screen bg-warm-gray flex flex-col overflow-x-hidden">

      {/* Dark header */}
      <div className="bg-black px-4 py-8 flex flex-col items-center border-b border-white/10">
        <Image
          src="/logo.png"
          width={72}
          height={72}
          alt="EyesOnMe Talent"
          className="logo-image mb-4"
          style={{ mixBlendMode: "screen", background: "transparent", border: "none", borderRadius: "12px" }}
        />
        <Link href="/" className="font-black text-xl tracking-tight">
          <span className="brand-eyes">Eyes</span><span className="brand-on">On</span><span className="brand-me">Me</span>
          {" "}<span className="brand-talent">Talent</span>
        </Link>
        <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.55)" }}>Willkommen zurück</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <Link href="/" className="flex items-center gap-2 text-sm text-muted hover:text-navy transition-colors mb-6 group">
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Zurück zur Startseite
        </Link>

        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-border p-8 sm:p-10">

          {/* Sector toggle */}
          <div className={`flex rounded-2xl border p-1 mb-8 ${accentLight}`}>
            <button
              onClick={() => setSector("it")}
              className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${sector === "it" ? "bg-brand-it text-white shadow-sm" : "text-muted hover:text-navy"}`}
            >
              💻 CodeOnMe · IT
            </button>
            <button
              onClick={() => setSector("hw")}
              className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${sector === "hw" ? "bg-brand-hw text-white shadow-sm" : "text-muted hover:text-navy"}`}
            >
              🔧 HandsOnMe
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 font-medium">
              ⚠️ {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-navy mb-1.5">E-Mail-Adresse</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@firma.de"
                required
                className={`w-full rounded-xl border border-border bg-warm-gray px-4 py-3 text-sm text-navy placeholder:text-muted outline-none transition-all ${borderFocus}`}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-navy mb-1.5">Passwort</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={`w-full rounded-xl border border-border bg-warm-gray px-4 py-3 text-sm text-navy placeholder:text-muted outline-none transition-all ${borderFocus}`}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-muted">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" className="rounded" />
                Angemeldet bleiben
              </label>
              <Link href="#" className={`${accentText} font-bold hover:underline`}>
                Passwort vergessen?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl text-white font-bold text-sm ${accent} hover:opacity-90 transition-all active:scale-95 shadow-sm mt-1 disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Wird angemeldet…
                </span>
              ) : "Anmelden →"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted font-medium">oder weiter mit</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Google SSO */}
          <button className="w-full py-3 rounded-xl border border-border text-sm font-semibold text-navy flex items-center justify-center gap-3 hover:bg-warm-gray transition-all">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Mit Google anmelden
          </button>

          <p className="text-center text-xs text-muted mt-6">
            Noch kein Konto?{" "}
            <Link href={`/register?sector=${sector}`} className={`${accentText} font-bold hover:underline`}>
              Kostenlos registrieren →
            </Link>
          </p>
        </div>

        {/* Trust footer */}
        <div className="mt-6 flex items-center gap-4 text-xs text-muted">
          <span>🔒 DSGVO-konform</span>
          <span className="w-px h-3 bg-border" />
          <span>🇩🇪 EU-Server</span>
          <span className="w-px h-3 bg-border" />
          <span>💶 Flat Fee · Zero Provision</span>
        </div>
      </div>
    </main>
  );
}
