export const dynamic='force-dynamic';
import {NextResponse} from 'next/server';

export async function GET(){
  try{
    const key = process.env.HIGHLIGHTLY_API_KEY;
    const headers={'x-rapidapi-key': key!,'x-rapidapi-host':'soccer.highlightly.net'};

    // 1. Get ALL today - like Flashscore does
    let res = await fetch('https://soccer.highlightly.net/football/games/today',{headers,cache:'no-store'});
    let data = await res.json();
    let raw = data.data || [];

    if(raw.length===0){
      res = await fetch('https://soccer.highlightly.net/football/matches?state=today',{headers,cache:'no-store'});
      data = await res.json();
      raw = data.data || data.matches || [];
    }

    const matches = raw.map((m:any)=>({
      id: m.id,
      country: m.league?.country?.name || m.league?.country || 'World',
      league: m.league?.name || 'League',
      home: m.homeTeam?.name || 'Home',
      away: m.awayTeam?.name || 'Away',
      score: {
        home: m.homeTeam?.score?? m.homeScore?.current?? m.state?.score?.current?.split("-")[0]?? 0,
        away: m.awayTeam?.score?? m.awayScore?.current?? m.state?.score?.current?.split("-")[1]?? 0,
        display: m.state?.score?.current || `${m.homeTeam?.score??0} - ${m.awayTeam?.score??0}`
      },
      status: m.state?.clock || m.status?.description || 'Live',
      isLive:!!m.state?.clock
    })).sort((a:any,b:any)=> (b.isLive?1:0)-(a.isLive?1:0));

    return NextResponse.json({matches, count: matches.length});
  }catch(e:any){
    return NextResponse.json({matches: [], error: e.message});
  }
}
