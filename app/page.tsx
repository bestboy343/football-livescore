"use client"
import { useState } from "react"
export default function Page(){
  const [day,setDay]=useState("Today")
  const [filter,setFilter]=useState("All")
  const [sel,setSel]=useState<any>(null)
  const games=[
    {c:"WORLD",l:"Friendly",h:"Colombia",a:"Peru",hs:0,as:0,s:"FT",m:"12:00"},
    {c:"WORLD",l:"Friendly",h:"Argentina",a:"Benin",hs:0,as:0,s:"FT",m:"14:00"},
    {c:"BRAZIL",l:"Serie B",h:"Goias",a:"Athletic",hs:0,as:0,s:"LIVE",m:"Live"},
    {c:"ALGERIA",l:"Ligue 1",h:"Saoura",a:"Khenchela",hs:0,as:0,s:"FT",m:"16:30"},
  ]
  const list=games.filter(g=>filter==="All"?true:filter==="LIVE"?g.s==="LIVE":g.s==="FT")
  const btn=(a:boolean,b:boolean)=>({
    background:a?"#00bfff":b?"#ff2d2d14":"#132f45",
    color:a?"black":b?"#ff2d2d":"#8aa8bd",
    padding:"6px 12px",borderRadius:"8px",fontWeight:800,fontSize:"12px",cursor:"pointer",border:a?"none":b?"1px solid #ff2d2d":"none"
  } as any)
  return(
    <div style={{minHeight:"100vh",background:"#050a12",fontFamily:"sans-serif"}}>
      <div style={{background:"#0a1929",padding:"10px 10px 8px",position:"sticky",top:0,zIndex:10}}>
        <div style={{textAlign:"center",color:"white",fontWeight:800,fontSize:"14px",letterSpacing:"0.5px"}}>BESTSCORE • {list.length} MATCHES</div>
        <div style={{height:"2px",background:"#00bfff",margin:"8px -10px"}}></div>
        <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
          <div onClick={()=>setDay("Today")} style={btn(day==="Today",false)}>Today</div>
          <div onClick={()=>setDay("Yesterday")} style={btn(day==="Yesterday",false)}>Yesterday</div>
          <div onClick={()=>setDay("Tomorrow")} style={btn(day==="Tomorrow",false)}>Tomorrow</div>
          <div onClick={()=>setFilter("All")} style={btn(filter==="All",false)}>All</div>
          <div onClick={()=>setFilter("LIVE")} style={btn(false,filter==="LIVE")}>LIVE</div>
          <div onClick={()=>setFilter("Finished")} style={btn(filter==="Finished",false)}>FT</div>
          <div onClick={()=>location.reload()} style={{...btn(true,false),marginLeft:"auto"}}>REFRESH</div>
        </div>
      </div>
      <div style={{padding:"6px",display:"flex",flexDirection:"column",gap:"5px"}}>
        {list.map((g,i)=>(
          <div key={i} onClick={()=>setSel(g)} style={{background:"#0f1f33",borderRadius:"8px",padding:"8px 10px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
            <div>
              <div style={{color:"#4a7a9a",fontSize:"9px",fontWeight:700}}>{g.c} • {g.l} • {g.m}</div>
              <div style={{color:"white",fontSize:"13px",fontWeight:600,marginTop:"2px"}}>{g.h} <span style={{color:"#5a7a90",fontWeight:400}}>vs</span> {g.a}</div>
            </div>
            <div style={{background:g.s==="LIVE"?"#ff2d2d":"#132f45",color:g.s==="LIVE"?"white":"#00bfff",padding:"3px 8px",borderRadius:"6px",fontSize:"12px",fontWeight:800}}>{g.s==="LIVE"?"LIVE":`${g.hs}-${g.as}`}</div>
          </div>
        ))}
      </div>
      {sel && (
        <div onClick={()=>setSel(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",zIndex:99}}>
          <div style={{background:"#0f1f33",width:"100%",maxWidth:"300px",borderRadius:"12px",padding:"16px",border:"1px solid #00bfff"}}>
            <div style={{color:"#5a8ab0",fontSize:"10px",textAlign:"center"}}>{sel.c} • {sel.l}</div>
            <div style={{color:"white",fontWeight:800,textAlign:"center",fontSize:"14px",marginTop:"4px"}}>{sel.h} vs {sel.a}</div>
            <div style={{color:"#00bfff",fontSize:"32px",fontWeight:900,textAlign:"center",margin:"12px 0"}}>{sel.hs} - {sel.as}</div>
            <div onClick={()=>setSel(null)} style={{background:"#00bfff",color:"black",textAlign:"center",padding:"8px",borderRadius:"8px",fontWeight:800,fontSize:"12px",cursor:"pointer"}}>CLOSE</div>
          </div>
        </div>
      )}
      <div style={{textAlign:"center",color:"#324a5e",fontSize:"10px",padding:"10px"}}>{day} • {filter}</div>
    </div>
  )
}
