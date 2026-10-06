"use client"
import { useState } from "react"

export default function Page(){
  const [day,setDay]=useState("Today")
  const [filter,setFilter]=useState("All Games")
  const [sel,setSel]=useState(null as any)

  const matches = [
    { id:1, home:"Colombia", away:"Peru", hs:1, as:0, time:"19:00", status:"FT", league:"Friendlies", country:"WORLD" },
    { id:2, home:"Argentina", away:"Benin", hs:2, as:2, time:"20:00", status:"LIVE", league:"Friendlies", country:"WORLD" },
    { id:3, home:"Goiás", away:"Athletic Club", hs:0, as:0, time:"23:00", status:"NS", league:"Serie B", country:"BRAZIL" },
    { id:4, home:"JS Saoura", away:"Khenchela", hs:0, as:1, time:"16:00", status:"FT", league:"Ligue 1", country:"ALGERIA" },
  ]

  return(
    <div className="min-h-screen bg-black">
      <div className="bg-[#0a1e2e] border-b-4 border-[#00c8ff]">
        <div className="text-center py-4 font-black text-white text-xl">BESTSCORE - 4 MATCHES</div>
        <div className="px-3 pb-3 flex gap-2">
          <button onClick={()=>setDay("Today")} className={day==="Today"? "bg-[#00c8ff] text-black px-6 py-3 rounded-xl font-black" : "bg-[#122a3a] text-[#00c8ff] px-6 py-3 rounded-xl font-black"}>Today</button>
          <button onClick={()=>setDay("Yesterday")} className={day==="Yesterday"? "bg-[#00c8ff] text-black px-6 py-3 rounded-xl font-black" : "bg-[#122a3a] text-[#00c8ff] px-6 py-3 rounded-xl font-black"}>Yesterday</button>
          <button onClick={()=>setDay("Tomorrow")} className={day==="Tomorrow"? "bg-[#00c8ff] text-black px-6 py-3 rounded-xl font-black" : "bg-[#122a3a] text-[#00c8ff] px-6 py-3 rounded-xl font-black"}>Tomorrow</button>
        </div>
        <div className="px-3 pb-4 flex gap-2">
          <button onClick={()=>setFilter("All Games")} className={filter==="All Games"? "bg-[#00c8ff] text-black px-5 py-3 rounded-xl font-black" : "bg-[#122a3a] text-white px-5 py-3 rounded-xl font-black"}>All Games</button>
          <button onClick={()=>setFilter("LIVE")} className="bg-[#122a3a] text-red-500 px-5 py-3 rounded-xl font-black">LIVE</button>
          <button onClick={()=>setFilter("Finished")} className={filter==="Finished"? "bg-[#00c8ff] text-black px-5 py-3 rounded-xl font-black" : "bg-[#122a3a] text-white px-5 py-3 rounded-xl font-black"}>Finished</button>
          <button onClick={()=>window.location.reload()} className="bg-[#00c8ff] text-black px-5 py-3 rounded-xl font-black">REFRESH</button>
        </div>
      </div>

      <div className="p-3 space-y-3">
        {matches.map((m)=>(
          <div key={m.id} onClick={()=>setSel(m)} className="bg-[#101a2e] rounded-2xl px-4 py-4 flex justify-between items-center">
            <div>
              <div className="text-[11px] text-[#00c8ff]">{m.country}: {m.league}</div>
              <div className="text-white font-bold mt-1">{m.home} vs {m.away}</div>
            </div>
            <div className="text-right">
              <div className="text-[#00c8ff] font-black">{m.hs} - {m.as}</div>
              <div className="text-gray-400 text-xs">{m.time} {m.status}</div>
            </div>
          </div>
        ))}
      </div>

      {sel && (
        <div className="fixed inset-0 bg-black/80 flex items-end p-3 z-50" onClick={()=>setSel(null)}>
          <div className="bg-[#101a2e] w-full rounded-3xl p-5 border-2 border-[#00c8ff]">
            <div className="text-[#00c8ff] text-xs">{sel.country}: {sel.league}</div>
            <div className="text-white font-black text-xl mt-2">{sel.home} vs {sel.away}</div>
            <div className="text-[#00c8ff] text-3xl font-black my-3">{sel.hs} - {sel.as}</div>
            <button onClick={()=>setSel(null)} className="w-full bg-[#00c8ff] text-black py-3 rounded-xl font-black">CLOSE</button>
          </div>
        </div>
      )}
    </div>
  )
}
