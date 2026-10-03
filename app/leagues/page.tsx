"use client";
import { useState } from "react";

const ALL = [
{c:"England",f:"gb-eng",l:["Premier League","Championship","FA Cup"]},
{c:"Spain",f:"es",l:["La Liga"]},
{c:"Germany",f:"de",l:["Bundesliga"]},
{c:"Italy",f:"it",l:["Serie A"]},
{c:"France",f:"fr",l:["Ligue 1"]},
{c:"Brazil",f:"br",l:["Serie A"]},
{c:"Nigeria",f:"ng",l:["NPFL"]},
];

export default function Home(){
 const [q,setQ]=useState("");
 const filtered = ALL.filter(x=>x.c.toLowerCase().includes(q.toLowerCase()));
 return(
  <div style={{background:"#080F19",minHeight:"100vh",padding:12,color:"white"}}>
   <h1 style={{fontSize:20,fontWeight:"bold"}}>LiveScore ⚽</h1>
   <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." style={{width:"100%",padding:10,borderRadius:8,background:"#151A27",border:"1px solid #333",color:"white",margin:"12px 0"}} />
   {filtered.map((o,i)=>(
    <div key={o.c} style={{background:"#151A27",padding:10,marginBottom:8,borderRadius:8,display:"flex",gap:8,alignItems:"center"}}>
     <span style={{color:"#666",fontSize:12,width:20}}>{i+1}</span>
     <img src={`https://flagcdn.com/w20/${o.f}.png`} width={20} height={14} alt="" />
     <span style={{fontWeight:"bold",fontSize:13}}>{o.c}</span>
     <span style={{marginLeft:"auto",fontSize:11,color:"#888"}}>{o.l[0]}</span>
    </div>
   ))}
   <a href="/leagues" style={{display:"block",marginTop:16,textAlign:"center",background:"#00d084",color:"#000",padding:12,borderRadius:8,fontWeight:"bold"}}>View All 120 Leagues →</a>
  </div>
 );
}
