'use client';
import { useEffect, useState } from 'react';

export default function Page() {
  const [matches, setMatches] = useState<any[]>([]);
  
  useEffect(() => {
    fetch('/api/live').then(r=>r.json()).then(d=>setMatches(d.matches||[]));
    const t=setInterval(()=>fetch('/api/live').then(r=>r.json()).then(d=>setMatches(d.matches||[])),30000);
    return ()=>clearInterval(t);
  }, []);

  return (
    <div style={{background:'#0a0a0a',color:'white',minHeight:'100vh',padding:'16px'}}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'16px'}}>
        <h1 style={{fontSize:'22px',fontWeight:'bold'}}>FOOTBALL LIVE - {matches.length} LIVE</h1>
        <a href="/" style={{background:'#16a34a',padding:'6px 14px',borderRadius:'8px',color:'white',textDecoration:'none'}}>Home</a>
      </div>
      {matches.map((m:any)=>(
        <div key={m.id} style={{background:'#1e1e1e',padding:'12px',borderRadius:'12px',marginBottom:'10px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <div style={{fontWeight:'bold'}}>{m.home} vs {m.away}</div>
            <div style={{fontSize:'11px',color:'#9ca3af'}}>{m.country} • {m.league} • {m.status} {m.minute}'</div>
          </div>
          <div style={{fontWeight:'bold',fontSize:'18px'}}>{m.score?.home ?? 0}-{m.score?.away ?? 0}</div>
        </div>
      ))}
      {matches.length===0 && <p>Loading matches...</p>}
    </div>
  );
}
