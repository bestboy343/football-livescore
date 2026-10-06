"use client"
import { useState, useEffect } from "react"

const DEMO = [
  { home:"Colombia", away:"Peru", hs:0, as:0, time:"19:00", status:"Not started", league:"Friendlies", country:"WORLD" },
  { home:"Argentina", away:"Benin", hs:0, as:0, time:"20:00", league:"Friendlies", country:"WORLD" },
  { home:"Goiás", away:"Athletic Club", hs:0, as:0, time:"23:00", league:"Serie B", country:"BRAZIL" },
  { home:"JS Saoura", away:"Khenchela", hs:0, as:0, time:"16:00", league:"Ligue 1", country:"ALGERIA" },
]

export default function Page(){
  const [matches,setMatches]=useState<any[]>([])
  const [day,setDay]=useState("Today")
  const [filter,setFilter]=useState("All Games")

  useEffect(()=>{
    // Load real API, if 0 use DEMO
    fetch(`/api/live?day=${day.toLowerCase()}`).then(r=>r.json()).then(j=>{
      if(j.response && j.response.length>0) setMatches(j.response)
      else setMatches(DEMO.map((m:any)=>({
        homeTeam:{name:m.home}, awayTeam:{name:m.away},
        homeScore:m.hs, awayScore:m.as, time:m.time, status:m.status,
        league:{name:m.league}, country:m.country
      })))
    }).catch(()=>{
      setMatches(DEMO.map((m:any)=>({
        homeTeam:{name:m.home}, awayTeam:{name:m.away},
        homeScore:m.hs, awayScore:m.as, time:m.time, status:m.status,
        league:{name:m.league}, country:m.country
      })))
    })
  },[day])

  const list = matches.filter((m:any)=>{
    if(filter==="LIVE") return m.status?.includes("'")
    if(filter==="Finished") return m.status==="FT" || m.status?.toLowerCase().includes("fin")
    return true
  })

  return(
    <div className="min-h-screen bg-black">
      {/* HEADER - EXACT LIKE YOUR SCREENSHOT */}
      <div className="bg-[#0a1e2e] border-b-[3px] border-[#00c8ff]">
        <div className="text-center py-4 font-black text-[22px] text-white tracking-wide">BESTSCORE • {list.length} MATCHES</div>
        <div className="px-3 pb-3 flex gap-2">
          {["Today","Yesterday","Tomorrow"].map(d=>(
            <button key={d} onClick={()=>setDay(d)} className={`px-6 py-3 rounded-xl font-black text-[15px] ${day===d?"bg-[#00c8ff] text-black":"bg-[#122a3a] text-[#00c8ff]"}`}>{d}</button>
          ))}
        </div>
        <div className="px-3 pb-4 flex gap-2">
          <button onClick={()=>setFilter("All Games")} className={`px-5 py-3 rounded-xl font-black text-[15px] leading-tight ${filter==="All Games"?"bg-[#00c8ff] text-black":"bg-[#122a3a] text-[#00c8ff]"}`}>All<br/>Games</button>
          <button onClick={()=>setFilter("LIVE")} className={`flex-1 py-3 rounded-xl font-black text-[15px] ${filter==="LIVE"?"bg-[#122a3a] text-red-500 ring-2 ring-red-500":"bg-[#122a3a] text-red-500"}`}>LIVE</button>
          <button onClick={()=>setFilter("Finished")} className={`flex-1 py-3 rounded-xl font-bold text-[15px] ${filter==="Finished"?"bg-[#00c8ff] text-black":"bg-[#122a3a] text-white"}`}>Finished</button>
          <button onClick={()=>window.location.reload()} className="bg-[#00c8ff] text-black px-6 py-3 rounded-xl font-black text-[14px] leading-tight text-center">↻<br/>REFRESH<br/>NOW</button>
        </div>
      </div>

      {/* MATCHES - 4 DEMO SHOW HERE */}
      <div className="p-3 space-y-2.5">
        {list.map((m:any,i:number)=>(
          <div key={i} className="bg-[#101a2e] rounded-2xl px-4 py-3 flex justify-between items-center">
            <div className="flex-1">
              <div className="text-[11px] text-[#00c8ff]">{m.country}: {m.league?.name || m.league}</div>
              <div className="text-[14px] font-bold text-white mt-1">{m.homeTeam?.name || m.home} vs {m.awayTeam?.name || m.away}</div>
            </div>
            <div className="text-right ml-3">
              <div className="text-[16px] font-bold text-[#00c8ff]">{m.homeScore?? m.hs} - {m.awayScore?? m.as}</div>
              <div className="text-[10px] text-gray-400">{m.time} {m.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
