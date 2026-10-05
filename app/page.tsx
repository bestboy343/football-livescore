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
      <div style={{background:"#0a0a0a",color:"#fff",minHeight:"100vh",padding:"12px",fontFamily:"Arial"}}>
        <button onClick={()=>setSel(null)} style={{background:"#222",color:"#fff",border:"none",padding:"8px 16px",borderRadius:"20px"}}>Back</button>
        <h2 style={{marginTop:"12px"}}>{sel.homeTeam} vs {sel.awayTeam}</h2>
        <p style={{color:"#888",fontSize:"12px"}}>{sel.league}</p>
        <div style={{background:"#15803d",height:"360px",borderRadius:"12px",marginTop:"14px",padding:"14px",border:"2px solid #fff",textAlign:"center"}}>
          <div>GK</div>
          <div style={{display:"flex",justifyContent:"space-around",marginTop:"40px"}}><span>LB</span><span>CB</span><span>CB</span><span>RB</span></div>
          <div style={{display:"flex",justifyContent:"space-around",marginTop:"40px"}}><span>CM</span><span>CM</span><span>CM</span></div>
          <div style={{display:"flex",justifyContent:"space-around",marginTop:"40px"}}><span>LW</span><span>ST</span><span>RW</span></div>
        </div>
      </div>
    )
  }

  const groups:any={};
  matches.forEach((m:any)=>{
    if(!groups[m.league]) groups[m.league]=[];
    groups[m.league].push(m);
  });

  return(
    <div style={{background:"#0a0a0a",color:"#fff",minHeight:"100vh",fontFamily:"Arial",fontSize:"13px"}}>
      <div style={{background:"#16a34a",padding:"10px",fontWeight:"900",fontSize:"16px",display:"flex",justifyContent:"space-between"}}>
        <span>BESTBOY LIVESCORE</span><span style={{fontSize:"11px",background:"#fff",color:"#16a34a",padding:"4px 8px",borderRadius:"10px"}}>{matches.length} Games</span>
      </div>
      <div style={{padding:"6px 10px",fontSize:"12px",background:"#111",color:"#aaa",borderBottom:"1px solid #333"}}>
        YOUR OWN LIVESCORE - Tap any match for formation
      </div>
      {Object.keys(groups).map((league)=>(
        <div key={league}>
          <div style={{background:"#222",color:"#fff",padding:"5px 10px",fontWeight:"bold",fontSize:"11px",borderTop:"1px solid #333"}}>{league.toUpperCase()}</div>
          {groups[league].map((m:any)=>(
            <div key={m.id} onClick={()=>setSel(m)} style={{padding:"7px 10px",borderBottom:"1px solid #1a1a1a",display:"flex",justifyContent:"space-between",cursor:"pointer"}}>
              <span>{m.homeTeam} - {m.awayTeam}</span>
              <span style={{color:"#22c55e",fontWeight:"bold"}}>{m.score?.display || "vs"}</span>
            </div>
          ))}
        </div>
      ))}
      {matches.length===0 && <div style={{padding:"20px",textAlign:"center",color:"#888"}}>Loading your own livescore data from /api/live...</div>}
    </div>
  )
}
