"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ScoreRing from "@/components/ScoreRing";

type Message = {
  id: number;
  from: "me" | "them";
  text: string;
  time: string;
};

const mockContacts = [
  { id: 1, name: "TechVision GmbH", role: "Recruiter · Stuttgart", unread: 2, last: "Vielen Dank für Ihre Bewerbung…", avatar: "T", score: 94 },
  { id: 2, name: "Lukas Berger", role: "React Developer", unread: 0, last: "Ich freue mich auf das Gespräch!", avatar: "L", score: 87 },
  { id: 3, name: "DataBridge AG", role: "HR Team · Karlsruhe", unread: 1, last: "Wäre Donnerstag möglich?", avatar: "D", score: 81 },
  { id: 4, name: "Maria Schmidt", role: "Data Scientist", unread: 0, last: "Danke für die schnelle Rückmeldung", avatar: "M", score: 76 },
];

const initialMessages: Message[] = [
  { id: 1, from: "them", text: "Hallo! Vielen Dank für Ihr Interesse an der Stelle als Senior React Developer.", time: "09:14" },
  { id: 2, from: "them", text: "Ihr Profil passt sehr gut zu unseren Anforderungen. Hätten Sie Zeit für ein erstes Gespräch?", time: "09:15" },
  { id: 3, from: "me", text: "Guten Morgen! Ja, sehr gerne. Ich bin diese Woche flexibel.", time: "09:42" },
  { id: 4, from: "them", text: "Perfekt! Wie wäre es mit Mittwoch um 14 Uhr per Video-Call?", time: "09:45" },
  { id: 5, from: "me", text: "Mittwoch 14 Uhr passt mir sehr gut. Ich freue mich auf das Gespräch!", time: "09:47" },
];

export default function ChatPage() {
  const [sector] = useState<"it" | "hw">("it");
  const [activeContact, setActiveContact] = useState(mockContacts[0]);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [inCall, setInCall] = useState(false);
  const [callMuted, setCallMuted] = useState(false);
  const [callCamOff, setCallCamOff] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    setMessages((prev) => [...prev, { id: Date.now(), from: "me", text: input.trim(), time }]);
    setInput("");
  };

  const accent = sector === "it" ? "bg-brand-it" : "bg-brand-hw";

  return (
    <div className="min-h-screen bg-warm-gray flex flex-col">
      <Navbar sector={sector} />

      {/* In-call overlay */}
      {inCall && (
        <div className="fixed inset-0 z-50 bg-navy flex flex-col">
          {/* Remote video */}
          <div className="flex-1 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-it/10 to-brand-hw/5" />

            {/* Remote participant */}
            <div className="relative z-10 text-center">
              <div className="w-32 h-32 rounded-full bg-brand-it mx-auto flex items-center justify-center text-white font-black text-5xl mb-4 shadow-2xl shadow-brand-it/40">
                {activeContact.avatar}
              </div>
              <p className="text-white font-black text-xl">{activeContact.name}</p>
              <p className="text-white/50 text-sm mt-1">{activeContact.role}</p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <span className="w-2 h-2 rounded-full bg-green-400 live-dot" />
                <span className="text-green-400 text-sm font-semibold">Verbunden · 02:47</span>
              </div>
            </div>

            {/* Self cam (PiP) */}
            <div className="absolute bottom-6 right-6 w-36 h-24 bg-navy-light rounded-2xl border-2 border-white/10 overflow-hidden flex items-center justify-center shadow-2xl">
              {callCamOff ? (
                <div className="w-12 h-12 rounded-full bg-brand-it/20 flex items-center justify-center">
                  <span className="text-white/40 text-2xl font-black">L</span>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-brand-it mx-auto flex items-center justify-center text-white font-black text-base mb-1">L</div>
                  <p className="text-white/60 text-xs">Du</p>
                </div>
              )}
            </div>

            {/* KI score badge */}
            <div className="absolute top-6 left-6 bg-white/10 backdrop-blur border border-white/10 rounded-2xl px-4 py-3">
              <p className="text-white/60 text-xs mb-1">KI-Match-Score</p>
              <div className="flex items-center gap-2">
                <ScoreRing score={94} sector={sector} size={40} />
                <span className="text-white font-black text-lg">94%</span>
              </div>
            </div>
          </div>

          {/* Call controls */}
          <div className="px-6 py-6 flex items-center justify-center gap-4">
            <button
              onClick={() => setCallMuted(!callMuted)}
              className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all ${callMuted ? "bg-red-500/20 border-2 border-red-500/40" : "bg-white/10 hover:bg-white/20 border border-white/10"}`}
              title="Mikrofon"
            >
              {callMuted ? "🔇" : "🎤"}
            </button>
            <button
              onClick={() => setInCall(false)}
              className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-2xl hover:bg-red-600 transition-all shadow-lg shadow-red-500/40"
              title="Auflegen"
            >
              📵
            </button>
            <button
              onClick={() => setCallCamOff(!callCamOff)}
              className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all ${callCamOff ? "bg-red-500/20 border-2 border-red-500/40" : "bg-white/10 hover:bg-white/20 border border-white/10"}`}
              title="Kamera"
            >
              {callCamOff ? "📵" : "📹"}
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-black text-navy mb-5">Nachrichten</h1>

        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden" style={{ height: "calc(100vh - 210px)" }}>
          <div className="flex h-full">

            {/* Contact list */}
            <aside className="w-72 border-r border-border flex-col hidden sm:flex flex-shrink-0">
              <div className="p-3 border-b border-border">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Konversationen suchen…"
                    className="w-full bg-warm-gray rounded-xl pl-8 pr-4 py-2 text-sm outline-none border border-border focus:border-brand-it transition-all placeholder:text-muted"
                  />
                  <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {mockContacts.map((contact) => {
                  const isActive = activeContact.id === contact.id;
                  return (
                    <button
                      key={contact.id}
                      onClick={() => setActiveContact(contact)}
                      className={`w-full text-left px-4 py-3.5 flex items-center gap-3 hover:bg-warm-gray transition-all border-b border-border ${isActive ? "bg-brand-it/5 border-l-4 border-l-brand-it" : "border-l-4 border-l-transparent"}`}
                    >
                      <div className={`w-10 h-10 rounded-full ${accent} text-white font-bold flex items-center justify-center flex-shrink-0 text-sm`}>
                        {contact.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-sm font-bold text-navy truncate">{contact.name}</span>
                          {contact.unread > 0 && (
                            <span className={`ml-1.5 min-w-[20px] h-5 ${accent} text-white text-xs rounded-full flex items-center justify-center flex-shrink-0 font-bold px-1`}>
                              {contact.unread}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted truncate">{contact.last}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Chat area */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Chat header */}
              <div className="px-5 py-3.5 border-b border-border flex items-center gap-3 bg-white">
                <div className={`w-10 h-10 rounded-full ${accent} text-white font-bold flex items-center justify-center text-sm flex-shrink-0`}>
                  {activeContact.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-navy text-sm">{activeContact.name}</p>
                  <p className="text-xs text-muted">{activeContact.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  {/* KI score mini */}
                  <div className="hidden sm:flex items-center gap-2 bg-warm-gray border border-border rounded-xl px-3 py-1.5">
                    <ScoreRing score={activeContact.score} sector={sector} size={28} />
                    <span className="text-xs font-bold text-navy">{activeContact.score}% Match</span>
                  </div>
                  {/* Video call button */}
                  <button
                    onClick={() => setInCall(true)}
                    className={`flex items-center gap-1.5 px-3 py-2 ${accent} text-white text-xs font-bold rounded-xl hover:opacity-90 transition-all shadow-sm`}
                    title="Video-Call starten"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Video-Call
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3 bg-warm-gray/30">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[76%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
                      msg.from === "me"
                        ? `${accent} text-white rounded-br-sm`
                        : "bg-white text-navy rounded-bl-sm border border-border"
                    }`}>
                      <p className="leading-relaxed">{msg.text}</p>
                      <p className={`text-xs mt-1.5 ${msg.from === "me" ? "text-white/60" : "text-muted"}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input bar */}
              <div className="px-4 py-3.5 border-t border-border bg-white">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setInCall(true)}
                    className="p-2.5 rounded-xl bg-warm-gray border border-border text-muted hover:text-brand-it hover:border-brand-it transition-all"
                    title="Video-Call"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                    placeholder="Nachricht schreiben… (Enter zum Senden)"
                    className="flex-1 bg-warm-gray rounded-xl px-4 py-2.5 text-sm outline-none border border-border focus:border-brand-it transition-all placeholder:text-muted"
                  />
                  <button
                    onClick={send}
                    disabled={!input.trim()}
                    className={`p-2.5 rounded-xl ${accent} text-white hover:opacity-90 disabled:opacity-40 transition-all`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
