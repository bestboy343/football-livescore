"use client"
import { useState } from "react"

export default function Page(){
  const [day,setDay]=useState("Today")
  const [filter,setFilter]=useState("Finished")
  const [sel,setSel]=useState<any>(null)

  const demo = [
    { id:1, c:"WORLD", l:"Friendlies", h:"Colombia", a:"Peru", hs:0, as:0, t:"19:00", s:"Not started" },
    { id:2, c:"WORLD", l:"Friendlies", h:"Argentina", a:"Benin", hs:0, as:0, t:"20:00", s:"Not started" },
    { id:3, c:"BRAZIL", l:"Serie B", h:"Goiás", a:"Athletic Club", hs:0, as:0, t:"23:00", s:"Not started" },
    { id:4, c:"ALGERIA", l:"Ligue 1", h:"JS Saoura", a:"Khenchela", hs:0, as:0, t:"16:00", s:"Postponed" },
  ]

  return(
    <div className="min-h-screen bg-black">
      {/* EXACT BLUE HEADER LIKE YOUR SCREENSHOT */}
      <div className="bg-[#0a1e2e]">
        <div className="text-center py-4 font-black text-white text-[22px] tracking-wide border-b-[3px] border-[#00bfff]">BESTSCORE • 4 MATCHES</div>

        <div className="px-4 pt-4 flex gap-3">
          <button onClick={()=>setDay("Today")} className={`px-6 py-3 rounded-xl font-black text-[16px] ${day==="Today"?"bg-[#00bfff] text-black":"bg-[#112a3a] text-[#00bfff]"}`}>Today</button>
          <button onClick={()=>setDay("Yesterday")} className={`px-6 py-3 rounded-xl font-black text-[16px] ${day==="Yesterday"?"bg-[#00bfff] text-black":"bg-[#112a3a] text-[#00bfff]"}`}>Yesterday</button>
          <button onClick={()=>setDay("Tomorrow")} className={`px-6 py-3 rounded-xl font-black text-[16px] ${day==="Tomorrow"?"bg-[#00bfff] text-black":"bg-[#112a3a] text-[#00bfff]"}`}>Tomorrow</button>
        </div>

        <div className="px-4 py-4 flex gap-2 items-center">
          <button onClick={()=>setFilter("All Games")} className={`px-5 py-4 rounded-xl font-black leading-none ${filter==="All Games"?"bg-[#00bfff] text-black":"bg-[#152d3d] text-white"}`}>All<br/>Games</button>
          <button onClick={()=>setFilter("LIVE")} className={`flex-1 py-4 rounded-xl font-black text-[16px] ${filter==="LIVE"?"bg-[#00bfff] text-black":"bg-[#152d3d] text-[#ff2222]"}`}>LIVE</button>
          <button onClick={()=>setFilter("Finished")} className={`flex-1 py-4 rounded-xl font-black text-[16px] ${filter==="Finished"?"bg-[#00bfff] text-black":"bg-[#152d3d] text-white"}`}>Finished</button>
          <button onClick={()=>window.location.reload()} className="bg-[#00bfff] text-black px-6 py-3 rounded-xl font-black text-[16px] leading-tight text-center">↻<br/>REFRESH<br/>NOW</button>
        </div>
      </div>

      {/* 4 DEMO IN BLACK BODY - CLICKABLE */}
      <div className="p-3 space-y-2 bg-black">
        {demo.map(m=>(
          <div key={m.id} onClick={()=>setSel(m)} className="bg-[#101a2e] rounded-xl px-4 py-3 flex justify-between items-center">
            <div>
              <div className="text-[11px] text-[#00bfff]">{m.c}: {m.l}</div>
              <div className="text-white font-bold text-[14px] mt-1">{m.h} vs {m.a}</div>
            </div>
            <div className="text-right">
              <div className="text-[#00bfff] font-bold">{m.hs} - {m.as
