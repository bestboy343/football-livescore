import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET() {
  const key = process.env.HIGHLIGHTLY_KEY || process.env.HIGHLIGHTLY_API_KEY || "";
  const today = new Date().toISOString().split("T")[0];

  try {
    const res = await fetch(`https://soccer.highlightly.net/matches?date=${today}&limit=100`, {
      headers: {
        "x-rapidapi-key": key,
        "x-rapidapi-host": "soccer.highlightly.net"
      },
      cache: "no-store"
    });

    const json = await res.json();
    const data = json.data || [];

    const response = data.map((m: any) => {
      const score = m.state?.score?.current || "0 - 0";
      const [h, a] = score.split("-").map((s:string)=>parseInt(s.trim())||0);
      const desc = m.state?.description || "Not Started";
      let short = "NS";
      if(desc==="Finished") short="FT";
      else if(desc==="In Progress" || desc.includes("Half")) short="LIVE";

      return {
        fixture: { id: m.id, date: m.date, status: { short, long: desc } },
        league: { name: m.league?.name || "Football", country: m.country?.name || "World" },
        teams: { home: { name: m.homeTeam?.name }, away: { name: m.awayTeam?.name } },
        goals: { home: h, away: a }
      };
    });

    return NextResponse.json({ response });
  } catch (e) {
    return NextResponse.json({ response: [], error: String(e) });
  }
}
