'use client';
import { useEffect, useState } from 'react';

export default function Page() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const load = () => {
      fetch('/api/live').then(r=>r.json()).then(d=>{
        setMatches(d.matches||[]);
        setLoading(false);
      });
    };
    load();
    const t=setInterval(load,30000);
    return ()=>clearInterval(t);
  }, []);

  return (
    <div style={{background:'#0a0a0a',color:'white',minHeight:'100vh',padding:'12px',fontFamily:'system-ui'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px',borderBottom:'1px solid #222',paddingBottom:'12px'}}>
        <h1 style={{fontSize:'20px',fontWeight:'900'}}>FOOTBALL LIVE - {matches.length} LIVE</h1>
        <div style={{background:'#16a34a',padding:'6px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:'bold'}}>● LIVE</div>
      </div>
      
      {loading && <p style={{textAlign:'center',color:'#888'}}>Loading live matches...</p>}
      
      {matches.map((m:any)=>(
        <div key={m.id} style={{background:'#161616',border:'1px solid #262626',padding:'12px 14px',borderRadius:'14
