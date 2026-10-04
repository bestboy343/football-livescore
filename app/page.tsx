'use client';
import { useEffect, useState } from 'react';

type Game = {
  id: any;
  country?: string;
  league?: string;
  home: string;
  away: string;
  score: string;
  minute?: string;
  status?: string;
};

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/live')
     .then(r => r.json())
     .then(d => {
        setGames(Array.isArray(d)? d : []);
        setLoading(false);
      })
     .catch(() => setLoading(false));
  }, []);

  // Group by league
  const grouped: any = {};
  games.forEach((g: any) => {
    const key = `${g.country || ''}: ${g.league || 'Other'}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(g);
  });

  if (loading) {
    return <div style={{padding:'20px', color:'white', textAlign:'center'}}>Loading live games...</div>;
  }

  return (
    <div
      onContextMenu={e => e.preventDefault()}
      style={{background:'#0f0f0f', minHeight:'100vh', color:'white', userSelect:'none', WebkitUserSelect:'none' as any}}
    >
      {/* LIVE BAR */}
      <div style={{background:'#00c853', padding:'10px 14px', fontWeight:'bold', fontSize:'14px', position:'sticky', top:'56px', zIndex:10}}>
        Football » Today » LIVE - {games.length} games
      </div>

      {/* GAMES */}
      {Object.keys(grouped).length === 0? (
        <div style={{padding:'40px', textAlign:'center', opacity:0.6}}>No live games now. Check back later!</div>
      ) : (
        Object.entries(grouped).map(([league, list]: any) => (
          <div key={league} style={{marginBottom:'2px'}}>
            <div style={{background:'#1a1a1a', padding:'8px 12px', fontWeight:'bold', fontSize:'13px', display:'flex', alignItems:'center', gap:'6px', borderBottom:'1px solid #222'}}>
              <span>🌍</span> {league} ({list.length})
            </div>

            {list.map((m: any, i: number) => (
              <button
                key={m.id || i}
                onClick={() => window.location.href = `/matches/${m.id || i}`}
                style={{
                  display:'flex',
                  justifyContent:'space-between',
                  alignItems:'center',
                  width:'100%',
                  background:'#121212',
                  border:'none',
                  borderBottom:'1px solid #1e1e1e',
                  color:'white',
                  padding:'12px 12px',
                  textAlign:'left',
                  cursor:'pointer'
                }}
              >
                <div style={{flex:1, minWidth:0}}>
                  <div style={{color:'#00e676', fontSize:'12px', fontWeight:'bold'}}>{m.minute || m.status || 'LIVE'}</div>
                  <div style={{marginTop:'3px', fontSize:'15px', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{m.home}</div>
                  <div style={{color:'#aaa', fontSize:'15px', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{m.away}</div>
                </div>
                <div style={{
