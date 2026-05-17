import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { IT_CATEGORIES, HW_CATEGORIES } from "@/lib/categories";

const usps = [
  {
    icon: "🎥",
    title: "Der Mensch vor dem Lebenslauf",
    text: "Ein 60-Sekunden Video sagt mehr als jeder Lebenslauf. Zeig wer du wirklich bist und finde Unternehmen die genau dich suchen.",
    color: "brand-it",
  },
  {
    icon: "🤖",
    title: "KI-Matching das wirklich passt",
    text: "Unser KI-Algorithmus vergleicht Skills, Gehaltswünsche und Region und zeigt dir einen Match-Score von 0 bis 100%. Transparent. Erklärbar. Fair.",
    color: "brand-hw",
  },
  {
    icon: "💬",
    title: "Direktkontakt. Kein Umweg.",
    text: "Nach dem Match schreibt ihr euch direkt. Kein Vermittler. Kein Headhunter. Keine Zwischenstufe. Nur zwei Menschen die zusammenpassen.",
    color: "brand-it",
  },
  {
    icon: "💶",
    title: "Ein Preis. Alles drin.",
    text: "Kein Klickpreis. Keine Provision. Keine Überraschungen. Ein fairer Monatsbeitrag für unbegrenzte Möglichkeiten.",
    color: "brand-hw",
  },
];

const steps = [
  { n: "01", title: "Plattform wählen", desc: "CodeOnMe für IT oder HandsOnMe für Handwerk. Spezialisiert, nicht generisch.", color: "it" },
  { n: "02", title: "Profil & Video anlegen", desc: "In 5 Minuten fertig. Dein Video-Pitch ist das Herzstück – echt, direkt, du.", color: "hw" },
  { n: "03", title: "KI-Score erhalten", desc: "Unser Algorithmus matcht dich in Echtzeit. Transparent, erklärbar, fair.", color: "it" },
  { n: "04", title: "Matched. Kontakt. Job.", desc: "Direkter Chat und Video-Call ohne Umwege. Vom Match zum Gespräch in Minuten.", color: "hw" },
];

const pricing = [
  {
    name: "Starter",
    price: "99",
    badge: "Perfekt für Einzelbetriebe",
    subtitle: "Für den Einstieg",
    features: [
      "Bis zu 5 offene Stellen",
      "KI-Matching & Vorschläge",
      "Video Pitch ansehen",
      "Direktchat nach Match",
      "2 Video-Calls pro Monat",
      "E-Mail Support",
    ],
    featured: false,
    isSeeker: false,
    cta: "Jetzt starten",
    note: "inkl. MwSt. · monatlich kündbar · keine Mindestlaufzeit",
    href: "/register",
  },
  {
    name: "Pro",
    price: "199",
    badge: "Meistgewählt",
    subtitle: "Für wachsende Unternehmen",
    features: [
      "Unbegrenzte offene Stellen",
      "Priorisiertes KI-Matching",
      "Unbegrenzte Video-Calls",
      "Kalender-Integration",
      "Analytics-Dashboard",
      "Priority Support",
      "Früher Zugang zu neuen Features",
    ],
    featured: true,
    isSeeker: false,
    cta: "Jetzt starten",
    note: "inkl. MwSt. · monatlich kündbar · keine Mindestlaufzeit",
    href: "/register",
  },
  {
    name: "Enterprise",
    price: "349",
    badge: "Ab 10 Mitarbeitern",
    subtitle: "Für größere Unternehmen",
    features: [
      "Alles aus Pro",
      "Mehrere Standorte und Teams",
      "Persönlicher Account Manager",
      "API-Zugang",
      "SLA Garantie",
      "Custom Onboarding",
    ],
    featured: false,
    isSeeker: false,
    cta: "Kontakt aufnehmen",
    note: "inkl. MwSt. · individuelle Konditionen möglich",
    href: "/register",
  },
  {
    name: "Bewerber",
    price: "0",
    badge: "Immer kostenlos",
    subtitle: "Für Fachkräfte auf Jobsuche",
    features: [
      "Vollständiges Profil anlegen",
      "Video Pitch hochladen",
      "KI-Match-Vorschläge erhalten",
      "Direktchat mit Unternehmen",
      "Video-Call direkt in der App",
      "Bewerbungen verwalten",
    ],
    featured: false,
    isSeeker: true,
    cta: "Kostenlos anmelden",
    note: "Für immer kostenlos · kein Haken · kein Kleingedrucktes",
    href: "/register",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">

      <Navbar />

      {/* ── DARK HERO ── */}
      <section className="relative bg-black flex flex-col items-center justify-center text-center px-4 py-32 overflow-hidden" style={{ minHeight: "calc(100vh - 72px)" }}>
        {/* Subtle white dot grid */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        {/* Orange glow orb — bottom-left */}
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,107,26,0.18) 0%, transparent 70%)", transform: "translate(-30%, 40%)" }} />

        {/* Purple glow orb — bottom-right */}
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(123,94,252,0.18) 0%, transparent 70%)", transform: "translate(30%, 40%)" }} />

        <div className="relative z-10 flex flex-col items-center">
          {/* Logo */}
          <img
            src="/logo.png"
            alt="EyesOnMe Talent"
            width={260}
            height={260}
            style={{
              width: "260px",
              height: "260px",
              objectFit: "contain",
              borderRadius: "20px",
              boxShadow: "0 0 40px rgba(123,94,252,0.9), 0 0 80px rgba(255,107,26,0.6)",
              marginBottom: "2rem",
              display: "block",
            }}
          />

          {/* Gradient label */}
          <p className="gradient-text font-bold text-sm tracking-widest uppercase mb-6 animate-fade-up">
            Menschen verbinden · Wir sehen, wer du wirklich bist.
          </p>

          {/* Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6 max-w-4xl animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Nicht ein Lebenslauf.<br />Ein Mensch.
          </h1>

          {/* Subline */}
          <p className="text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed animate-fade-up" style={{ color: "rgba(255,255,255,0.65)", animationDelay: "0.15s" }}>
            Wir verbinden IT-Profis und Handwerker direkt mit Unternehmen.{" "}
            <strong className="text-white">Persönlich. Transparent. Ohne Vermittler.</strong>
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <Link href="/register?role=company" className="btn-gradient text-white px-8 py-4 rounded-2xl font-bold text-base shadow-lg">
              Als Firma starten
            </Link>
            <Link
              href="/register"
              className="text-white px-8 py-4 rounded-2xl font-bold text-base transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.35)" }}
              onMouseEnter={undefined}
            >
              Als Bewerber anmelden – kostenlos
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 animate-fade-up" style={{ animationDelay: "0.25s" }}>
            {[
              { value: "0%", label: "Provision" },
              { value: "KI-Match", label: "in Echtzeit" },
              { value: "DSGVO", label: "konform" },
              { value: "🇩🇪", label: "Server in Deutschland" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-2xl font-black text-white">{s.value}</span>
                <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRANSITION ── */}
      <div style={{ height: "120px", background: "linear-gradient(180deg, #000000 0%, #ffffff 100%)" }} />

      {/* ── PLATFORM CARDS ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-brand-it mb-3 block">Zwei Plattformen. Eine Mission.</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-navy">Finde deinen Bereich.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* CodeOnMe IT */}
            <Link href="/register?sector=it" className="group rounded-3xl bg-white border border-border border-t-4 border-t-brand-it p-8 flex flex-col card-hover" style={{ boxShadow: "0 0 0 0 rgba(123,94,252,0)", transition: "box-shadow 0.3s ease, transform 0.2s ease" }}
              onMouseEnter={undefined}
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-it flex items-center justify-center mb-5 shadow-lg shadow-brand-it/30">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-brand-it tracking-widest uppercase mb-1">IT-Professionals</span>
              <h3 className="text-3xl font-black text-navy mb-4">Code<span className="text-brand-it">OnMe</span></h3>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {IT_CATEGORIES.map((cat) => (
                  <span key={cat} className="text-xs px-2.5 py-1 bg-brand-it/8 text-brand-it rounded-full font-medium">{cat}</span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-brand-it mt-auto group-hover:gap-3 transition-all">
                Jetzt starten – kostenlos
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </Link>

            {/* HandsOnMe HW */}
            <Link href="/register?sector=hw" className="group rounded-3xl bg-white border border-border border-t-4 border-t-brand-hw p-8 flex flex-col card-hover">
              <div className="w-14 h-14 rounded-2xl bg-brand-hw flex items-center justify-center mb-5 shadow-lg shadow-brand-hw/30">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-brand-hw tracking-widest uppercase mb-1">Handwerk & Fachkräfte</span>
              <h3 className="text-3xl font-black text-navy mb-4">Hands<span className="text-brand-hw">OnMe</span></h3>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {HW_CATEGORIES.map((cat) => (
                  <span key={cat} className="text-xs px-2.5 py-1 bg-brand-hw/8 text-brand-hw rounded-full font-medium">{cat}</span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-brand-hw mt-auto group-hover:gap-3 transition-all">
                Als Bewerber anmelden – immer kostenlos
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── USP SECTION ── */}
      <section className="py-24 px-4 bg-warm-gray">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-brand-it mb-3 block">Warum EyesOnMe Talent?</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-navy mb-4">
              Weil hinter jedem Job<br className="hidden sm:block" /> ein Mensch steckt.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {usps.map((u) => (
              <div key={u.title} className="bg-white rounded-3xl border border-border p-8 card-hover flex gap-5">
                <div className={`w-14 h-14 rounded-2xl bg-${u.color}/10 flex items-center justify-center flex-shrink-0 text-2xl`}>
                  {u.icon}
                </div>
                <div>
                  <h3 className="text-xl font-black text-navy mb-2">{u.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{u.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest uppercase text-brand-it mb-4 block">Unser Versprechen</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-navy mb-8 leading-tight">
            Wir sehen den Menschen.<br />
            <span className="text-brand-it">Nicht nur den Lebenslauf.</span>
          </h2>
          <div className="flex flex-col gap-5 text-muted text-lg leading-relaxed">
            <p>
              EyesOnMe Talent wurde gegründet weil wir glauben dass Recruiting menschlicher sein kann.
              Nicht anonym. Nicht kalt. Nicht bürokratisch.
            </p>
            <p>
              Jeder Handwerker hat eine Geschichte. Jeder Entwickler hat eine Leidenschaft.
              Jedes Unternehmen sucht nicht nur Qualifikationen sondern Menschen die wirklich passen.
            </p>
            <p className="font-semibold text-navy">
              Deshalb steht bei uns der Mensch im Mittelpunkt. Immer.
            </p>
          </div>
          <p className="mt-8 text-sm font-bold text-navy">— Das Team von EyesOnMe Talent</p>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-4 bg-warm-gray">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-brand-it mb-3 block">So einfach</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-navy">In 4 Schritten zum nächsten Kapitel.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="bg-white rounded-3xl p-6 border border-border shadow-sm card-hover text-center">
                <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4 text-2xl font-black ${
                  s.color === "it" ? "bg-brand-it-light text-brand-it border border-brand-it/20" : "bg-brand-hw-light text-brand-hw border border-brand-hw/20"
                }`}>
                  {s.n}
                </div>
                <h3 className="font-black text-navy text-base mb-2">{s.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register?sector=it" className="px-8 py-4 bg-brand-it text-white font-bold text-base rounded-2xl hover:opacity-90 transition-all text-center shadow-lg shadow-brand-it/25">
              Jetzt starten – kostenlos
            </Link>
            <Link href="/register" className="px-8 py-4 border-2 border-navy text-navy font-bold text-base rounded-2xl hover:bg-navy hover:text-white transition-all text-center">
              Als Bewerber anmelden – immer kostenlos
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-brand-it mb-3 block">Transparente Preise</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-navy mb-4">Transparent. Fair. Für Menschen.</h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">Ein fairer Monatsbeitrag. Keine versteckten Kosten. Keine Provision. Nie.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pricing.map((p) => {
              if (p.featured) {
                return (
                  <div key={p.name} className="relative lg:scale-105 rounded-3xl p-[2px]" style={{ background: "linear-gradient(135deg, #FF6B1A 0%, #7B5EFC 100%)" }}>
                    <div className="bg-navy rounded-[22px] p-6 flex flex-col h-full">
                      <div className="inline-flex self-start px-3 py-1 rounded-full text-xs font-bold mb-4 bg-brand-hw text-white">
                        ⭐ {p.badge}
                      </div>
                      <h3 className="text-2xl font-black text-white mb-1">{p.name}</h3>
                      <p className="text-xs font-medium text-white/60 mb-4">{p.subtitle}</p>
                      <div className="flex items-end gap-1 mb-6">
                        <span className="text-5xl font-black text-white leading-none">{p.price}€</span>
                        <span className="text-sm text-white/60 mb-2">/Mo.</span>
                      </div>
                      <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                        {p.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-white/90">
                            <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5 bg-white/20 text-white">✓</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-col gap-2">
                        <Link href={p.href} className="w-full py-3 rounded-xl text-sm font-bold text-center btn-gradient text-white">
                          {p.cta}
                        </Link>
                        <p className="text-xs text-center text-white/50 leading-tight">{p.note}</p>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <div
                  key={p.name}
                  className={`relative rounded-3xl p-6 flex flex-col border-2 transition-all ${
                    p.isSeeker ? "bg-green-50 border-green-200" : "bg-white border-border hover:border-brand-it/30 hover:shadow-md"
                  }`}
                >
                  <div className={`inline-flex self-start px-3 py-1 rounded-full text-xs font-bold mb-4 ${
                    p.isSeeker ? "bg-green-100 text-green-700" : "bg-warm-gray text-muted"
                  }`}>
                    {p.badge}
                  </div>
                  <h3 className="text-2xl font-black text-navy mb-1">{p.name}</h3>
                  <p className="text-xs font-medium text-muted mb-4">{p.subtitle}</p>
                  <div className="flex items-end gap-1 mb-6">
                    <span className="text-5xl font-black text-navy leading-none">{p.price}€</span>
                    {p.price !== "0" && <span className="text-sm text-muted mb-2">/Mo.</span>}
                    {p.price === "0" && <span className="text-sm font-semibold text-green-600 mb-2">kostenlos</span>}
                  </div>
                  <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-navy">
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5 ${
                          p.isSeeker ? "bg-green-100 text-green-600" : "bg-brand-it/10 text-brand-it"
                        }`}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col gap-2">
                    <Link href={p.href} className={`w-full py-3 rounded-xl text-sm font-bold text-center transition-all ${
                      p.isSeeker ? "bg-green-500 text-white hover:bg-green-600" : "border-2 border-brand-it text-brand-it hover:bg-brand-it hover:text-white"
                    }`}>
                      {p.cta}
                    </Link>
                    <p className="text-xs text-center text-muted leading-tight">{p.note}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DSGVO TRUST STRIP ── */}
      <section className="py-14 px-4 border-t border-border bg-warm-gray">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-10 text-center">
          {[
            { icon: "🔒", label: "DSGVO-konform", sub: "EU-Server · Deutschland" },
            { icon: "🚫", label: "Kein Tracking", sub: "Keine Datenweitergabe" },
            { icon: "🏦", label: "EU-Datenschutz", sub: "Art. 13/14 DSGVO" },
            { icon: "⚡", label: "Echtzeit-Matching", sub: "KI analysiert sofort" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1.5">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-sm font-bold text-navy">{item.label}</span>
              <span className="text-xs text-muted">{item.sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── DARK FOOTER ── */}
      <footer className="bg-black py-16 px-4">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
          <Image src="/logo.png" width={80} height={80} alt="EyesOnMe Talent" className="logo-image" style={{ mixBlendMode: "screen", background: "transparent", border: "none", borderRadius: "12px" }} />
          <p className="gradient-text font-black text-xl text-center">
            Menschen verbinden. Wir sehen, wer du wirklich bist.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="#" className="hover:text-white transition-colors">Impressum</Link>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
            <Link href="#" className="hover:text-white transition-colors">Datenschutz</Link>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
            <Link href="#" className="hover:text-white transition-colors">AGB</Link>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
            <Link href="#" className="hover:text-white transition-colors">Kontakt</Link>
          </div>
          <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.35)" }}>
            DSGVO-konform · Server in Deutschland · Made with Herz in Baden-Württemberg
          </p>
        </div>
      </footer>

    </main>
  );
}
