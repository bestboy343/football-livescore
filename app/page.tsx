"use client"
import { useState } from "react"
export default function Page(){
  const [sel,setSel]=useState<any>(null)
  const [active,setActive]=useState("Today")
  const [type,setType]=useState("All")
  const g=[
    {c:"WORLD",l:"Friendlies",h:"Colombia",a:"Peru"},
    {c:"WORLD",l:"Friendlies",h:"Argentina",a:"Benin"},
    {c:"BRAZIL",l:"Serie B",h:"Goias",a:"Athletic"},
    {c:"ALGERIA",l:"Ligue 1",h:"Saoura",a:"Khenchela"},
  ]

  return(
    <div style={{minHeight:"100vh",background:"black"}}>
      <div style={{background:"#0a1e2e"}}>
        <div style={{textAlign:"center",color:"white",fontWeight:900,padding:"18px 0",fontSize:"22px"}}>BESTSCORE • 4 MATCHES</div>
        <div style={{height:"3px",background:"#00bfff"}}></div>
        
        <div style={{padding:"10px",display:"flex",gap:"6px"}}>
          <div onClick={()=>setActive("Today")} style={{background:active==="Today"?"#00bfff":"#132f45",color:active==="Today"?"black":"#00bfff",padding:"12px 18px",borderRadius:"12px",fontWeight:900,fontSize:"15px",cursor:"pointer"}}>Today</div>
          <div onClick={()=>setActive("Yesterday")} style={{background:active==="Yesterday"?"#00bfff":"#132f45",color:active==="Yesterday"?"black":"#00bfff",padding:"12px 18px",borderRadius:"12px",fontWeight:900,fontSize:"15px",cursor:"pointer"}}>Yesterday</div>
          <div onClick={()=>setActive("Tomorrow")} style={{background:active==="Tomorrow"?"#00bfff":"#132f45",color:active==="Tomorrow"?"black":"#00bfff",padding:"12px 18px",borderRadius:"12px",fontWeight:900,fontSize:"15px",cursor:"pointer"}}>Tomorrow</div>
        </div>

        <div style={{padding:"0 10px 14px",display:"flex",gap:"8px",alignItems:"center"}}>
          <div onClick={()=>setType("All")} style={{background:type==="All"?"#00bfff":"#132f45",color:type==="All"?"black":"white",padding:"12px 18px",borderRadius:"12px",fontWeight:900,textAlign:"center",fontSize:"15px",cursor:"pointer",lineHeight:"1.1"}}>All<br/>Games</div>
          <div onClick={()=>setType("LIVE")} style={{background:type==="LIVE"?"#ff2d2d":"#132f45",color:type==="LIVE"?"white":"#ff2d2d",padding:"14px 20px",borderRadius:"12px",fontWeight:900,fontSize:"15px",cursor:"pointer"}}>LIVE</div>
          <div onClick={()=>setType("Finished")} style={{background:"#00bfff",color:"black",padding:"12px 18px",borderRadius:"12px",fontWeight:900,fontSize:"15px",cursor:"pointer"}}>Finished</div>
          <div onClick={()=>window.location.reload()} style={{background:"#00bfff",color:"black",padding:"12px 18px",borderRadius:"12px",fontWeight:900,fontSize:"15px",textAlign:"center",cursor:"pointer",lineHeight:"1.1"}}>REFRESH<br/>NOW</div>
        </div>
      </div>

      <div style={{padding:"8px"}}>
        {g.map((x,i)=>(
          <div key={i} onClick={()=>setSel(x)} style={{background:"#101a2e",borderRadius:"10px",padding:"14px",display:"flex",justifyContent:"space-between",marginBottom:"8px",cursor:"pointer"}}>
            <div><div style={{color:"#00bfff",fontSize:"11px",fontWeight:700}}>{x.c}: {x.l}</div><div style={{color:"white",fontWeight:700,fontSize:"14px",marginTop:"2px"}}>{x.h} vs {x.a}</div></div>
            <div style={{color:"#00bfff",fontWeight:900}}>0 - 0</div>
          </div>
        ))}
      </div>

      {sel && (
        <div onClick={()=>setSel(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
          <div style={{background:"#101a2e",width:"100%",borderRadius:"14px",padding:"18px",border:"2px solid #00bfff"}}>
            <div style={{color:"white",fontWeight:900,fontSize:"18px"}}>{sel.h} vs {sel.a}</div>
            <div style={{color:"#00bfff",fontSize:"32px",fontWeight:900,textAlign:"center",margin:"14px 0"}}>0 - 0</div>
            <div style={{background:"#00bfff",color:"black",textAlign:"center",padding:"12px",borderRadius:"10px",fontWeight:900,cursor:"pointer"}}>CLOSE</div>
          </div>
        </div>
      )}
    </div>
  )
}
