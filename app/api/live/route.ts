"use client"
import { useState, useEffect } from "react"

export default function Page(){
  const [matches,setMatches]=useState<any[]>([])
  const [day,setDay]=useState("today")
  const [filter,setFilter]=useState("all")
  const [selected,setSelected]=useState<any>(null)
  const [loading,setLoading]=useState(false)
  const [refreshing,setRefreshing]=useState(false)

  const load = async (d=day) => {
    setRefreshing(true); setLoading(true)
    try{
      const r = await fetch(`/api/live?day=${d}&_=${Date.now()}`,{cache:'no-store'})
      const j = await r.json()
      setMatches(j.response || [])
    }catch{}
    setTimeout(()=>{setRefreshing(false); setLoading(false)},700)
  }
  useEffect(()=>{load(day)},[day])

  const open = (m:any) => { setLoading(true); setTimeout(()=>{setSelected(m); setLoading(false)},500) }

  const filtered = matches.filter((m:any)=>{
    const s=(m.status||"").toLowerCase()
    if(filter==="live") return s.includes("live")
    if(filter==="finished") return s.includes("ft")||s.includes("finish")
    return true
  })

  const b=(a:boolean, red=false)=>({padding:'11px 14px',borderRadius:'10px',fontWeight:'900',border:'none',cursor:'pointer',background:a?'#00bfff':'#112a36',color:red?'#ff2a2a':a?'#000':'#00bfff'} as any)

  if(loading &&!selected && matches.length===0){
    return <div style={{minHeight:'100vh',background:'#000',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}><div style={{width:'40px',height:'40px',border:'4px solid #112a36',borderTop:'4px solid #00bfff',borderRadius:'50%',animation:'spin 1s linear infinite'}}></div><div style={{color:'#00bfff',marginTop:'15px',fontWeight:'900'}}>LOADING...</div><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>
  }

  if(selected){
    return(
      <div style={{minHeight:'100vh',background:'#000',color:'#fff'}}>
        <div style={{background:'#0a1e2b',padding:'12px',display:'flex',gap:'10px',borderBottom:'3px solid #00bfff'}}>
          <button onClick={()=>setSelected(null)} style={{background:'#00bfff',border:'none',borderRadius:'8px',padding:'8px 14px',fontWeight:'900'}}>← Back</button>
          <span style={{color:'#00bfff',fontWeight:'900',fontSize:'13px'}}>{selected.league?.name}</span>
        </div>
        <div style={{background:'linear-gradient(#0a1e2b,#000)',padding:'30px 20px',textAlign:'center'}}>
          <div style={{background:'#ff2a2a',display:'inline-block',padding:'4px 12px',borderRadius:'20px',fontSize:'11px',fontWeight:'900',marginBottom:'20px'}}>{selected.status}</div>
          <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
            <div><div style={{width:'65px',height:'65px',background:'#112a36',borderRadius:'50%',margin:'0 auto 10px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',border:'2px solid #00bfff'}}>⚽</div><b>{selected.homeTeam?.name}</b></div>
            <div style={{fontSize:'38px',fontWeight:'900',color:'#00bfff'}}>{selected.homeScore} - {selected.awayScore}</div>
            <div><div style={{width:'65px',height:'65px',background:'#112a36',borderRadius:'50%',margin:'0 auto 10px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',border:'2px solid #00bfff'}}>⚽</div><b>{selected.awayTeam?.name}</b></div>
          </div>
        </div>
        <div style={{padding:'15px'}}><button style={{width:'100%',background:'#00bfff',border:'none',padding:'16px',borderRadius:'12px',fontWeight:'900'}}>Live Commentary →</button></div>
      </div>
    )
  }

  return(
    <div style={{margin:0,width:'100%',minHeight:'100vh',background:'#000',overflowX:'hidden',fontFamily:'sans-serif'}}>
      <div style={{background:'#0a1e2b',borderBottom:'3px solid #00bfff',padding:'14px',textAlign:'center'}}><b style={{color:'#fff'}}>BESTSCORE • {filtered.length} MATCHES</b></div>
      <div style={{background:'#0a1e2b',padding:'10px',display:'flex',gap:'8px'}}>
        <button style={b(day==='today')} onClick={()=>setDay('today')}>Today</button>
        <button style={b(day==='yesterday')} onClick={()=>setDay('yesterday')}>Yesterday</button>
        <button style={b(day==='tomorrow')} onClick={()=>setDay('tomorrow')}>Tomorrow</button>
      </div>
      <div style={{background:'#0a1e2b',padding:'10px',display:'flex',gap:'7px',justifyContent:'space-between'}}>
        <div style={{display:'flex',gap:'7px'}}>
          <button style={{...b(filter==='all'),fontSize:'12px',lineHeight:'12px'}} onClick={()=>setFilter('all')}>All<br/>Games</button>
          <button style={b(filter==='live',true)} onClick={()=>setFilter('live')}>LIVE</button>
          <button style={b(filter==='finished')} onClick={()=>setFilter('finished')}>Finished</button>
        </div>
        <button onClick={()=>load(day)} style={{background:refreshing?'#555':'#00bfff',color:'#000',border:'none',borderRadius:'12px',padding:'10px 16px',fontWeight:'900',lineHeight:'14px'}}>{refreshing?'⟳':'↻'}<br/>{refreshing?'LOADING':'REFRESH'}<br/>NOW</button>
      </div>
      <div style={{padding:'8px'}}>
        {filtered.map((m:any,i:number)=>(
          <div key={i} onClick={()=>open(m)} style={{background:'#0f2430',border:'1px solid #1a3a4a',borderRadius:'12px',padding:'12px',marginBottom:'8px',display:'flex',justifyContent:'space-between',cursor:'pointer'}}>
            <div><div style={{fontSize:'10px',color:'#00bfff'}}>{m.league?.name}</div><div style={{color:'#fff',fontWeight:'700',fontSize:'13px'}}>{m.homeTeam?.name} vs {m.awayTeam?.name}</div></div>
            <div style={{textAlign:'right'}}><div style={{color:'#00bfff',fontWeight:'900'}}>{m.homeScore} - {m.awayScore}</div><div style={{fontSize:'10px',color:m.status?.includes('LIVE')?'#ff2a2a':'#888'}}>{m.status}</div></div>
          </div>
        ))}
      </div>
    </div>
  )
}
