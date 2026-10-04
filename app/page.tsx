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
  }, []);

  // GROUP BY LEAGUE
  const grouped: any = {};
  matches.forEach((m:any)=>{
    const key = `${m.country}|${m.league}|${m.flag}`;
    if(!grouped[key]) grouped[key] = { country:m.country, league:m.league, flag:m.flag, games:[] };
    grouped[key].games.push(m);
  });

  return (
    <div style={{background:'#111', minHeight:'100vh', color:'white', fontFamily:'Arial'}}>
      <div style={{background:'#000', padding:'10px', fontWeight:'bold'}}>FOOTBALL LIVE</div>
      <div style={{background:'#00b050', padding:'6px 10px', fontWeight:'bold', fontSize:'14px'}}>Football » Today » LIVE</div>

      {loading? <div style={{padding:'20px', textAlign:'center'}}>Loading...</div> :
       Object.keys(grouped).length===0? <div style={{padding:'20px', textAlign:'center'}}>No LIVE now</div> :
       Object.values(grouped).map((g:any, gi:number)=>(
         <div key={gi} style={{marginBottom:'4px'}}>
           {/* LEAGUE HEADER - ONCE */}
           <div style={{background:'#000', padding:'8px 10px', fontSize:'13px', fontWeight:'bold', display:'flex', alignItems:'center', gap:'8px', borderTop:'1px solid #333'}}>
             {g.flag && <img src={g.flag} alt="" style={{width:'22px', height:'15px', objectFit:'cover', borderRadius:'2px'}} />}
             <span>{g.country}: {g.league}</span>
           </div>
           {/* ALL GAMES UNDER SAME LEAGUE */}
           {g.games.map((m:any,i:number)=>(
             <div key={i} style={{display:'flex', justifyContent:'space-between', padding:'8px 10px', background:'#1a1a1a', borderBottom:'1px solid #222'}}>
               <div>
                 <div style={{color:'#00ff00', fontSize:'11px'}}>{m.minute||m.status} </div>
                 <div style={{fontSize:'14px', lineHeight:'1.3'}}>{m.home}<br/>{m.away}</div>
               </div>
               <div style={{background:'#d00', padding:'6px 12px', borderRadius:'4px', fontWeight:'bold', height:'fit-content', alignSelf:'center'}}>{m.score}</div>
             </div>
           ))}
         </div>
       ))
      }
    </div>
  );
}
