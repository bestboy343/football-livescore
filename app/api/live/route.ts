export const dynamic='force-dynamic';
import { NextResponse } from 'next/server';

export async function GET(){
  const KEY=process.env.HIGHLIGHTLY_API_KEY;
  if(!KEY){
    return NextResponse.json([]);
  }
  const today=new Date().toISOString().split('T')[0];
  const url=`https://football.highlightly.net/matches?date=${today}&limit=20`;
  try{
    const res=await fetch(url,{
      headers:{'x-api-key':KEY},
      cache:'no-store'
    });
    const json=await res.json();
    const data=json.data||[];
    const out=data.map((m:any)=>{
      const live=m.state?.state==='in';
      return{
        id:m.id,
        league:m.league?.name||'Football',
        homeTeam:m.homeTeam?.name||'Home',
        awayTeam:m.awayTeam?.name||'Away',
        score:{
          home:0,
          away:0,
          display:m.state?.score?.current||'0 - 0'
        },
        status:m.state?.description||'Live',
        minute:m.state?.clock||'',
        isLive:live
      }
    });
    return NextResponse.json(out,{
      headers:{'Cache-Control':'no-store'}
    });
  }catch(e){
    return NextResponse.json([],{
      headers:{'Cache-Control':'no-store'}
    });
  }
}
