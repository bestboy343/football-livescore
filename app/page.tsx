'use client';
import { useEffect, useState } from 'react';

export default function Page(){
 const [matches,setMatches]=useState<any[]>([]);
 const [sel,setSel]=useState<any>(null);
 const [tab,setTab]=useState('summary');
 const [events,setEvents]=useState<any[]>([]);
 const [loadingEv,setLoadingEv]=useState(false);

 const loadMatches=async()=>{
  try{
   const r=await fetch('/api/live',{cache:'no-store'});
   const j=await r.json();
   setMatches(j.matches||j.data||[]);
  }catch{}
 };

 const loadSummary=async(id:string)=>{
  setLoadingEv(true);
  setEvents([]);
  try{
   const r=await fetch('/api/match?id='+id);
   const j=await r.json();
   setEvents(j.events||[]);
  }catch{}
  setLoadingEv(false);
 };

 useEffect(()=>{
  loadMatches();
  const t=setInterval(loadMatches,30000);
  return()=>clearInterval(t);
 },[]);

 return(
  <div className="min-h-screen bg-black text-white p-3">
   <h1 className="text-xl font-bold mb-3">LiveScore</h1>
   <div className="space-y-2">
    {matches.map((m:any,i:number)=>{
     const id=m.id||m.matchId||i;
     const home=m.homeTeam?.name||m.home?.name||'Home';
     const away=m.awayTeam?.name||m.away?.name||'Away';
     const hg=m.homeTeam?.score ?? m.score?.home ?? 0;
     const ag=m.awayTeam?.score ?? m.score?.away ?? 0;
     const time=m.minute||m.status||'LIVE';
     return(
      <div key={id} onClick={()=>{setSel({...m,_id:id}); setTab('summary'); loadSummary(id);}} className="bg-zinc-900 p-3 rounded-xl flex justify-between">
       <div><div className="font-bold text-sm">{home} vs {away}</div><div className="text-xs opacity-60">{time}</div></div>
       <div className="font-bold">{hg}-{ag}</div>
      </div>
     )
    })}
   </div>
   {sel && (
    <div className="fixed inset-0 bg-black/80 flex items-end justify-center z-50 p-2">
     <div className="bg-zinc-950 w-full max-w-md rounded-2xl overflow-hidden">
      <div className="p-4 flex justify-between border-b border-zinc-800">
       <div className="font-bold text-sm">{sel.homeTeam?.name||'Home'} vs {sel.awayTeam?.name||'Away'}</div>
       <button onClick={()=>setSel(null)} className="bg-zinc-800 px-3 py-1 rounded-full">X</button>
      </div>
      <div className="flex gap-2 p-2 border-b border-zinc-800">
       <button onClick={()=>setTab('summary')} className={tab==='summary'?'bg-white text-black px-4 py-2 rounded-full text-sm font-bold':'bg-zinc-800 px-4 py-2 rounded-full text-sm'}>summary</button>
       <button onClick={()=>setTab('stats')} className={tab==='stats'?'bg-white text-black px-4 py-2 rounded-full text-sm font-bold':'bg-zinc-800 px-4 py-2 rounded-full text-sm'}>stats</button>
      </div>
      <div className="max-h-96 overflow-y-auto p-3">
       <div className="space-y-2">
        {loadingEv && <p className="text-sm opacity-70">Loading...</p>}
        {!loadingEv && events.length===0 && <p className="text-sm opacity-70">No events yet</p>}
        {events.map((e:any,i:number)=>(
         <div key={i} className="bg-zinc-900 p-3 rounded-lg flex justify-between">
          <span><b>{e.minute}</b> {e.player}</span>
          <span className="text-xs opacity-60">{e.team}</span>
         </div>
        ))}
       </div>
      </div>
     </div>
    </div>
   )}
  </div>
 )
}
