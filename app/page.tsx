"use client"
import { useState } from "react"
export default function Page(){
  const [sel,setSel]=useState<any>(null)
  const g=[
    {c:"WORLD",l:"Friendlies",h:"Colombia",a:"Peru"},
    {c:"WORLD",l:"Friendlies",h:"Argentina",a:"Benin"},
    {c:"BRAZIL",l:"Serie B",h:"Goias",a:"Athletic"},
    {c:"ALGERIA",l:"Ligue 1",h:"Saoura",a:"Khenchela"},
  ]
  return(
    <div style={{minHeight:"100vh",background:"black",width:"100vw",margin:0,padding:0}}>
      <div style={{background:"#0a1e2e",width:"100%"}}>
        <div style={{textAlign:"center",color:"white",fontWeight:900,padding:"18px 0",fontSize:"22px"}}>BESTSCORE • 4 MATCHES</div>
        <div style={{height:"3px",background:"#00bfff"}}></div>
        <div style={{padding:"12px",display:"flex",gap:"8px"}}>
          <div style={{background:"#00bfff",color:"black",padding:"10px 16px",borderRadius:"10px",fontWeight:900,fontSize:"14px"}}>Today</div>
          <div style={{background:"#132f45",color:"#00bfff",padding:"10px 16px",borderRadius:"10px",fontWeight:900,fontSize:"14px"}}>Yesterday</div>
          <div style={{background:"#132f45",color:"#00bfff",padding:"10px 16px",borderRadius:"10px",fontWeight:900,fontSize:"14px"}}>Tomorrow</div>
        </div>
        <div style={{padding:"0 10px 12px",display:"flex",gap:"6px",alignItems:"center"}}>
          <div style={{background:"#132f45",color:"white",padding:"9px 12px",borderRadius:"8px",fontWeight:900,textAlign:"center",fontSize:"12px",lineHeight:"1.1"}}>All<br/>Games</div>
          <div style={{background:"#132f45",color:"#ff2d2d",padding:"9px 12px",borderRadius:"8px",fontWeight:900,fontSize:"12px"}}>LIVE</div>
          <div style={{background:"#00bfff",color:"black",padding:"6px 10px",borderRadius:"8px",fontWeight:900,fontSize:"11px"}}>Finished</div>
          <div style={{background:"#00bfff",color:"black",padding:"6px 8px",borderRadius:"8px",fontWeight:900,fontSize:"10px",flex:1,textAlign:"center",lineHeight:"1.1"}}>REFRESH<br/>NOW</div>
        </div>
      </div>
      <div style={{padding:"10px"}}>
        {g.map((x,i)=>(
          <div key={i} onClick={()=>setSel(x)} style={{background:"#101a2e",borderRadius:"10px",padding:"14px",display:"flex",justifyContent:"space-between",marginBottom:"8px"}}>
            <div><div style={{color:"#00bfff",fontSize:"11px",fontWeight:700}}>{x.c}: {x.l}</div><div style={{color:"white",fontWeight:700,marginTop:"4px"}}>{x.h} vs {x.a}</div></div>
            <div style={{color:"#00bfff",fontWeight:900}}>0 - 0</div>
          </div>
        ))}
      </div>
      {sel && (
        <div onClick={()=>setSel(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
          <div style={{background:"#101a2e",width:"100%",borderRadius:"16px",padding:"20px",border:"2px solid #00bfff"}}>
            <div style={{color:"white",fontWeight:900,fontSize:"20px"}}>{sel.h} vs {sel.a}</div>
            <div style={{color:"#00bfff",fontSize:"36px",fontWeight:900,textAlign:"center",margin:"16px 0"}}>0 - 0</div>
            <div style={{background:"#00bfff",color:"black",textAlign:"center",padding:"14px",borderRadius:"12px",fontWeight:900}}>CLOSE</div>
          </div>
        </div>
      )}
    </div>
  )
}
