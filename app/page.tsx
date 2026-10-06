"use client"
import { useState } from "react"
export default function Page(){
const [f,setF]=useState("All")
const g=[
{h:"Colombia",a:"Peru",s:"0-0",c:"WORLD Friendly",l:false},
{h:"Argentina",a:"Benin",s:"0-0",c:"WORLD Friendly",l:false},
{h:"Goias",a:"Athletic",s:"LIVE",c:"BRAZIL Serie B",l:true},
{h:"Saoura",a:"Khenchela",s:"0-0",c:"ALGERIA Ligue 1",l:false},
]
const list=f==="All"?g:g.filter(x=>f==="LIVE"?x.l:!x.l)
return(
<div style={{minHeight:"100vh",background:"#050a12"}}>
<div style={{background:"#0a1929",padding:8}}>
<div style={{color:"#fff",textAlign:"center",fontWeight:800,fontSize:14}}>BESTSCORE • {list.length} MATCHES</div>
<div style={{height:2,background:"#00bfff",margin:"8px -8px"}}/>
<div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
<button onClick={()=>setF("All")} style={{background:f==="All"?"#00bfff":"#132f45",color:f==="All"?"#000":"#8aa8bd",padding:"7px 13px",borderRadius:7,border:"none",fontWeight:800}}>All</button>
<button onClick={()=>setF("LIVE")} style={{background:f==="LIVE"?"#ff2d2d":"#132f45",color:f==="LIVE"?"#fff":"#8aa8bd",padding:"7px 13px",borderRadius:7,border:"none",fontWeight:800}}>LIVE</button>
<button onClick={()=>setF("FT")} style={{background:f==="FT"?"#00bfff":"#132f45",color:f==="FT"?"#000":"#8aa8bd",padding:"7px 13px",borderRadius:7,border:"none",fontWeight:800}}>FT</button>
<button onClick={()=>window.location.reload()} style={{background:"#00bfff",padding:"7px 13px",borderRadius:7,border:"none",fontWeight:800,marginLeft:"auto"}}>REFRESH</button>
</div>
</div>
<div style={{padding:6,display:"flex",flexDirection:"column",gap:6}}>
{list.map((x,i)=><button key={i} onClick={()=>alert(x.h+" vs "+x.a+" = "+x.s)} style={{width:"100%",background:"#0f1f33",borderRadius:8,padding:10,display:"flex",justifyContent:"space-between",border:"none",textAlign:"left"}}><div><div style={{color:"#5a7a9a",fontSize:10}}>{x.c}</div><div style={{color:"#fff",fontSize:14,marginTop:2}}>{x.h} vs {x.a}</div></div><div style={{background:x.l?"#ff2d2d":"#132f45",color:x.l?"#fff":"#00bfff",padding:"4px 10px",borderRadius:6,fontSize:12,fontWeight:800}}>{x.s}</div></button>)}
</div>
</div>
)
}
