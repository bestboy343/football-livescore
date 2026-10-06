"use client"
import { useState } from "react"
export default function Page(){
const [f,setF]=useState("All")
const games=[
{h:"Colombia",a:"Peru",s:"0-0",c:"WORLD • Friendly • 12:00",live:false},
{h:"Argentina",a:"Benin",s:"0-0",c:"WORLD • Friendly • 14:00",live:false},
{h:"Goias",a:"Athletic",s:"LIVE",c:"BRAZIL • Serie B • Live",live:true},
{h:"Saoura",a:"Khenchela",s:"0-0",c:"ALGERIA • Ligue 1 • 16:30",live:false},
]
const list=games.filter(g=>f==="All"?true:f==="LIVE"?g.live:!g.live)
const b=(on:boolean)=>({background:on?"#00bfff":"#132f45",color:on?"#000":"#8aa8bd",padding:"7px 14px",borderRadius:"8px",fontSize:"13px",fontWeight:800,border:"none"} as any)
return(
<div style={{minHeight:"100vh",background:"#050a12"}}>
<div style={{background:"#0a1929",padding:"8px",position:"sticky",top:0}}>
<div style={{color:"#fff",textAlign:"center",fontWeight:800,fontSize:"14px"}}>BESTSCORE • {list.length} MATCHES</div>
<div style={{height:"2px",background:"#00bfff",margin:"8px -8px"}}/>
<div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
<button onClick={()=>setF("All")} style={b(f==="All")}>All</button>
<button onClick={()=>setF("LIVE")} style={{...b(f==="LIVE"),background:f==="LIVE"?"#ff2d2d":"#132f45",color:f==="LIVE"?"#fff":"#8aa8bd"}}>LIVE</button>
<button onClick={()=>setF("FT")} style={b(f==="FT")}>FT</button>
<button onClick={()=>{window.location.reload()}} style={{...b(true),marginLeft:"auto"}}>REFRESH</button>
</div>
</div>
<div style={{padding:"6px",display:"flex",flexDirection:"column",gap:"6px"}}>
{list.map((g,i)=>(
<button key={i} onClick={()=>alert(g.h+" vs "+g.a)} style={{width:"100%",background:"#0f1f33",borderRadius:"8px",padding:"10px",display:"flex",justifyContent:"space-between",border:"none",textAlign:"left"}}>
<div><div style={{color:"#5a7a9a",
