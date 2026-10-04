"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [time, setTime] = useState("");
  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
    const i = setInterval(() => setTime(new Date().toLocaleTimeString()), 30000);
    return () => clearInterval(i);
  }, []);

  const leagues = [
    { name: "Premier League", country: "England", live: 3, logo: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    { name: "La Liga", country: "Spain", live: 2, logo: "🇪🇸" },
    { name: "Bundesliga", country: "Germany", live: 1, logo: "🇩🇪" },
    { name: "Serie A", country: "Italy", live: 2, logo: "🇮🇹" },
    { name: "Ligue 1", country: "France", live: 1, logo: "🇫🇷" },
  ];

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "white", padding: 20, fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#00ff88" }}>⚽ FootballLive</h1>
      <p style={{ textAlign: "center", fontSize: 12, opacity: 0.5 }}>Vercel Fast ⚡ | Last update: {time} | Auto-refresh 30s</p>

      {leagues.map((l, idx) => (
        <div key={idx} style={{ background: "#171717", border: "1px solid #222", borderRadius: 12, padding: 15, marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: "bold" }}>{l.logo} {l.name}</div>
            <div style={{ fontSize: 11, opacity: 0.5 }}>{l.country}</div>
          </div>
          <div style={{ background: "#00ff88", color: "black", fontSize: 12, fontWeight: "bold", padding: "4px 8px", borderRadius: 6 }}>
            {l.live} LIVE
          </div>
        </div>
      ))}

      <div style={{ textAlign: "center", marginTop: 30, fontSize: 11, opacity: 0.3 }}>
        Ready for ANWP features • Fast Small • No more Error
      </div>
    </div>
  );
}
