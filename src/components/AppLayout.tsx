"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface AppLayoutProps {
  children: React.ReactNode;
}

const COMPANY_NAV = [
  { label: "Dashboard", href: "/dashboard/company" },
  { label: "Profil",    href: "/profile" },
  { label: "Suche",     href: "/search" },
  { label: "Nachrichten", href: "/chat" },
  { label: "Kalender",  href: "/kalender" },
];

const SEEKER_NAV = [
  { label: "Dashboard", href: "/dashboard/seeker" },
  { label: "Profil",    href: "/profile" },
  { label: "Jobs",      href: "/search" },
  { label: "Nachrichten", href: "/chat" },
  { label: "Kalender",  href: "/kalender" },
];

export default function AppLayout({ children }: AppLayoutProps) {
  const router   = useRouter();
  const pathname = usePathname();
  const [sector, setSector] = useState<"it" | "hw">("it");
  const [role,   setRole]   = useState<"company" | "seeker">("seeker");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push("/login"); return; }
      const s = (session.user.user_metadata?.sector as "it" | "hw")           ?? "it";
      const r = (session.user.user_metadata?.role   as "company" | "seeker")  ?? "seeker";
      setSector(s);
      setRole(r);
    });
  }, [router]);

  const ac          = sector === "it" ? "#1565C0" : "#FF6B1A";
  const sectorLabel = sector === "it" ? "💻 CodeOnMe" : "🤝 HandsOnMe";
  const navLinks    = role === "company" ? COMPANY_NAV : SEEKER_NAV;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  return (
    <div style={{ minHeight: "100vh", background: "#F9F8F7", display: "flex", flexDirection: "column" }}>

      {/* ── Sticky app header ── */}
      <header style={{ background: "black", borderBottom: "1px solid rgba(255,255,255,0.1)", position: "sticky", top: 0, zIndex: 50, flexShrink: 0 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>

          {/* Logo + sector badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
              <img src="/logo.png" alt="Logo" style={{ width: 44, height: 44, mixBlendMode: "screen" }} />
              <span style={{ fontSize: 20, fontWeight: 900, color: "white" }}>
                Eyes<span style={{ color: ac }}>On</span>Me Talent
              </span>
            </Link>
            <span style={{ fontSize: 12, fontWeight: 700, background: ac, color: "white", padding: "3px 10px", borderRadius: 20, whiteSpace: "nowrap" }}>
              {sectorLabel}
            </span>
          </div>

          {/* Desktop nav */}
          <nav style={{ display: "flex", gap: 4 }} className="hidden md:flex">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "white",
                  padding: "9px 16px",
                  borderRadius: 10,
                  background: isActive(link.href) ? "rgba(255,255,255,0.15)" : "transparent",
                  textDecoration: "none",
                  transition: "background 0.15s",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <button
            onClick={handleLogout}
            style={{ fontSize: 14, fontWeight: 700, color: "white", border: "1px solid rgba(255,255,255,0.3)", padding: "9px 20px", borderRadius: 11, background: "transparent", cursor: "pointer", whiteSpace: "nowrap" }}
          >
            Abmelden
          </button>
        </div>

        {/* Mobile tab bar */}
        <div className="md:hidden" style={{ display: "flex", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "8px 4px",
                fontSize: 11,
                fontWeight: 700,
                color: isActive(link.href) ? "white" : "rgba(255,255,255,0.4)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </header>

      {/* ── Page content ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </div>
  );
}
