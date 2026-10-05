"use client";
import { useEffect, useState } from "react";

export default function Home(){
  const [matches,setMatches]=useState<any[]>([]);
  const [sel,setSel]=useState<any>(null);
  const [time,setTime]=useState("");

  useEffect(()=>{
    setTime(new Date().toLocaleTimeString());
    fetch("/api/live?v="+Date.now(),{cache:"no-store"}).then(r=>r.json()).then(d=>setMatches(Array.isArray(d)?d:[]));
    const i=setInterval(()=>setTime(new Date().toLocaleTimeString()),10000);
    return()=>clearInterval(i);
  },[]);

  if(sel){
    return(
      <div style={{background:"#0a0a0a",color:"#fff",minHeight:"100vh",padding:"12px"}}>
        <button onClick={()=>setSel(null)} style={{background:"#222",color:"#fff",border:"none",padding:"8px 16px",borderRadius:"20px"}}>← Back</button>
        <h2 style={{marginTop:"12px"}}>{sel.homeTeam} vs {sel.awayTeam}</h2>
        <div style={{background:"#16a34a",padding:"12px",borderRadius:"12px",marginTop:"12px",textAlign:"center"}}>
          <div style={{fontSize:"32px",fontWeight:"900"}}>{sel.score?.display || "0 - 0"}</div>
          <div style={{fontSize:"12px",marginTop:"6px"}}>{sel.status} {sel.minute && `${sel.minute}'`}</div>
        </div>
        <div style={{background:"#15803d",height:"320px",borderRadius:"12px",marginTop:"12px",padding:"10px",border:"2px solid #fff",textAlign:"center"}}>FORMATION 4-3-3 PITCH HERE</div>
      </div>
    )
  }

  return(
    <div style={{background:"#f5f5f5",color:"#000",minHeight:"100vh",fontFamily:"Arial"}}>
      <div style={{background:"#0a0a0a",color:"#fff",padding:"12px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{fontWeight:"900",fontSize:"18px"}}>⚽ BESTBOY LIVESCORE</div><div style={{fontSize:"11px",color:"#aaa"}}>{time} • {matches.length} Matches Today</div></div>
        <div style={{background:"#22c55e",color:"#000",padding:"6px 12px",borderRadius:"20px",fontWeight:"900",fontSize:"12px"}}>{matches.filter((m:any)=>m.isLive).length} LIVE</div>
      </div>

      <div style={{padding:"8px",display:"grid",gap:"10px"}}>
        {matches.map((m:any)=>(
          <div key={m.id} onClick={()=>setSel(m)} style={{background:"#fff",borderRadius:"10px",padding:"12px",boxShadow:"0 1px 3px rgba(0,0,0,0.1)",borderLeft:m.isLive?"4px solid #22c55e":"4px solid #e5e7eb",cursor:"pointer"}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:"11px",color:"#888",marginBottom:"8px"}}>
              <span style={{fontWeight:"bold",color:"#000"}}>{m.league}</span>
              <span style={{color:m.isLive?"#16a34a":"#888",fontWeight:"bold"}}>{m.isLive?`● LIVE ${m.minute}'`:m.status || "FT"}</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",justifyContent:"space-between",padding:"4px 0"}}><span style={{fontWeight:m.score?.home>m.score?.away?"900":"500"}}>{m.homeTeam}</span><span style={{fontWeight:"900"}}>{m.score?.home ?? 0}</span></div>
                <div style={{display:"flex",justifyContent:"space-between",padding:"4px 0"}}><span style={{fontWeight:m.score?.away>m.score?.home?"900":"500"}}>{m.awayTeam}</span><span style={{fontWeight:"900"}}>{m.score?.away ?? 0}</span></div>
              </div>
              <div style={{marginLeft:"12px",background:"#f3f4f6",padding:"8px 10px",borderRadius:"8px",fontSize:"11px",color:"#16a34a",fontWeight:"bold"}}>Tap</div>
            </div>
          </div>
        ))}
        {matches.length===0 && <div style={{padding:"40px",textAlign:"center",color:"#888"}}>Loading live scores...</div>}
      </div>
    </div>
  )
}
