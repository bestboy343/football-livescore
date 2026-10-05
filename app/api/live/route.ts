export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
export async function GET() {
  const matches = [
    { id: '1', league: 'Premier League - LIVE', homeTeam: 'Arsenal', awayTeam: 'Man City', score: { home: 2, away: 1, display: '2 - 1' }, status: 'Live', minute: "78'", isLive: true },
    { id: '2', league: 'La Liga - LIVE', homeTeam: 'Barcelona', awayTeam: 'Real Madrid', score: { home: 1, away: 1, display: '1 - 1' }, status: 'Live', minute: "54'", isLive: true },
    { id: '3', league: 'Bundesliga - LIVE', homeTeam: 'Bayern', awayTeam: 'Dortmund', score: { home: 3, away: 2, display: '3 - 2' }, status: 'Live', minute: "89'", isLive: true },
  ];
  return NextResponse.json(matches, { headers: { 'Cache-Control': 'no-store' } });
}
