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
  function flashscoreTime(dateStr:string){
    const d = new Date(dateStr)
    let h = d.getUTCHours()+2; if(h>=24) h-=24
    return `${String(h).padStart(2,"0")}:${String(d.getUTCMinutes()).padStart(2,"0")}`
  }
  return(
    <div style={{background:"#000",color:"white",minHeight:"100vh",fontFamily:"Arial",fontSize:"14px"}}>
      {/* HEADER - FLASHCORE BLUE, NO RED */}
      <div style={{background:"#001e28",color:"white",padding:"12px",fontWeight:"900",textAlign:"center",position:"sticky",top:0,borderBottom:"2px solid #00b6e6"}}>
        BESTSCORE ● {games.length} LIVE - FLASHSCORE TIME
      </div>
      {Object.entries(groups).map(([title,list]:any)=>(
        <div key={title}>
          {/* LEAGUE TITLE - DARK BLUE */}
          <div style={{background:"#0f2d3d",padding:"7px 10px",fontSize:"12px",fontWeight:"bold",borderLeft:"4px solid #00b6e6",borderBottom:"1px solid #1a3d52",color:"#fff"}}>
            {(title as string).toUpperCase()}
          </div>
          {list.map((m:any)=>{
            const isLive = m.fixture.status.short==="LIVE"
            const tm = flashscoreTime(m.fixture.date)
            return(
              <div key={m.fixture.id} style={{display:"flex",padding:"10px",borderBottom:"1px solid #1a1a1a",background:isLive?"#0a232e":"#000"}}>
                <span style={{width:50,color:isLive?"#00ffcc":"#aaa"}}>{isLive?"LIVE":tm}</span>
                <span style={{flex:1}}>{m.teams.home.name} - {m.teams.away.name}</span>
                <span style={{fontWeight:"900",color:isLive?"#00ffcc":"#fff"}}>{m.goals.home}-{m.goals.away}</span>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
