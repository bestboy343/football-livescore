import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const key = process.env.HIGHLIGHTIFY_KEY || process.env.HIGHLIGHTLY_KEY || "";
  if (!key) return NextResponse.json([]);

  const today = new Date().toISOString().split("T")[0];

  const urls = [
    `https://soccer.highlightly.net/matches?date=${today}&limit=40`,
    `https://sports.highlightly.net/football/matches?date=${today}&limit=40`,
  ];

  let list: any[] = [];

  for (const url of urls) {
    try {
      const r = await fetch(url, {
        headers: { "x-rapidapi-key": key } as any,
        cache: "no-store",
      });
      if (!r.ok) continue;
      const j = await r.json();
      const data = j.data || j.matches || [];
      if (data.length > 0) { list = data; break; }
    } catch {}
  }

  if (list.length === 0) return NextResponse.json([]);

  // Sort big leagues first
  const big = ["Premier League","La Liga","Serie A","Bundesliga","Ligue 1","Champions League","Europa League"];
  const prio = (n:string) => { const i = big.findIndex(k=>n.includes(k)); return i===-1? 99 : i; };
  list.sort((a:any,b:any)=> prio(a.league?.name||"") - prio(b.league?.name||""));

  const out = list.map((m:any,i:number)=>{
    const scoreStr = m.state?.score?.current || "0 - 0";
    const parts = scoreStr.split("-").map((s:string)=> parseInt(s.trim()) || 0);
    const isLive = m.state?.description?.toLowerCase().includes("live") || m.state?.description?.toLowerCase().includes("half") || m.state?.description?.toLowerCase().includes("in play");
    return {
      id: String(m.id || i),
      league: m.league?.name || "Football",
      homeTeam: m.homeTeam?.name || "Home",
      awayTeam: m.awayTeam?.name || "Away",
      score: {
        home: parts[0]?? 0,
        away: parts[1]?? 0,
        display: scoreStr,
      },
      status: isLive? "LIVE" : (m.state?.description || "SCHEDULED"),
      time: m.state?.clock || m.state?.minute? `${m.state.minute}'` : "",
    };
  });

  return NextResponse.json(out);
}
