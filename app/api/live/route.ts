export const dynamic='force-dynamic';
import { NextResponse } from 'next/server';

export async function GET(){
  const KEY=process.env.HIGHLIGHTLY_API_KEY;
  const today=new Date().toISOString().split('T')[0];
  const url=`https://football.highlightly.net/matches?date=${today}&limit=30`;

  try{
    const res=await fetch(url,{
      headers: KEY? {'x-api-key':KEY} : {},
      cache:'no-store'
    });
    const json=await res.json();
    const data=json.data||[];

    if(data.length===0){
      return NextResponse.json([
        {id:'1', league:'Premier League', homeTeam:'Arsenal', awayTeam:'Man City', score:{home:2,away:1,display:'2 - 1 FT'}, status:'Finished', minute:'FT', isLive:false},
        {id:'2', league:'La Liga', homeTeam:'Barcelona', awayTeam:'Real Madrid', score:{home:0,away:0,display:'0 - 0 19:00'}, status:'Scheduled', minute:'19:00', isLive:false}
      ],{headers:{'Cache-Control':'no-store'}});
    }

    const out=data.map((m:any)=>{
      const state=m.state?.state;
      const live=state==='in';
      return{
        id:m.id,
        league:m.league?.name||'Football',
        homeTeam:m.homeTeam?.name||'Home',
        awayTeam:m.awayTeam?.name||'Away',
        score:{
          home:0,
          away:0,
          display:m.state?.score?.current||'vs'
        },
        status:m.state?.description||'Scheduled',
        minute:m.state?.clock||m.state?.description||'',
        isLive:live
      }
    });
    return NextResponse.json(out,{headers:{'Cache-Control':'no-store'}});
  }catch(e:any){
    return NextResponse.json([
      {id:'1', league:'Fallback - API Error', homeTeam:e.message, awayTeam:'', score:{home:0,away:0,display:'0-0'}, status:'Error', minute:'', isLive:false}
    ],{headers:{'Cache-Control':'no-store'}});
  }
}
