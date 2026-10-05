import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET() {
  const key = process.env.HIGHLIGHTIFY_KEY || process.env.HIGHLIGHTLY_KEY || "";
  if (!key) return NextResponse.json([]);

  const today = new Date().toISOString().split("T")[0];
  let list: any[] = [];

  try {
    for (const offset of [0, 40, 80]) {
      const url = `https://soccer.highlightly.net/matches?date=${today}&limit=40&offset=${offset}`;
      const r = await fetch(url, {
        headers: { "x-rapidapi-key": key } as any,
        cache: "no-store",
      });
      if (!r.ok) continue;
      const j = await r.json();
      const data = j.data || [];
      if (data.length === 0) break;
      list = list.concat(data);
    }
  } catch (e) {
    return NextResponse.json([]);
  }

  const uniq = new Map();
  list.forEach((m: any) => { if (m.id) uniq.set(m.id, m); });
  list = Array.from(uniq.values());

  const out = list.map((m: any, i: number) => {
    const scoreStr = m.state && m.state.score && m.state.score.current? m.state.score.current : "0 - 0";
    const parts = scoreStr.split("-");
    const home = parseInt(parts[0]) || 0;
    const away = parseInt(parts[1]) || 0;

    const stateStr = JSON.stringify(m.state || {}).toLowerCase();
    const hasClock = m.state && m.state.clock;
    const isLive = hasClock || stateStr.includes("live") || stateStr.includes("1h") || stateStr.includes("2h");
    const isFinished = stateStr.includes("finished");

    let status = "Not started";
    if (isLive) status = "LIVE";
    else if (isFinished) status = "FINISHED";

    return {
      id: String(m.id || i),
      league: m.league && m.league.name? m.league.name : "Football",
      homeTeam: m.homeTeam && m.homeTeam.name? m.homeTeam.name : "Home",
      awayTeam: m.awayTeam && m.awayTeam.name? m.awayTeam.name : "Away",
      score: { home, away, display: scoreStr },
      status,
      time: m.state && m.state.clock? m.state.clock : "",
    };
  });

  out.sort((a: any, b: any) => {
    if (a.status === "LIVE" && b.status!== "LIVE") return -1;
    if (b.status === "LIVE" && a.status!== "LIVE") return 1;
    return 0;
  });

  return NextResponse.json(out);
}
