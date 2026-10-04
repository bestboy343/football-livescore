// @ts-nocheck
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const now = new Date();
    const yyyymmdd = now.toISOString().split('T')[0].replace(/-/g, '');
    const leagues = ['eng.1', 'esp.1', 'ita.1', 'ger.1', 'fra.1', 'ned.1', 'uefa.champions'];
    let allMatches: any[] = [];

    for (const league of leagues) {
      try {
        const res = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/${league}/scoreboard?dates=${yyyymmdd}`);
        const data = await res.json();
        const events = data.events || [];
        const leagueName = data.leagues?.[0]?.name || league;

        const mapped = events.map((e: any) => {
          const comp = e.competitions[0];
          const home = comp.competitors.find((c: any) => c.homeAway === 'home');
          const away = comp.competitors.find((c: any) => c.homeAway === 'away');
          return {
            id: e.id,
            league: leagueName,
            status: comp.status.type.detail,
            isLive: comp.status.type.state === 'in',
            homeTeam: home.team.displayName,
            homeLogo: home.team.logo || '',
            homeScore: home.score || '0',
            awayTeam: away.team.displayName,
            awayLogo: away.team.logo || '',
            awayScore: away.score || '0',
            time: comp.status.displayClock || comp.status.type.shortDetail,
          };
        });

        allMatches = [...allMatches,...mapped];
      } catch {}
    }

    if (allMatches.length === 0) {
      return NextResponse.json([
        { id: '1', league: 'Premier League', status: "Today - 15:00", isLive: false, homeTeam: 'Man City', homeLogo: '', homeScore: '0', awayTeam: 'Arsenal', awayLogo: '', awayScore: '0', time: "15:00" },
        { id: '2', league: 'La Liga', status: "Today - 18:00", isLive: false, homeTeam: 'Real Madrid', homeLogo: '', homeScore: '0', awayTeam: 'Barcelona', awayLogo: '', awayScore: '0', time: "18:00" },
      ]);
    }

    return NextResponse.json(allMatches);
  } catch (error) {
    return NextResponse.json([
      { id: '1', league: 'Premier League', status: "Today - 15:00", isLive: false, homeTeam: 'Man City', homeLogo: '', homeScore: '0', awayTeam: 'Arsenal', awayLogo: '', awayScore: '0', time: "15:00" },
    ]);
  }
}
