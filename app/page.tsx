"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<any[]>([]);
  const [filter, setFilter] = useState("LIVE");
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [ago, setAgo] = useState("Just now");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/live");
        const json = await res.json();
        if (Array.isArray(json)) {
          setData(json);
          setLastUpdate(new Date());
        }
      } catch {}
    };
    load();
    // 15 MINUTES = 96 requests/day - PERFECT for BASIC $0 plan!
    const t = setInterval(load, 15 * 60 * 1000);
    return () => clearInterval(t);
  }, []);

  // Update "ago" counter every minute like Flashscore
  useEffect(() => {
    const i = setInterval(() => {
      if (!lastUpdate) return;
      const diff = Math.floor((Date.now() - lastUpdate.getTime()) / 60000);
      if (diff === 0) setAgo("Just now");
      else if (diff === 1) setAgo("1 min ago");
      else setAgo(`${diff} mins ago`);
    }, 60000);
    return () => clearInterval(i);
  }, [lastUpdate]);

  const filtered = data.filter((m: any) => {
    if (filter === "LIVE") return m.status === "LIVE";
    if (filter === "FINISHED") return m.status === "FINISHED";
    return true;
  });

  const groups: any = {};
  filtered.forEach((m: any) => {
    if (!groups[m.league]) groups[m.league] = [];
    groups[m.league].push(m);
  });

  return (
    <div style={{ fontFamily: "Arial", background: "#fff", minHeight: "100vh" }}>
      <div style={{ background: "#000", color: "#fff", padding: "10px", fontWeight: "bold", fontSize: 18 }}>
        BESTBOY LIVESCORE
      </div>

      <div style={{ padding: "6px 10px", fontSize: 14, borderBottom: "1px solid #ccc" }}>
        <b>Football</b> | Hockey | Tennis | Basketball
      </div>

      <div style={{ padding: "6px 10px", fontSize: 14, borderBottom: "1px solid #ccc" }}>
        <b>Today</b> | Yesterday | Tomorrow
      </div>

      <div style={{ padding: "6px 10px", fontSize: 14, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <span onClick={() => setFilter("ALL")} style={{ color: filter==="ALL"? "#000" : "blue", fontWeight: filter==="ALL"?"bold":undefined, cursor:"pointer" }}>All Games</span> |{" "}
          <span onClick={() => setFilter("LIVE")} style={{ color: "red", fontWeight: filter==="LIVE"?"bold":undefined, cursor:"pointer" }}>LIVE ({data.filter(m=>m.status==="LIVE").length})</span> |{" "}
          <span onClick={() => setFilter("FINISHED")} style={{ color: filter==="FINISHED"? "#000" : "blue", fontWeight: filter==="FINISHED"?"bold":undefined, cursor:"pointer" }}>Finished</span>
        </div>
        <div style={{ fontSize: 11, color: "#666" }}>
          Last update: {ago}
        </div>
      </div>

      <div style={{ background: "#2e7d32", color: "#fff", padding: "6px 10px", fontWeight: "bold", fontSize: 14 }}>
        Football » Today » {filter} ({filtered.length})
      </div>

      {Object.keys(groups).length === 0? (
        <div style={{ padding: 20, textAlign: "center", fontSize: 13 }}>
          Loading... {data.length} games<br/>
          <span style={{ fontSize: 11, color: "#666" }}>BASIC plan: updates every 15 min to stay under 100/day</span>
        </div>
      ) : (
        Object.entries(groups).map(([league, games]: any) => (
          <div key={league}>
            <div style={{ background: "#000", color: "#fff", padding: "5px 10px", fontSize: 13, fontWeight: "bold" }}>
              {String(league).toUpperCase()} <span style={{ float: "right", fontWeight: "normal", textDecoration: "underline" }}>Standings</span>
            </div>
            {games.map((g: any) => (
              <div key={g.id} style={{ padding: "5px 10px", borderBottom: "1px solid #ddd", fontSize: 13 }}>
                <span style={{ minWidth: 45, display: "inline-block", color: g.status==="LIVE"? "#000" : "#666" }}>{g.time || g.status}</span>
                {g.homeTeam} - {g.awayTeam} <b style={{ color: g.status==="LIVE"? "red" : "#000" }}>{g.score?.display}</b>
              </div>
            ))}
          </div>
        ))
      )}

      <div style={{ padding: 10, fontSize: 11, color: "#999", textAlign: "center", borderTop: "1px solid #eee", marginTop: 10 }}>
        BASIC $0 Plan: {data.length} games • Auto-refresh every 15 mins • {Object.keys(groups).length} leagues<br/>
        {lastUpdate? `Last fetch: ${lastUpdate.toLocaleTimeString()} • ${ago}` : ""}
      </div>
    </div>
  );
}
