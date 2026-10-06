"use client"
import { useState, useEffect } from "react"

const DEMO = [
  { id:1, home:"Colombia", away:"Peru", hs:1, as:0, time:"19:00", status:"FT", league:"Friendlies", country:"WORLD", detail:"Full Time - Colombia won 1-0" },
  { id:2, home:"Argentina", away:"Benin", hs:2, as:2, time:"20:00", status:"LIVE 78'", league:"Friendlies", country:"WORLD", detail:"Live - 78 minute 2-2 draw" },
  { id:3, home:"Goiás", away:"Athletic Club", hs:0, as:0, time:"23:00", status:"Not started", league:"Serie B", country:"BRAZIL", detail:"Starts tonight 23:00" },
  { id:4, home:"JS Saoura", away:"Khenchela", hs:0, as:1, time:"16:00", status:"FT", league:"Ligue 1", country:"ALGERIA", detail:"Full Time - Khenchela won 0-1" },
]

export default function Page(){
  const [day,setDay]=useState("Today")
  const [filter,setFilter]=useState("Finished")
  const [selected,setSelected]=useState<any>(null)
  const [matches,setMatches]=useState<any[]>([])

  useEffect(()=>{
    fetch(`/api/live?day=${day.toLowerCase()}`).then(r=>r.json()).then(j=>{
      if(j.response?.length>0){
        setMatches(j.response.map((m:any,i:number)=>({...m, id:i, detail:`${m.status} - ${m.league?.name}`}))
      }else setMatches(DEMO)
    }).catch(()=> setMatches(DEMO))
  },[day])

  const filtered = matches.filter((m:any)=>{
    if(filter==="LIVE") return m.status?.includes("LIVE") || m.status?.includes("'")
    if(filter==="Finished") return m.status?.includes("FT") || m.status?.toLowerCase().includes("fin") || m.status?.includes("Not")===false
    return true
  })

  const display = filtered.length>0? filtered : DEMO

  return(
    <div className="min-h-screen bg-black">
      <div className="bg-[#0a1e2e]">
        <div className="text-center py-4 font-black text-[22px] text-white tracking-wide border-b-[3px] border-[#00c8ff]">BESTSCORE • {display.length} MATCHES</div>

        <div className="px-3 pt-3 flex gap-2">
          {["Today","Yesterday","Tomorrow"].map(d=>(
            <button key={d} onClick={()=>setDay(d)} className={`px-6 py-3 rounded-xl font-black text-[15px] ${day===d?"bg-[#00c8ff] text-black":"bg-[#122a3a] text-[#00c8ff]"}`}>{d}</button>
          ))}
        </div>

        <div className="px-3 py-3 flex gap-2">
          <button onClick={()=>setFilter("All Games")} className={`px-5 py-3 rounded-xl font-black text-[15px] leading-tight ${filter==="All Games"?"bg-[#00c8ff] text-black":"bg-[#122a3a] text-white"}`}>All<br/>Games</button>
          <button onClick={()=>setFilter("LIVE")} className={`flex-1 py-3 rounded-xl font-black text-[15px] ${filter==="LIVE"?"bg-[#122a3a] text-red-500 ring-2 ring-red-500":"bg-[#122a3a] text-red-500"}`}>LIVE</button>
          <button onClick={()=>setFilter("Finished")} className={`flex-1 py-3 rounded-xl font-bold text-[15px] ${filter==="Finished"?"bg-[#00c8ff] text-black":"bg-[#122a3a] text-white"}`}>Finished</button>
          <button onClick={()=>window.location.reload()} className="bg-[#00c8ff] text-black px-6 py-3 rounded-xl font-black text-[14px] leading-tight">↻<br/>REFRESH<br/>NOW</button>
        </div>
      </div>

      {/* 4 DEMO - CLICKABLE */}
      <div className="p-3 space-y-3 bg-black min-h-[60vh]">
        {display.slice(0,4).map((m:any)=>(
          <button key={m.id} onClick={()=>setSelected(m)} className="w-full bg-[#101a2e] rounded-2xl px-4 py-4 flex justify-between items-center text-left active:scale-[0.98] transition">
            <div className="flex-1">
              <div className="text-[11px] text-[#00c8ff]">{m.country}: {m.league?.name || m.league}</div>
              <div className="text-[15px] font-bold text-white mt-1">{m.homeTeam?.name || m.home} vs {m.awayTeam?.name || m.away}</div>
            </div>
            <div className="text-right ml-3">
              <div className="text-[17px] font-black text-[#00c8ff]">{m.homeScore?? m.hs} - {m.awayScore?? m.as}</div>
              <div className="text-[10px] text-gray-400 mt-1">{m.time} {m.status}</div>
            </div>
          </button>
        ))}
      </div>

      {/* CLICK POPUP */}
      {selected && (
        <div onClick={()=>setSelected(null)} className="fixed inset-0 bg-black/80 z-50 flex items-end justify-center p-3">
          <div onClick={e=>e.stopPropagation()} className="bg-[#101a2e] w-full rounded-3xl p-5 border-2 border-[#00c8ff]">
            <div className="text-[#00c8ff] text-[12px] mb-2">{selected.country}: {selected.league?.name || selected.league}</div>
            <div className="text-white font-black text-[20px]">{selected.homeTeam?.name || selected.home} vs {selected.awayTeam?.name || selected.away}</div>
            <div className="text-[#00c8ff] font-black text-[32px] my-3">{selected.homeScore?? selected.hs} - {selected.awayScore?? selected.as}</div>
            <div className="text-gray-300 text-[14px] mb-4">{selected.detail} • {selected.time} • {selected.status}</div>
            <div className="flex gap-2">
              <button onClick={()=>setSelected(null)} className="flex-1 bg-[#00c8ff] text-black py-3 rounded-xl font-black">CLOSE</button>
              <button className="flex-1 bg-[#122a3a] text-white py-3 rounded-xl font-bold">STATS</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
