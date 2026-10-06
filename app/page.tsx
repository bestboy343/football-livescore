"use client"
import {useEffect,useState} from "react"
export default function Page(){
  const [games,setGames]=useState<any[]>([])
  useEffect(()=>{
    fetch("/api/live").then(r=>r.json()).then(d=>setGames(d.response||[]))
  },[])
  return(
    <div style={{background:"#000",color:"#fff",minHeight:"100vh",fontFamily:"Arial"}}>
      <div style={{background:"#001e28",padding:"12px",textAlign:"center",fontWeight:"900",borderBottom:"3px solid #00b6e6"}}>
        BESTSCORE ● {games.length} MATCHES TODAY
      </div>
      {games.map((m:any)=>{
        const home = m.homeTeam?.name || m.teams?.home?.name || "Home"
        const away = m.awayTeam?.name || m.teams?.away?.name || "Away"
        const gh = m.homeTeam?.score?? m.goals?.home?? 0
        const ga = m.awayTeam?.score?? m.goals?.away?? 0
        const status = m.status || m.fixture?.status?.short || "NS"
        return(
          <div key={m.id || m.fixture?.id} style={{display:"flex",padding:"12px",borderBottom:"1px solid #222",background:status!=="NS"?"#0a232e":"#000"}}>
            <span style={{width:60,color:status!=="NS"?"#00ff88":"#aaa",fontWeight:"700"}}>{status==="inprogress"?"LIVE":status}</span>
            <span style={{flex:1}}>{home} - {away}</span>
            <span style={{fontWeight:"900"}}>{gh}-{ga}</span>
          </div>
        )
      })}
    </div>
  )
}
