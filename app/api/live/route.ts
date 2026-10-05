export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const key = process.env.HIGHLIGHTLY_API_KEY;
    const today = new Date().toISOString().split('T')[0];

    const url = `https://soccer.highlightly.net/football/games/today?live=true`;

    const res = await fetch(url, {
      headers: {
        'x-rapidapi-key': key!,
        'x-rapidapi-host': 'soccer.highlightly.net'
      },
      cache: 'no-store'
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({
        matches: [],
        error: `Highlightly ${res.status}: ${JSON.stringify(data)}`,
        url
      });
    }

    const raw = data.data || data.matches || data.result || [];

    const matches = raw.map((m:any)=>({
      id: m.id,
      country: m.country?.name || m.league?.country || 'World',
      league: m.league?.name || 'League',
      home: m.homeTeam?.name || 'Home',
      away: m.awayTeam?.name || 'Away',
      score: {
        home: m.homeTeam?.score?? m.homeScore?.current?? m.score?.home?? 0,
        away: m.awayTeam?.score?? m.awayScore?.current?? m.score?.away?? 0
      },
      status: m.state || m.status?.description || 'Live',
      minute: m.minute || m.time || m.status?.liveTime?.short || ''
    }));

    return NextResponse.json({ matches, count: matches.length });
  } catch (e:any) {
    return NextResponse.json({ matches: [], error: e.message });
  }
}
