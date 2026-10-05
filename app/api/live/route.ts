import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

const FALLBACK = [
  { id: "1", league: "Premier League", homeTeam: "Arsenal", awayTeam: "Man City", score: { home: 2, away: 2, display: "2 - 2" }, status: "LIVE", time: "78'" },
  { id: "2", league: "La Liga", homeTeam: "Real Madrid", awayTeam: "Barcelona", score: { home: 1, away: 0, display: "1 - 0" }, status: "LIVE", time: "54'" },
];

export async function GET() {
  try {
    const key = process.env.HIGHLIGHTIFY_KEY || process.env.HIGHLIGHTLY_KEY || "";
    if (!key) return NextResponse.json(FALLBACK);

    const headers = { "x-rapidapi-key": key, "x-api-key": key } as any;

    // LIVE first
    let url = "https://sports.highlightly.net/football/matches?live=all";
    let r = await fetch(url, { headers, cache: "no-store" });
    let j = await r.json().catch(() => ({}));
    let list = j.data || j.matches || j.response || j || [];

    // If no live, TODAY
    if (!Array.isArray(list) || list.length === 0) {
      const today = new Date().toISOString().split("T")[0];
      url = `https://sports.highlightly.net/football/matches?date=${today}`;
      r = await fetch(url, { headers, cache: "no-store" });
      j = await r.json().catch(() => ({}));
      list = j.data || j.matches || j.response || [];
    }

    // If still empty, try api.highlightly.net as backup
    if (!Array.isArray(list) || list.length === 0) {
      r = await fetch("https://api.highlightly.net/football/matches/live", { headers, cache: "no-store" });
      j = await r.json().catch(() => ({}));
      list = j.data || j.matches || j.response || [];
    }

    if (!Array.isArray(list) || list.length === 0) {
      return NextResponse.json(FALLBACK);
    }

    const out = list.slice(0, 30).map((m: any, i: number) => ({
      id: m.id || String(i),
      league: m.league?.name || m.league || "Football",
      homeTeam: m.homeTeam?.name || m.home_team?.name || m.teams?.home?.name || m.home || "Home",
      awayTeam: m.awayTeam?.name || m.away_team?.name || m.teams?.away?.name || m.away || "Away",
      score: {
        home: m.score?.home?? m.home_score?? m.goals?.home?? 0,
        away: m.score?.away?? m.away_score?? m.goals?.away?? 0,
        display: m.score?.display || `${m.goals?.home?? 0} - ${m.goals?.away?? 0}`,
      },
      status: m.status || (m.isLive? "LIVE" : "SCHEDULED"),
      time: m.minute? `${m.minute}'` : m.time || "",
    }));

    return NextResponse.json(out);
  } catch (e) {
    console.error(e);
    return NextResponse.json(FALLBACK);
  }
}
