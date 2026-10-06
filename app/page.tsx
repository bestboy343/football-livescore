"use client"
import { useEffect, useState } from "react"
export default function Page(){
  const [games,setGames]=useState<any[]>([])
  useEffect(()=>{
    const load=()=>fetch("/api/live").then(r=>r.json()).then(d=>setGames(d.response||[]))
    load(); setInterval(load,30000)
  },[])

  const groups:any={}
  games.forEach((x:any)=>{
    const k=`${x.league.country}: ${x.league.name}`
    if(!groups[k]) groups[k]=[]
    groups[k].push(x)
  })

  function flashscoreTime(dateStr:string){
    // MATCH FLASHSCORE.MOBI = UTC+2 (CEST)
    const d = new Date(dateStr)
    let h = d.getUTCHours() + 2
    let m = d.getUTCMinutes()
    if(h >= 24) h -= 24
    return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`
  }

  return(
    <div style={{background:"black",color:"white",minHeight:"100vh",fontFamily:"Arial",fontSize:"14px"}}>
      <div style={{background:"#00b050",padding:"12px",fontWeight:"900",textAlign:"center",position:"sticky",top:0}}>
        BESTSCORE ● {games.length} LIVE - FLASHSCORE TIME
      </div>
      {Object.entries(groups).map(([title,list]:any)=>(
        <div key={title}>
          <div style={{background:"#111",padding:"7px 10px",fontSize:"12px",fontWeight:"bold",borderLeft:"4px solid #00b050",borderBottom:"1px solid #222"}}>
            {(title as string).toUpperCase()}
          </div>
          {list.map((m:any)=>{
            const isLive = m.fixture.status.short==="LIVE"
            const isFT = m.fixture.status.short==="FT"
            const tm = flashscoreTime(m.fixture.date)
            return(
              <div key={m.fixture.id} style={{display:"flex",padding:"10px",borderBottom:"1px solid #222"}}>
                <span style={{width:50,fontSize:"13px",color:isLive?"#00ff66":"#ccc"}}>{isLive?"LIVE":isFT?"FT":tm}</span>
                <span style={{flex:1}}>{m.teams.home.name} - {m.teams.away.name}</span>
                <span style={{fontWeight:"900",color:isLive?"#00ff66":"white"}}>{m.goals.home}-{m.goals.away}</span>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
