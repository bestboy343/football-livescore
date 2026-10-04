"use client";
import { useState, useEffect } from "react";

type Match = any;

export default function Page() {
  const [time, setTime] = useState("");
  const [open, setOpen] = useState<string | null>("Premier League");
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
    const i = setInterval(() => setTime(new Date().toLocaleTimeString()), 30000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const r = await fetch('/api/live', { cache: 'no-store' });
        const d = await r.json();
        if (Array.isArray(d) && d.length > 0) {
          setMatches(d);
        } else if (Array.isArray(d) && d.length === 0) {
          setMatches([]);
        }
      } catch {}
      setLoading(false);
    };
    load();
    const int = setInterval(load, 30000);
    return () => clearInterval(int);
  }, []);

  const leagues = [
    { name: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    { name: "La Liga", flag: "🇪🇸" },
    { name: "Bundesliga", flag: "🇩🇪" },
    { name: "Serie A", flag: "🇮🇹" },
    { name: "Ligue 1", flag: "🇫🇷" },
  ];

  // Group matches by league
  const grouped: any = {};
  matches.forEach((m: any) => {
    if (!grouped[m.league]) grouped[m.league] = [];
    grouped[m.league].push(m);
  });

  // Demo fallback if API empty
  const demo = [
    { league: "Premier League", home: "Man City", away: "Arsenal", score: "2 - 1", minute: "78'", homeLogo:"", awayLogo:"", events:["23' Haaland"] },
    { league: "Premier League", home: "Chelsea", away: "Liverpool", score: "1 - 1", minute: "HT", homeLogo:"", awayLogo:"", events:[] },
  ];
  const displayData = matches.length > 0 ? grouped : { "Premier League": demo };

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "white", padding: 12, fontFamily: "system-ui" }}>
      <h1 style={{ textAlign: "center", color: "#00FF88", margin: 0 }}>⚽ FOOTBALLLIVE</h1>
      <p style={{ textAlign: "center", fontSize: 11, opacity: 0.5 }}>Vercel Fast ⚡ | {time} | Auto 30s | {matches.length > 0 ? `${matches.length} REAL MATCHES` : loading ? "Loading real..." : "Demo Mode"}</p>

      {leagues.map(l => {
        const list = displayData[l.name] || [];
        if(list.length===0) return null;
        return (
          <div key={l.name} style={{ background: "#171717", border: "1px solid #222", borderRadius: 12, marginTop: 12 }}>
            <div onClick={() => setOpen(open===l.name? null : l.name)} style={{ padding: 14, display: "flex", justifyContent: "space-between", cursor:"pointer" }}>
              <span><b>{l.flag} {l.name}</b> <span style={{ fontSize: 11, opacity: 0.5 }}>({list.length})</span></span>
              <span style={{ background: "#00FF88", color: "black", fontSize: 11, fontWeight: "bold", padding:"2px 8px", borderRadius: 8 }}>{open===l.name? "−":"+"}</span>
            </div>
            {open===l.name && (
              <div style={{ borderTop: "1px solid #222", padding: 10, background: "#101010" }}>
                {list.map((m: any) => (
                  <div key={m.id || m.home+m.away} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding:"10px 0", borderBottom:"1px solid #1a1a1a" }}>
                    <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      {m.homeLogo && <img src={m.homeLogo} width={18} height={18} style={{ borderRadius: 9 }} />}
                      {m.home}
                    </span>
                    <span style={{ background: "#222", padding: "2px 8px", borderRadius: 8, color: "#00FF88", fontWeight: "bold", fontSize: 12 }}>{m.score || `${m.goals?.home??0}-${m.goals?.away??0}` } <span style={{ color: "#aaa", fontSize: 10 }}>{m.minute}</span></span>
                    <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      {m.away}
                      {m.awayLogo && <img src={m.awayLogo} width={18} height={18} style={{ borderRadius: 9 }} />}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}

      <p style={{ textAlign: "center", fontSize: 10, opacity: 0.3, marginTop: 20 }}>API: api-sports.io | Updates every 30s</p>
    </div>
  );
}
