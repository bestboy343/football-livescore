"use client"
import { useState, useEffect } from "react"

export default function Page(){
  const [matches,setMatches]=useState<any[]>([])
  const [day,setDay]=useState("today")
  const [filter,setFilter]=useState("finished")
  const [loading,setLoading]=useState(false)

  const load = async (d=day) => {
    setLoading(true)
    try{
      const r = await fetch(`/api/live?day=${d}&_=${Date.now()}`,{cache:'no-store'})
      const j = await r.json()
      setMatches(j.response || j.data || [])
    }catch(e){ console.log(e) }
    setLoading(false)
  }

  useEffect(()=>{ load(day) },[day])

  const filtered = matches.filter((m:any)=>{
    const s = (m.status||"").toLowerCase()
    if(filter==="live") return s.includes("live")||s.includes("1h")||s.includes("2h")||s.includes("ht")
    if(filter==="finished") return s.includes("ft")||s.includes("finish")||s.includes("ended")
    return true
  })

  const b=(active:boolean, red=false)=>({
    padding:'12px 16px',borderRadius:'10px',fontWeight:'900',border:'none',
    cursor:'pointer', minWidth:'70px',
    background: active? '#00bfff' : '#112a36',
    color: red? '#ff2a2a' : active? '#000' : '#00bfff',
    fontSize:'15px'
  } as any)

  return(
    <div style={{margin:0,width:'100%',minHeight:'100vh',background:'#000',overflowX:'hidden',fontFamily:'sans-serif'}}>
      <div style={{background:'#0a1e2b',borderBottom:'3px solid #00bfff',padding:'14px',textAlign:'center'}}>
        <b style={{color:'#fff',fontSize:'20px',letterSpacing:'1px'}}>BESTSCORE • {filtered.length} MATCHES</b>
      </div>

      {/* Row 1 */}
      <div style={{background:'#0a1e2b',padding:'10px',display:'flex',gap:'8px'}}>
        <button style={b(day==='today')} onClick={()=>setDay('today')}>Today</button>
        <button style={b(day==='yesterday')} onClick={()=>setDay('yesterday')}>Yesterday</button>
        <button style={b(day==='tomorrow')} onClick={()=>setDay('tomorrow')}>Tomorrow</button>
      </div>

      {/* Row 2 */}
      <div style={{background:'#0a1e2b',padding:'10px',display:'flex',gap:'8px',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',gap:'7px'}}>
          <button style={{...b(filter==='all'),fontSize:'13px',lineHeight:'13px'}} onClick={()=>setFilter('all')}>All<br/>Games</button>
          <button style={b(filter==='live', true)} onClick={()=>setFilter('live')}>LIVE</button>
          <button style={b(filter==='finished')} onClick={()=>setFilter('finished')}>Finished</button>
        </div>
        <button onClick={()=>load(day)} style={{background:'#00bfff',color:'#000',border:'none',borderRadius:'12px',padding:'12px 18px',fontWeight:'900',cursor:'pointer',lineHeight:'15px',textAlign:'center'}}>
          ↻<br/>REFRESH<br/>NOW
        </button>
      </div>

      {/* Matches */}
      <div style={{padding:'8px',background:'#000'}}>
        {loading && <div style={{color:'#00bfff',textAlign:'center',padding:'30px'}}>Loading...</div>}
        {!loading && filtered.length===0 && <div style={{color:'#666',textAlign:'center',padding:'40px'}}>0 MATCHES<br/><span style={{fontSize:'12px'}}>API limit? Change key</span></div>}
        {filtered.map((m:any,i:number)=>(
          <div key={i} onClick={()=>alert(`${m.homeTeam?.name||m.home?.name} ${m.homeScore||0} - ${m.awayScore||0} ${m.awayTeam?.name||m.away?.name}\n${m.status||''}\n\nClick go turn to details page later`)}
          style={{background:'#0f2430',border:'1px solid #1a3a4a',borderRadius:'10px',padding:'12px',marginBottom:'8px',display:'flex',justifyContent:'space-between',cursor:'pointer'}}>
            <div>
              <div style={{fontSize:'11px',color:'#00bfff'}}>{m.league?.name||"League"}</div>
              <div style={{color:'#fff',fontWeight:'700',fontSize:'14px'}}>{m.homeTeam?.name||m.home?.name||"Home"} vs {m.awayTeam?.name||m.away?.name||"Away"}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{color:'#00bfff',fontWeight:'900'}}>{m.homeScore??0} - {m.awayScore??0}</div>
              <div style={{fontSize:'11px',color: (m.status||"").toLowerCase().includes("live")?"#ff2a2a":"#888"}}>{m.status||"FT"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
