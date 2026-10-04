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
    <div style={{background:'#111', color:'white', minHeight:'100vh', userSelect:'none', WebkitUserSelect:'none'}}>
      <style>{` *{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}`}</style>
      
      <div style={{padding:'12px', background:'#00c853', color:'white', fontWeight:'bold'}}>
        Football » Today » LIVE - {games.length} games
      </div>

      {games.map((m:any, i:number) => (
        <Link key={m.id || i} href={`/match/${m.id || i}`} style={{display:'block', textDecoration:'none', color:'white'}}>
          <div style={{padding:'14px 12px', borderBottom:'1px solid #222', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div style={{flex:1}}>
              <div style={{color:'#0f0', fontSize:'13px', fontWeight:'bold'}}>{m.minute || m.status || 'LIVE'}</div>
              <div style={{marginTop:'4px'}}>{m.home}</div>
              <div style={{color:'#aaa'}}>{m.away}</div>
            </div>
            <div style={{background:'#e50914', padding:'8px 16px', borderRadius:'6px', fontWeight:'bold', marginLeft:'10px'}}>
              {m.score}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
