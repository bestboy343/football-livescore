"use client"
import { useEffect, useState } from 'react'

export const revalidate = 30

export default function Home() {
  const [matches, setMatches] = useState<any[]>([])
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleTimeString())
  const [loading, setLoading] = useState(true)

  const loadMatches = async () => {
    try {
      // Replace with your real API later
      const mock = [
        { id:1, league:"Premier League", home:"Man City", away:"Arsenal", hGoal:2, aGoal:1, status:"78'", minute:78, events:[{t:23,type:"goal",team:"home",player:"Haaland"},{t:45,type:"yellow",team:"away",player:"Saka"},{t:67,type:"goal",team:"home",player:"Foden"}] },
        { id:2, league:"La Liga", home:"Real Madrid", away:"Barcelona", hGoal:1, aGoal:1, status:"HT", minute:45, events:[{t:12,type:"goal",team:"home",player:"Vinicius"}] },
        { id:3, league:"Serie A", home:"Inter", away:"AC Milan", hGoal:0, aGoal:0, status:"15'", minute:15, events:[] },
      ]
      setMatches(mock)
      setLastUpdate(new Date().toLocaleTimeString())
      setLoading(false)
    } catch(e){ setLoading(false) }
  }

  useEffect(()=>{
    loadMatches()
    const id = setInterval(loadMatches, 30000) // Auto refresh 30s - like ANWP
    return ()=>clearInterval(id)
  },[])

  if(loading) return <div style={{padding:50,textAlign:'center'}}>Loading live scores...</div>

  return (
    <main style={{background:"#0a0a0a", minHeight:"100vh", color:"white", padding:"15px", fontFamily:"system-ui"}}>
      <h1 style={{color:"#00ff88", textAlign:"center"}}>⚽ FootballLive - LIVE</h1>
      <p style={{textAlign:"center", opacity:0.5, fontSize:12}}>Auto-refresh every 30s • Last: {lastUpdate} • Vercel Fast ⚡</p>
      
      {matches.map(m=>(
        <div key={m.id} style={{background:"#161616", margin:"15px 0", borderRadius:12, padding:15, border:"1px solid #222"}}>
          <div style={{fontSize:11, opacity:0.5}}>{m.league} • <span style={{color:"#00ff88"}}>{m.status}</span></div>
          <div style={{display:"flex", justifyContent:"space-between", marginTop:8, fontWeight:"bold", fontSize:18}}>
            <span>{m.home}</span>
            <span style={{background:"#00ff88", color:"#000", padding:"2px 10px", borderRadius:6}}>{m.hGoal} - {m.aGoal}</span>
            <span>{m.away}</span>
          </div>

          {/* TIMELINE like ANWP Premium */}
          {m.events.length>0 && (
            <div style={{marginTop:12, borderTop:"1px solid #222", paddingTop:10}}>
              <div style={{fontSize:12, opacity:0.7, marginBottom:6}}>📈 Match Timeline</div>
              {m.events.map((e:any,i:number)=>(
                <div key={i} style={{fontSize:13, margin:"4px 0"}}>
                  {e.type==="goal" ? "⚽" : "🟨"} {e.t}' {e.player} <span style={{opacity:0.5}}>({e.team})</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <div style={{textAlign:"center", marginTop:30, opacity:0.3, fontSize:11}}>
        Vercel + ANWP Features • Fast Small ⚡ • Free Forever
      </div>
    </main>
  )
}
