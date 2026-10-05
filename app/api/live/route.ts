export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const key = process.env.HIGHLIGHTLY_API_KEY;
    const headers = {
      'x-rapidapi-key': key!,
      'x-rapidapi-host': 'soccer.highlightly.net'
    };

    let res = await fetch('https://soccer.highlightly.net/football/games/today?live=true', { headers, cache: 'no-store' });
    let data = await res.json();
    let raw = data.data || [];

    if (raw.length === 0) {
      res = await fetch('https://soccer.highlightly.net/football/matches?state=today', { headers, cache: 'no-store' });
      data = await res.json();
      raw = data.data || data.matches || [];
    }

    const matches = raw.map((m:any)=>({
      id: m.id,
      country: m.country?.name || m.league?.country || 'World',
      league: m.league?.name || 'League',
      home: m.homeTeam?.name || 'Home',
      away: m.awayTeam?.name || 'Away',
      score: {
        home: m.homeTeam?.score ?? m.homeScore?.current ?? m.score?.home ?? 0,
        away: m.awayTeam?.score ?? m.awayScore?.current ?? m.score?.away ?? 0
      },
      status: m.state || m.status?.description || 'Live',
      minute: m.minute || ''
    }));

    return NextResponse.json({ matches, count: matches.length });
  } catch (e:any) {
    return NextResponse.json({ matches: [], error: e.message });
  }
}
