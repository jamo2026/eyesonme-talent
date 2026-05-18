"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ScoreRing from "@/components/ScoreRing";

type Sector = "it" | "hw";

interface MatchProfile {
  id: number;
  name: string;
  role: string;
  sector: Sector;
  score: number;
  city: string;
}

const MATCH_PROFILES: Record<number, MatchProfile> = {
  1: { id: 1, name: "Thomas Berger", role: "Elektriker", sector: "hw", score: 94, city: "Stuttgart" },
  2: { id: 2, name: "Lisa Maier", role: "React Developer", sector: "it", score: 87, city: "Karlsruhe" },
  3: { id: 3, name: "Marco Schulz", role: "Schreiner", sector: "hw", score: 81, city: "Freiburg" },
  4: { id: 4, name: "Sarah Klein", role: "DevOps Engineer", sector: "it", score: 76, city: "Stuttgart" },
  5: { id: 5, name: "Jan Fischer", role: "Dachdecker", sector: "hw", score: 72, city: "Heidelberg" },
};

interface Message {
  id: number;
  from: "me" | "them";
  text: string;
  time: string;
}

const MOCK_CONVERSATIONS: Record<number, Message[]> = {
  1: [
    { id: 1, from: "them", text: "Guten Tag! Ich freue mich sehr über das Match.", time: "09:15" },
    { id: 2, from: "me", text: "Hallo Thomas! Wir sind auch begeistert von Ihrem Profil.", time: "09:22" },
    { id: 3, from: "them", text: "Wann wäre ein erstes Gespräch möglich?", time: "09:25" },
    { id: 4, from: "me", text: "Wie wäre nächste Woche Dienstag um 10 Uhr?", time: "09:31" },
    { id: 5, from: "them", text: "Das passt hervorragend! Bis dann. 👍", time: "09:33" },
  ],
  2: [
    { id: 1, from: "me", text: "Hallo Lisa! Ihr Profil hat uns sehr beeindruckt.", time: "14:05" },
    { id: 2, from: "them", text: "Vielen Dank! Die Position klingt sehr spannend.", time: "14:18" },
    { id: 3, from: "me", text: "Hätten Sie Zeit für ein kurzes Kennenlernen diese Woche?", time: "14:20" },
    { id: 4, from: "them", text: "Gerne! Am Donnerstag wäre ich verfügbar.", time: "14:35" },
  ],
  3: [
    { id: 1, from: "them", text: "Guten Tag, ich habe Ihr Stellenangebot gesehen.", time: "11:00" },
    { id: 2, from: "me", text: "Hallo Marco! Schön von Ihnen zu hören.", time: "11:14" },
    { id: 3, from: "them", text: "Welche Projekte stehen bei Ihnen aktuell an?", time: "11:17" },
    { id: 4, from: "me", text: "Wir haben gerade einen größeren Innenausbau in Freiburg.", time: "11:29" },
  ],
  4: [
    { id: 1, from: "them", text: "Hi! Freue mich über das Match.", time: "16:40" },
    { id: 2, from: "me", text: "Hallo Sarah! Ihre DevOps-Erfahrung passt perfekt.", time: "16:52" },
  ],
  5: [
    { id: 1, from: "me", text: "Guten Tag Jan! Herzlich willkommen bei EyesOnMe.", time: "08:05" },
    { id: 2, from: "them", text: "Danke! Freue mich auf das Gespräch.", time: "08:18" },
  ],
};

function formatNow() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const matchId = Number(params.matchId);
  const partner = MATCH_PROFILES[matchId];

  const initialMessages = MOCK_CONVERSATIONS[matchId] ?? [];
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [showTermin, setShowTermin] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push("/login");
    });
  }, [router]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { id: Date.now(), from: "me", text, time: formatNow() }]);
    setInput("");

    // Simulate reply after delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: "them", text: "Vielen Dank für Ihre Nachricht! Ich melde mich kurz.", time: formatNow() },
      ]);
    }, 1800);
  };

  if (!partner) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-xl font-black mb-2">Chat nicht gefunden</p>
          <Link href="/match" className="text-brand-it text-sm font-bold hover:underline">← Zurück zu Matches</Link>
        </div>
      </div>
    );
  }

  const isIT = partner.sector === "it";

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="bg-black border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/match" className="text-white/50 hover:text-white transition-colors p-1.5 rounded-xl hover:bg-white/10">
            ←
          </Link>

          <div className="w-10 h-10 rounded-xl font-black text-base flex items-center justify-center text-white flex-shrink-0"
            style={{ background: isIT ? "#1565C0" : "#FF6B1A" }}>
            {partner.name.charAt(0)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-black text-white text-sm">{partner.name}</span>
              <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-0.5 rounded-full">
                ✓ Matched
              </span>
            </div>
            <p className="text-xs text-white/40 truncate">{partner.role} · 📍 {partner.city}</p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <ScoreRing score={partner.score} sector={partner.sector} size={44} label="Match" />
            <Link
              href={`/videocall/${matchId}`}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white"
              title="Video Call starten"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Action strip */}
        <div className="max-w-2xl mx-auto px-4 pb-2 flex gap-2">
          <Link
            href={`/videocall/${matchId}`}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white transition-all ${isIT ? "bg-brand-it/20 hover:bg-brand-it/30" : "bg-brand-hw/20 hover:bg-brand-hw/30"}`}
          >
            📹 Video Call starten
          </Link>
          <button
            onClick={() => setShowTermin(!showTermin)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white/70 bg-white/10 hover:bg-white/15 transition-all"
          >
            📅 Termin vorschlagen
          </button>
        </div>

        {/* Termin panel */}
        {showTermin && (
          <div className="max-w-2xl mx-auto px-4 pb-3">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <p className="text-white font-bold text-sm mb-3">📅 Termin vorschlagen</p>
              <div className="grid grid-cols-3 gap-2">
                {["Di. 26.05. · 10:00", "Mi. 27.05. · 14:00", "Do. 28.05. · 11:00"].map((slot) => (
                  <button
                    key={slot}
                    onClick={() => {
                      setMessages((prev) => [
                        ...prev,
                        { id: Date.now(), from: "me", text: `📅 Terminvorschlag: ${slot}`, time: formatNow() },
                      ]);
                      setShowTermin(false);
                    }}
                    className="py-2 px-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all text-center"
                  >
                    {slot}
                  </button>
                ))}
              </div>
              <button onClick={() => setShowTermin(false)} className="mt-2 text-xs text-white/40 hover:text-white/60 transition-colors">
                Abbrechen
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto max-w-2xl mx-auto w-full px-4 py-4 flex flex-col gap-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
              msg.from === "me"
                ? isIT ? "bg-brand-it text-white rounded-br-md" : "bg-brand-hw text-white rounded-br-md"
                : "bg-white/10 text-white rounded-bl-md"
            }`}>
              <p>{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.from === "me" ? "text-white/60" : "text-white/40"}`}>{msg.time}</p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 border-t border-white/10 bg-black px-4 py-3">
        <div className="max-w-2xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Nachricht schreiben…"
            className="flex-1 bg-white/10 border border-white/15 rounded-2xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none focus:border-white/30 transition-colors"
          />
          <button
            onClick={send}
            disabled={!input.trim()}
            className={`px-4 py-3 rounded-2xl font-bold text-sm text-white transition-all disabled:opacity-30 ${isIT ? "bg-brand-it hover:opacity-90" : "bg-brand-hw hover:opacity-90"}`}
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}
