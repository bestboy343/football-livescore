export const dynamic = 'force-dynamic';
let cache: any = null;
let lastFetch = 0;

export async function GET() {
  if (cache && Date.now() - lastFetch < 60000) return Response.json(cache);
  try {
    const today = new Date().toISOString().split('T')[0];
    const key = process.env.HIGHLIGHTLY_KEY || "";

    const res = await fetch(`https://soccer.highlightly.net/football/matches?date=${today}`, {
      headers: {
        "x-api-key": key,
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json"
      },
      cache: "no-store"
    });

    if (!res.ok) throw new Error(`Highlightly ${res.status} ${await res.text()}`);

    const json = await res.json();
    const raw = json.data || json.matches || json || [];

    console.log("Got", raw.length, "matches");

    // Show all matches today, if live filter later
    const list = raw.map((m: any) => ({
      id: m.id || m.matchId,
      country: m.country?.name || m.league?.country || "World",
      league: m.league?.name || "Football",
      home: m.homeTeam?.name || m.home?.name || "Home",
      away: m.awayTeam?.name || m.away?.name || "Away",
      score: { home: m.homeTeam?.score?? m.score?.home?? 0, away: m.awayTeam?.score?? m.score?.away?? 0 },
      status: m.status?.description || m.status || "LIVE",
      minute: m.status?.clock || m.minute || "LIVE"
    }));

    cache = { matches: list };
    lastFetch = Date.now();
    return Response.json(cache);
  } catch (e: any) {
    console.error(e);
    return Response.json(cache || { matches: [], error: e.message });
  }
}
