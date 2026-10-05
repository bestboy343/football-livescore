export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const key = process.env.HIGHLIGHTLY_API_KEY;
    if (!key) return NextResponse.json([], { status: 200 });

    const headers = {
      'x-rapidapi-key': key,
      'x-rapidapi-host': 'sport-highlights-api.p.rapidapi.com'
    };

    // 1. Try LIVE
    let raw: any[] = [];
    try {
      const r1 = await fetch('https://sport-highlights-api.p.rapidapi.com/football/games/live', 
        { headers, cache: 'no-store' });
      const j1 = await r1.json();
      raw = j1?.data || j1?.games || [];
    } catch {}

    // 2. If no LIVE, use TODAY
    if (!raw || raw.length === 0) {
      try {
        const r2 = await fetch('https://sport-highlights-api.p.rapidapi.com/football/games/today',
          { headers, cache: 'no-store' });
        const j2 = await r2.json();
        raw = j2?.data || j2?.games || [];
      } catch {}
    }

    const matches = (raw || []).slice(0, 50).map((m: any) => ({
      id: m.id || `${m.homeTeam?.name}-${m.awayTeam?.name}`,
      league: m.league?.name || m.competition?.name || 'Match',
      homeTeam: m.homeTeam?.name || m.home?.name || 'Home',
      awayTeam: m.awayTeam?.name || m.away?.name || 'Away',
      score: {
        home: m.score?.current ?? m.homeScore?.current ?? m.homeTeam?.score ?? 0,
        away: m.score?.current ?? m.awayScore?.current ?? m.awayTeam?.score ?? 0,
        display: `${m.homeScore?.current ?? 0} - ${m.awayScore?.current ?? 0}`
      },
      status: m.status?.description || m.status || 'Live',
      minute: m.status?.clock || m.minute || '',
      isLive: (m.status?.description || '').toLowerCase().includes('live') || m.isLive || false
    }));

    return NextResponse.json(matches, { headers: { 'Cache-Control': 'no-store' } });
  } catch (e) {
    return NextResponse.json([], { status: 200 });
  }
}
