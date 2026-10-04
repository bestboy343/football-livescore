'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function MatchPage() {
  const params = useParams();
  const [game, setGame] = useState<any>(null);

  useEffect(() => {
    fetch('/api/live').then(r=>r.json()).then((data:any[])=>{
      const id = String(params.id);
      const found = data.find((g:any)=> String(g.id)===id) || data[Number(id)] || data[0];
      setGame(found);
    });
  }, [params.id]);

  if(!game) return <div style={{padding:'20px', color:'white', background:'#111', minHeight:'100vh'}}>Loading...</div>;

  return (
    <div style={{background:'#111', color:'white', minHeight:'100vh'}}>
      <div style={{background:'#1a1a1a', padding:'20px', textAlign:'center'}}>
        <div style={{color:'#aaa'}}>{game.country}: {game.league}</div>
        <div style={{color:'#00e676', marginTop:'6px', fontWeight:'bold'}}>{game.minute || 'LIVE'}</div>
        <div style={{display:'flex', justifyContent:'space-around', alignItems:'center', marginTop:'20px'}}>
          <div style={{fontWeight:'bold'}}>{game.home}</div>
          <div style={{background:'#d32f2f', padding:'10px 20px', borderRadius:'8px', fontSize:'20px', fontWeight:'bold'}}>{game.score}</div>
          <div style={{fontWeight:'bold'}}>{game.away}</div>
        </div>
      </div>
      <button onClick={()=>history.back()} style={{margin:'20px', width:'calc(100% - 40px)', background:'#222', border:'none', color:'white', padding:'14px', borderRadius:'10px'}}>← Back</button>
    </div>
  );
}
