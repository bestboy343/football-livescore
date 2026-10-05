import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const key = process.env.HIGHLIGHTIFY_KEY || process.env.HIGHLIGHTLY_KEY || "";
  if (!key) return NextResponse.json([]);

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const fmt = (d:Date)=> d.toISOString().split("T")[0];
  const dates = [fmt(yesterday), fmt(today)];

  let list:any[] = [];

  for(const date of dates){
    try{
      const url = `https://soccer.highlightly.net/matches?date=${date}&limit=40`;
      const r = await fetch(url, { headers: { "x-rapidapi-key": key } as any, cache: "no-store" });
      const j = await r.json();
      const data = j.data || [];
      list.push(...data);
    } catch {}
  }

  // Remove duplicates by id
  list = Array.from(new Map(list.map((m:any)=>[m.id,m])).values());

  // Filter tiny leagues
  list = list.filter((m:any)=>{
    const n=(m.league?.name||"").toLowerCase();
    return!["paraibano","rondoniense","acreano","amapaense","piauiense","u19","u20"].some(b=>n.includes(b));
  });

  const out = list.map((m:any,i:number)=>{
    const scoreStr = m.state?.score?.current || "0 - 0";
    const parts = scoreStr.split("-").map((s:string)=> parseInt(s.trim())||0);
    const desc = (m.state?.description||"").toLowerCase();
    const isLive = desc.includes("live")||desc.includes("half")||desc.includes("in play");
    const isFinished = desc.includes("finish")||desc.includes("ft")||desc.includes("full time")||desc.includes("ended")||desc.includes("aet")||desc.includes("pen");

    let status = "Not started";
    if(isLive) status = "LIVE";
    else if(isFinished) status = "FINISHED";
    else status = m.state?.description || "Not started";

    return {
      id: String(m.id||i),
      league: m.country?.name? `${m.league?.name} (${m.country.name})` : m.league?.name,
      homeTeam: m.homeTeam?.name||"Home",
      awayTeam: m.awayTeam?.name||"Away",
      score: { home: parts[0], away: parts[1], display: scoreStr },
      status,
      time: m.state?.clock||"",
      date: m.date || m.startDate,
    };
  });

  // Sort: LIVE first, then FINISHED, then Not started
  out.sort((a:any,b:any)=>{
    if(a.status==="LIVE" && b.status!=="LIVE") return -1;
    if(b.status==="LIVE" && a.status!=="LIVE") return 1;
    if(a.status==="FINISHED" && b.status==="Not started") return -1;
    if(b.status==="FINISHED" && a.status==="Not started") return 1;
    return 0;
  });

  return NextResponse.json(out.slice(0,60));
}
