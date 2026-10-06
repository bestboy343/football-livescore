"use client"
import { useEffect, useState } from "react"
export default function Page(){
  const [matches,setMatches]=useState<any[]>([])
  const [day,setDay]=useState("today")
  const load=async()=>{
    const res=await fetch(`/api/live?day=${day}`)
    const j=await res.json()
    setMatches(j.response||[])
  }
  useEffect(()=>{load()},[day])

  // group by country
  const groups:any={}
  matches.forEach((m:any)=>{
    const c=(m.country||"WORLD").toUpperCase()
    if(!groups[c]) groups[c]=[]
    groups[c].push(m)
  })

  return(
    <div className="min-h-screen bg-[#070d1c] text-white p-2">
      <div className="text-center py-2 font-bold">BESTSCORE • {matches.length} MATCHES</div>
      <div className="flex gap-2 mb-3">
        <button onClick={()=>setDay("today")} className={`px-3 py-2 rounded-lg text-sm ${day==="today"?"bg-[#00c8ff] text-black":"bg-[#15213a] text-[#00c8ff]"}`}>Today</button>
        <button onClick={()=>setDay("yesterday")} className={`px-3 py-2 rounded-lg text-sm ${day==="yesterday"?"bg-[#00c8ff] text-black":"bg-[#15213a] text-[#00c8ff]"}`}>Yesterday</button>
        <button onClick={()=>setDay("tomorrow")} className={`px-3 py-2 rounded-lg text-sm ${day==="tomorrow"?"bg-[#00c8ff] text-black":"bg-[#15213a] text-[#00c8ff]"}`}>Tomorrow</button>
        <button onClick={load} className="ml-auto bg-[#00c8ff] text-black px-3 py-2 rounded-lg text-sm">Refresh</button>
      </div>

      {Object.keys(groups).map((country)=>(
        <div key={country} className="mb-4">
          <div className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-1 px-1">{country}</div>
          <div className="bg-[#101a2e] rounded-xl overflow-hidden">
            {groups[country].map((m:any,i:number)=>(
              <div key={i} className="flex justify-between items-center px-3 py-3 border-t border-[#1e2d4a] first:border-0">
                <div>
                  <div className="text-[11px] text-[#00c8ff]">{country}: {m.league.name}</div>
                  <div className="text-[13px]">{m.homeTeam.name} vs {m.awayTeam.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-[14px] font-bold text-[#00c8ff]">{m.homeScore} - {m.awayScore}</div>
                  <div className="text-[10px] text-gray-400">{m.time} {m.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
