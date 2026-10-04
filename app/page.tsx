"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [time, setTime] = useState("");
  const [open, setOpen] = useState<string | null>("Premier League");

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
    const i = setInterval(() => setTime(new Date().toLocaleTimeString()), 30000);
    return () => clearInterval(i);
  }, []);

  const data: any = {
    "Premier League": [
      { home:"Man City", away:"Arsenal", h:2, a:1, min:"78'", events:[{m:23,t:"⚽ Haaland"},{m:45,t:"🟨 Saka"}] },
      { home:"Chelsea", away:"Liverpool", h:0, a:0, min:"15'", events:[] },
      { home:"Man Utd", away:"Tottenham", h:1, a:1, min:"HT", events:[{m:12,t:"⚽ Son"}] },
    ],
    "La Liga": [
      { home:"Real Madrid", away:"Barcelona", h:1, a:1, min:"45'", events:[] },
      { home:"Atletico", away:"Sevilla", h:2, a:0, min:"62'", events:[] },
    ],
    "Bundesliga": [{ home:"Bayern", away:"Dortmund", h:3, a:2, min:"89'", events:[{m:90,t:"⚽ Kane"}] }],
    "Serie A": [{ home:"Inter", away:"AC Milan", h:0, a:0, min:"22'", events:[] },{ home:"Juventus", away:"Napoli", h:1, a:0, min:"55'", events:[] }],
    "Ligue 1": [{ home:"PSG", away:"Marseille", h:2, a:2, min:"90+3'", events:[] }],
  };

  const leagues = [
    { name: "Premier League", flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿" }, { name:"La Liga", flag:"🇪🇸" },
    { name:"Bundesliga", flag:"🇩🇪" }, { name:"Serie A", flag:"🇮🇹" }, { name:"Ligue 1", flag:"🇫🇷" },
  ];

  return (
    <div style={{ background:"#0a0a0a", minHeight:"100vh", color:"white", padding:12, fontFamily:"sans-serif" }}>
      <h1 style={{ textAlign:"center", color:"#00ff88", margin:0 }}>⚽ FOOTBALLLIVE</h1>
      <p style={{ textAlign:"center", fontSize:11, opacity:0.5 }}>Vercel Fast ⚡ | {time} | Auto 30s | ANWP Features</p>

      {leagues.map(l=>(
        <div key={l.name} style={{ background:"#171717", border:"1px solid #222", borderRadius:12, marginTop:12, overflow:"hidden" }}>
          <div onClick={()=> setOpen(open===l.name? null : l.name)} style={{ padding:14, display:"flex", justifyContent:"space-between", cursor:"pointer" }}>
            <span><b>{l.flag} {l.name}</b> <span style={{fontSize:11, opacity:0.5}}> {data[l.name].length} matches</span></span>
            <span style={{ background:"#00ff88", color:"black", fontSize:11, fontWeight:"bold", padding:"3px 8px", borderRadius:6 }}>{data[l.name].length} LIVE</span>
          </div>

          {open===l.name && data[l.name].map((m:any,i:number)=>(
            <div key={i} style={{ borderTop:"1px solid #222", padding:10, background:"#101010" }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:14 }}>
                <span>{m.home}</span>
                <span style={{ background:"#222", padding:"2px 8px", borderRadius:6, color:"#00ff88", fontWeight:"bold" }}>{m.h} - {m.a} <span style={{ fontSize:10, opacity:0.7 }}>{m.min}</span></span>
                <span>{m.away}</span>
              </div>
              {m.events.length>0 && (
                <div style={{ marginTop:6, fontSize:11, opacity:0.7 }}>
                  {m.events.map((e:any,j:number)=>(<div key={j}> {e.m}' {e.t} </div>))}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
