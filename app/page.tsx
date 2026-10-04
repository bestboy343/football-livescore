"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [matches,setMatches] = useState<any[]>([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    async function load(){
      setLoading(true);
      try{
        const res = await fetch(`/api/live`, { cache: 'no-store' });
        const data = await res.json();
        const real = Array.isArray(data) ? data : (data.matches || []);
        setMatches(real);
      }catch{ setMatches([]); }
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div style={{background:'#111', minHeight:'100vh', color:'white', fontFamily:'Arial'}}>
      <div style={{background:'#000', padding:'10px', fontWeight:'bold', display:'flex', justifyContent:'space-between'}}>
        <span>FOOTBALL LIVE</span>
        <span style={{background:'#00b050', padding:'4px 12px', borderRadius:'6px'}}>Home</span>
      </div>

      <div style={{background:'#00b050', padding:'6px 10px', fontWeight:'bold'}}>
        Football » Today » All Games
      </div>

      {loading ? (
        <div style={{padding:'20px', textAlign:'center'}}>Loading LIVE...</div>
      ) : matches.length===0 ? (
        <div style={{padding:'20px', textAlign:'center'}}>No LIVE matches</div>
      ) : (
        matches.map((m:any,i:number)=>(
          <div key={m.id||i} style={{borderBottom:'1px solid #222'}}>
            {/* THIS IS THE FIXED PART - FLAG IMAGE + COUNTRY */}
            <div style={{background:'#000', padding:'6px 10px', fontSize:'12px', fontWeight:'bold', display:'flex', alignItems:'center', gap:'8px'}}>
              {m.flag && <img src={m.flag} alt="" style={{width:'22px', height:'15px', objectFit:'cover', borderRadius:'2px'}} />}
              <span>{m.country}: {m.league}</span>
            </div>

            <div style={{display:'flex', justifyContent:'space-between', padding:'8px 10px'}}>
              <div>
                <div style={{color:'#00ff00', fontSize:'11px'}}>{m.minute || m.status}</div>
                <div style={{fontSize:'14px'}}>{m.home}<br/>{m.away}</div>
              </div>
              <div style={{background:'#d00', padding:'6px 12px', borderRadius:'4px', fontWeight:'bold', height:'fit-content'}}>{m.score}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
