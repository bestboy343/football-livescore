export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const key = process.env.API_FOOTBALL_KEY;
    if (!key) {
      return Response.json([]);
    }

    const res = await fetch('https://v3.football.api-sports.io/fixtures?live=all', {
      headers: {
        'x-apisports-key': key,
        'x-rapidapi-key': key,
        'x-apisports-host': 'v3.football.api-sports.io'
      },
      cache: 'no-store'
    });

    const data = await res.json();

    const matches = (data.response || []).map((f: any) => ({
      id: f.fixture.id,
      country: f.league.country,   // <-- COUNTRY NAME: Argentina
      flag: f.league.flag,         // <-- FLAG IMAGE LINK
      league: f.league.name,       // <-- LEAGUE NAME
      home: f.teams.home.name,
      away: f.teams.away.name,
      score: `${f.goals.home ?? 0}-${f.goals.away ?? 0}`,
      minute: f.fixture.status.elapsed ? `${f.fixture.status.elapsed}'` : f.fixture.status.short,
      status: f.fixture.status.long,
    }));

    return Response.json(matches);

  } catch (e) {
    return Response.json([]);
  }
}
