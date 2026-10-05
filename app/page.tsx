"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<any[]>([]);
  const [filter, setFilter] = useState("LIVE");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/live");
        const json = await res.json();
        if (Array.isArray(json)) setData(json);
      } catch {}
    };
    load();
    const t = setInterval(load, 60000);
    return () => clearInterval(t);
  }, []);

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

      <div style={{ padding: "6px 10px", fontSize: 14 }}>
        <span onClick={() => setFilter("ALL")} style={{ color: filter==="ALL" ? "#000" : "blue", fontWeight: filter==="ALL"?"bold":undefined, cursor:"pointer" }}>All Games</span> |{" "}
        <span onClick={() => setFilter("LIVE")} style={{ color: "red", fontWeight: filter==="LIVE"?"bold":undefined, cursor:"pointer" }}>LIVE</span> |{" "}
        <span onClick={() => setFilter("FINISHED")} style={{ color: filter==="FINISHED" ? "#000" : "blue", fontWeight: filter==="FINISHED"?"bold":undefined, cursor:"pointer" }}>Finished</span>
      </div>

      <div style={{ background: "#2e7d32", color: "#fff", padding: "6px 10px", fontWeight: "bold", fontSize: 14 }}>
        Football » Today » {filter} ({filtered.length})
      </div>

      {Object.keys(groups).length === 0 ? (
        <div style={{ padding: 20, textAlign: "center" }}>Loading {data.length} games... If white screen, check /api/live</div>
      ) : (
        Object.entries(groups).map(([league, games]: any) => (
          <div key={league}>
            <div style={{ background: "#000", color: "#fff", padding: "5px 10px", fontSize: 13, fontWeight: "bold" }}>
              {String(league).toUpperCase()} <span style={{ float: "right", fontWeight: "normal", textDecoration: "underline" }}>Standings</span>
            </div>
            {games.map((g: any) => (
              <div key={g.id} style={{ padding: "5px 10px", borderBottom: "1px solid #ddd", fontSize: 13 }}>
                <span style={{ minWidth: 40, display: "inline-block" }}>{g.time || g.status}</span>
                {g.homeTeam} - {g.awayTeam} <b style={{ color: "red" }}>{g.score?.display || "0-0"}</b>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
