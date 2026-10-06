"use client"
import { useEffect, useState } from "react"

export default function Page(){
  const [games,setGames]=useState<any[]>([])
  useEffect(()=>{fetch("/api/live").then(r=>r.json()).then(d=>setGames(d.response||[])); const i=setInterval(()=>fetch("/api/live").then(r=>r.json()).then(d=>setGames(d.response||[])),30000); return()=>clearInterval(i)},[])

  const groups:any={}
  games.forEach((x:any)=>{const k=`${x.league.country}: ${x.league.name}`; if(!groups[k]) groups[k]=[]; groups[k].push(x)})

  return(
    <div style={{background:"black",color:"white",minHeight:"100vh",fontFamily:"Arial",fontSize:"14px"}}>
      {/* HEADER GREEN & BLACK */}
      <div style={{background:"linear-gradient(90deg,#00b050,#009140)",color:"white",padding:"12px",fontWeight:"900",textAlign:"center",letterSpacing:"1px",position:"sticky",top:0,zIndex:10}}>
        BESTSCORE ● {games.length} LIVE
      </div>

      {Object.entries(groups).map(([title,list]:any)=>(
        <div key={title}>
          {/* LEAGUE TITLE - BLACK WITH GREEN LINE */}
          <div style={{background:"#111",color:"white",padding:"7px 10px",fontWeight:"bold",fontSize:"12px",borderLeft:"4px solid #00b050",borderBottom:"1px solid #222"}}>
            {(title as string).toUpperCase()}
          </div>
          {list.map((m:any)=>{
            const isLive = m.fixture.status.short==="LIVE" || m.fixture.status.short.includes("'")
            const isFT = m.fixture.status.short==="FT"
            const tm = new Date(m.fixture.date).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})
            return(
              <div key={m.fixture.id} style={{display:"flex",padding:"10px",borderBottom:"1px solid #222",background:isLive?"#0a1a0a":"#000"}}>
                <span style={{width:55,fontSize:"12px",color:isLive?"#00ff66":isFT?"#888":"#aaa",fontWeight:isLive?"bold":"normal"}}>
                  {isLive?"● LIVE":isFT?"FT":tm}
                </span>
                <span style={{flex:1,color:"white"}}>{m.teams.home.name} - {m.teams.away.name}</span>
                <span style={{fontWeight:"900",color:isLive?"#00ff66":"white",minWidth:40,textAlign:"right"}}>
                  {m.goals.home}-{m.goals.away}
                </span>
              </div>
            )
          })}
        </div>
      ))}
      {games.length===0&&<div style={{padding:20,textAlign:"center",color:"#888"}}>Loading green & black livescores...</div>}
    </div>
  )
}
