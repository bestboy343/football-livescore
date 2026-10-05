import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const key = process.env.HIGHLIGHTIFY_KEY || process.env.HIGHLIGHTLY_KEY || "";
  if (!key) return NextResponse.json([]);

  const today = new Date().toISOString().split("T")[0];

  let list:any[] = [];
  // Fetch 3 pages = 120 matches (covers all live)
  for(const offset of [0,40,80]){
    try{
      const url = `https://soccer.highlightly.net/matches?date=${today}&limit=40&offset=${offset}`;
      const r = await fetch(url, { headers: { "x-rapidapi-key": key } as any, cache:"no-store" });
      if(!r.ok) continue;
      const j = await r.json();
      const data = j.data || [];
      if(data.length===0) break;
      list.push(...data);
    } catch {}
  }

  // Remove duplicates
  list = Array.from(new Map(list.map((m:any)=>[m.id,m])).values());

  const out = list.map((m:any,i:number)=>{
    const scoreStr = m.state?.score?.current || "0 - 0";
    const parts = scoreStr.split("-").map((s:string)=> parseInt(s.trim())||0);
    const raw = JSON.stringify(m.state||{}).toLowerCase();
    const isLive = m.state?.clock || raw.includes("1h") || raw.includes("2h") || raw.includes("live") || /^\d+'/.test(m.state?.description||"");
    const isFinished = (m.state?.description||"").toLowerCase().includes("finished");

    let status = "Not started";
    if(isLive) status="LIVE";
    else if(isFinished) status="FINISHED";
    else status = m.state?.description || "Not started";

    // Detect minute like 69', 53'
    const minuteMatch = (m.state?.clock || m.state?.description || "").match(/(\d+)'/);
    const minute = minuteMatch? `${minuteMatch[1]}'` : (m.state?.clock||"");

    return {
      id: String(m.id||i),
      league: m.country?.name? `${m.league?.name} (${m.country.name})` : m.league?.name,
      homeTeam: m.homeTeam?.name||"Home",
      awayTeam: m.awayTeam?.name||"Away",
      score: { home: parts[0], away: parts[1], display: scoreStr },
      status,
      time: minute,
    };
  });

  out.sort((a:any,b:any)=>{
    if(a.status==="LIVE" && b.status!=="LIVE") return -1;
    if(b.status==="LIVE" && a.status!=="LIVE") return 1;
    return 0;
  });

  return NextResponse.json(out);
}
