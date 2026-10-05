export const dynamic='force-dynamic';
import { NextResponse } from 'next/server';

export async function GET(){
  const KEY=process.env.HIGHLIGHTLY_API_KEY;
  if(!KEY){
    return NextResponse.json([],{headers:{'Cache-Control':'no-store'}});
  }
  const today=new Date().toISOString().split('T')[0];
  const url=`https://sports.highlightly.net/football/matches?date=${today}&limit=30`;
  try{
    const res=await fetch(url,{
      headers:{
        'x-rapidapi-key':KEY,
        'x-api-key':KEY
      },
      cache:'no-store'
    });
    if(!res.ok){
      throw new Error('status '+res.status);
    }
    const json=await res.json();
    const data=json.data||json.matches||[];
    if(data.length===0){
      return NextResponse.json([],{headers:{'Cache-Control':'no-store'}});
    }
    const out=data.map((m:any)=>{
      return{
        id:m.id,
        league:m.league?.name||'Football',
        homeTeam:m.homeTeam?.name||'Home',
        awayTeam:m.awayTeam?.name||'Away',
        score:{home:0,away:0,display:m.state?.score?.current||'vs'},
        status:m.state?.description||'Scheduled',
        minute:m.state?.clock||'',
        isLive:m.state?.state==='in'
      }
    });
    return NextResponse.json(out,{headers:{'Cache-Control':'no-store'}});
  }catch(e:any){
    return NextResponse.json([{id:'err',league:'Error: '+e.message,homeTeam:'',awayTeam:'',score:{home:0,away:0,display:'0-0'},status:'Error',minute:'',isLive:false}],{headers:{'Cache-Control':'no-store'}});
  }
}
