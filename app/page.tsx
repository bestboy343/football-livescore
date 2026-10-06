"use client"
import { useState, useEffect } from "react"

export default function Page(){
  const [matches,setMatches]=useState<any[]>([])
  const [day,setDay]=useState("today")
  const [filter,setFilter]=useState("all")
  const [loading,setLoading]=useState(false)

  const fetchMatches=async()=>{
    setLoading(true)
    try{
      const r=await fetch(`/api/live?day=${day}&filter=${filter}`,{cache:'no-store'})
      const j=await r.json()
      setMatches(j.response||[])
    }catch(e){console.log(e)}
    setLoading(false)
  }

  useEffect(()=>{fetchMatches()},[day,filter])

  return(
    <div className="min-h-screen bg-black text-white">
      {/* TOP BAR */}
      <div className="bg-[#001018] border-b-4 border-[#00bfff] p-4">
        <h1 className="text-center text-2xl font-black tracking-wider">
          BESTSCORE • {matches.length} MATCHES
        </h1>
      </div>

      {/* FIRST ROW - Days */}
      <div className="bg-[#001e2e] p-3 flex gap-3 overflow-x-auto">
        <button onClick={()=>setDay("today")} className={`px-6 py-3 rounded-lg font-black text-lg whitespace-nowrap ${day==="today" ? "bg-[#00bfff] text-black" : "bg-[#0a2a3a] text-[#00bfff]"}`}>
          Today
        </button>
        <button onClick={()=>setDay("yesterday")} className={`px-6 py-3 rounded-lg font-bold text-lg whitespace-nowrap ${day==="yesterday" ? "bg-[#00bfff] text-black" : "bg-[#0a2a3a] text-[#00bfff]"}`}>
          Yesterday
        </button>
        <button onClick={()=>setDay("tomorrow")} className={`px-6 py-3 rounded-lg font-bold text-lg whitespace-nowrap ${day==="tomorrow" ? "bg-[#00bfff] text-black" : "bg-[#0a2a3a] text-[#00bfff]"}`}>
          Tomorrow
        </button>
      </div>

      {/* SECOND ROW - Filters + Refresh */}
      <div className="bg-[#001e2e] p-3 flex gap-3 items-center justify-between border-b border-[#0a2a3a]">
        <div className="flex gap-2">
          <button onClick={()=>setFilter("all")} className={`px-5 py-3 rounded-lg font-black ${filter==="all" ? "bg-[#00bfff] text-black" : "bg-[#0a2a3a] text-white"}`}>
            All<br/>Games
          </button>
          <button onClick={()=>setFilter("live")} className={`px-5 py-3 rounded-lg font-black ${filter==="live" ? "bg-[#00bfff] text-black" : "bg-[#0a2a3a] text-red-500"}`}>
            LIVE
          </button>
          <button onClick={()=>setFilter("finished")} className={`px-5 py-3 rounded-lg font-bold ${filter==="finished" ? "bg-[#00bfff] text-black" : "bg-[#0a2a3a] text-white"}`}>
            Finished
          </button>
        </div>
        <button onClick={fetchMatches} className="bg-[#00bfff] text-black px-6 py-3 rounded-lg font-black text-lg leading-tight text-center">
          <span className="text-xl">↻</span><br/>REFRESH<br/>NOW
        </button>
      </div>

      {/* MATCHES LIST */}
      <div className="p-2">
        {loading && <div className="text-center py-10 text-[#00bfff]">Loading...</div>}
        {!loading && matches.length===0 && <div className="text-center py-20 text-gray-500 text-xl">0 MATCHES - API limit reached, regenerate key</div>}
        {matches.map((m:any,i:number)=>(
          <div key={i} className="bg-[#0f1f2f] mb-2 p-3 rounded flex justify-between items-center border border-[#1a3344]">
            <div className="flex-1">
              <div className="text-xs text-gray-400">{m.league?.name||m.competition||"League"}</div>
              <div className="font-bold">{m.homeTeam?.name||m.home?.name} vs {m.awayTeam?.name||m.away?.name}</div>
            </div>
            <div className="text-right">
              <div className="font-black text-[#00bfff]">{m.homeScore ?? m.score?.home ?? 0} - {m.awayScore ?? m.score?.away ?? 0}</div>
              <div className="text-xs text-gray-400">{m.status||""}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
