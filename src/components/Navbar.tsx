"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

interface NavbarProps {
  sector?: "it" | "hw";
}

export default function Navbar({ sector }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const navLinks = [
    { href: "/search", label: "Suche" },
    { href: "/dashboard/company", label: "Für Firmen" },
    { href: "/dashboard/seeker", label: "Für Bewerber" },
    { href: "/#pricing", label: "Preise" },
    { href: "/chat", label: "Nachrichten" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[72px]">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "20px",
            overflow: "hidden",
            flexShrink: 0,
            boxShadow: "0 0 12px rgba(123,94,252,0.7), 0 0 24px rgba(255,107,26,0.4)",
          }}>
            <img
              src="/logo.png"
              alt="EyesOnMe Talent Logo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 20%",
                display: "block",
              }}
            />
          </div>
          <span className="font-black text-lg tracking-tight hidden sm:block">
            <span className="brand-eyes">Eyes</span><span className="brand-on">On</span><span className="brand-me">Me</span>
            {" "}<span className="brand-talent">Talent</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-xs text-white/50 truncate max-w-[160px]">{user.email}</span>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-white/80 border border-white/30 px-4 py-2 rounded-xl hover:border-white/60 hover:text-white transition-all"
              >
                Abmelden
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-white/80 border border-white/30 px-4 py-2 rounded-xl hover:border-white/60 hover:text-white transition-all"
              >
                Anmelden
              </Link>
              <Link
                href="/register"
                className="btn-gradient text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg"
              >
                Kostenlos starten
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/10 transition-all"
          onClick={() => setOpen(!open)}
          aria-label="Menü öffnen"
        >
          <span className={`block h-0.5 bg-white transition-all w-5 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 bg-white transition-all w-5 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 bg-white transition-all w-5 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black px-4 py-4 flex flex-col gap-2">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-2.5 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-2 pt-3 border-t border-white/10 flex flex-col gap-2">
            {user ? (
              <>
                <p className="text-xs text-white/40 px-3 truncate">{user.email}</p>
                <button
                  onClick={() => { setOpen(false); handleLogout(); }}
                  className="text-center py-2.5 rounded-xl text-sm font-semibold text-white border border-white/30 hover:border-white/60 transition-all"
                >
                  Abmelden
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-center py-2.5 rounded-xl text-sm font-semibold text-white border border-white/30 hover:border-white/60 transition-all"
                  onClick={() => setOpen(false)}
                >
                  Anmelden
                </Link>
                <Link
                  href="/register"
                  className="text-center py-2.5 rounded-xl text-sm font-bold text-white btn-gradient"
                  onClick={() => setOpen(false)}
                >
                  Kostenlos starten
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
