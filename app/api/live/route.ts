import { NextResponse } from "next/server";

export async function GET(){
  const fallback = [
    {id:1,league:"Premier League",homeTeam:"Arsenal",awayTeam:"Man City",score:{home:2,away:1,display:"2 - 1"},status:"LIVE",isLive:true,minute:"67'"},
    {id:2,league:"La Liga",homeTeam:"Real Madrid",awayTeam:"Barcelona",score:{home:1,away:1,display:"1 - 1"},status:"LIVE",isLive:true,minute:"54'"},
    {id:3,league:"Serie A",homeTeam:"Inter",awayTeam:"AC Milan",score:{home:0,away:0,display:"0 - 0"},status:"LIVE",isLive:true,minute:"12'"},
    {id:4,league:"Bundesliga",homeTeam:"Bayern",awayTeam:"Dortmund",score:{home:3,away:2,display:"3 - 2"},status:"LIVE",isLive:true,minute:"78'"},
  ];

  try{
    const key = process.env.HIGHLIGHTLY_KEY;
    if(!key){
      console.log("NO KEY - using fallback");
      return NextResponse.json(fallback);
    }
    const r = await fetch("https://api.highlightly.net/football/matches/live",{
      headers:{"x-api-key":key},
      cache:"no-store"
    });
    const j = await r.json();
    const list = j.data || j.matches || [];
    if(list && list.length>0){
      return NextResponse.json(list.slice(0,30).map((m:any,i:number)=>({
        id:m.id||i,
        league:m.league?.name||"Football",
        homeTeam:m.home_team?.name||m.teams?.home?.name||"Home",
        awayTeam:m.away_team?.name||m.teams?.away?.name||"Away",
        score:{home:m.home_score??0, away:m.away_score??0, display:`${m.home_score??0} - ${m.away_score??0}`},
        status:"LIVE", isLive:true, minute:m.minute||"LIVE"
      })));
    }
    return NextResponse.json(fallback);
  }catch(e){
    return NextResponse.json(fallback);
  }
}
