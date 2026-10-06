"use client"
import { useEffect, useState } from "react"

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
    if(filter==="LIVE") return m.status?.includes("'")||m.status?.toLowerCase().includes("live")
    if(filter==="Finished") return m.status?.toLowerCase().includes("fin")||m.status?.includes("-")&&m.homeScore!==0
    return true
  })

  // GROUP: Country -> League
  const byCountry:any={}
  filtered.forEach((m:any)=>{
    const country=(m.country||m.league?.country||"WORLD").toUpperCase()
    const league=m.league?.name||"Other"
    if(!byCountry[country]) byCountry[country]={}
    if(!byCountry[country][league]) byCountry[country][league]=[]
    byCountry[country][league].push(m)
  })

  return(
    <div className="min-h-screen bg-[#070d1c] text-white">
      <div className="text-center py-3 font-bold bg-[#0a1226]">BESTSCORE • {matches.length} MATCHES</div>

      <div className="flex gap-2 p-2 overflow-x-auto">
        {["today","yesterday","tomorrow"].map(d=>(
          <button key={d} onClick={()=>setDay(d)} className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap ${day===d?"bg-[#00c8ff] text-black":"bg-[#15213a] text-[#00c8ff]"}`}>{d.charAt(0).toUpperCase()+d.slice(1)}</button>
        ))}
      </div>
      <div className="flex gap-2 p-2">
        {["All Games","LIVE","Finished"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} className={`px-4 py-2 rounded-xl text-sm font-bold ${filter===f?"bg-[#00c8ff] text-black":"bg-[#15213a] text-[#00c8ff]"}`}>{f}</button>
        ))}
        <button onClick={load} className="ml-auto bg-[#00c8ff] text-black px-4 py-2 rounded-xl text-sm font-bold">↻ REFRESH NOW</button>
      </div>

      <div className="p-2 space-y-4">
        {Object.entries(byCountry).map(([country, leagues]:any)=>(
          <div key={country}>
            {/* COUNTRY HEADER - like Flashscore but blue theme */}
            <div className="px-1 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              {country}
            </div>
            {Object.entries(leagues).map(([leagueName, games]:any)=>(
              <div key={leagueName} className="mb-3 bg-[#101a2e] rounded-2xl overflow-hidden">
                {/* LEAGUE UNDER COUNTRY */}
                <div className="px-4 py-2 bg-[#15213a] flex justify-between">
                  <span className="text-[12px] font-bold text-[#00c8ff]">{country}: {leagueName}</span>
                  <span className="text-[10px] text-gray-500">{(games as any[]).length} matches</span>
                </div>
                {/* Matches */}
                {(games as any[]).map((m:any,i:number)=>(
                  <div key={i} className="flex items-center justify-between px-4 py-3 border-t border-[#1e2d4a]">
                    <div>
                      <div className="text-[11px] text-gray-500">{m.time||m.status||"20:45"}</div>
                      <div className="text-[14px] font-medium">{m.homeTeam.name} vs {m.awayTeam.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[15px] font-bold text-[#00c8ff]">{m.homeScore} - {m.awayScore}</div>
                      <div className="text-[10px] text-gray-500">{m.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
