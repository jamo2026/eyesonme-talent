"use client";

import AppLayout from "@/components/AppLayout";

const MOCK_EVENTS = [
  { id: 1, time: "09:00", title: "Speed Meeting – TechVision GmbH", type: "meeting", color: "#1565C0" },
  { id: 2, time: "11:30", title: "Video Call – Lisa Maier", type: "video", color: "#FF6B1A" },
  { id: 3, time: "14:00", title: "Vorstellungsgespräch – AppSoft GmbH", type: "interview", color: "#16A34A" },
  { id: 4, time: "16:30", title: "Nachfolgetermin vereinbaren", type: "todo", color: "#9CA3AF" },
];

const DAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const today = new Date();
const dayOfWeek = today.getDay();
const monday = new Date(today);
monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));

export default function KalenderPage() {
  const weekDays = DAYS.map((d, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return { label: d, date: date.getDate(), isToday: date.toDateString() === today.toDateString() };
  });

  return (
    <AppLayout>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 16px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: "#0D1B2A" }}>📅 Kalender</h1>
            <p style={{ fontSize: 14, color: "#6B7280", marginTop: 4 }}>Deine Termine und Meetings diese Woche</p>
          </div>
          <button style={{ fontSize: 14, fontWeight: 700, background: "#1565C0", color: "white", padding: "12px 24px", borderRadius: 12, border: "none", cursor: "pointer" }}>
            + Termin hinzufügen
          </button>
        </div>

        {/* Week strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8, marginBottom: 32 }}>
          {weekDays.map(d => (
            <div key={d.label} style={{ textAlign: "center", padding: "12px 8px", borderRadius: 14, background: d.isToday ? "#1565C0" : "white", border: d.isToday ? "none" : "1px solid #E8E8E8", cursor: "pointer" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: d.isToday ? "rgba(255,255,255,0.7)" : "#6B7280", marginBottom: 4 }}>{d.label}</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: d.isToday ? "white" : "#0D1B2A" }}>{d.date}</div>
            </div>
          ))}
        </div>

        {/* Today's events */}
        <h2 style={{ fontSize: 18, fontWeight: 900, color: "#0D1B2A", marginBottom: 16 }}>Heute</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
          {MOCK_EVENTS.map(ev => (
            <div key={ev.id} style={{ background: "white", borderRadius: 16, border: "1px solid #E8E8E8", padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 4, height: 48, borderRadius: 99, background: ev.color, flexShrink: 0 }} />
              <div style={{ fontSize: 14, fontWeight: 700, color: "#6B7280", width: 48, flexShrink: 0 }}>{ev.time}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0D1B2A" }}>{ev.title}</div>
                <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2, textTransform: "capitalize" }}>{ev.type}</div>
              </div>
              <button style={{ fontSize: 13, fontWeight: 600, color: ev.color, border: `1px solid ${ev.color}40`, padding: "6px 14px", borderRadius: 8, background: "transparent", cursor: "pointer" }}>
                Öffnen
              </button>
            </div>
          ))}
        </div>

        {/* Upcoming */}
        <h2 style={{ fontSize: 18, fontWeight: 900, color: "#0D1B2A", marginBottom: 16 }}>Nächste Termine</h2>
        <div style={{ background: "white", borderRadius: 16, border: "1px solid #E8E8E8", padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>📆</div>
          <p style={{ fontSize: 15, fontWeight: 700, color: "#0D1B2A" }}>Keine weiteren Termine diese Woche</p>
          <p style={{ fontSize: 13, color: "#6B7280", marginTop: 6 }}>Matches schreiben dir direkt – vereinbare dann hier deinen Termin.</p>
        </div>
      </div>
    </AppLayout>
  );
}
