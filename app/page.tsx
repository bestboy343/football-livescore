'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [games, setGames] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/live')
      .then(r => r.json())
      .then(d => setGames(Array.isArray(d) ? d : []));
  }, []);

  return (
    <div style={{background:'#111', color:'white', minHeight:'100vh'}}>
      <div style={{display:'flex', justifyContent:'space-between', padding:'16px', background:'#000'}}>
        <h1>FOOTBALL LIVE</h1>
        <Link href="/" style={{background:'#16a34a', padding:'8px 16px', borderRadius:'8px', color:'white', textDecoration:'none'}}>Home</Link>
      </div>

      <div style={{padding:'10px'}}>Football » Today » LIVE - {games.length} games</div>

      {games.map((m:any, i:number) => (
        <Link key={i} href={`/match/${m.id || i}`} style={{display:'block', textDecoration:'none', color:'white'}}>
          <div style={{padding:'12px', borderBottom:'1px solid #333', position:'relative'}}>
            <div style={{color:'#0f0', fontSize:'14px', fontWeight:'bold'}}>{m.minute}</div>
            <div style={{marginTop:'4px'}}>{m.home}</div>
            <div style={{opacity:0.8}}>{m.away}</div>
            <div style={{position:'absolute', right:'12px', top:'20px', background:'#dc2626', padding:'6px 14px', borderRadius:'6px', fontWeight:'bold'}}>
              {m.score}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
