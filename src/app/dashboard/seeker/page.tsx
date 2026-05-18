"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const IT_COMPANY_MATCHES = [
  { id: 1, company: "AppSoft GmbH", role: "Senior Frontend Developer", city: "Berlin", salary: "65–80k €", tags: ["React", "Remote"], score: 91, sector: "it" },
  { id: 2, company: "TechBridge GmbH", role: "DevOps Engineer", city: "Remote", salary: "70–85k €", tags: ["Kubernetes", "AWS"], score: 78, sector: "it" },
  { id: 3, company: "DataVision AG", role: "Data Scientist", city: "Hamburg", salary: "60–75k €", tags: ["Python", "ML"], score: 85, sector: "it" },
];

const HW_COMPANY_MATCHES = [
  { id: 4, company: "Muster Handwerk GmbH", role: "Elektroinstallateur", city: "München", salary: "45–58k €", tags: ["Vollzeit", "KNX"], score: 94, sector: "hw" },
  { id: 5, company: "ElektroKraft GmbH", role: "Meister Elektrotechnik", city: "Stuttgart", salary: "50–65k €", tags: ["Meisterbrief"], score: 86, sector: "hw" },
  { id: 6, company: "WärmeTechnik Maier", role: "Sanitärinstallateur", city: "Stuttgart", salary: "42–52k €", tags: ["SHK", "Heizung"], score: 76, sector: "hw" },
];

const IT_APPLICATIONS = [
  { id: 1, company: "AppSoft GmbH", role: "Frontend Developer", status: "Angesehen", statusColor: "#1565C020", statusText: "#1565C0" },
  { id: 2, company: "TechBridge GmbH", role: "DevOps Engineer", status: "Gespräch geplant", statusColor: "#DCFCE7", statusText: "#16A34A" },
  { id: 3, company: "DataVision AG", role: "Data Scientist", status: "Warten", statusColor: "#FEF9C3", statusText: "#CA8A04" },
];

const HW_APPLICATIONS = [
  { id: 4, company: "Muster Handwerk GmbH", role: "Elektroinstallateur", status: "Angesehen", statusColor: "#FF6B1A20", statusText: "#FF6B1A" },
  { id: 5, company: "ElektroKraft GmbH", role: "Meister Elektrotechnik", status: "Gespräch geplant", statusColor: "#DCFCE7", statusText: "#16A34A" },
  { id: 6, company: "WärmeTechnik Maier", role: "Sanitärinstallateur", status: "Warten", statusColor: "#FEF9C3", statusText: "#CA8A04" },
];

const PROFILE_CHECKLIST = [
  { label: "Skills eintragen", done: true },
  { label: "Gehaltswunsch angeben", done: true },
  { label: "Standort angeben", done: true },
  { label: "Profilfoto hochladen", done: false },
  { label: "Video-Pitch aufnehmen", done: false },
];

export default function SeekerDashboard() {
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

  const matches = sector === "it" ? IT_COMPANY_MATCHES : HW_COMPANY_MATCHES;
  const applications = sector === "it" ? IT_APPLICATIONS : HW_APPLICATIONS;
  const visible = matches.filter(m => !dismissed.includes(m.id) && !interested.includes(m.id));
  const ac = sector === "it" ? "#1565C0" : "#FF6B1A";
  const sectorLabel = sector === "it" ? "💻 CodeOnMe" : "🤝 HandsOnMe";

  const profileDone = PROFILE_CHECKLIST.filter(c => c.done).length;
  const profilePct = Math.round((profileDone / PROFILE_CHECKLIST.length) * 100);

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
              { label: "Dashboard", href: "/dashboard/seeker" },
              { label: "Profil", href: "/profile" },
              { label: "Jobs", href: "/search" },
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
        <div style={{ width: "100%", height: 180, borderRadius: 20, overflow: "hidden", marginBottom: 24, position: "relative" }}>
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&h=180&fit=crop&crop=center"
            alt="Neue Chancen"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.15) 100%)", borderRadius: 20 }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 36px" }}>
            <div>
              <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", marginBottom: 6 }}>Hallo! 👋</h2>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
                Du hast heute {visible.length} neue Job-Matches!
              </p>
            </div>
            <Link href="/profile" style={{ fontSize: 14, fontWeight: 700, border: "2px solid white", color: "white", padding: "12px 24px", borderRadius: 14, textDecoration: "none", whiteSpace: "nowrap" }}>
              Profil vervollständigen →
            </Link>
          </div>
        </div>

        {/* Profile completion bar */}
        <div style={{ background: "white", borderRadius: 16, border: "1px solid #E8E8E8", padding: "14px 20px", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#0D1B2A" }}>Profil {profilePct}% vollständig</span>
            <Link href="/profile" style={{ fontSize: 13, fontWeight: 700, color: ac, textDecoration: "none" }}>Vervollständigen →</Link>
          </div>
          <div style={{ width: "100%", height: 8, background: "#F3F4F6", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ width: `${profilePct}%`, height: "100%", background: ac, borderRadius: 99, transition: "width 0.6s ease" }} />
          </div>
        </div>

        {/* Metric cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
          {[
            { label: "Neue Matches", value: visible.length, icon: "🎯" },
            { label: "Bewerbungen", value: applications.length, icon: "📋" },
            { label: "Video-Calls", value: 1, icon: "📹" },
            { label: "Top Match Score", value: `${Math.max(...matches.map(m => m.score))}%`, icon: "🏆" },
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

          {/* Left: Job match cards */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 900, color: "#0D1B2A" }}>🎯 Job-Matches</h2>
              {visible.length > 0 && (
                <span style={{ background: ac, color: "white", fontSize: 13, fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>{visible.length} NEU</span>
              )}
            </div>

            {visible.length === 0 ? (
              <div style={{ background: "white", borderRadius: 16, padding: 40, textAlign: "center", border: "1px solid #E8E8E8" }}>
                <div style={{ fontSize: 40 }}>👀</div>
                <p style={{ fontSize: 16, fontWeight: 700, marginTop: 12, color: "#0D1B2A" }}>Alle Matches bewertet!</p>
                <p style={{ fontSize: 14, color: "#6B7280", marginTop: 6 }}>Neue Matches kommen täglich.</p>
              </div>
            ) : visible.map(m => (
              <div key={m.id} style={{ background: "white", borderRadius: 16, border: "1px solid #E8E8E8", padding: 20, marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: ac + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: ac, flexShrink: 0 }}>
                    {m.company.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#0D1B2A" }}>{m.role}</div>
                    <div style={{ fontSize: 14, color: "#6B7280", marginTop: 2 }}>
                      <span style={{ fontWeight: 600, color: "#0D1B2A" }}>{m.company}</span> · 📍 {m.city}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#0D1B2A", marginTop: 4 }}>💶 {m.salary}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                      {m.tags.map(t => (
                        <span key={t} style={{ fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 10, background: ac + "18", color: ac }}>{t}</span>
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

          {/* Right: Applications + checklist */}
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: "#0D1B2A", marginBottom: 16 }}>📋 Bewerbungen</h2>
            <div style={{ background: "white", borderRadius: 16, border: "1px solid #E8E8E8", overflow: "hidden", marginBottom: 16 }}>
              {applications.map((app, i) => (
                <div key={app.id} style={{ padding: "14px 18px", borderBottom: i < applications.length - 1 ? "1px solid #E8E8E8" : "none", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: ac + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: ac, flexShrink: 0 }}>
                    {app.company.charAt(0)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#0D1B2A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{app.role}</div>
                    <div style={{ fontSize: 12, color: "#6B7280", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{app.company}</div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 20, background: app.statusColor, color: app.statusText, flexShrink: 0 }}>
                    {app.status}
                  </span>
                </div>
              ))}
              <div style={{ padding: "12px 18px", background: ac + "12", borderTop: "1px solid #E8E8E8" }}>
                <Link href="/search" style={{ fontSize: 13, fontWeight: 700, color: ac, textDecoration: "none" }}>Jobs suchen →</Link>
              </div>
            </div>

            {/* Profile checklist */}
            <div style={{ background: "white", borderRadius: 16, border: "1px solid #E8E8E8", padding: 18, marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#0D1B2A", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 14 }}>Profil vervollständigen</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {PROFILE_CHECKLIST.map(item => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: item.done ? "#22C55E" : "transparent", border: item.done ? "none" : "2px solid #D1D5DB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {item.done && <span style={{ color: "white", fontSize: 10, fontWeight: 900 }}>✓</span>}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: item.done ? "#9CA3AF" : "#0D1B2A", textDecoration: item.done ? "line-through" : "none" }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
              <Link href="/profile"
                style={{ display: "block", marginTop: 14, padding: "10px", borderRadius: 12, background: ac, color: "white", fontSize: 13, fontWeight: 700, textAlign: "center", textDecoration: "none" }}>
                Jetzt vervollständigen →
              </Link>
            </div>

            {/* Quick links */}
            <div style={{ background: "#0D1B2A", borderRadius: 16, padding: 18, color: "white" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Schnellzugriff</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { label: "🔍 Jobs durchsuchen", href: "/search" },
                  { label: "💬 Nachrichten", href: "/chat" },
                  { label: "📹 Video Pitch hochladen", href: "/profile" },
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
