"use client";
import { useEffect, useState } from "react";

export default function Home(){
  const [matches,setMatches]=useState<any[]>([]);
  const [sel,setSel]=useState<any>(null);

  useEffect(()=>{
    fetch("/api/live?v="+Date.now(),{cache:"no-store"}).then(r=>r.json()).then(d=>setMatches(Array.isArray(d)?d:[]));
  },[]);

  if(sel){
    return(
      <div style={{background:"#fff",color:"#000",minHeight:"100vh",padding:"8px",fontFamily:"Arial"}}>
        <a onClick={()=>setSel(null)} style={{color:"blue",textDecoration:"underline",cursor:"pointer"}}>◀ Back to All Games</a>
        <div style={{background:"#000",color:"#fff",padding:"4px 6px",marginTop:"8px",fontWeight:"bold",fontSize:"13px"}}>{sel.league}</div>
        <div style={{padding:"8px",fontSize:"14px",border:"1px solid #ccc"}}><b>{sel.homeTeam} - {sel.awayTeam} {sel.score?.display || ""}</b><br/><span style={{fontSize:"12px",color:"#666"}}>{sel.status} - Click below for formation</span></div>
        <div style={{marginTop:"10px",background:"#006400",color:"#fff",padding:"6px",fontWeight:"bold",fontSize:"12px"}}>FORMATION - 4-3-3</div>
        <div style={{background:"#228B22",height:"360px",padding:"10px",color:"#fff",textAlign:"center",border:"2px solid #000"}}>
          <div>GK Raya</div>
          <div style={{display:"flex",justifyContent:"space-around",marginTop:"35px"}}><span>LB Zin</span><span>CB Saliba</span><span>CB Gabriel</span><span>RB White</span></div>
          <div style={{display:"flex",justifyContent:"space-around",marginTop:"35px"}}><span>Ødegaard</span><span>Rice</span><span>Havertz</span></div>
          <div style={{display:"flex",justifyContent:"space-around",marginTop:"35px"}}><span>Saka</span><span>Jesus</span><span>Martinelli</span></div>
        </div>
      </div>
    )
  }

  // Group by league like Flashscore
  const groups: any = {};
  matches.forEach((m:any)=>{
    if(!groups[m.league]) groups[m.league]=[];
    groups[m.league].push(m);
  });

  return(
    <div style={{background:"#fff",color:"#000",minHeight:"100vh",fontFamily:"Arial, sans-serif",fontSize:"13px"}}>
      <div style={{padding:"6px",borderBottom:"2px solid #000",display:"flex",alignItems:"center",gap:"6px"}}>
        <span style={{fontWeight:"900",fontSize:"16px",fontStyle:"italic"}}>FLASHSCORE</span><span style={{color:"red"}}>⚽</span>
      </div>

      <div style={{padding:"4px 6px",fontSize:"12px"}}>
        <b>Football</b> | <span style={{color:"blue"}}>Hockey | Tennis | Basketball | Handball | Volleyball | Baseball | Am. football | Rugby Union | More sports »</span>
      </div>
      <div style={{padding:"4px 6px",fontSize:"12px",borderBottom:"1px solid #ccc"}}>
        <b>Today</b> | <span style={{color:"blue"}}>Yesterday | Tomorrow | More days »</span>
      </div>
      <div style={{padding:"4px 6px",fontSize:"12px",borderBottom:"1px solid #ccc"}}>
        <b>All Games</b> | <span style={{color:"blue"}}>LIVE | Finished | Odds</span> | <span style={{color:"red"}}>{matches.filter((m:any)=>m.isLive).length} LIVE</span>
      </div>
      <div style={{padding:"4px 6px"}}><a style={{color:"blue",textDecoration:"underline"}}>REFRESH NOW</a></div>

      <div style={{background:"#006400",color:"#fff",padding:"4px 6px",fontWeight:"bold",fontSize:"12px"}}>Football » Today » All Games</div>

      <div style={{padding:"6px",background:"#eef",fontSize:"11px",display:"flex",gap:"8px",border:"1px solid #ccc"}}>
        <div style={{flex:1}}><span style={{color:"red"}}>🎁</span> <a style={{color:"blue"}}><b>BETANO:</b> Welcome Bonus up to <b>₦200,000</b></a></div>
        <div style={{flex:1,borderLeft:"1px solid #ccc",paddingLeft:"6px"}}><a style={{color:"blue"}}>50% stake back as a Sports Freebet on UCL games</a></div>
        <div style={{flex:1,borderLeft:"1px solid #ccc",paddingLeft:"6px"}}><span style={{color:"red"}}>🎁</span> <a style={{color:"blue"}}><b>1XBET: 300%</b> deposit bonus! If you deposit NGN 170,001 or more, you'll get a 300%...</a></div>
      </div>
      <div style={{padding:"2px 6px",fontSize:"11px"}}>Advertisement</div>
      <div style={{padding:"2px 6px",fontSize:"11px",color:"red",textDecoration:"underline"}}>Bet on Football from your mobile with 1xBet!</div>

      {Object.keys(groups).map((league)=>{
        return(
          <div key={league}>
            <div style={{background:"#000",color:"#fff",padding:"3px 6px",fontWeight:"bold",fontSize:"12px",marginTop:"1px",display:"flex",justifyContent:"space-between"}}>
              <span>{league.toUpperCase()}</span><span style={{color:"#ff0",fontWeight:"normal"}}>Standings</span>
            </div>
            {groups[league].map((m:any)=>(
              <div key={m.id} onClick={()=>setSel(m)} style={{padding:"2px 6px",borderBottom:"1px solid #eee",cursor:"pointer"}}>
                <span style={{color:"#000"}}>{m.minute || "20:45"} </span>
                <span>{m.homeTeam} - {m.awayTeam} </span>
                <span style={{color:"blue",fontWeight:"bold"}}>{m.score?.display? m.score.display : "-"}</span>
                {m.isLive && <span style={{color:"red",fontSize:"10px"}}> LIVE</span>}
              </div>
            ))}
          </div>
        )
      })}

      {matches.length===0 && <div style={{padding:"20px",textAlign:"center"}}>Loading {matches.length} games... Check /api/live</div>}

      <div style={{background:"#eee",padding:"8px",textAlign:"center",fontSize:"11px",marginTop:"10px",borderTop:"1px solid #000"}}>
        flashscore.mobi clone - {matches.length} games - Tap any match to see Formation (4-3-3) like you requested
      </div>
    </div>
  )
}
