"use client"
import { useState, useEffect } from "react"

export default function Page(){
  const [games,setGames]=useState<any[]>([])
  const [day,setDay]=useState("today")
  const [filter,setFilter]=useState("all")
  const [loading,setLoading]=useState(false)

  const load=async()=>{
    setLoading(true)
    try{
      const r=await fetch(`/api/live?day=${day}&filter=${filter}&t=${Date.now()}`)
      const d=await r.json()
      setGames(d.response||d.data||[])
    }catch(e){}
    setLoading(false)
  }

  useEffect(()=>{load()},[day,filter])

  return (
    <div style={{background:'#0a0a0a',color:'white',minHeight:'100vh',padding:16}}>
      <h1 style={{fontWeight:900}}>BESTSCORE</h1>
      <div style={{display:'flex',gap:8,marginTop:12}}>
        <button onClick={()=>setDay('yesterday')} style={{padding:'6px 12px',background:day==='yesterday'?'white':'#333',color:day==='yesterday'?'black':'white'}}>Yesterday</button>
        <button onClick={()=>setDay('today')} style={{padding:'6px 12px',background:day==='today'?'white':'#333',color:day==='today'?'black':'white'}}>Today</button>
        <button onClick={()=>setDay('tomorrow')} style={{padding:'6px 12px',background:day==='tomorrow'?'white':'#333',color:day==='tomorrow'?'black':'white'}}>Tomorrow</button>
        <button onClick={load} style={{marginLeft:'auto',background:'white',color:'black',padding:'6px 12px'}}>REFRESH NOW</button>
      </div>
      <p style={{marginTop:12,color:'#aaa'}}>{loading?'LOADING...':games.length+' MATCHES'}</p>
      <div style={{marginTop:12}}>
        {games.map((m:any,i:number)=>(
          <div key={i} style={{background:'#222',padding:10,marginBottom:8,borderRadius:8}}>
            <div>{m.league?.name||'League'}</div>
            <div style={{fontWeight:'bold'}}>{m.homeTeam?.name||m.home?.name} vs {m.awayTeam?.name||m.away?.name}</div>
            <div>{m.homeScore ?? '-'} : {m.awayScore ?? '-' } - {m.status}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
