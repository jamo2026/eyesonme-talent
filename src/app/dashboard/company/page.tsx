"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const IT_MATCHES = [
  { id: 1, name: "Anna Klein", role: "Frontend Entwicklerin", city: "Berlin", skills: ["React", "TypeScript", "Next.js"], score: 91, sector: "it" },
  { id: 2, name: "Tom Hoffmann", role: "Senior DevOps", city: "München", skills: ["Kubernetes", "AWS"], score: 78, sector: "it" },
  { id: 3, name: "Maria Schulz", role: "Data Scientist", city: "Hamburg", skills: ["Python", "ML", "SQL"], score: 85, sector: "it" },
];

const HW_MATCHES = [
  { id: 4, name: "Max Kellermann", role: "Elektromeister", city: "Stuttgart", skills: ["KNX", "SPS", "PV"], score: 94, sector: "hw" },
  { id: 5, name: "Sandra Klein", role: "Elektromeisterin", city: "Böblingen", skills: ["Smart Home", "DALI"], score: 79, sector: "hw" },
  { id: 6, name: "Felix Wagner", role: "Sanitärinstallateur", city: "Esslingen", skills: ["Heizung", "Sanitär"], score: 76, sector: "hw" },
];

const IT_JOBS = [
  { id: 1, title: "Senior Frontend Developer", location: "Berlin · Remote", applicants: 8, active: true },
  { id: 2, title: "DevOps Engineer", location: "Remote", applicants: 5, active: true },
  { id: 3, title: "Data Scientist", location: "Hamburg", applicants: 3, active: false },
];

const HW_JOBS = [
  { id: 4, title: "Elektroinstallateur (m/w/d)", location: "Stuttgart", applicants: 6, active: true },
  { id: 5, title: "Meister Elektrotechnik", location: "Stuttgart", applicants: 4, active: true },
  { id: 6, title: "Sanitärinstallateur", location: "München", applicants: 2, active: false },
];

export default function CompanyDashboard() {
  const router = useRouter();
  const [sector, setSector] = useState<"it" | "hw">("it");
  const [dismissed, setDismissed] = useState<number[]>([]);
  const [interested, setInterested] = useState<number[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push("/login"); return; }
      const s = (session.user.user_metadata?.sector as "it" | "hw") ?? "it";
      setSector(s);
    });
  }, [router]);

  const matches = sector === "it" ? IT_MATCHES : HW_MATCHES;
  const jobs = sector === "it" ? IT_JOBS : HW_JOBS;
  const visible = matches.filter(m => !dismissed.includes(m.id) && !interested.includes(m.id));
  const ac = sector === "it" ? "#1565C0" : "#FF6B1A";
  const sectorLabel = sector === "it" ? "💻 CodeOnMe" : "🤝 HandsOnMe";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-warm-gray">
      <header className="bg-black border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="Logo" style={{ width: 48, height: 48, mixBlendMode: "screen" }} />
              <span style={{ fontSize: 22, fontWeight: 900, color: "white" }}>
                Eyes<span style={{ color: ac }}>On</span>Me Talent
              </span>
            </Link>
            <span style={{ fontSize: 13, fontWeight: 700, background: ac, color: "white", padding: "4px 12px", borderRadius: 20 }}>
              {sectorLabel}
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            {[
              { label: "Dashboard", href: "/dashboard/company" },
              { label: "Profil", href: "/profile" },
              { label: "Suche", href: "/search" },
              { label: "Nachrichten", href: "/chat" },
              { label: "Kalender", href: "/kalender" },
            ].map(tab => (
              <Link key={tab.label} href={tab.href}
                style={{ fontSize: 16, fontWeight: 700, color: "white", padding: "10px 18px", borderRadius: 12, background: "rgba(255,255,255,0.08)", textDecoration: "none" }}>
                {tab.label}
              </Link>
            ))}
          </nav>

          <button onClick={handleLogout}
            style={{ fontSize: 15, fontWeight: 700, color: "white", border: "1px solid rgba(255,255,255,0.3)", padding: "10px 22px", borderRadius: 12, background: "transparent", cursor: "pointer" }}>
            Abmelden
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Page header banner */}
        <div style={{ width: "100%", height: 200, borderRadius: 20, overflow: "hidden", marginBottom: 28, position: "relative" }}>
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1400&h=200&fit=crop&crop=center"
            alt="Zusammenarbeit"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.15) 100%)", borderRadius: 20 }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 36px" }}>
            <div>
              <h2 style={{ fontSize: 30, fontWeight: 900, color: "white", marginBottom: 6 }}>Guten Tag! 👋</h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)" }}>
                {visible.length} neue Matches warten auf Sie heute.
              </p>
            </div>
            <Link href="/jobs/new" style={{ fontSize: 15, fontWeight: 700, background: ac, color: "white", padding: "14px 28px", borderRadius: 14, textDecoration: "none", whiteSpace: "nowrap" }}>
              + Stelle ausschreiben
            </Link>
          </div>
        </div>

        {/* Metric cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
          {[
            { label: "Neue Matches", value: visible.length, icon: "🎯" },
            { label: "Offene Stellen", value: jobs.filter(j => j.active).length, icon: "💼" },
            { label: "Nachrichten", value: 2, icon: "💬" },
            { label: "Video-Calls heute", value: 1, icon: "📹" },
          ].map(m => (
            <div key={m.label} style={{ background: "white", borderRadius: 16, border: "1px solid #E8E8E8", padding: 20 }}>
              <div style={{ fontSize: 28 }}>{m.icon}</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: ac, marginTop: 8 }}>{m.value}</div>
              <div style={{ fontSize: 14, color: "#6B7280", marginTop: 4 }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* Two-column */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>

          {/* Left: Match cards */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 900, color: "#0D1B2A" }}>🎯 KI-Match Vorschläge</h2>
              {visible.length > 0 && (
                <span style={{ background: ac, color: "white", fontSize: 13, fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>{visible.length} NEU</span>
              )}
            </div>

            {visible.length === 0 ? (
              <div style={{ background: "white", borderRadius: 16, padding: 40, textAlign: "center", border: "1px solid #E8E8E8" }}>
                <div style={{ fontSize: 40 }}>✅</div>
                <p style={{ fontSize: 16, fontWeight: 700, marginTop: 12, color: "#0D1B2A" }}>Alle Kandidaten bewertet!</p>
                <p style={{ fontSize: 14, color: "#6B7280", marginTop: 6 }}>Neue Matches kommen täglich.</p>
              </div>
            ) : visible.map(m => (
              <div key={m.id} style={{ background: "white", borderRadius: 16, border: "1px solid #E8E8E8", padding: 20, marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: ac + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: ac, flexShrink: 0 }}>
                    {m.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#0D1B2A" }}>{m.name}</div>
                    <div style={{ fontSize: 14, color: "#6B7280", marginTop: 2 }}>{m.role} · 📍 {m.city}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                      {m.skills.map(s => (
                        <span key={s} style={{ fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 10, background: ac + "18", color: ac }}>{s}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ textAlign: "center", flexShrink: 0 }}>
                    <div style={{ fontSize: 24, fontWeight: 900, color: ac }}>{m.score}%</div>
                    <div style={{ fontSize: 11, color: "#6B7280" }}>Match</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                  <button onClick={() => setDismissed(p => [...p, m.id])}
                    style={{ flex: 1, padding: "12px", borderRadius: 12, border: "2px solid #FEE2E2", background: "#FEF2F2", color: "#EF4444", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                    ✗ Weiter
                  </button>
                  <button onClick={() => setInterested(p => [...p, m.id])}
                    style={{ flex: 2, padding: "12px", borderRadius: 12, border: "none", background: ac, color: "white", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                    ✓ Interesse bekunden
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Jobs + sidebar */}
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: "#0D1B2A", marginBottom: 16 }}>💼 Offene Stellen</h2>
            <div style={{ background: "white", borderRadius: 16, border: "1px solid #E8E8E8", overflow: "hidden", marginBottom: 16 }}>
              {jobs.map((job, i) => (
                <div key={job.id} style={{ padding: "14px 18px", borderBottom: i < jobs.length - 1 ? "1px solid #E8E8E8" : "none", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: job.active ? "#22C55E" : "#D1D5DB", flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#0D1B2A" }}>{job.title}</div>
                    <div style={{ fontSize: 12, color: "#6B7280" }}>📍 {job.location} · {job.applicants} Bew.</div>
                  </div>
                </div>
              ))}
              <div style={{ padding: "12px 18px", background: ac + "12", borderTop: "1px solid #E8E8E8" }}>
                <Link href="/jobs/new" style={{ fontSize: 13, fontWeight: 700, color: ac, textDecoration: "none" }}>+ Neue Stelle ausschreiben</Link>
              </div>
            </div>

            <div style={{ background: "#0D1B2A", borderRadius: 16, padding: 20, color: "white" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Ihr Abo</div>
              <div style={{ fontSize: 22, fontWeight: 900 }}>Pro · 199€/Mo.</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 4, marginBottom: 16 }}>Unbegrenzte Stellen · Priorisiertes Matching</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { label: "💬 Nachrichten", href: "/chat" },
                  { label: "📹 Video Call", href: "/videocall/1" },
                  { label: "📅 Kalender", href: "/kalender" },
                ].map(l => (
                  <Link key={l.label} href={l.href}
                    style={{ fontSize: 14, fontWeight: 600, color: "white", padding: "10px 14px", background: "rgba(255,255,255,0.08)", borderRadius: 10, textDecoration: "none" }}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
