"use client"
import { useState, useEffect } from "react"

export default function Page(){
  const [matches,setMatches]=useState<any[]>([])
  const [day,setDay]=useState("today")
  const [filter,setFilter]=useState("all")
  
  const load=async()=>{
    const r=await fetch(`/api/live?day=${day}`,{cache:'no-store'})
    const j=await r.json()
    setMatches(j.response||[])
  }
  useEffect(()=>{load()},[day])

  const btn=(active:boolean)=>({
    padding:'12px 18px',
    borderRadius:'8px',
    fontWeight:'900',
    border:'none',
    cursor:'pointer',
    background: active ? '#00bfff' : '#112a36',
    color: active ? 'black' : '#00bfff',
    fontSize:'16px'
  } as any)

  return(
    <div style={{minHeight:'100vh', background:'black', color:'white', fontFamily:'sans-serif'}}>
      <div style={{background:'#00131e', borderBottom:'4px solid #00bfff', padding:'16px', textAlign:'center'}}>
        <h1 style={{margin:0, fontSize:'22px', fontWeight:'900'}}>BESTSCORE • {matches.length} MATCHES</h1>
      </div>

      <div style={{background:'#001e2e', padding:'12px', display:'flex', gap:'10px'}}>
        <button style={btn(day==="today")} onClick={()=>setDay("today")}>Today</button>
        <button style={btn(day==="yesterday")} onClick={()=>setDay("yesterday")}>Yesterday</button>
        <button style={btn(day==="tomorrow")} onClick={()=>setDay("tomorrow")}>Tomorrow</button>
      </div>

      <div style={{background:'#001e2e', padding:'12px', display:'flex', gap:'10px', alignItems:'center', justifyContent:'space-between'}}>
        <div style={{display:'flex', gap:'8px'}}>
          <button style={{...btn(filter==="all"), lineHeight:'18px'}} onClick={()=>setFilter("all")}>All<br/>Games</button>
          <button style={{...btn(false), color: filter==="live" ? 'black' : '#ff3333', background: filter==="live" ? '#00bfff' : '#112a36'}} onClick={()=>setFilter("live")}>LIVE</button>
          <button style={btn(filter==="finished")} onClick={()=>setFilter("finished")}>Finished</button>
        </div>
        <button onClick={load} style={{background:'#00bfff', color:'black', padding:'12px 22px', borderRadius:'10px', fontWeight:'900', border:'none', textAlign:'center', lineHeight:'18px'}}>
          ↻<br/>REFRESH<br/>NOW
        </button>
      </div>

      <div style={{padding:'10px', textAlign:'center', color:'#666', marginTop:'40px'}}>
        {matches.length===0 ? "0 MATCHES - API limit reached" : `${matches.length} games`}
      </div>
    </div>
  )
}
