import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() {
  const key = process.env.HIGHLIGHTIFY_KEY || process.env.HIGHLIGHTLY_KEY || "";
  if (!key) return NextResponse.json([]);
  const today = new Date().toISOString().split("T")[0];
  let list: any[] = [];
  for (const offset of [0, 40, 80]) {
    try {
      const r = await fetch(`https://soccer.highlightly.net/matches?date=${today}&limit=40&offset=${offset}`, {
        headers: { "x-rapidapi-key": key } as any, cache: "no-store"
      });
      if (!r.ok) continue;
      const j = await r.json();
      if (!j.data || j.data.length===0) break;
      list = list.concat(j.data);
    } catch {}
  }
  const uniq = new Map(); list.forEach((m:any)=>uniq.set(m.id,m));
  list = Array.from(uniq.values());
  const out = list.map((m:any,i:number)=>{
    const scoreStr = m.state?.score?.current || "0 - 0";
    const p = scoreStr.split("-"); const home=parseInt(p[0])||0; const away=parseInt(p[1])||0;
    const raw = JSON.stringify(m.state||{}).toLowerCase();
    const isLive = (m.state?.clock || raw.includes("live") || raw.includes("1h") || raw.includes("2h"));
    const isFinished = raw.includes("finished");
    let status="Not started"; if(isLive) status="LIVE"; else if(isFinished) status="FINISHED";
    const country = m.country?.name? `${m.country.name.toUpperCase()}: ` : "";
    const leagueName = `${country}${m.league?.name || "Football"}`;
    return {
      id: String(m.id||i), league: leagueName,
      homeTeam: m.homeTeam?.name||"Home", awayTeam: m.awayTeam?.name||"Away",
      score: { home, away, display: scoreStr }, status,
      time: m.state?.clock || ""
    };
  });
  out.sort((a:any,b:any)=> a.status==="LIVE" && b.status!=="LIVE"? -1 : 0);
  return NextResponse.json(out);
}
