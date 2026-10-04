"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [matches,setMatches] = useState<any[]>([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    async function load(){
      setLoading(true);
      try{
        const res = await fetch(`/api/live`, { cache: 'no-store' });
        const data = await res.json();
        const real = Array.isArray(data)? data : (data.matches || []);
        setMatches(real);
      }catch{ setMatches([]); }
      setLoading(false);
    }
    load();
    const id = setInterval(load, 30000); // auto-refresh every 30s
    return ()=> clearInterval(id);
  }, []);

  // GROUP by league - so Argentina: Primera Nacional = 1 header only
  const grouped: any = {};
  matches.forEach((m:any)=>{
    const key = `${m.country}::${m.league}`;
    if(!grouped[key]) grouped[key] = { country:m.country, league:m.league, flag:m.flag, games:[] };
    grouped[key].games.push(m);
  });

  return (
    <div style={{background:'#111', minHeight:'100vh', color:'white', fontFamily:'Arial'}}>
      <div style={{background:'#000', padding:'10px', fontWeight:'bold', fontSize:'16px'}}>FOOTBALL LIVE</div>
      <div style={{background:'#00b050', padding:'6px 10px', fontWeight:'bold', fontSize:'13px'}}>Football » Today » LIVE - {matches.length} games</div>

      {loading? <div style={{padding:'30px', textAlign:'center'}}>Loading LIVE...</div> :
       Object.keys(grouped).length===0? <div style={{padding:'30px', textAlign:'center'}}>No LIVE matches now</div> :
       Object.values(grouped).map((g:any, gi:number)=>(
         <div key={gi}>
           <div style={{background:'#000', padding:'7px 10px', fontSize:'13px', fontWeight:'bold', display:'flex', alignItems:'center', gap:'8px', borderTop:'1px solid #222'}}>
             {g.flag? <img src={g.flag} alt="" style={{width:'20px', height:'14px', objectFit:'cover', borderRadius:'2px'}} /> : <span>🌍</span>}
             <span>{g.country}: {g.league} ({g.games.length})</span>
           </div>
           {g.games.map((m:any,i:number)=>(
             <div key={i} style={{display:'flex', justifyContent:'space-between', padding:'8px 10px', background:'#1c1c1c', borderBottom:'1px solid #2a2a2a'}}>
               <div>
                 <div style={{color:'#00ff00', fontSize:'11px', fontWeight:'bold'}}>{m.minute}</div>
                 <div style={{fontSize:'14px', lineHeight:'1.4'}}>{m.home}<br/>{m.away}</div>
               </div>
               <div style={{background:'#d00', padding:'6px 12px', borderRadius:'4px', fontWeight:'bold', height:'fit-content', alignSelf:'center', minWidth:'35px', textAlign:'center'}}>{m.score}</div>
             </div>
           ))}
         </div>
       ))
      }
    </div>
  );
}
