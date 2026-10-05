import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const key = process.env.HIGHLIGHTIFY_KEY || process.env.HIGHLIGHTLY_KEY || "";
  if (!key) return NextResponse.json([]);
  const today = new Date().toISOString().split("T")[0];
  const url = `https://soccer.highlightly.net/matches?date=${today}&limit=40`;
  try {
    const r = await fetch(url, { headers: { "x-rapidapi-key": key } as any, cache: "no-store" });
    const j = await r.json();
    let list = j.data || [];

    // Filter out tiny Brazil state leagues
    list = list.filter((m:any)=>{
      const n = (m.league?.name||"").toLowerCase();
      return!["paraibano","potiguar","rondoniense","alagoano","acreano","amapaense","maranhense","sul-mato","piauiense","u19","u20"].some(b=>n.includes(b));
    });

    const order = ["Premier League","La Liga","Serie A","Bundesliga","Ligue 1","Champions League","Eredivisie","Primeira Liga","Championship","Major League"];
    const prio = (name:string)=>{ const i=order.findIndex(k=>name.includes(k)); return i===-1?99:i; };
    list.sort((a:any,b:any)=> prio(a.league?.name||"") - prio(b.league?.name||""));

    const out = list.map((m:any,i:number)=>{
      const scoreStr = m.state?.score?.current || "0 - 0";
      const parts = scoreStr.split("-").map((s:string)=> parseInt(s.trim())||0);
      const desc = (m.state?.description||"").toLowerCase();
      const isLive = desc.includes("live")||desc.includes("half")||desc.includes("in play");
      const leagueFull = m.country?.name? `${m.league?.name} (${m.country.name})` : m.league?.name;
      return {
        id: String(m.id||i),
        league: leagueFull,
        homeTeam: m.homeTeam?.name||"Home",
        awayTeam: m.awayTeam?.name||"Away",
        score: { home: parts[0], away: parts[1], display: scoreStr },
        status: isLive? "LIVE" : m.state?.description||"Not started",
        time: m.state?.clock||"",
      };
    });
    return NextResponse.json(out);
  } catch { return NextResponse.json([]); }
}
