"use client"
import { useState, useEffect } from "react"

export default function Page(){
  const [matches, setMatches] = useState<any[]>([])

  useEffect(()=>{
    fetch("/api/livescores").then(r=>r.json()).then(d=>setMatches(d.response||[]))
  },[])

  const groups:any={}
  matches.forEach((m:any)=>{
    const key = `${m.league.country}: ${m.league.name}`
    if(!groups[key]) groups[key]=[]
    groups[key].push(m)
  })

  return(
    <div style={{background:"white", color:"black", minHeight:"100vh", fontSize:"14px"}}>
      <div style={{background:"black", color:"white", padding:"8px", fontWeight:"bold"}}>BESTSCORE</div>
      {Object.entries(groups).map(([title, list]:any)=>(
        <div key={title}>
          <div style={{background:"black", color:"white", padding:"4px 8px", display:"flex", justifyContent:"space-between", fontWeight:"bold"}}>
            <span>{title.toUpperCase()}</span>
            <span style={{textDecoration:"underline"}}>Standings</span>
          </div>
          {list.map((f:any)=>{
            const t = new Date(f.fixture.date).toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"})
            const status = f.fixture.status.short
            const show = status==="NS"? t : status
            const live = ["1H","2H","HT","LIVE"].includes(status)
            return(
              <div key={f.fixture.id} style={{display:"flex", padding:"6px 8px", borderBottom:"1px solid #eee"}}>
                <span style={{width:"50px", color:live?"red":"black", fontWeight:live?"bold":"normal"}}>{show}</span>
                <span style={{flex:1, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{f.teams.home.name} - {f.teams.away.name}</span>
                <span style={{fontWeight:"bold", marginLeft:"8px"}}>{f.goals.home?? "-"} - {f.goals.away?? "-"}</span>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
