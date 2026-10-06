"use client"
import { useState } from "react"
export default function Page(){
const [s,setS]=useState<any>(null)
const m=[
{id:1,c:"WORLD",l:"Friendlies",h:"Colombia",a:"Peru"},
{id:2,c:"WORLD",l:"Friendlies",h:"Argentina",a:"Benin"},
{id:3,c:"BRAZIL",l:"Serie B",h:"Goias",a:"Athletic"},
{id:4,c:"ALGERIA",l:"Ligue 1",h:"Saoura",a:"Khenchela"},
]
return(
<div style={{minHeight:"100vh",background:"black"}}>
<div style={{background:"#0a1e2e",borderBottom:"3px solid #00bfff"}}>
<div style={{textAlign:"center",padding:"16px",fontWeight:"900",color:"white"}}>BESTSCORE • 4 MATCHES</div>
<div style={{display:"flex",gap:"8px",padding:"10px"}}>
<div style={{background:"#00bfff",color:"black",padding:"12px 24px",borderRadius:"12px",fontWeight:"900"}}>Today</div>
<div style={{background:"#112a3a",color:"#00bfff",padding:"12px 24px",borderRadius:"12px",fontWeight:"900"}}>Yesterday</div>
<div style={{background:"#112a3a",color:"#00bfff",padding:"12px 24px",borderRadius:"12px",fontWeight:"900"}}>Tomorrow</div>
</div>
<div style={{display:"flex",gap:"8px",padding:"0 10px 14px"}}>
<div style={{background:"#152d3d",color:"white",padding:"14px",borderRadius:"12px",fontWeight:"900"}}>All Games</div>
<div style={{background:"#152d3d",color:"red",flex:1,padding:"14px",borderRadius:"12px",fontWeight:"900",textAlign:"center"}}>LIVE</div>
<div style={{background:"#00bfff",color:"black",flex:1,padding:"14px",borderRadius:"12px",fontWeight:"900",textAlign:"center"}}>Finished</div>
<div style={{background:"#00bfff",color:"black",padding:"10px 20px",borderRadius:"12px",fontWeight:"900",textAlign:"center"}}>REFRESH NOW</div>
</div>
</div>
<div style={{padding:"10px",display:"flex",flexDirection:"column",gap:"8px"}}>
{m.map((x:any)=>(
<div key={x.id} onClick={()=>setS(x)} style={{background:"#101a2e",borderRadius:"12px",padding:"12px",display:"flex",justifyContent:"space-between"}}>
<div><div style={{fontSize:"11px",color:"#00bfff"}}
