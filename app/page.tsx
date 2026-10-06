"use client"
import { useEffect, useState } from "react"
export default function Page(){
  const [games,setGames]=useState<any[]>([])
  useEffect(()=>{fetch("/api/live").then(r=>r.json()).then(d=>setGames(d.response||[]))},[])
  const g:any={}; games.forEach((x:any)=>{const k=`${x.league.country}: ${x.league.name}`; if(!g[k]) g[k]=[]; g[k].push(x)})
  return(
    <div style={{background:"white",color:"black",fontFamily:"Arial"}}>
      <div style={{background:"black",color:"white",padding:"10px",fontWeight:"bold"}}>BESTSCORE - {games.length} LIVE</div>
      {Object.entries(g).map(([t,l]:any)=>(
        <div key={t}>
          <div style={{background:"#222",color:"white",padding:"5px 8px",fontSize:12}}>{(t as string).toUpperCase()}</div>
          {l.map((m:any)=><div key={m.fixture.id} style={{display:"flex",padding:"7px 8px",borderBottom:"1px solid #eee",fontSize:13}}><span style={{width:50}}>{new Date(m.fixture.date).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span><span style={{flex:1}}>{m.teams.home.name} - {m.teams.away.name}</span><span style={{fontWeight:"bold"}}>{m.goals.home}-{m.goals.away}</span></div>)}
        </div>
      ))}
      {games.length===0&&<div style={{padding:20}}>Loading live games with country+time...</div>}
    </div>
  )
}
