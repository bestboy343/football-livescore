"use client";
import { useEffect, useState } from "react";

export default function Home(){
  const [matches,setMatches]=useState<any[]>([]);
  const [selected,setSelected]=useState<any>(null);
  const [detailTab,setDetailTab]=useState("formation");
  const [time,setTime]=useState("");

  useEffect(()=>{
    setTime(new Date().toLocaleTimeString());
    const load=()=>fetch('/api/live?v='+Date.now(),{cache:'no-store'}).then(r=>r.json()).then(d=>setMatches(Array.isArray(d)?d:[]));
    load();
    const i=setInterval(()=>{load(); setTime(new Date().toLocaleTimeString())},30000);
    return()=>clearInterval(i);
  },[]);

  if(selected){
    return(
      <div style={{background:'#0a0a0a',minHeight:'100vh',color:'#fff',padding:'12px',fontFamily:'sans-serif'}}>
        <button onClick={()=>setSelected(null)} style={{background:'#222',color:'#fff',border:'none',padding:'8px 16px',borderRadius:'20px',marginBottom:'12px',fontWeight:'bold'}}>← Back to Live Scores</button>
        <h1 style={{fontSize:'18px',fontWeight:'900'}}>{selected.homeTeam} vs {selected.awayTeam}</h1>
        <p style={{color:'#888',fontSize:'12px',marginTop:'4px'}}>{selected.league} • {selected.isLive?<span style={{color:'#22c55e',fontWeight:'bold'}}>● LIVE {selected.minute}'</span>:selected.status} • {selected.score?.display || '0-0'}</p>

        <div style={{display:'flex',gap:'6px',overflowX:'auto',margin:'16px 0'}}>
          {["Formation","Timeline","Stats","Bracket","Transfers","Trophies"].map(t=>(
            <button key={t} onClick={()=>setDetailTab(t.toLowerCase())} style={{padding:'7px 14px',borderRadius:'20px',border:'none',fontWeight:'bold',background:detailTab===t.toLowerCase()?'#16a34a':'#222',color:'#fff',fontSize:'13px',whiteSpace:'nowrap'}}>{t}</button>
          ))}
        </div>

        {detailTab==='formation' && (
          <div>
            <h2 style={{color:'#22c55e',fontSize:'13px',fontWeight:'bold',marginBottom:'8px'}}>⚽ GAME FORMATION - 4-3-3 - {selected.homeTeam}</h2>
            <div style={{background:'#15803d',borderRadius:'16px',padding:'16px',height:'420px',border:'2px solid #fff',position:'relative'}}>
              <div style={{position:'absolute',top:'50%',left:'0',right:'0',height:'2px',background:'#fff5'}}></div>
              <div style={{textAlign:'center'}}><div style={{background:'#fff',color:'#000',width:'46px',height:'46px',borderRadius:'50%',display:'inline-flex',alignItems:'center',justifyContent:'center',fontWeight:'900',fontSize:'10px',lineHeight:'11px'}}>GK<br/>Raya</div></div>
              <div style={{display:'flex',justifyContent:'space-around',marginTop:'28px'}}>
                {["LB Zin","CB Saliba","CB Gabriel","RB White"].map(p=><div key={p} style={{background:'#111',width:'52px',height:'52px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'9px',textAlign:'center',border:'2px solid #fff',fontWeight:'bold'}}>{p}</div>)}
              </div>
              <div style={{display:'flex',justifyContent:'space-around',marginTop:'28px'}}>
                {["CM Øde","CM Rice","CM Havertz"].map(p=><div key={p} style={{background:'#facc15',color:'#000',width:'52px',height:'52px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'9px',textAlign:'center',fontWeight:'900'}}>{p}</div>)}
              </div>
              <div style={{display:'flex',justifyContent:'space-around',marginTop:'28px'}}>
                {["LW Saka","ST Jesus","RW Martinelli"].map(p=><div key={p} style={{background:'#ef4444',width:'56px',height:'56px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'9px',textAlign:'center',fontWeight:'900',border:'2px solid #fff'}}>{p}</div>)}
              </div>
            </
