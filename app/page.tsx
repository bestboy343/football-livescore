'use client';
import { useEffect, useState } from 'react';

type Match = {
  id: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  score: { home: number; away: number; display: string };
  status: string;
  minute: string;
  isLive: boolean;
};

export default function Page() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/live?t=${Date.now()}`, { cache: 'no-store' })
      .then(r => r.json())
      .then(d => {
        setMatches(Array.isArray(d) ? d : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const liveCount = matches.filter(m => m.isLive).length;

  if (loading) return <div style={{padding:20,background:'black',color:'white',minHeight:'100vh'}}>Loading live scores...</div>;

  return (
    <div style={{background:'#000',color:'#fff',minHeight:'100vh',padding:20,fontFamily:'sans-serif'}}>
      <h1 style={{fontSize:26,fontWeight:'bold'}}>FOOTBALL LIVE - {liveCount} LIVE</h1>
      <p style={{color:'#888',fontSize:13}}>Auto-updating • {new Date().toLocaleTimeString()}</p>
      {matches.map(m => (
        <div key={m.id} style={{border:'1px solid #222',marginTop:14,padding:15,borderRadius:12,background:'#0f0f0f'}}>
          <div style={{fontSize:11,color:'#888'}}>{m.league} • {m.status} {m.minute}</div>
          <div style={{fontSize:18,fontWeight:700,marginTop:6}}>
            {m.homeTeam} <span style={{color:'#00ff88',margin:'0 8px'}}>{m.score.display}</span> {m.awayTeam}
          </div>
          {m.isLive && <div style={{marginTop:6,color:'#ff3333',fontSize:12,fontWeight:'bold'}}>● LIVE</div>}
        </div>
      ))}
    </div>
  );
}
