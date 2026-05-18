"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

interface NavbarProps {
  sector?: "it" | "hw";
}

const MOCK_NOTIFS = [
  { id: 1, text: "Lisa Maier hat Ihr Interesse erwidert – Match!", time: "vor 5 Min.", unread: true },
  { id: 2, text: "Thomas Berger: 'Guten Tag, ich habe Interesse…'", time: "vor 1 Std.", unread: true },
  { id: 3, text: "TechVision GmbH hat Interesse an Ihrem Profil bekundet", time: "gestern", unread: false },
];

export default function Navbar({ sector }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

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

  const navLinks = user
    ? [
        { href: "/search", label: "Suche" },
        { href: "/match", label: "Matches" },
        { href: "/profile", label: "Profil" },
        { href: "/#pricing", label: "Preise" },
      ]
    : [
        { href: "/search", label: "Suche" },
        { href: "/match", label: "Matches" },
        { href: "/dashboard/company", label: "Firmen" },
        { href: "/dashboard/seeker", label: "Bewerber" },
        { href: "/#pricing", label: "Preise" },
      ];

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <img
            src="/logo.png"
            alt="EyesOnMe Talent Logo"
            className="logo-image"
            style={{ width: "56px", height: "56px", objectFit: "contain" }}
          />
          <span className="hidden sm:block" style={{ fontSize: "26px", fontWeight: 900 }}>
            <span className="brand-eyes">Eyes</span><span className="brand-on">On</span><span className="brand-me">Me</span>
            {" "}<span className="brand-talent">Talent</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-white/70 hover:text-white transition-colors"
              style={{ fontSize: "20px", fontWeight: 700, padding: "10px 20px" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Icons: match, chat, bell */}
        <div className="hidden md:flex items-center gap-2 mr-1">
          <Link href="/match" className="relative p-2 rounded-xl hover:bg-white/10 transition-all" aria-label="Neue Matches">
            <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-black badge-pulse" />
          </Link>
          <Link href="/chat" className="relative p-2 rounded-xl hover:bg-white/10 transition-all" aria-label="Nachrichten">
            <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-black" />
          </Link>

          {/* Notification bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 rounded-xl hover:bg-white/10 transition-all"
              aria-label="Benachrichtigungen"
            >
              <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-black badge-pulse" />
            </button>

            {notifOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-border rounded-2xl shadow-xl z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                  <span className="font-black text-navy text-sm">Benachrichtigungen</span>
                  <span className="text-xs font-bold text-brand-it">Alle lesen</span>
                </div>
                {MOCK_NOTIFS.map((n, i) => (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 px-4 py-3 hover:bg-warm-gray transition-all cursor-pointer ${i < MOCK_NOTIFS.length - 1 ? "border-b border-border" : ""} ${n.unread ? "bg-brand-it-light/40" : ""}`}
                  >
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${n.unread ? "bg-brand-it" : "bg-transparent"}`} />
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs leading-snug ${n.unread ? "font-semibold text-navy" : "text-muted"}`}>{n.text}</p>
                      <p className="text-xs text-muted/60 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
                <div className="px-4 py-2.5 border-t border-border bg-warm-gray">
                  <span className="text-xs font-bold text-brand-it cursor-pointer hover:underline">Alle Benachrichtigungen →</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-white/50 truncate max-w-[160px]" style={{ fontSize: "14px" }}>{user.email}</span>
              <button
                onClick={handleLogout}
                className="text-white/80 border border-white/30 hover:border-white/60 hover:text-white transition-all"
                style={{ fontSize: "18px", fontWeight: 700, padding: "14px 32px", borderRadius: "14px" }}
              >
                Abmelden
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-white/80 border border-white/30 hover:border-white/60 hover:text-white transition-all"
                style={{ fontSize: "18px", fontWeight: 700, padding: "14px 40px", borderRadius: "14px", minWidth: "200px", display: "inline-flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap" }}
              >
                Anmelden
              </Link>
              <Link
                href="/register"
                className="btn-gradient text-white shadow-lg"
                style={{ fontSize: "18px", fontWeight: 700, padding: "14px 40px", borderRadius: "14px", minWidth: "200px", display: "inline-flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap" }}
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
