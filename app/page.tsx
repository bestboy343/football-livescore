"use client"
import { useState, useEffect } from "react"

const FALLBACK = [
  { homeTeam:{name:"Colombia"}, awayTeam:{name:"Peru"}, homeScore:0, awayScore:0, status:"Not started", time:"19:00", league:{name:"Friendlies"}, country:"WORLD" },
  { homeTeam:{name:"Argentina"}, awayTeam:{name:"Benin"}, homeScore:0, awayScore:0, status:"Not started", time:"20:00", league:{name:"Friendlies"}, country:"WORLD" },
  { homeTeam:{name:"Goiás"}, awayTeam:{name:"Athletic Club"}, homeScore:0, awayScore:0, status:"Not started", time:"23:00", league:{name:"Serie B"}, country:"BRAZIL" },
  { homeTeam:{name:"JS Saoura"}, awayTeam:{name:"Khenchela"}, homeScore:0, awayScore:0, status:"Not started", time:"16:00", league:{name:"Ligue 1"}, country:"ALGERIA" },
]

export default function Page(){
  const [matches,setMatches]=useState<any[]>(FALLBACK)
  const [day,setDay]=useState("Today")
  const [filter,setFilter]=useState("All Games")

  const load=async()=>{
    try{
      const r=await fetch(`/api/live?day=${day.toLowerCase()}`)
      const j=await r.json()
      if(j.response && j.response.length>0) setMatches(j.response)
    }catch{}
  }
  useEffect(()=>{load()},[day])

  const filtered = matches.filter((m:any)=>{
    if(filter==="LIVE") return m.status?.includes("'")
    if(filter==="Finished") return m.status?.toLowerCase().includes("fin") || m.status==="FT"
    return true
  })

  return(
    <div className="min-h-screen bg-[#070d1c] text-white">
      <div className="text-center py-3 font-black text-[18px] tracking-wider border-b-2 border-[#00c8ff]">BESTSCORE • {filtered.length} MATCHES</div>

      <div className="px-3 pt-3 flex gap-2">
        {["Today","Yesterday","Tomorrow"].map(d=>(
          <button key={d} onClick={()=>setDay(d)} className={`flex-1 py-3 rounded-xl font-bold ${day===d?"bg-[#00c8ff] text-black":"bg-[#101a2e] text-[#00c8ff]"}`}>{d}</button>
        ))}
      </div>

      <div className="px-3 py-3 flex gap-2">
        <button onClick={()=>setFilter("All Games")} className={`flex-1 py-3 rounded-xl font-black text-[11px] leading-tight ${filter==="All Games"?"bg-[#00c8ff] text-black":"bg-[#101a2e] text-[#00c8ff]"}`}>All<br/>Games</button>
        <button onClick={()=>setFilter("LIVE")} className={`flex-1 py-3 rounded-xl font-bold ${filter==="LIVE"?"bg-[#101a2e] text-red-500 ring-1 ring-red-500":"bg-[#101a2e] text-red-500"}`}>LIVE</button>
        <button onClick={()=>setFilter("Finished")} className={`flex-1 py-3 rounded-xl font-bold ${filter==="Finished"?"bg-[#00c8ff] text-black":"bg-[#101a2e] text-[#00c8ff]"}`}>Finished</button>
        <button onClick={load} className="flex-1 py-2 rounded-xl font-black text-[11px] leading-tight bg-[#00c8ff] text-black">↻<br/>REFRESH<br/>NOW</button>
      </div>

      <div className="px-3 space-y-2 pb-10">
        {filtered.map((m:any,i:number)=>(
          <div key={i} className="bg-[#101a2e] rounded-2xl px-4 py-3 flex justify-between items-center">
            <div>
              <div className="text-[11px] text-[#00c8ff]">{m.country}: {m.league.name}</div>
              <div className="text-[14px] font-bold mt-1">{m.homeTeam.name} vs {m.awayTeam.name}</div>
            </div>
            <div className="text-right">
              <div className="text-[16px] font-bold text-[#00c8ff]">{m.homeScore} - {m.awayScore}</div>
              <div className="text-[10px] text-gray-400">{m.time} {m.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
