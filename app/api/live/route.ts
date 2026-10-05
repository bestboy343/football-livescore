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

  let list:any[] = [];
  for(const date of [fmt(yesterday), fmt(today)]){
    try{
      const r = await fetch(`https://soccer.highlightly.net/matches?date=${date}&limit=50`, {
        headers: { "x-rapidapi-key": key } as any, cache:"no-store"
      });
      const j = await r.json();
      list.push(...(j.data||[]));
    } catch {}
  }
  list = Array.from(new Map(list.map((m:any)=>[m.id,m])).values());

  const out = list.map((m:any,i:number)=>{
    const scoreStr = m.state?.score?.current || `${m.homeScore??0} - ${m.awayScore??0}`;
    const parts = scoreStr.split("-").map((s:string)=> parseInt(s.trim())||0);

    // NEW LIVE DETECTOR - checks ALL possible fields
    const raw = JSON.stringify(m.state||{}).toLowerCase();
    const isLive = m.state?.status==="live" || m.status==="live" || raw.includes("live") || raw.includes("1h") || raw.includes("2h") || m.state?.isLive===true;
    const isFinished = m.state?.status==="finished" || raw.includes("finished") || raw.includes("full time") || raw.includes("ft") || raw.includes("aet");

    let status = "Not started";
    if(isLive) status="LIVE";
    else if(isFinished) status="FINISHED";

    return {
      id: String(m.id||i),
      league: m.country?.name? `${m.league?.name} (${m.country.name})` : m.league?.name,
      homeTeam: m.homeTeam?.name||"Home",
      awayTeam: m.awayTeam?.name||"Away",
      score: { home: parts[0], away: parts[1], display: scoreStr },
      status,
      time: m.state?.clock || (isLive? "LIVE" : ""),
      _debug: m.state // remove later, to see real data
    };
  });

  out.sort((a:any,b:any)=>{
    if(a.status==="LIVE" && b.status!=="LIVE") return -1;
    if(b.status==="LIVE" && a.status!=="LIVE") return 1;
    if(a.status==="FINISHED" && b.status==="Not started") return -1;
    if(b.status==="FINISHED" && a.status==="Not started") return 1;
    return 0;
  });

  return NextResponse.json(out.slice(0,80));
}
