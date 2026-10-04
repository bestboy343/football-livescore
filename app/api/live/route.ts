export const dynamic = 'force-dynamic';

let cache: any = null;
let lastFetch = 0;

export async function GET() {
  // Cache 90 sec so your 100/day no finish
  if (cache && Date.now() - lastFetch < 90000) {
    return Response.json(cache);
  }

  try {
    const res = await fetch('https://soccer.highlightly.net/matches?live=true', {
      headers: {
        'x-api-key': process.env.HIGHLIGHTLY_KEY!,
        'x-rapidapi-key': process.env.HIGHLIGHTLY_KEY!,
      },
      cache: 'no-store'
    });

    const json = await res.json();
    const raw = json.data || json.matches || json || [];

    const formatted = raw.map((m:any) => ({
      country: m.country?.name || m.league?.country || 'World',
      flag: m.country?.flag || m.country?.logo || null,
      league: m.league?.name || 'Live',
      home: m.homeTeam?.name || m.home?.name || m.teams?.home?.name,
      away: m.awayTeam?.name || m.away?.name || m.teams?.away?.name,
      score: `${m.homeTeam?.score ?? m.score?.home ?? 0}-${m.awayTeam?.score ?? m.score?.away ?? 0}`,
      minute: m.minute ? `${m.minute}'` : (m.status?.short || m.status || 'LIVE'),
    })).filter((x:any)=> x.home && x.away);

    cache = formatted;
    lastFetch = Date.now();
    return Response.json(formatted);

  } catch (err) {
    console.log(err);
    return Response.json(cache || []);
  }
}
