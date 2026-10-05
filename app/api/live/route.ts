export const dynamic='force-dynamic';
import {NextResponse} from 'next/server';
export async function GET(){
  try{
    const headers={'x-rapidapi-key':process.env.HIGHLIGHTLY_API_KEY as string,'x-rapidapi-host':'soccer.highlightly.net'};
    const r=await fetch('https://soccer.highlightly.net/football/games/today',{headers,cache:'no-store'});
    const j=await r.json();
    const raw=j.data||[];
    const matches=raw.map((m:any)=>({
      id:m.id,
      league:m.league?.name||'League',
      home:m.homeTeam?.name||'Home',
      away:m.awayTeam?.name||'Away',
      score:{display:m.state?.score?.current||'0 - 0'},
      status:m.state?.description||'Live',
      minute:m.state?.clock||''
    }));
    return NextResponse.json({matches});
  }catch(e:any){return NextResponse.json({matches:[]})}
}
