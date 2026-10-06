"use client"
import {useEffect,useState} from "react"

function fmtTime(dateStr:string){
  try{
    return new Date(dateStr).toLocaleTimeString("en-GB",{
      hour:"2-digit",minute:"2-digit",
      timeZone:"Europe/Paris", hour12:false
    })
  }catch{ return "--:--" }
}

export default function Page(){
  const [games,setGames]=useState<any[]>([])
  useEffect(()=>{
    fetch("/api/live").then(r=>r.json()).then(d=>setGames(d.response||[]))
  },[])

  const groups: Record<string, any[]> = {}
  games.forEach((m:any)=>{
    const country = m.country?.name || m.league?.country || "WORLD"
    const league = m.league?.name || "League"
    const key = `${country}: ${league}`
    if(!groups[key]) groups[key]=[]
    groups[key].push(m)
  })

  return(
    <div style={{background:"#000",color:"#fff",minHeight:"100vh",fontFamily:"Arial",fontSize:14}}>
      <div style={{background:"#001e28",padding:"12px",textAlign:"center",fontWeight:"900",borderBottom:"3px solid #00b6e6"}}>
        BESTSCORE • {games.length} MATCHES
      </div>

      {Object.entries(groups).map(([title, list])=>(
        <div key={title}>
          <div style={{background:"#222",padding:"7px 10px",fontWeight:"900",borderTop:"1px solid #333"}}>
            {title.toUpperCase()} <span style={{color:"#888",fontWeight:400}}> Standings</span>
          </div>
          {list.map((m:any)=>{
            const home = m.homeTeam?.name || m.home?.name || "Home"
            const away = m.awayTeam?.name || m.away?.name || "Away"

            // FIX FOR 0-0 PROBLEM
            let gh = m.homeTeam?.score
            let ga = m.awayTeam?.score
            if(gh===undefined) gh = m.score?.home
            if(ga===undefined) ga = m.score?.away

            const hasScore = gh!==null && gh!==undefined && ga!==null && ga!==undefined
            const status = (m.status||"").toLowerCase()
            const isLive = status.includes("progress") || status==="live" || status==="1h" || status==="2h" || m.minute
            const isFT = status==="finished" || status==="ft"

            const time = isLive? (m.minute? `${m.minute}'` : "LIVE") : isFT? "FT" : fmtTime(m.date||m.startTime)
            const scoreText = hasScore? `${gh}-${ga}` : "-"

            return(
              <div key={m.id} style={{display:"flex",padding:"8px 10px",borderBottom:"1px solid #1a1a1a",background:isLive?"#1a0000":"transparent"}}>
                <span style={{width:50,color:isLive?"#ff0000":"#ccc",fontWeight:isLive?"900":"400"}}>{time}</span>
                <span style={{flex:1}}>{home} - {away}</span>
                <span style={{fontWeight:"900",color:isLive?"#ff0000":isFT?"#6ea8ff":"#fff"}}>{scoreText}</span>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
