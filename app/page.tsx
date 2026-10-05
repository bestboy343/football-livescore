"use client";
import { useState, useEffect } from "react";

type Match = {
  id: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  score: { home: number; away: number; display: string };
  status: string;
  time: string;
};

export default function Page() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [filter, setFilter] = useState<"ALL"|"LIVE"|"FINISHED">("LIVE");
  const [day, setDay] = useState("Today");

  useEffect(()=>{
    fetch("/api/live").then(r=>r.json()).then(d=>{
      if(Array.isArray(d)) setMatches(d);
    });
    const i = setInterval(()=>{
      fetch("/api/live").then(r=>r.json()).then(d=>{
        if(Array.isArray(d)) setMatches(d);
      });
    }, 60000);
    return ()=>clearInterval(i);
  },[day]);

  const filtered = matches.filter(m=>{
    if(filter==="LIVE") return m.status==="LIVE";
    if(filter==="FINISHED") return m.status==="FINISHED";
    return true;
  });

  // Group by league like Flashscore
  const groups: Record<string, Match[]> = {};
  filtered.forEach(m=>{
    if(!groups[m.league]) groups[m.league]=[];
    groups[m.league].push(m);
  });

  return (
    <div style={{fontFamily:"Arial, sans-serif", background:"#fff", color:"#000", minHeight:"100vh"}}>
      {/* TOP BLACK BAR */}
      <div style={{background:"#1a1a1a", color:"#fff", padding:"8px 10px", display:"flex", alignItems:"center"}}>
        <span style={{fontWeight:900, fontSize:20, fontStyle:"italic"}}>
          <span style={{color:"#ffcc00"}}>⚡</span>BESTBOY LIVESCORE
        </span>
      </div>

      {/* SPORTS MENU */}
      <div style={{padding:"6px 10px", fontSize:14, borderBottom:"1px solid #ccc", lineHeight:"20px"}}>
        <b>Football</b> | <span style={{color:"#0000cc"}}>Hockey</span> | <span style={{color:"#0000cc"}}>Tennis</span> | <span style={{color:"#0000cc"}}>Basketball</span> | <span style={{color:"#0000cc"}}>Handball</span> | <span style={{color:"#0000cc"}}>Volleyball</span> | <span style={{color:"#0000cc"}}>Baseball</span> | <span style={{color:"#0000cc"}}>Am. football</span> | <span style={{color:"#0000cc"}}>Rugby Union</span> | <span style={{color:"#0000cc"}}>More sports »</span>
      </div>

      {/* DAY MENU */}
      <div style={{padding:"6px 10px", fontSize:14, borderBottom:"1px solid #ccc"}}>
        <b onClick={()=>setDay("Today")} style={{cursor:"pointer"}}>Today</b> | <span style={{color:"#0000cc"}} onClick={()=>setDay("Yesterday")}>Yesterday</span> | <span style={{color:"#0000cc"}} onClick={()=>setDay("Tomorrow")}>Tomorrow</span> | <span style={{color:"#0000cc"}}>More days »</span>
      </div>

      {/* FILTER MENU */}
      <div style={{padding:"6px 10px", fontSize:14, borderBottom:"1px solid #ccc"}}>
        <span style={{color:filter==="ALL"?"#000":"#0000cc", fontWeight:filter==="ALL"?"bold":""}} onClick={()=>setFilter("ALL")}>All Games</span> |
        <span style={{color:"#cc0000", fontWeight:filter==="LIVE"?"bold":""}} onClick={()=>setFilter("LIVE")}> LIVE</span> |
        <span style={{color:filter==="FINISHED"?"#000":"#0000cc", fontWeight:filter==="FINISHED"?"bold":""}} onClick={()=>setFilter("FINISHED")}> Finished</span> |
        <span style={{color:"#0000cc"}}> Odds</span>
      </div>

      <div style={{padding:"8px 10px"}}>
        <a href="#" onClick={(e)=>{e.preventDefault(); location.reload()}} style={{color:"#0000cc", fontSize:14}}>REFRESH NOW</a>
      </div>

      {/* GREEN BAR - EXACT LIKE FLASHSCORE */}
      <div style={{background:"#2e7d32", color:"#fff", padding:"6px 10px", fontWeight:"bold", fontSize:14}}>
        Football » {day} » {filter}
      </div>

      {/* ADS */}
      <div style={{display:"flex", background:"#e3f2fd", fontSize:12, padding:6, gap:6, borderBottom:"1px solid #ccc"}}>
        <div style={{flex:1, border:"1px solid #ccc", background:"#fff", padding:4}}>
          <span style={{color:"#ff6600"}}>🎁</span> <b>BETANO:</b> Welcome Bonus up to <span style={{color:"#0000cc"}}>₦200,000</span>
        </div>
        <div style={{flex:1, border:"1px solid #ccc", background:"#fff", padding:4}}>
          50% stake back as a Sports Freebet on UCL games
        </div>
        <div style={{flex:1, border:"1px solid #ccc", background:"#fff", padding:4}}>
          <span style={{color:"#ff6600"}}>🎁</span> <b>1XBET:</b> 300% deposit bonus! If you deposit NGN 170,001 or more, you'll get a 300%...
        </div>
      </div>
      <div style={{padding:"4px 10px", fontSize:12}}>
        Advertisement<br/>
        <a style={{color:"#0000cc"}}>Bet on Football from your mobile with 1xBet!</a>
      </div>

      {/* MATCHES BY LEAGUE */}
      {Object.keys(groups).length===0 && (
        <div style={{padding:20, textAlign:"center", fontSize:14}}>Loading scores... {matches.length} games loaded</div>
      )}

      {Object.entries(groups).map(([league, games])=>(
        <div key={league}>
          <div style={{background:"#000", color:"#fff", padding:"5px 10px", fontSize:13, fontWeight:"bold", display:"flex", justifyContent:"space-between"}}>
            <span>{league.toUpperCase()}</span>
            <span style={{fontWeight:"normal", textDecoration:"underline", cursor:"pointer"}}>Standings</span>
          </div>
          {games.map(g=>(
            <div key={g.id} style={{padding:"4px 10px", borderBottom:"1px solid #ddd", fontSize:13, display:"flex", gap:6}}>
              <span style={{minWidth:35, color:g.status==="LIVE"?"#000":"#666"}}>{g.time || (g.status==="FINISHED"?"FT":g.status)}'</span>
              <span style={{flex:1}}>{g.homeTeam} - {g.awayTeam} <b style={{color:"#cc0000"}}>{g.score.display}</b></span>
            </div>
          ))}
        </div>
      ))}

      <div style={{padding:"10px", textAlign:"center"}}>
        <a href="#" style={{color:"#0000cc", fontSize:14}}>Bet on Football from your mobile with 1xBet!</a>
      </div>

      <div style={{padding:"8px 10px"}}>
        <a style={{color:"#0000cc", fontSize:14}}>REFRESH NOW</a>
      </div>

      <div style={{background:"#eee", padding:"6px 10px", fontSize:13, borderTop:"1px solid #ccc"}}>
        <b>Football</b> | <span style={{color:"#0000cc"}}>Hockey</span> | <span style={{color:"#0000cc"}}>Tennis</span> | <span style={{color:"#0000cc"}}>Basketball</span> | <span style={{color:"#0000cc"}}>Handball</span> | <span style={{color:"#0000cc"}}>Volleyball</span> | <span style={{color:"#0000cc"}}>Baseball</span> | Am. football | Rugby Union | More sports »
      </div>

      <div style={{padding:20, textAlign:"center", fontSize:12, color:"#666"}}>
        BESTBOY LIVESCORE - Flashscore Clone<br/>
        {filtered.length} games • {groups? Object.keys(groups).length : 0} leagues
      </div>
    </div>
  );
}
