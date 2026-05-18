"use client";

import { useState } from "react";

type Sector = "it" | "hw";

interface VideoPlayerProps {
  name: string;
  duration: string;
  sector: Sector;
  isOwn?: boolean;
}

const WAVE_DELAYS = [0, 0.1, 0.2, 0.05, 0.3, 0.15, 0.25, 0.08, 0.35, 0.12, 0.22, 0.18, 0.28, 0.04];

export default function VideoPlayer({ name, duration, sector, isOwn = false }: VideoPlayerProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const isIT = sector === "it";

  const openModal = () => {
    setModalOpen(true);
    setPlaying(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setPlaying(false);
  };

  return (
    <>
      {/* Preview thumbnail */}
      <div className="bg-navy rounded-2xl overflow-hidden">
        <div
          className="relative aspect-video flex items-center justify-center bg-gradient-to-br from-navy-light to-navy cursor-pointer group"
          onClick={openModal}
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-20 select-none">
            <span className="text-white font-black" style={{ fontSize: "8rem" }}>{name.charAt(0)}</span>
          </div>
          <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-all ${isIT ? "bg-brand-it" : "bg-brand-hw"}`}>
            <span className="text-white text-xl" style={{ marginLeft: "3px" }}>▶</span>
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="text-white/60 text-xs font-medium truncate">{name} – Meine Vorstellung</span>
            <span className="text-white/60 text-xs font-mono ml-2 flex-shrink-0">{duration}</span>
          </div>
        </div>
        <div className={`h-1 ${isIT ? "bg-brand-it/20" : "bg-brand-hw/20"}`} />
      </div>

      {isOwn && (
        <label className={`mt-3 flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed cursor-pointer transition-all text-sm font-bold ${isIT ? "border-brand-it/30 text-brand-it hover:border-brand-it/60 hover:bg-brand-it-light" : "border-brand-hw/30 text-brand-hw hover:border-brand-hw/60 hover:bg-brand-hw-light"}`}>
          <input type="file" accept="video/*" className="hidden" />
          📹 Video Pitch hochladen
        </label>
      )}

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div className="relative w-full max-w-2xl mx-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 text-white/60 hover:text-white text-3xl font-light transition-colors"
            >
              ×
            </button>

            <div className="bg-navy rounded-3xl overflow-hidden shadow-2xl">
              {/* Video area */}
              <div className="relative aspect-video flex items-center justify-center bg-gradient-to-br from-navy-light to-navy">
                <div className="absolute inset-0 flex items-center justify-center opacity-10 select-none">
                  <span className="text-white font-black" style={{ fontSize: "14rem" }}>{name.charAt(0)}</span>
                </div>

                {playing ? (
                  <>
                    {/* Wave animation */}
                    <div className="relative z-10 flex items-end justify-center gap-1.5 h-20">
                      {WAVE_DELAYS.map((delay, i) => (
                        <div
                          key={i}
                          className={`w-2 rounded-full ${isIT ? "bg-brand-it" : "bg-brand-hw"}`}
                          style={{
                            height: "64px",
                            transformOrigin: "bottom center",
                            animation: `wave-bar 0.7s ease-in-out ${delay}s infinite`,
                          }}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => setPlaying(false)}
                      className="absolute bottom-4 right-4 bg-black/60 text-white text-xs font-mono px-3 py-1.5 rounded-xl flex items-center gap-1.5"
                    >
                      ⏸ {duration}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setPlaying(true)}
                    className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all ${isIT ? "bg-brand-it" : "bg-brand-hw"}`}
                  >
                    <span className="text-white text-2xl" style={{ marginLeft: "4px" }}>▶</span>
                  </button>
                )}
              </div>

              {/* Bottom bar */}
              <div className="px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-black text-sm">{name}</p>
                  <p className="text-white/40 text-xs mt-0.5">Video Pitch · {duration}</p>
                </div>
                <button
                  onClick={() => setPlaying(!playing)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95 ${isIT ? "bg-brand-it" : "bg-brand-hw"}`}
                >
                  <span className="text-white text-sm" style={{ marginLeft: playing ? 0 : "2px" }}>
                    {playing ? "⏸" : "▶"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
