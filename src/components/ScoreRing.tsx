"use client";

interface ScoreRingProps {
  score: number; // 0–100
  sector: "it" | "hw";
  size?: number;
  label?: string;
  live?: boolean;
}

const ringColor: Record<string, string> = {
  it: "#1565C0",
  hw: "#FF6B1A",
};

const trackColor: Record<string, string> = {
  it: "#E3F0FF",
  hw: "#ffedd5",
};

export default function ScoreRing({ score, sector, size = 80, label, live = false }: ScoreRingProps) {
  const radius = 38;
  const stroke = 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative">
        <svg width={size} height={size} viewBox="0 0 100 100" className="-rotate-90">
          <circle cx="50" cy="50" r={radius} fill="none" stroke={trackColor[sector]} strokeWidth={stroke} />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={ringColor[sector]}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-black text-navy" style={{ fontSize: size < 60 ? "10px" : "13px" }}>
            {score}%
          </span>
        </div>
      </div>
      {label && (
        <div className="flex items-center gap-1">
          {live && <span className="w-1.5 h-1.5 rounded-full live-dot" style={{ backgroundColor: ringColor[sector] }} />}
          <span className="text-xs text-muted font-medium">{label}</span>
        </div>
      )}
    </div>
  );
}
