import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET() {
  const key = process.env.HIGHLIGHTLY_API_KEY || process.env.NEXT_PUBLIC_API_KEY || "";
  const today = new Date().toISOString().split("T")[0];

  const urls = [
    `https://soccer.highlightly.net/matches?date=${today}&limit=100`,
    `https://sports.highlightly.net/football/matches?date=${today}&limit=100`
  ];

  let allMatches: any[] = [];

  for (const url of urls) {
    try {
      const res = await fetch(url, {
        headers: {
          "x-rapidapi-key": key,
          "x-rapidapi-host": "soccer.highlightly.net"
        },
        cache: "no-store"
      });
      if (!res.ok) continue;
      const json = await res.json();
      const data = json.data || json.response || [];
      if (data.length > 0) {
        allMatches = data;
        break;
      }
    } catch {}
  }

  // Convert Highlightly to Flashscore format with COUNTRY + TIME
  const response = allMatches.map((m: any) => {
    const scoreStr = m.state?.score?.current || "0 - 0";
    const parts = scoreStr.split("-").map((s:string)=>s.trim());
    const home = parseInt(parts[0]) || 0;
    const away = parseInt(parts[1]) || 0;

    return {
      fixture: {
        id: m.id,
        date: m.date, // this has time like 2026-05-13T18:45:00.000Z
        status: {
          short: m.state?.description === "Finished"? "FT" : m.state?.description === "In Progress"? "LIVE" : "NS",
          long: m.state?.description
        }
      },
      league: {
        name: m.league?.name || "Football",
        country: m.country?.name || "World",
        logo: m.league?.logo
      },
      teams: {
        home: { name: m.homeTeam?.name || "Home" },
        away: { name: m.awayTeam?.name || "Away" }
      },
      goals: { home, away }
    };
  });

  return NextResponse.json({ response });
}
