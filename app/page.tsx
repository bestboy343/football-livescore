"use client";
import { useState, useEffect } from "react";

export default function Home(){
  const [matches,setMatches]=useState<any[]>([]);
  const [sel,setSel]=useState<any>(null);
  useEffect(()=>{
    fetch("/api/live").then(r=>r.json()).then(d=>setMatches(d));
  },[]);
  if(sel){
    return(
      <div style={{background:"#0a0a0a",color:"#fff",minHeight:"100vh",padding:"12px"}}>
        <button onClick={()=>setSel(null)} style={{padding:"8px 16px",borderRadius:"20px"}}>Back</button>
        <h2 style={{marginTop:"12px"}}>{sel.homeTeam} vs {sel.awayTeam}</h2>
        <p style={{color:"#888"}}>{sel.league}</p>
        <div style={{background:"#15803d",height:"350px",borderRadius:"12px",marginTop:"12px",padding:"12px",border:"2px solid #fff"}}>
          <div style={{textAlign:"center"}}>GK</div>
          <div style={{display:"flex",justifyContent:"space-around",marginTop:"40px"}}><span>LB</span><span>CB</span><span>CB</span><span>RB</span></div>
          <div style={{display:"flex",justifyContent:"space-around",marginTop:"40px"}}><span>CM</span><span>CM</span><span>CM</span></div>
          <div style={{display:"flex",justifyContent:"space-around",marginTop:"40px"}}><span>LW</span><span>ST</span><span>RW</span></div>
        </div>
        <div style={{marginTop:"10px",background:"#171717",padding:"10px",borderRadius:"8px"}}>Formation 4-3-3 - Timeline - Stats - Bracket - Transfers - Trophies</div>
      </div>
    )
  }
  return(
    <div style={{background:"#0a0a0a",color:"#fff",minHeight:"100vh",padding:"10px"}}>
      <h1>FOOTBALL LIVE</h1>
      <p style={{color:"#888",fontSize:"12px"}}>Tap match to see Formation</p>
      {matches.map((m:any)=>(
        <div key={m.id} onClick={()=>setSel(m)} style={{background:"#171717",padding:"12px",marginTop:"8px",borderRadius:"10px"}}>
          <div>{m.homeTeam} vs {m.awayTeam}</div>
          <div style={{fontSize:"11px",color:"#22c55e"}}>Tap for details</div>
        </div>
      ))}
    </div>
  )
}
