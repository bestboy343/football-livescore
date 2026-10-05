'use client';
import { useEffect, useState } from 'react';

type Game = {
  id: any;
  country?: string;
  league?: string;
  home: string;
  away: string;
  score?: string;
  minute?: string;
  status?: string;
};

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<Game | null>(null);

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
    const key = `${g.country || ''} : ${g.league || 'Other'}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(g);
  });

  if (loading) {
    return <div style={{padding:'20px', color:'white', textAlign:'center', background:'#0f0f0f', minHeight:'100vh'}}>Loading live games...</div>;
  }

  return (
    <div onContextMenu={e => e.preventDefault()} style={{background:'#0f0f0f', minHeight:'100vh', color:'white', userSelect:'none', WebkitUserSelect:'none'}}>
      {/* LIVE BAR */}
      <div style={{background:'#00d453', padding:'10px 14px', fontWeight:'bold', fontSize:'14px', position:'sticky', top:0, zIndex:10}}>
        Football • Today • LIVE ({games.length}) games
      </div>

      {Object.keys(grouped).length === 0? (
        <div style={{padding:'40px', textAlign:'center', opacity:0.6}}>No live games now. Check back later.</div>
      ) : (
        Object.entries(grouped).map(([league, list]: any) => (
          <div key={league} style={{marginBottom:'2px'}}>
            <div style={{background:'#1a1a1a', padding:'8px 12px', fontWeight:'bold', fontSize:'13px', display:'flex', justifyContent:'space-between'}}>
              <span>{league}</span><span>({list.length})</span>
            </div>

            {list.map((g: any, i: number) => (
              <button
                key={g.id || i}
                onClick={()=>setOpen(g)}
                style={{width:'100%', background:'#0f0f0f', border:'none', borderBottom:'1px solid #222', color:'white', padding:'12px', display:'flex', justifyContent:'space-between', alignItems:'center', textAlign:'left'}}
              >
                <div>
                  <div style={{fontSize:13}}>{g.home}</div>
                  <div style={{fontSize:13, opacity:0.8}}>{g.away}</div>
                  <div style={{fontSize:10, color:'#888'}}>{g.minute || g.status || 'LIVE'}</div>
                </div>
                <div style={{background:'#1a1a1a', padding:'6px 10px', borderRadius:6, fontWeight:'bold', minWidth:40, textAlign:'center'}}>{g.score || '0-0'}</div>
              </button>
            ))}
          </div>
        ))
      )}

      {/* POPUP - NO MORE 404! */}
      {open && (
        <div onClick={()=>setOpen(null)} style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', display:'flex', alignItems:'center', justifyContent:'center', padding:20, zIndex:100}}>
          <div onClick={e=>e.stopPropagation()} style={{background:'#1e293b', padding:20, borderRadius:14, width:'100%', maxWidth:360, textAlign:'center'}}>
            <div style={{fontSize:12, color:'#94a3b8'}}>{open.country} : {open.league}</div>
            <h2 style={{marginTop:10}}>{open.home} vs {open.away}</h2>
            <div style={{background:'#dc2626', display:'inline-block', padding:'10px 24px', borderRadius:8, marginTop:15, fontSize:22, fontWeight:'bold'}}>{open.score || '0-0'}</div>
            <div style={{marginTop:10, color:'#22c55e', fontWeight:'bold'}}>{open.minute || 'LIVE'}</div>
            <button onClick={()=>setOpen(null)} style={{marginTop:20, width:'100%', padding:12, background:'#22c55e', border:'none', borderRadius:8, fontWeight:'bold', color:'#000'}}>Close ✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
