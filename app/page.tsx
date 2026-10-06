"use client"
import { useEffect, useState } from "react"
export default function Page(){
  const [games,setGames]=useState<any[]>([])
  useEffect(()=>{
    const load=()=>fetch("/api/live").then(r=>r.json()).then(d=>setGames(d.response||[]))
    load(); setInterval(load,30000)
  },[])
  const groups:any={}
  games.forEach((x:any)=>{const k=`${x.league.country}: ${x.league.name}`; if(!groups[k]) groups[k]=[]; groups[k].push(x)})
  function flashscoreTime(s:string){
    const d=new Date(s); let h=d.getUTCHours()+2; if(h>=24) h-=24
    return `${String(h).padStart(2,"0")}:${String(d.getUTCMinutes()).padStart(2,"0")}`
  }
  return(
    <div style={{background:"#000",color:"white",minHeight:"100vh",fontFamily:"Arial"}}>
      <style>{`@keyframes blink{0%{opacity:1}50%{opacity:0.3}100%{opacity:1}}.blink{animation:blink 1s infinite}`}</style>

      <div style={{background:"#001e28",padding:"14px",fontWeight:"900",textAlign:"center",position:"sticky",top:0,borderBottom:"3px solid #00b6e6",fontSize:"16px",letterSpacing:"1px"}}>
        BESTSCORE ● {games.length} LIVE
      </div>

      {Object.entries(groups).map(([title,list]:any)=>(
        <div key={title}>
          <div style={{background:"#0f2d3d",padding:"8px 12px",fontSize:"13px",fontWeight:"800",borderLeft:"5px solid #00b6e6",borderBottom:"1px solid #1a3d52",color:"#e0f7ff"}}>
            {(title as string).toUpperCase()}
          </div>
          {list.map((m:any)=>{
            const isLive=m.fixture.status.short==="LIVE"
            return(
              <div key={m.fixture.id} style={{display:"flex",alignItems:"center",padding:"12px 10px",borderBottom:"1px solid #151515",background:isLive?"#0a2e3d":"#000"}}>
                <span className={isLive?"blink":undefined} style={{width:52,fontSize:"13px",fontWeight:"900",color:isLive?"#00ff88":"#9aa5b1"}}>{isLive?"● LIVE":flashscoreTime(m.fixture.date)}</span>
                <span style={{flex:1,fontSize:"15px",fontWeight:isLive?"800":"600",marginLeft:"8px",color:isLive?"#fff":"#e8e8e8"}}>{m.teams.home.name} - {m.teams.away.name}</span>
                <span style={{fontWeight:"900",fontSize:"15px",background:isLive?"#00ff88":"#1a1a1a",color:isLive?"#001e28":"#fff",padding:"3px 8px",borderRadius:"4px",minWidth:"32px",textAlign:"center"}}>{m.goals.home}-{m.goals.away}</span>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
