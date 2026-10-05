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
  setLoadingEv(true); setEvents([]);
  try{
   const r=await fetch(`/api/match?id=${id}`);
   const j=await r.json();
   setEvents(j.events||[]);
  }catch{ setEvents([]); }
  setLoadingEv(false);
 };

 useEffect(()=>{ loadMatches(); const t=setInterval(loadMatches,30000); return()=>clearInterval(t); },[]);

 return(
  <div className="min-h-screen bg-black text-white p-3">
   <h1 className="text-2xl font-bold mb-3">⚽ LiveScore</h1>
   <div className="space-y-2">
    {matches.length===0 && <p className="opacity-60 text-sm">No live matches now, checking...</p>}
    {matches.map((m:any,i:number)=>{
     const id=m.id||m.matchId||m.fixtureId||i;
     const home=m.homeTeam?.name||m.home?.name||'Home';
     const away=m.awayTeam?.name||m.away?.name||'Away';
     const hg=m.homeTeam?.score??m.home?.score??m.score?.home??0;
     const ag=m.awayTeam?.score??m.away?.score??m.score?.away??0;
     const time=m.minute||m.time||m.status||'LIVE';
     return(
      <div key={id} onClick={()=>{ setSel({...m,_id:id}); setTab('summary'); loadSummary(id); }} 
       className="bg-zinc-900 p-3 rounded-xl flex justify-between items-center active:bg-zinc-800">
       <div className="text-sm">
        <div className="font-bold">{home} vs {away}</div>
        <div className="text-xs opacity-60">{time} • {m.league?.name||''}</div>
       </div>
       <div className="font-bold text-lg">{hg} - {ag}</div>
      </div>
     )
    })}
   </div>

   {sel && (
    <div className="fixed inset-0 bg-black/80 flex items-end md:items-center justify-center z-50 p-2">
     <div className="bg-zinc-950 w-full max-w-md rounded-t-2xl md:rounded-2xl overflow-hidden max-h-
