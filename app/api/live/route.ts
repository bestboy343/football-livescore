export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const key = process.env.HIGHLIGHTLY_KEY!;
    const today = new Date().toISOString().split('T')[0];

    const url = `https://sports.highlightly.net/football/matches?date=${today}`;

    const res = await fetch(url, {
      headers: {
        "x-rapidapi-key": key,
        "x-rapidapi-host": "sports.highlightly.net"
      },
      cache: "no-store"
    });

    const data = await res.json();

    if (!res.ok) {
      return Response.json({
        matches: [],
        error: `Highlightly ${res.status} ${JSON.stringify(data)}`,
        url
      });
    }

    const raw = data.data || data.matches || [];
    const matches = raw.map((m:any)=>({
      id: m.id,
      country: m.country?.name || "World",
      league: m.league?.name || "League",
      home: m.homeTeam?.name || "Home",
      away: m.awayTeam?.name || "Away",
      score: { home: m.homeTeam?.score?? 0, away: m.awayTeam?.score?? 0 },
      status: m.status?.description || m.status || "Live",
      minute: m.minute || m.status?.clock || ""
    }));

    return Response.json({ matches, count: matches.length });
  } catch (e:any) {
    return Response.json({ matches: [], error: e.message });
  }
}
