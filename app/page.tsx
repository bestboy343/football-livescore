"use client"
import { useState, useEffect } from "react"

export default function Page(){
  const [matches,setMatches]=useState<any[]>([])
  const [day,setDay]=useState("today")
  const [sel,setSel]=useState<any>(null)

  const load=async()=>{
    const r=await fetch(`/api/live?day=${day}`)
    const j=await r.json()
    setMatches(j.response||[])
  }
  useEffect(()=>{load()},[day])

  // Group by league like Flashscore
  const groups:any={}
  matches.forEach((m:any)=>{
    const key = `${m.country||"WORLD"}: ${m.league?.name||"League"}`
    if(!groups[key]) groups[key]=[]
    groups[key].push(m)
  })

  return(
    <div className="min-h-screen bg-[#010a14] text-white">
      <div className="bg-[#001e28] text-center py-3 font-black border-b-2 border-[#00c8ff]">BESTSCORE • {matches.length} MATCHES</div>

      <div className="flex gap-1 p-2 bg-[#010a14]">
        {["Today","Yesterday","Tomorrow"].map(d=>(
          <button key={d} onClick={()=>setDay(d.toLowerCase())} className={`flex-1 py-2.5 rounded-lg font-bold text-sm ${day===d.toLowerCase()?"bg-[#00c8ff] text-black":"bg-[#0d2433] text-[#00c8ff]"}`}>{d}</button>
        ))}
      </div>

      <div className="flex gap-1 px-2 pb-2">
        <button className="bg-[#00c8ff] text-black flex-1 py-2.5 rounded-lg font-black text-xs">All Games</button>
        <button className="bg-[#0d2433] text-red-500 flex-1 py-2.5 rounded-lg font-bold text-sm">LIVE</button>
        <button className="bg-[#0d2433] text-[#00c8ff] flex-1 py-2.5 rounded-lg font-bold text-sm">Finished</button>
        <button onClick={load} className="bg-[#00c8ff] text-black flex-1 py-2.5 rounded-lg font-black text-xs">↻ REFRESH NOW</button>
      </div>

      <div className="pb-10">
        {Object.keys(groups).map((league)=>(
          <div key={league} className="mb-1">
            <div className="bg-[#062030] px-3 py-2 text-[12px] font-bold text-[#00c8ff] flex items-center gap-2">
              <span>⚽</span> {league.toUpperCase()}
            </div>
            {groups[league].map((m:any,i:number)=>(
              <div key={i} onClick={()=>setSel(m)} className="bg-[#0d2433] border-b border-[#0a1e2e] px-3 py-3 flex justify-between items-center active:bg-[#122a3a]">
                <div className="flex-1">
                  <div className="text-[13px] leading-tight">{m.homeTeam?.name}<br/><span className="font-bold">{m.awayTeam?.name}</span></div>
                </div>
                <div className="text-right min-w-[70px]">
                  <div className="font-bold text-[#00c8ff] text-[15px]">{m.homeScore} - {m.awayScore}</div>
                  <div className="text-[10px] text-gray-400">{m.status}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {sel && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={()=>setSel(null)}>
          <div className="bg-[#0d2433] w-full rounded-2xl p-5 border border-[#00c8ff]">
            <div className="text-[#00c8ff] text-xs">{sel.country}: {sel.league?.name}</div>
            <div className="text-white font-bold text-lg mt-2">{sel.homeTeam?.name} vs {sel.awayTeam?.name}</div>
            <div className="text-[#00c8ff] text-3xl font-black my-3">{sel.homeScore} - {sel.awayScore}</div>
            <div className="text-gray-400 text-sm">{sel.status} • {sel.time}</div>
            <button onClick={()=>setSel(null)} className="w-full bg-[#00c8ff] text-black py-3 rounded-xl font-black mt-4">CLOSE</button>
          </div>
        </div>
      )}
    </div>
  )
}
