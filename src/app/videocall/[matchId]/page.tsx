"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Sector = "it" | "hw";

interface MatchProfile {
  id: number;
  name: string;
  role: string;
  sector: Sector;
  score: number;
}

const MATCH_PROFILES: Record<number, MatchProfile> = {
  1: { id: 1, name: "Thomas Berger", role: "Elektriker", sector: "hw", score: 94 },
  2: { id: 2, name: "Lisa Maier", role: "React Developer", sector: "it", score: 87 },
  3: { id: 3, name: "Marco Schulz", role: "Schreiner", sector: "hw", score: 81 },
  4: { id: 4, name: "Sarah Klein", role: "DevOps Engineer", sector: "it", score: 76 },
  5: { id: 5, name: "Jan Fischer", role: "Dachdecker", sector: "hw", score: 72 },
};

interface ChatMsg {
  id: number;
  from: "me" | "them";
  text: string;
}

function formatElapsed(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function formatNow() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

export default function VideoCallPage() {
  const params = useParams();
  const router = useRouter();
  const matchId = Number(params.matchId);
  const partner = MATCH_PROFILES[matchId];

  const [elapsed, setElapsed] = useState(0);
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [screenSharing, setScreenSharing] = useState(false);
  const [terminOpen, setTerminOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([
    { id: 1, from: "them", text: "Hallo! Freut mich, Sie zu sehen." },
  ]);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push("/login");
    });
  }, [router]);

  useEffect(() => {
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const sendChat = () => {
    const text = chatInput.trim();
    if (!text) return;
    setChatMessages((prev) => [...prev, { id: Date.now(), from: "me", text }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages((prev) => [...prev, { id: Date.now() + 1, from: "them", text: "👍" }]);
    }, 1500);
  };

  if (!partner) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-xl font-black mb-2">Anruf nicht gefunden</p>
          <Link href="/match" className="text-brand-it text-sm font-bold hover:underline">← Zurück</Link>
        </div>
      </div>
    );
  }

  const isIT = partner.sector === "it";

  return (
    <div className="min-h-screen bg-black flex flex-col select-none" style={{ userSelect: "none" }}>

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 right-0 z-30">
        <Link href={`/chat/${matchId}`} className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-semibold transition-colors">
          ← Chat
        </Link>
        <div className="text-center">
          <p className="text-white font-black text-sm">{partner.name}</p>
          <p className="text-white/50 text-xs">{partner.role}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 live-dot" />
          <span className="text-white font-mono text-sm font-bold">{formatElapsed(elapsed)}</span>
        </div>
      </div>

      {/* Main video area */}
      <div className="flex-1 flex relative overflow-hidden">

        {/* Self video */}
        <div className="flex-1 bg-gradient-to-br from-black to-navy flex items-center justify-center relative border-r border-white/10">
          {cameraOff ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-2xl bg-white/10 text-white font-black text-3xl flex items-center justify-center">Du</div>
              <p className="text-white/40 text-sm">Kamera aus</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur text-white font-black text-3xl flex items-center justify-center border-2 border-white/30 shadow-lg">
                Ich
              </div>
              <p className="text-white/60 text-sm font-medium">Sie (Vorschau)</p>
            </div>
          )}
          {screenSharing && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-brand-it/90 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
              🖥️ Bildschirm wird geteilt
            </div>
          )}
          <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-lg">Sie</span>
        </div>

        {/* Remote video */}
        <div className="flex-1 bg-gradient-to-br from-navy to-black flex items-center justify-center relative">
          <div className="flex flex-col items-center gap-4">
            <div className={`w-28 h-28 rounded-3xl font-black text-5xl flex items-center justify-center text-white shadow-2xl ${isIT ? "bg-brand-it" : "bg-brand-hw"}`}>
              {partner.name.charAt(0)}
            </div>
            <p className="text-white/50 text-sm font-medium">{partner.name}</p>
          </div>
          <div className="absolute top-16 right-4 bg-black/40 backdrop-blur rounded-xl px-3 py-2 flex items-center gap-2">
            <span className="text-white/60 text-xs">Match</span>
            <span className={`font-black text-sm ${isIT ? "text-brand-it" : "text-brand-hw"}`}>{partner.score}%</span>
          </div>
          <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-lg">{partner.name}</span>
        </div>

        {/* Chat sidebar */}
        {chatOpen && (
          <div className="w-72 flex flex-col bg-black/95 border-l border-white/10">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <span className="text-white font-bold text-sm">Chat</span>
              <button onClick={() => setChatOpen(false)} className="text-white/40 hover:text-white transition-colors text-lg leading-none">
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                  <span className={`px-3 py-1.5 rounded-xl text-sm max-w-[80%] ${
                    msg.from === "me"
                      ? isIT ? "bg-brand-it text-white" : "bg-brand-hw text-white"
                      : "bg-white/10 text-white"
                  }`}>
                    {msg.text}
                  </span>
                </div>
              ))}
              <div ref={chatBottomRef} />
            </div>
            <div className="px-3 py-3 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); sendChat(); } }}
                placeholder="Nachricht…"
                className="flex-1 bg-white/10 border border-white/15 rounded-xl px-3 py-2 text-white placeholder-white/30 text-sm outline-none focus:border-white/30 transition-colors"
              />
              <button
                onClick={sendChat}
                disabled={!chatInput.trim()}
                className={`px-3 py-2 rounded-xl font-bold text-sm text-white transition-all disabled:opacity-30 ${isIT ? "bg-brand-it" : "bg-brand-hw"}`}
              >
                ↑
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Controls bar */}
      <div className="flex items-center justify-center gap-5 py-6 px-4 bg-gradient-to-t from-black to-transparent">
        {/* Mute */}
        <button
          onClick={() => setMuted(!muted)}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all active:scale-90 ${muted ? "bg-red-500 text-white" : "bg-white/15 text-white hover:bg-white/25"}`}
          title={muted ? "Stummschaltung aufheben" : "Stummschalten"}
        >
          {muted ? "🔇" : "🎤"}
        </button>

        {/* Camera */}
        <button
          onClick={() => setCameraOff(!cameraOff)}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all active:scale-90 ${cameraOff ? "bg-red-500 text-white" : "bg-white/15 text-white hover:bg-white/25"}`}
          title={cameraOff ? "Kamera einschalten" : "Kamera ausschalten"}
        >
          {cameraOff ? "🚫" : "📹"}
        </button>

        {/* End call */}
        <Link
          href={`/chat/${matchId}`}
          className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-2xl transition-all active:scale-90 shadow-lg"
          title="Anruf beenden"
        >
          📵
        </Link>

        {/* Chat toggle */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all active:scale-90 ${chatOpen ? isIT ? "bg-brand-it text-white" : "bg-brand-hw text-white" : "bg-white/15 text-white hover:bg-white/25"}`}
          title="Chat anzeigen"
        >
          💬
        </button>

        {/* Share screen */}
        <button
          onClick={() => setScreenSharing(!screenSharing)}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all active:scale-90 ${screenSharing ? isIT ? "bg-brand-it text-white" : "bg-brand-hw text-white" : "bg-white/15 text-white hover:bg-white/25"}`}
          title="Bildschirm teilen"
        >
          🖥️
        </button>

        {/* Termin */}
        <button
          onClick={() => setTerminOpen(true)}
          className="w-14 h-14 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-xl transition-all active:scale-90"
          title="Termin vereinbaren"
        >
          📅
        </button>

        {/* Profile link */}
        <Link
          href={`/profile/${matchId}`}
          className="w-14 h-14 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-xl transition-all active:scale-90"
          title="Profil ansehen"
        >
          👤
        </Link>
      </div>

      {/* Termin modal */}
      {terminOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={() => setTerminOpen(false)}>
          <div
            className="w-full max-w-md bg-black/95 border border-white/20 rounded-t-3xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-black">📅 Termin vereinbaren</h3>
              <button onClick={() => setTerminOpen(false)} className="text-white/40 hover:text-white text-2xl font-light transition-colors">×</button>
            </div>
            <p className="text-white/50 text-sm mb-4">Termin mit {partner.name} vorschlagen:</p>
            <div className="flex flex-col gap-2">
              {["Morgen, 10:00 Uhr", "Morgen, 14:00 Uhr", "Übermorgen, 09:00 Uhr", "Übermorgen, 15:00 Uhr"].map((slot) => (
                <button
                  key={slot}
                  onClick={() => setTerminOpen(false)}
                  className={`py-3 rounded-xl font-bold text-sm transition-all ${isIT ? "bg-brand-it/20 border border-brand-it/40 text-brand-it hover:bg-brand-it hover:text-white" : "bg-brand-hw/20 border border-brand-hw/40 text-brand-hw hover:bg-brand-hw hover:text-white"}`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
