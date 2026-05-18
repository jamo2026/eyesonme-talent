import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

const usps = [
  {
    icon: "🎥",
    title: "Dein Video Pitch. Deine Persönlichkeit.",
    text: "Ein 60-Sekunden Video sagt mehr als jeder Lebenslauf. Zeig wer du wirklich bist – nicht was du auf Papier bist. Unternehmen sehen den Menschen hinter den Qualifikationen.",
    color: "brand-it",
  },
  {
    icon: "🤖",
    title: "KI-Matching das wirklich passt.",
    text: "Unser Algorithmus vergleicht Skills, Gehalt und Region und gibt dir einen ehrlichen Match-Score von 0 bis 100%. Keine Versprechen. Nur echte Übereinstimmung.",
    color: "brand-hw",
  },
  {
    icon: "💬",
    title: "Direkt. Kein Vermittler. Kein Umweg.",
    text: "Nach dem Match schreibt ihr euch direkt. Kein Headhunter der sich einmischt. Kein Vermittler der die Wahrheit verschleiert. Nur zwei Menschen die zusammenpassen.",
    color: "brand-it",
  },
  {
    icon: "💶",
    title: "Ein fairer Preis. Alles drin.",
    text: "Kein Klickpreis. Keine Provision. Keine bösen Überraschungen. Ein monatlicher Betrag – und du hast Zugang zu allem. Weil wir glauben dass gute Arbeit einen fairen Preis verdient.",
    color: "brand-hw",
  },
];

const steps = [
  {
    n: "01",
    title: "Profil anlegen – in 5 Minuten",
    desc: "Kein langer Fragebogen. Kein Papierkram.\nEinfach dein Profil erstellen und deinen Video-Pitch aufnehmen.\nFertig – in unter 5 Minuten.",
    color: "it",
  },
  {
    n: "02",
    title: "Selbst suchen oder KI übernimmt",
    desc: "Du hast die Wahl: Suche selbst nach passenden\nJobs oder Kandidaten – oder lass unsere KI für dich arbeiten.\nDer KI-Algorithmus schlägt dir rund um die Uhr\ndie besten Matches vor. Transparent erklärt. Ehrlich bewertet.",
    color: "hw",
  },
  {
    n: "03",
    title: "Speed Meeting – virtuell oder persönlich",
    desc: "Beide Seiten müssen Interesse zeigen.\nErst wenn es von beiden passt wird ein Speed Meeting\nfreigeschaltet – virtuell per Video-Call oder\npersönlich vor Ort. Schnell. Unkompliziert. Menschlich.",
    color: "it",
  },
  {
    n: "04",
    title: "Direkt einigen – Mensch zu Mensch",
    desc: "Vom ersten Speed Meeting bis zum\nunterschriebenen Vertrag – alles direkt.\nKein Vermittler. Keine Provision.\nNur zwei Menschen die zusammenpassen.",
    color: "hw",
  },
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
    note: "Kostenlos – für immer. Kein Haken. Weil jeder Mensch eine faire Chance verdient.",
    href: "/register",
  },
];

const heroStats = [
  { value: "0%",   label: "Keine Provision. Nie." },
  { value: "KI",   label: "Match in Echtzeit" },
  { value: "100%", label: "DSGVO-konform" },
  { value: "0 €",  label: "Für Bewerber – immer" },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">

      <Navbar />

      {/* ── HERO ── */}
      <section className="relative bg-black overflow-hidden" style={{ minHeight: "calc(100vh - 72px)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,107,26,0.18) 0%, transparent 70%)", transform: "translate(-30%, 40%)" }} />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(21,101,192,0.18) 0%, transparent 70%)", transform: "translate(30%, 40%)" }} />

        <div
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-16 py-20"
          style={{ minHeight: "calc(100vh - 72px)" }}
        >
          {/* Logo — no wrapper, no box, no background */}
          <div className="flex-1 flex items-center justify-center">
            <img
              src="/logo.png"
              alt="EyesOnMe Talent"
              className="hero-logo"
              style={{ width: "min(560px, 45vw)", height: "auto", mixBlendMode: "screen", background: "transparent", display: "block" }}
            />
          </div>

          {/* Text */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">

            <p
              className="animate-fade-up"
              style={{ fontSize: "clamp(5rem, 10vw, 9rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.9, background: "linear-gradient(135deg, #FF6B1A 0%, #1565C0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", display: "block", marginBottom: "0" }}
            >
              Menschen verbinden.
            </p>

            <h1
              className="animate-fade-up"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 600, color: "rgba(255,255,255,0.75)", letterSpacing: "-0.01em", marginTop: "20px", marginBottom: "2rem", display: "block", animationDelay: "0.08s" }}
            >
              Wir sehen wer du wirklich bist.
            </h1>

            <p
              className="animate-fade-up"
              style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.8, maxWidth: "480px", marginBottom: "2.5rem", animationDelay: "0.14s" }}
            >
              Jeder Mensch hat eine Geschichte.<br />
              Jeder Mensch hat eine Leidenschaft.<br />
              Wir bringen zusammen was wirklich zusammengehört.
            </p>

            {/* Apple pill CTAs */}
            <div
              className="flex flex-col sm:flex-row animate-fade-up"
              style={{ gap: "0.75rem", animationDelay: "0.2s" }}
            >
              <Link
                href="/register?role=company"
                className="text-center hover:opacity-85 transition-opacity"
                style={{ background: "white", color: "black", padding: "16px 36px", borderRadius: "980px", fontSize: "17px", fontWeight: 600, display: "inline-block" }}
              >
                Als Betrieb starten
              </Link>
              <Link
                href="/register"
                className="text-center hover:bg-white/15 transition-colors"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)", color: "white", padding: "16px 36px", borderRadius: "980px", fontSize: "17px", fontWeight: 600, display: "inline-block" }}
              >
                Kostenlos als Bewerber
              </Link>
            </div>

            {/* Stats row */}
            <div
              className="flex flex-wrap items-start animate-fade-up"
              style={{ gap: "2.5rem", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "44px", marginTop: "60px", width: "100%", animationDelay: "0.26s" }}
            >
              {heroStats.map((s, i) => (
                <div key={i} className="flex flex-col" style={{ gap: "0.2rem" }}>
                  <span style={{ fontSize: "2.2rem", fontWeight: 800, color: "white", lineHeight: 1 }}>{s.value}</span>
                  <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>{s.label}</span>
                </div>
              ))}
            </div>
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

            <Link href="/register?sector=it" className="group rounded-3xl bg-white border border-border border-t-4 border-t-brand-it p-10 flex flex-col card-hover">
              <div className="w-14 h-14 rounded-2xl bg-brand-it flex items-center justify-center mb-5 shadow-lg shadow-brand-it/30">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-brand-it tracking-widest uppercase mb-2">IT-Professionals</span>
              <h3 className="text-4xl font-black text-navy mb-5">Code<span className="text-brand-it">OnMe</span></h3>
              <p className="text-base text-muted leading-relaxed mb-6 flex-1">
                Du schreibst Code. Du löst Probleme.<br />
                Du willst in einem Team arbeiten das dich wirklich versteht.<br />
                Oder du suchst den Entwickler der dein Produkt zum Leben erweckt.<br />
                Bei CodeOnMe findest du beides.
              </p>
              <div className="flex items-center gap-2 text-sm font-bold text-brand-it mt-auto group-hover:gap-3 transition-all">
                Jetzt starten – kostenlos →
              </div>
            </Link>

            <Link href="/register?sector=hw" className="group rounded-3xl bg-white border border-border border-t-4 border-t-brand-hw p-10 flex flex-col card-hover">
              <div className="w-14 h-14 rounded-2xl bg-brand-hw flex items-center justify-center mb-5 shadow-lg shadow-brand-hw/30">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-brand-hw tracking-widest uppercase mb-2">Handwerk & Fachkräfte</span>
              <h3 className="text-4xl font-black text-navy mb-5">Hands<span className="text-brand-hw">OnMe</span></h3>
              <p className="text-base text-muted leading-relaxed mb-6 flex-1">
                Du schaffst mit deinen Händen etwas Bleibendes.<br />
                Dein Handwerk ist dein Stolz – und dein Betrieb deine Lebensaufgabe.<br />
                HandsOnMe bringt Fachkräfte und Betriebe direkt zusammen.<br />
                Ohne Umwege. Ohne Provision. Auf Augenhöhe.
              </p>
              <div className="flex items-center gap-2 text-sm font-bold text-brand-hw mt-auto group-hover:gap-3 transition-all">
                Jetzt starten – kostenlos →
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── USP ── */}
      <section className="py-24 px-4 bg-warm-gray">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-brand-it mb-3 block">Warum EyesOnMe Talent?</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-navy">
              Warum tausende Fachkräfte und Betriebe<br className="hidden sm:block" />
              EyesOnMe Talent vertrauen.
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
      <section className="py-28 px-4" style={{ background: "linear-gradient(160deg, #050A14 0%, #0D1B3E 100%)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="font-serif text-white mb-10 leading-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900 }}
          >
            Hinter jedem Job<br />steckt ein Mensch.
          </h2>
          <p
            className="mx-auto mb-10"
            style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.9, maxWidth: "680px" }}
          >
            Nicht eine Bewerbernummer. Nicht ein Lebenslauf.<br />
            Ein Mensch mit einer Geschichte, mit Träumen und mit Talent.<br />
            <br />
            Wir haben EyesOnMe Talent gegründet weil wir glauben<br />
            dass Recruiting menschlicher sein kann.<br />
            Direkter. Fairer. Echter.<br />
            <br />
            Du verdienst es gesehen zu werden – nicht nur gefunden.
          </p>
          <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>
            — Das Team von EyesOnMe Talent, Baden-Württemberg
          </p>
        </div>
      </section>

      {/* ── HUMAN CONNECTION IMAGE ── */}
      <section style={{ width: "100%", position: "relative", overflow: "hidden", height: "520px" }}>
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&h=520&fit=crop&crop=center"
          alt="Menschen verbinden"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(21,101,192,0.75) 0%, rgba(255,107,26,0.6) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 32px" }}>
          <h2 style={{ fontFamily: "DM Serif Display, serif", fontSize: "clamp(2rem,5vw,4rem)", color: "white", fontWeight: 400, marginBottom: 16, lineHeight: 1.1 }}>
            Wir bringen zusammen<br />was zusammengehört.
          </h2>
          <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.8)", maxWidth: 560, lineHeight: 1.7 }}>
            Direkt. Persönlich. Ohne Vermittler.<br />
            Weil hinter jedem Job ein Mensch steckt.
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-4 bg-warm-gray">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-brand-it mb-3 block">So einfach</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-navy">So einfach war Recruiting noch nie.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="bg-white rounded-3xl p-6 border border-border shadow-sm card-hover">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 text-2xl font-black ${
                  s.color === "it" ? "bg-brand-it-light text-brand-it border border-brand-it/20" : "bg-brand-hw-light text-brand-hw border border-brand-hw/20"
                }`}>
                  {s.n}
                </div>
                <h3 className="font-black text-navy text-base mb-2">{s.title}</h3>
                <p className="text-xs text-muted leading-relaxed whitespace-pre-line">{s.desc}</p>
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
            <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
              Kein Kleingedrucktes. Keine versteckten Kosten.<br />
              Kein Klickpreis. Keine Provision – nie.<br />
              Ein fairer Monatsbeitrag – und du hast Zugang zu allem.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pricing.map((p) => {
              if (p.featured) {
                return (
                  <div key={p.name} className="relative lg:scale-105 rounded-3xl p-[2px]" style={{ background: "linear-gradient(135deg, #FF6B1A 0%, #1565C0 100%)" }}>
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

      {/* ── TRUST STRIP ── */}
      <section className="py-16 px-4 border-t border-border bg-warm-gray">
        <div className="max-w-5xl mx-auto">
          <h3 className="font-serif text-2xl sm:text-3xl text-navy text-center mb-10">
            Deine Daten. Dein Vertrauen. Unser Versprechen.
          </h3>
          <div className="flex flex-wrap justify-center gap-10 text-center">
            {[
              { icon: "🔒", label: "DSGVO-konform",         sub: "Wir halten uns an jede Regel" },
              { icon: "🇩🇪", label: "Server in Deutschland", sub: "Deine Daten bleiben in Deutschland" },
              { icon: "🚫", label: "Kein Tracking",          sub: "Keine Datenweitergabe an Dritte" },
              { icon: "💚", label: "Bewerber kostenlos",     sub: "Für immer. Versprochen." },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1.5">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-sm font-bold text-navy">{item.label}</span>
                <span className="text-xs text-muted">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-black py-16 px-4">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
          <Image
            src="/logo.png"
            width={80}
            height={80}
            alt="EyesOnMe Talent"
            className="logo-image"
            style={{ mixBlendMode: "screen", background: "transparent", border: "none", borderRadius: "12px" }}
          />
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
