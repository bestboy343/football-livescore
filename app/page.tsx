"use client"
import { useState, useEffect } from "react"

export default function Page(){
  const [matches,setMatches]=useState<any[]>([])
  const [day,setDay]=useState("today")
  const [filter,setFilter]=useState("All Games")

  const load=async()=>{
    const r=await fetch(`/api/live?day=${day}`)
    const j=await r.json()
    setMatches(j.response||[])
  }
  useEffect(()=>{load()},[day])

  const filtered=matches.filter((m:any)=>{
    if(filter==="LIVE") return m.status?.toLowerCase().includes("live") || m.status?.includes("'")
    if(filter==="Finished") return m.status?.toLowerCase().includes("fin") || m.status==="FT"
    return true
  })

  return(
    <div className="min-h-screen bg-[#070d1c] text-white">
      <div className="text-center py-3 font-bold bg-[#0a1226] border-b border-[#15213a]">BESTSCORE • {matches.length} MATCHES</div>

      <div className="flex gap-2 p-3">
        {["Today","Yesterday","Tomorrow"].map(d=>(
          <button key={d} onClick={()=>setDay(d.toLowerCase())} className={`flex-1 py-2.5 rounded-xl text-[13px] font-bold ${day===d.toLowerCase()?"bg-[#00c8ff] text-black":"bg-[#15213a] text-[#00c8ff]"}`}>{d}</button>
        ))}
      </div>

      <div className="flex gap-2 px-3 pb-3">
        {["All Games","LIVE","Finished"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} className={`flex-1 py-3 rounded-xl text-[12px] font-bold leading-tight ${filter===f?(f==="LIVE"?"bg-[#15213a] text-red-500":"bg-[#00c8ff] text-black"):"bg-[#15213a] text-[#00c8ff]"}`}>{f}</button>
        ))}
        <button onClick={load} className="flex-1 bg-[#00c8ff] text-black py-3 rounded-xl text-[12px] font-bold leading-tight">↻<br/>REFRESH<br/>NOW</button>
      </div>

      <div className="px-3 space-y-2 pb-10">
        {filtered.map((m:any,i:number)=>(
          <div key={i} className="bg-[#101a2e] rounded-2xl px-4 py-3 flex justify-between items-center border border-[#1e2d4a]">
            <div className="flex-1">
              {/* COUNTRY + LEAGUE - THIS IS WHAT YOU WANT */}
              <div className="text-[11px] text-[#00c8ff] mb-0.5">{(m.country||"").toUpperCase()}: {m.league?.name}</div>
              <div className="text-[14px] font-bold text-white leading-tight">{m.homeTeam?.name} vs {m.awayTeam?.name}</div>
            </div>
            <div className="text-right ml-3">
              <div className="text-[15px] font-bold text-[#00c8ff]">{m.homeScore} - {m.awayScore}</div>
              <div className="text-[10px] text-gray-400">{m.time} {m.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
