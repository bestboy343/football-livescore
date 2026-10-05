import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const key = process.env.HIGHLIGHTIFY_KEY || process.env.HIGHLIGHTLY_KEY || "";

  const safeFetch = async (url: string) => {
    try {
      const r = await fetch(url, {
        headers: { "x-rapidapi-key": key } as any,
        cache: "no-store",
      });
      if (!r.ok) {
        console.log(`API ${r.status} for ${url}`);
        return [];
      }
      const j = await r.json();
      return j.data || j.matches || j.response || j || [];
    } catch (e: any) {
      console.log(`Fetch failed ${url}: ${e.message}`);
      return [];
    }
  };

  try {
    if (!key) {
      console.log("NO KEY SET");
      return NextResponse.json([]);
    }

    let list = await safeFetch("https://sports.highlightly.net/football/matches?live=all");

    if (!list || list.length === 0) {
      const today = new Date().toISOString().split("T")[0];
      list = await safeFetch(`https://sports.highlightly.net/football/matches?date=${today}`);
    }

    if (!Array.isArray(list)) list = [];

    // Sort big leagues first
    const priority: any = {
      "Premier League": 1, "La Liga": 2, "Serie A": 3, "Bundesliga": 4, "Ligue 1": 5,
      "Champions League": 6, "Europa": 7, "Primeira": 8, "Eredivisie": 9, "Championship": 10
    };
    const getPrio = (n: string) => {
      for (const k in priority) if (n.includes(k)) return priority[k];
      return 99;
    };

    list.sort((a: any, b: any) => {
      const la = a.league?.name || a.league || "";
      const lb = b.league?.name || b.league || "";
      return getPrio(la) - getPrio(lb);
    });

    const out = list.slice(0, 40).map((m: any, i: number) => ({
      id: m.id || String(i),
      league: m.league?.name || m.league || "Football",
      homeTeam: m.homeTeam?.name || m.home_team?.name || m.teams?.home?.name || "Home",
      awayTeam: m.awayTeam?.name || m.away_team?.name || m.teams?.away?.name || "Away",
      score: {
        home: m.score?.home?? m.home_score?? m.goals?.home?? 0,
        away: m.score?.away?? m.away_score?? m.goals?.away?? 0,
        display: `${m.goals?.home?? m.home_score?? 0} - ${m.goals?.away?? m.away_score?? 0}`,
      },
      status: m.status || (m.isLive? "LIVE" : "SCHEDULED"),
      time: m.minute? `${m.minute}'` : m.time || "",
    }));

    return NextResponse.json(out, { headers: { "Cache-Control": "no-store" } });

  } catch (e: any) {
    console.log("FATAL ERROR", e.message);
    return NextResponse.json([]);
  }
}
