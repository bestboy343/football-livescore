'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function MatchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [game, setGame] = useState<any>(null);

  useEffect(() => {
    fetch('/api/live')
     .then(r => r.json())
     .then((data:any[]) => {
        const id = String(params.id);
        const found = data.find((g:any) => String(g.id) === id) || data[Number(id)] || data[0];
        setGame(found);
      });
  }, [params.id]);

  if (!game) {
    return <div style={{padding:20, color:'white', background:'#0f172a', minHeight:'100vh'}}>Loading match {String(params.id)}...</div>;
  }

  return (
    <div style={{background:'#0f172a', color:'white', minHeight:'100vh'}}>
      <div style={{background:'#1e293b', padding:16, display:'flex', justifyContent:'space-between'}}>
        <button onClick={()=>router.back()} style={{background:'#22c55e', border:'none', padding:'8px 16px', borderRadius:6, fontWeight:'bold'}}>← Back</button>
        <span>FOOTBALL LIVE</span>
      </div>
      <div style={{background:'#1e293b', margin:16, padding:20, borderRadius:12, textAlign:'center'}}>
        <div style={{color:'#94a3b8', fontSize:13}}>{game.country}: {game.league}</div>
        <div style={{color:'#22c55e', marginTop:6, fontWeight:'bold'}}>{game.minute || 'LIVE'}</div>
        <div style={{display:'flex', justifyContent:'space-around', alignItems:'center', marginTop:20}}>
          <b style={{flex:1}}>{game.home}</b>
          <b style={{background:'#dc2626', padding:'10px 18px', borderRadius:8}}>{game.score}</b>
          <b style={{flex:1}}>{game.away}</b>
        </div>
      </div>
    </div>
  );
}
