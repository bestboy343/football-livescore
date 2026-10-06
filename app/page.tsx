"use client"
import {useEffect,useState} from "react"

function fmtTime(dateStr:string){
  try{
    const d = new Date(dateStr)
    return d.toLocaleTimeString("en-GB",{
      hour:"2-digit",
      minute:"2-digit",
      timeZone:"Europe/Paris",
      hour12:false
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
    const country = m.country?.name || m.league?.country || "World"
    const league = m.league?.name || m.competition || "Friendly"
    const key = `${country} • ${league}`
    if(!groups[key]) groups[key]=[]
    groups[key].push(m)
  })

  return(
    <div style={{background:"#000",color:"#fff",minHeight:"100vh",fontFamily:"Arial",fontSize:14}}>
      <div style={{background:"#001e28",padding:"12px",textAlign:"center",fontWeight:"900",borderBottom:"3px solid #00b6e6",position:"sticky",top:0,zIndex:10}}>
        BESTSCORE • {games.length} MATCHES TODAY
      </div>

      {Object.entries(groups).map(([title, list])=>(
        <div key={title}>
          <div style={{background:"#1a1a1a",padding:"6px 10px",color:"#00b6e6",fontWeight:"700",fontSize:12,borderTop:"1px solid #333",borderBottom:"1px solid #333"}}>
            🌍 {title.toUpperCase()}
          </div>
          {list.map((m:any)=>{
            const home = m.homeTeam?.name || m.home?.name || "Home"
            const away = m.awayTeam?.name || m.away?.name || "Away"
            const gh = m.homeTeam?.score?? m.score?.home?? m.goals?.home?? 0
            const ga = m.awayTeam?.score?? m.score?.away?? m.goals?.away?? 0
            const status = m.status || "NS"
            const isLive = status==="inprogress" || status==="LIVE" || status==="1H" || status==="2H"
            const isFT = status==="finished" || status==="FT"
            const time = isLive? "LIVE" : isFT? "FT" : fmtTime(m.date || m.startTime || m.kickoff)

            return(
              <div key={m.id} style={{display:"flex",alignItems:"center",padding:"10px",borderBottom:"1px solid #1e1e1e",background:isLive?"#0a232e":"transparent"}}>
                <span style={{width:55,fontWeight:"700",color:isLive?"#00ff88":isFT?"#888":"#aaa"}}>{time}</span>
                <span style={{flex:1,paddingRight:10}}>{home} - {away}</span>
                <span style={{fontWeight:"900",minWidth:35,textAlign:"right",color:isLive?"#00ff88":"#fff"}}>{gh}-{ga}</span>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
