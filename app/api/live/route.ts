export const dynamic='force-dynamic';
import {NextResponse} from 'next/server';
export async function GET(){
  try{
    const key = process.env.HIGHLIGHTLY_API_KEY;
    if(!key) return NextResponse.json({matches:[], error:'no key'});
    const headers={'x-rapidapi-key':key,'x-rapidapi-host':'soccer.highlightly.net'};
    
    // Try LIVE endpoint first, then TODAY
    let raw:any[] = [];
    try{
      const r1 = await fetch('https://soccer.highlightly.net/football/games/live',{headers, cache:'no-store'});
      const j1 = await r1.json();
      raw = j1.data||[];
    }catch{}
    
    if(raw.length===0){
      const r2 = await fetch('https://soccer.highlightly.net/football/games/today',{headers, cache:'no-store'});
      const j2 = await r2.json();
      raw = j2.data||[];
    }

    const matches = raw.map((m:any)=>({
      id:m.id,
      league: m.league?.name || m.competition?.name || 'Match',
      home: m.homeTeam?.name || m.home?.name || 'Home',
      away: m.awayTeam?.name || m.away?.name || 'Away',
      score:{display: m.state?.score?.current || `${m.homeTeam?.score??0} - ${m.awayTeam?.score??0}`},
      status: m.state?.description || m.status || 'Live',
      minute: m.state?.clock || m.minute || '',
      isLive: true
    }));
    // If live empty, show today's games anyway
    return NextResponse.json({matches});
  }catch(e:any){
    return NextResponse.json({matches:[]});
  }
}
