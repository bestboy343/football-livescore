'use client';
import { useEffect, useState } from 'react';
export default function Page(){
 const [matches,setMatches]=useState<any[]>([]);
 const [time,setTime]=useState('');
 useEffect(()=>{
  const load=async()=>{
   try{
    const r=await fetch('/api/live',{cache:'no-store'});
    const d=await r.json();
    setMatches(Array.isArray(d)?d:[]);
    setTime(new Date().toLocaleTimeString());
   }catch{}
  };
  load(); const i=setInterval(load,30000); return()=>clearInterval(i);
 },[]);
 const grouped = matches.reduce((a:any,m)=>{ (a[m.league]=a[m.league]||[]).push(m); return a; },{});
 return(
  <div className="min-h-screen bg-black text-white">
   <div className="sticky top-0 bg-black/90 p-3 text-center border-b border-zinc-800">
    <div className="text-green-400 font-bold">⚽ FOOTBALLLIVE</div>
    <div className="text-xs text-gray-400">⚡ {time} | {matches.length} REAL MATCHES | Auto 30s</div>
   </div>
   <div className="p-2 space-y-2">
    {Object.entries(grouped).map(([lg,gm]:any)=>(
     <div key={lg} className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
      <div className="px-3 py-2 bg-zinc-800 text-sm font-bold flex justify-between"><span>{lg}</span><span>({gm.length})</span></div>
      {gm.map((g:any)=>(
       <div key={g.id} className="flex justify-between items-center px-3 py-3 border-t border-zinc-800 text-sm">
        <span className="w-[35%] truncate">{g.home}</span>
        <span className="px-2 py-1 bg-zinc-800 rounded-full text-green-400 text-xs font-bold">{g.score} <span className="text-gray-400">{g.minute}</span></span>
        <span className="w-[35%] text-right truncate">{g.away}</span>
       </div>
      ))}
     </div>
    ))}
    {matches.length===0 && <div className="text-center mt-20 text-gray-500">Loading live matches...</div>}
   </div>
  </div>
 );
}
