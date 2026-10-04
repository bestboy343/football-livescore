"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const All = [
["England","gb-eng",["Premier League","Championship","FA Cup","EFL Cup"]],
["Spain","es",["La Liga","La Liga 2","Copa del Rey"]],
["Germany","de",["Bundesliga","2. Bundesliga","DFB Pokal"]],
["Italy","it",["Serie A","Serie B","Coppa Italia"]],
["France","fr",["Ligue 1","Ligue 2","Coupe de France"]],
["Brazil","br",["Brasileiro","Serie B","Copa do Brasil"]],
["Nigeria","ng",["NPFL","FA Cup"]],
["Argentina","ar",["Liga Profesional","Primera Nacional"]],
["Portugal","pt",["Primeira Liga","Segunda Liga"]],
["Netherlands","nl",["Eredivisie","Eerste Divisie"]],
["Belgium","be",["Pro League","Challenger Pro"]],
["Turkey","tr",["Super Lig","1. Lig"]],
["USA","us",["MLS","USL Championship"]],
["Mexico","mx",["Liga MX","Liga Expansion"]],
["Scotland","gb-sct",["Premiership","Championship"]],
["Russia","ru",["Premier League","FNL"]],
["Saudi Arabia","sa",["Pro League","First Division"]],
["Japan","jp",["J1 League","J2 League"]],
["South Korea","kr",["K League 1","K League 2"]],
["Australia","au",["A-League","NPL"]],
["India","in",["ISL","I-League"]],
["South Africa","za",["PSL","First Division"]],
["Egypt","eg",["Premier League","Second Division"]],
["Morocco","ma",["Botola Pro","Botola 2"]],
];

export default function Leagues(){
const router = useRouter();
const [q,setQ]=useState("");
const filtered=All.filter((c)=>c[0].toString().toLowerCase().includes(q.toLowerCase()));
return (
<div style={{background:'#000',minHeight:'100vh',color:'#fff',padding:16}}>
<h1 style={{fontSize:22,fontWeight:'bold'}}>All Leagues (filtered: {filtered.length})</h1>
<input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search country..." style={{width:'100%',marginTop:12,padding:10,borderRadius:8,background:'#222',color:'#fff',border:'1px solid #444'}}/>
<div style={{marginTop:16,display:'grid',gap:12}}>
{filtered.map((c,i)=>(
<div key={i} onClick={()=>router.push(`/leagues/${c[1]}`)} style={{background:'#1a1a1a',padding:14,borderRadius:10,border:'1px solid #333',display:'flex',gap:12,alignItems:'center',cursor:'pointer'}}>
<img src={`https://flagcdn.com/w40/${c[1].toLowerCase()}.png`} width={32} style={{borderRadius:4}}/>
<div>
<div style={{fontWeight:'bold',fontSize:16}}>{i+1}. {c[0]}</div>
<div style={{fontSize:12,color:'#aaa'}}>{(c[2] as string[]).join(", ")}</div>
</div>
</div>
))}
</div>
<a href="/" style={{display:'block',marginTop:20,textAlign:'center',background:'#00ff88',color:'black',padding:12,borderRadius:8,fontWeight:'bold',textDecoration:'none'}}>Back Home</a>
</div>
)
}
