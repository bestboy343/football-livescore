import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const key = process.env.HIGHLIGHTIFY_KEY || process.env.HIGHLIGHTLY_KEY || "";
  if (!key) return NextResponse.json([]);

  const today = new Date().toISOString().split("T")[0];

  const urls = [
    `https://soccer.highlightly.net/matches?date=${today}`,
    `https://sports.highlightly.net/football/matches?date=${today}`,
  ];

  let list: any[] = [];

  for (const url of urls) {
    try {
      const r = await fetch(url, {
        headers: { "x-rapidapi-key": key, "x-api-key": key } as any,
        cache: "no-store",
      });
      const text = await r.text();
      if (!r.ok) {
        console.log(`FAILED ${url} ${r.status} ${text.slice(0,100)}`);
        continue;
      }
      const j = JSON.parse(text);
      const data = j.data || j.matches || j.response || [];
      if (data.length > 0) {
        list = data;
        console.log(`SUCCESS ${url} ${data.length} matches`);
        break;
      }
    } catch (e: any) {
      console.log(`ERROR ${url} ${e.message}`);
    }
  }

  if (list.length === 0) return NextResponse.json([]);

  // Sort big leagues first
  const order = ["Premier League", "La Liga", "Serie A", "Bundesliga", "Ligue 1", "Champions League", "Europa", "Primeira", "Eredivisie"];
  const prio = (n: string) => {
    const idx = order.findIndex(k => n.includes(k));
    return idx === -1? 99 : idx;
  };

  list.sort((a: any, b: any) => {
    const la = a.league?.name || a.league || "";
    const lb = b.league?.name || b.league || "";
    return prio(la) - prio(lb);
  });

  const out = list.slice(0, 40).map((m: any, i: number) => {
    const isLive = m.status === "live" || m.state?.status === "live" || m.state?.isLive;
    return {
      id: m.id || String(i),
      league: m.league?.name || m.league || "Football",
      homeTeam: m.homeTeam?.name || m.home_team?.name || m.teams?.home?.name || "Home",
      awayTeam: m.awayTeam?.name || m.away_team?.name || m.teams?.away?.name || "Away",
      score: {
        home: m.homeScore?? m.score?.home?? m.state?.score?.current?.home?? 0,
        away: m.awayScore?? m.score?.away?? m.state?.score?.current?.away?? 0,
        display: m.state?.score?.current? `${m.state.score.current.home} - ${m.state.score.current.away}` : `${m.homeScore?? 0} - ${m.awayScore?? 0}`,
      },
      status: isLive? "LIVE" : "SCHEDULED",
      time: m.state?.minute? `${m.state.minute}'` : "",
    };
  });

  return NextResponse.json(out, { headers: { "Cache-Control": "no-store" } });
}
