import { NextResponse } from "next/server";

export async function GET(){
  try{
    const res = await fetch("https://highlightly.net/api/football/matches?limit=40",{
      headers:{ "x-api-key": process.env.HIGHLIGHTLY_KEY! },
      cache:"no-store"
    });
    
    const json = await res.json();
    console.log("Highlightly raw:", JSON.stringify(json).slice(0,500));
    
    const list = json.data || json.matches || json.result || [];
    
    const formatted = list.map((m:any, i:number)=>({
      id: m.id || m.match_id || i,
      league: m.league?.name || m.competition_name || m.league_name || "Football",
      homeTeam: m.home_team?.name || m.homeTeam?.name || m.teams?.home?.name || m.home_name || "Home",
      awayTeam: m.away_team?.name || m.awayTeam?.name || m.teams?.away?.name || m.away_name || "Away",
      score: {
        home: m.score?.home ?? m.home_score ?? m.goals?.home ?? 0,
        away: m.score?.away ?? m.away_score ?? m.goals?.away ?? 0,
        display: m.score_string || `${m.home_score ?? 0} - ${m.away_score ?? 0}`
      },
      minute: m.minute || m.time || "",
      status: m.status || "",
      isLive: (m.status || "").toLowerCase().includes("live") || m.is_live
    }));
    
    return NextResponse.json(formatted);
  }catch(e:any){
    console.log("API ERROR:", e);
    return NextResponse.json([]);
  }
}
