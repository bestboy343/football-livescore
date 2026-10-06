"use client"
import { useState, useEffect } from "react"

export default function Page(){
  const [matches,setMatches]=useState<any[]>([])
  const [day,setDay]=useState("today")
  const [filter,setFilter]=useState("all")
  const [selected,setSelected]=useState<any>(null)
  const [loadingMatch,setLoadingMatch]=useState(false)

  const load = async (d=day) => {
    try{
      const r = await fetch(`/api/live?day=${d}&_=${Date.now()}`,{cache:'no-store'})
      const j = await r.json()
      setMatches(j.response || j.data || [])
    }catch{}
  }
  useEffect(()=>{ load(day) },[day])

  const openMatch = (m:any) => {
    setLoadingMatch(true)
    setSelected(null)
    setTimeout(()=>{ setSelected(m); setLoadingMatch(false)}, 600) // beautiful loading
  }

  const filtered = matches.filter((m:any)=>{
    const s=(m.status||"").toLowerCase()
    if(filter==="live") return s.includes("live")||s.includes("1h")||s.includes("2h")
    if(filter==="finished") return s.includes("ft")||s.includes("finish")
    return true
  })

  const b=(active:boolean, red=false)=>({
    padding:'11px 15px',borderRadius:'10px',fontWeight:'900',border:'none',cursor:'pointer',
    background: active?'#00bfff':'#112a36', color: red?'#ff2a2a': active?'#000':'#00bfff'
  } as any)

  // BEAUTIFUL MATCH DETAILS PAGE
  if(loadingMatch){
    return <div style={{minHeight:'100vh',background:'#000',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
      <div style={{width:'50px',height:'50px',border:'4px solid #112a36',borderTop:'4px solid #00bfff',borderRadius:'50%',animation:'spin 1s linear infinite'}}></div>
      <div style={{color:'#00bfff',marginTop:'20px',fontWeight:'900'}}>Loading Match...</div>
      <style>{`@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>
    </div>
  }

  if(selected){
    const home = selected.homeTeam?.name||selected.home?.name||"Home"
    const away = selected.awayTeam?.name||selected.away?.name||"Away"
    return(
      <div style={{minHeight:'100vh',background:'#000',color:'#fff',fontFamily:'sans-serif'}}>
        <div style={{background:'#0a1e2b',padding:'12px',display:'flex',alignItems:'center',gap:'10px',borderBottom:'3px solid #00bfff'}}>
          <button onClick={()=>setSelected(null)} style={{background:'#00bfff',border:'none',borderRadius:'8px',padding:'8px 14px',fontWeight:'900',cursor:'pointer'}}>← Back</button>
          <span style={{fontWeight:'900',fontSize:'13px',color:'#00bfff'}}>{selected.league?.name||"Premier League"}</span>
        </div>

        <div style={{background:'linear-gradient(180deg, #0a1e2b 0%, #000 100%)',padding:'30px 20px',textAlign:'center'}}>
          <div style={{display:'inline-block',background: (selected.status||"").toLowerCase().includes("live")?'#ff2a2a':'#112a36',color:'#fff',padding:'4px 12px',borderRadius:'20px',fontSize:'12px',fontWeight:'900',marginBottom:'20px'}}>
            {(selected.status||"FT").toUpperCase()} • {selected.time||"90'"}
          </div>

          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',maxWidth:'400px',margin:'0 auto'}}>
            <div style={{textAlign:'center',width:'120px'}}>
              <div style={{width:'70px',height:'70px',background:'#112a36',borderRadius:'50%',margin:'0 auto 10px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'30px',border:'2px solid #00bfff'}}>⚽</div>
              <div style={{fontWeight:'900',fontSize:'16px'}}>{home}</div>
              <div style={{fontSize:'11px',color:'#888'}}>Home</div>
            </div>
            <div style={{textAlign:'center'}}>
              <div style={{fontSize:'42px',fontWeight:'900',color:'#00bfff'}}>{selected.homeScore??2} - {selected.awayScore??1}</div>
              <div style={{fontSize:'12px',color:'#666',marginTop:'5px'}}>Half: 1-0</div>
            </div>
            <div style={{textAlign:'center',width:'120px'}}>
              <div style={{width:'70px',height:'70px',background:'#112a36',borderRadius:'50%',margin:'0 auto 10px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'30px',border:'2px solid #00bfff'}}>⚽</div>
              <div style={{fontWeight:'900',fontSize:'16px'}}>{away}</div>
              <div style={{fontSize:'11px',color:'#888'}}>Away</div>
            </div>
          </div>
        </div>

        <div style={{padding:'15px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
          <div style={{background:'#0f2430',borderRadius:'12px',padding:'15px',border:'1px solid #1a3a4a'}}>
            <div style={{fontSize:'11px',color:'#00bfff',fontWeight:'900',marginBottom:'8px'}}>POSSESSION</div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'18px',fontWeight:'900'}}><span>58%</span><span>42%</span></div>
            <div style={{height:'6px',background:'#112a36',borderRadius:'3px',marginTop:'8px',display:'flex'}}><div style={{width:'58%',background:'#00bfff',borderRadius:'3px'}}></div></div>
          </div>
          <div style={{background:'#0f2430',borderRadius:'12px',padding:'15px',border:'1px solid #1a3a4a'}}>
            <div style={{fontSize:'11px',color:'#00bfff',fontWeight:'900',marginBottom:'8px'}}>SHOTS ON TARGET</div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'18px',fontWeight:'900'}}><span>5</span><span>3</span></div>
            <div style={{height:'6px',background:'#112a36',borderRadius:'3px',marginTop:'8px',display:'flex'}}><div style={{width:'62%',background:'#00bfff',borderRadius:'3px'}}></div></div>
          </div>
        </div>

        <div style={{padding:'15px'}}>
          <button style={{width:'100%',background:'#00bfff',color:'#000',border:'none',padding:'16px',borderRadius:'12px',fontWeight:'900',fontSize:'16px',cursor:'pointer'}}>View Live Commentary →</button>
        </div>
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
        <button onClick={()=>load(day)} style={{background:'#00bfff',color:'#000',border:'none',borderRadius:'12px',padding:'10px 16px',fontWeight:'900',lineHeight:'14px'}}>↻<br/>REFRESH<br/>NOW</button>
      </div>
      <div style={{padding:'8px'}}>
        {filtered.length===0 && <div style={{color:'#555',textAlign:'center',padding:'40px'}}>No matches - API limit.<br/>Click REFRESH after new key.</div>}
        {filtered.map((m:any,i:number)=>(
          <div key={i} onClick={()=>openMatch(m)} style={{background:'#0f2430',border:'1px solid #1a3a4a',borderRadius:'12px',padding:'12px',marginBottom:'8px',display:'flex',justifyContent:'space-between',cursor:'pointer'}}>
            <div><div style={{fontSize:'10px',color:'#00bfff'}}>{m.league?.name||"League"}</div><div style={{color:'#fff',fontWeight:'700',fontSize:'13px'}}>{m.homeTeam?.name||m.home?.name} vs {m.awayTeam?.name||m.away?.name}</div></div>
            <div style={{textAlign:'right'}}><div style={{color:'#00bfff',fontWeight:'900'}}>{m.homeScore??0} - {m.awayScore??0}</div><div style={{fontSize:'10px',color:'#888'}}>{m.status||"FT"}</div></div>
          </div>
        ))}
        {/* Demo matches so you can see beautiful page even before API fix */}
        {filtered.length===0 && [
          {home:{name:"Man City"},away:{name:"Arsenal"},homeScore:2,awayScore:1,league:{name:"Premier League"},status:"LIVE 78'"},
          {home:{name:"Barcelona"},away:{name:"Real Madrid"},homeScore:1,awayScore:1,league:{name:"La Liga"},status:"HT"}
        ].map((m,i)=><div key={'demo'+i} onClick={()=>openMatch(m)} style={{background:'#0f2430',border:'1px solid #00bfff',borderRadius:'12px',padding:'12px',marginBottom:'8px',display:'flex',justifyContent:'space-between',cursor:'pointer'}}>
          <div><div style={{fontSize:'10px',color:'#00bfff'}}>{m.league.name} • DEMO</div><div style={{color:'#fff',fontWeight:'700'}}>{m.home.name} vs {m.away.name}</div></div><div style={{textAlign:'right'}}><div style={{color:'#00bfff',fontWeight:'900'}}>{m.homeScore} - {m.awayScore}</div><div style={{fontSize:'10px',color:'#ff2a2a'}}>{m.status}</div></div></div>)}
      </div>
    </div>
  )
}
