"use client"
import { useState } from "react"

export default function Page(){
  const [day,setDay]=useState("Today")
  const [filter,setFilter]=useState("Finished")
  const [sel,setSel]=useState<any>(null)

  const games=[
    {c:"WORLD",l:"Friendlies",h:"Colombia",a:"Peru",hs:0,as:0,s:"FT"},
    {c:"WORLD",l:"Friendlies",h:"Argentina",a:"Benin",hs:0,as:0,s:"FT"},
    {c:"BRAZIL",l:"Serie B",h:"Goias",a:"Athletic",hs:0,as:0,s:"FT"},
    {c:"ALGERIA",l:"Ligue 1",h:"Saoura",a:"Khenchela",hs:0,as:0,s:"FT"},
  ]

  const list = games.filter(g=>{
    if(filter==="Finished") return g.s==="FT"
    if(filter==="LIVE") return g.s==="LIVE"
    return true
  })

  return(
    <div style={{minHeight:"100vh",background:"black",fontFamily:"sans-serif"}}>
      <div style={{background:"#0a1e2e",padding:"12px"}}>
        <div style={{textAlign:"center",color:"white",fontWeight:900,padding:"12px 0 14px",fontSize:"20px"}}>BESTSCORE • {list.length} MATCHES</div>
        <div style={{height:"3px",background:"#00bfff",margin:"0 -12px 12px"}}></div>

        <div style={{display:"flex",flexWrap:"wrap",gap:"10px"}}>
          <div onClick={()=>setDay("Today")} style={{background:day==="Today"?"#00bfff":"#132f45",color:day==="Today"?"black":"#00bfff",padding:"12px 20px",borderRadius:"12px",fontWeight:900,cursor:"pointer"}}>Today</div>
          <div onClick={()=>setDay("Yesterday")} style={{background:day==="Yesterday"?"#00bfff":"#132f45",color:day==="Yesterday"?"black":"#00bfff",padding:"12px 20px",borderRadius:"12px",fontWeight:900,cursor:"pointer"}}>Yesterday</div>
          <div onClick={()=>setDay("Tomorrow")} style={{background:day==="Tomorrow"?"#00bfff":"#132f45",color:day==="Tomorrow"?"black":"#00bfff",padding:"12px 20px",borderRadius:"12px",fontWeight:900,cursor:"pointer"}}>Tomorrow</div>
          <div onClick={()=>setFilter("All")} style={{background:filter==="All"?"#00bfff":"#132f45",color:filter==="All"?"black":"white",padding:"12px 16px",borderRadius:"12px",fontWeight:900,textAlign:"center",lineHeight:"1.1",cursor:"pointer"}}>All<br/>Games</div>
          <div onClick={()=>setFilter("LIVE")} style={{background:filter==="LIVE"?"#ff2d2d":"#132f45",color:filter==="LIVE"?"white":"#ff2d2d",padding:"12px 20px",borderRadius:"12px",fontWeight:900,cursor:"pointer"}}>LIVE</div>
          <div onClick={()=>setFilter("Finished")} style={{background:filter==="Finished"?"#00bfff":"#132f45",color:filter==="Finished"?"black":"#00bfff",padding:"12px 20px",borderRadius:"12px",fontWeight:900,cursor:"pointer"}}>Finished</div>
          <div onClick={()=>window.location.reload()} style={{background:"#00bfff",color:"black",padding:"12px 20px",borderRadius:"12px",fontWeight:900,textAlign:"center",lineHeight:"1.15",cursor:"pointer"}}>REFRESH<br/>NOW</div>
        </div>
      </div>

      <div style={{padding:"10px",display:"flex",flexDirection:"column",gap:"8px"}}>
        {list.map((g,i)=>(
          <div key={i} onClick={()=>setSel(g)} style={{background:"#101a2e",borderRadius:"12px",padding:"14px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
            <div>
              <div style={{color:"#00bfff",fontSize:"11px",fontWeight:700}}>{g.c}: {g.l}</div>
              <div style={{color:"white",fontWeight:700,marginTop:"4px"}}>{g.h} vs {g.a}</div>
            </div>
            <div style={{color:"#00bfff",fontWeight:900}}>{g.hs} - {g.as}</div>
          </div>
        ))}
        {list.length===0 && <div style={{color:"#666",textAlign:"center",padding:"30px"}}>No {filter} matches for {day}<br/>Tap All Games</div>}
      </div>

      {sel && (
        <div onClick={()=>setSel(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",zIndex:99}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"#0f1d32",width:"100%",maxWidth:"360px",borderRadius:"16px",padding:"20px",border:"2px solid #00bfff"}}>
            <div style={{color:"#00bfff",fontSize:"12px",fontWeight:700,textAlign:"center"}}>{sel.c}: {sel.l}</div>
            <div style={{color:"white",fontWeight:900,textAlign:"center",marginTop:"6px"}}>{sel.h} vs {sel.a}</div>
            <div style={{color:"#00bfff",fontSize:"42px",fontWeight:900,textAlign:"center",margin:"18px 0"}}>{sel.hs} - {sel.as}</div>
            <div style={{color:"#aaa",fontSize:"12px",textAlign:"center",marginBottom:"16px"}}>{day} • {sel.s}</div>
            <div onClick={()=>setSel(null)} style={{background:"#00bfff",color:"black",textAlign:"center",padding:"12px",borderRadius:"10px",fontWeight:900,cursor:"pointer"}}>CLOSE</div>
          </div>
        </div>
      )}
    </div>
  )
}
