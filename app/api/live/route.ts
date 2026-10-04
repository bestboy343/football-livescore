export const dynamic = 'force-dynamic';

let cache:any = null;
let lastFetch = 0;

export async function GET() {
  if(cache && Date.now() - lastFetch < 90000) return Response.json(cache);

  try {
    const today = new Date().toISOString().split('T')[0]; // 2026-10-04

    const res = await fetch(`https://sports.highlightly.net/football/matches?date=${today}`, {
      headers: {
        'x-rapidapi-key': process.env.HIGHLIGHTLY_KEY!,
        'x-api-key': process.env.HIGHLIGHTLY_KEY!
      },
      cache: 'no-store'
    });

    if(!res.ok) throw new Error(`Highlightly ${res.status}`);

    const json = await res.json();
    const raw = json.data || json.matches || json || [];
    console.log('Highlightly got', raw.length, 'matches');

    // Only live games, or show all today if no live filter
    const live = raw.filter((m:any) => {
      const st = (m.state?.description || m.status || '').toLowerCase();
      return st.includes('live') || st.includes('inplay') || st.includes('1st') || st.includes('2nd') || m.state?.clock || m.isLive;
    });

    const list = (live.length? live : raw).map((m:any) => ({
      country: m.country?.name || m.league?.country || m.league?.name?.split(' ')[0] || 'World',
      flag: m.country?.flag || null,
      league: m.league?.name || 'Football',
      home: m.homeTeam?.name || m.home?.name,
      away: m.awayTeam?.name || m.away?.name,
      score: m.state?.score?.current || `${m.homeTeam?.score?? 0}-${m.awayTeam?.score?? 0}`,
      minute: m.state?.clock || m.state?.description || 'LIVE'
    })).filter((x:any)=>x.home && x.away);

    cache = list;
    lastFetch = Date.now();
    return Response.json(list);

  } catch(e:any){
    console.error(e);
    return Response.json(cache || [{error: e.message}]);
  }
}
