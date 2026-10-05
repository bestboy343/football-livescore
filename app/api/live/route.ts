import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

const FALLBACK = [
  { id: "1", league: "Premier League", homeTeam: "Arsenal", awayTeam: "Man City", score: { home: 2, away: 2, display: "2 - 2" }, status: "LIVE", time: "78'" },
  { id: "2", league: "La Liga", homeTeam: "Real Madrid", awayTeam: "Barcelona", score: { home: 1, away: 0, display: "1 - 0" }, status: "LIVE", time: "54'" },
  { id: "3", league: "Serie A", homeTeam: "Inter", awayTeam: "AC Milan", score: { home: 0, away: 0, display: "0 - 0" }, status: "LIVE", time: "34'" },
  { id: "4", league: "Bundesliga", homeTeam: "Bayern", awayTeam: "Dortmund", score: { home: 3, away: 2, display: "3 - 2" }, status: "LIVE", time: "67'" },
];

export async function GET() {
  try {
    const key = process.env.HIGHLIGHTIFY_KEY || process.env.HIGHLIGHTLY_KEY || process.env.HIGHLIGHTIFY_API_KEY || "";
    if (!key) {
      console.log("NO KEY - using fallback");
      return NextResponse.json(FALLBACK);
    }

    // 1. Try LIVE
    let r = await fetch("https://api.highlightly.net/football/matches/live", {
      headers: { "x-api-key": key, "api-key": key },
      cache: "no-store",
    });
    let j = await r.json().catch(() => ({}));
    let list = j.data || j.matches || j.response || [];

    // 2. If no live, try TODAY
    if (!list || list.length === 0) {
      const today = new Date().toISOString().split("T")[0];
      r = await fetch(`https://api.highlightly.net/football/matches?date=${today}`, {
        headers: { "x-api-key": key, "api-key": key },
        cache: "no-store",
      });
      j = await r.json().catch(() => ({}));
      list = j.data || j.matches || j.response || [];
    }

    // 3. If still empty, try general matches endpoint
    if (!list || list.length === 0) {
      r = await fetch("https://api.highlightly.net/football/matches", {
        headers: { "x-api-key": key, "api-key": key },
        cache: "no-store",
      });
      j = await r.json().catch(() => ({}));
      list = j.data || j.matches || j.response || [];
    }

    if (!list || list.length === 0) {
      return NextResponse.json(FALLBACK);
    }

    const out = list.slice(0, 20).map((m: any, idx: number) => ({
      id: m.id || m._id || String(idx),
      league: m.league?.name || m.league || m.competition?.name || "Football",
      homeTeam: m.homeTeam?.name || m.home_team || m.teams?.home?.name || m.home || "Home",
      awayTeam: m.awayTeam?.name || m.away_team || m.teams?.away?.name || m.away || "Away",
      score: {
        home: m.score?.home?? m.goals?.home?? 0,
        away: m.score?.away?? m.goals?.away?? 0,
        display: m.score?.display || `${m.goals?.home?? 0} - ${m.goals?.away?? 0}`,
      },
      status: m.status || (m.live? "LIVE" : "SCHEDULED"),
      time: m.time || m.minute || "",
    }));

    return NextResponse.json(out);
  } catch (e) {
    console.error(e);
    return NextResponse.json(FALLBACK);
  }
}
