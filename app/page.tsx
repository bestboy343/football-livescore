'use client';
import { useEffect, useState } from 'react';

export default function Page() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const r = await fetch('/api/live');
        const d = await r.json();
        setMatches(d.matches || []);
      } catch {}
      setLoading(false);
    };
    load();
    const t = setInterval(load, 30000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{background:'#0a0a0a', color:'white', minHeight:'100vh', padding:'12px'}}>
      <h1 style={{fontSize:'20px', fontWeight:'bold', marginBottom:'12px'}}>
        FOOTBALL LIVE - {matches.length} LIVE
      </h1>
      {loading && <p>Loading...</p>}
      {matches.map((m:any)=>(
        <div key={m.id} style={{background:'#1a1a1a', padding:'12px', borderRadius:'12px', marginBottom:'8px', display:'flex', justifyContent:'space-between'}}>
          <div>
            <div style={{fontWeight:'bold'}}>{m.home} vs {m.away}</div>
            <div style={{fontSize:'11px', color:'#aaa'}}>{m.country} - {m.league} - {m.status}</div>
          </div>
          <div style={{fontWeight:'bold'}}>{m.score?.home ?? 0}-{m.score?.away ?? 0}</div>
        </div>
      ))}
      {!loading && matches.length===0 && <p>No live games</p>}
    </div>
  );
}
