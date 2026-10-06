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
    <div style={{minHeight:"100vh",background:"black"}}>
      <div style={{background:"#0a1e2e"}}>
        <div style={{textAlign:"center",color:"white",fontWeight:900,padding:"18px 0",fontSize:"22px"}}>BESTSCORE • 4 MATCHES</div>
        <div style={{height:"3px",background:"#00bfff"}}></div>
        <div style={{padding:"10px",display:"flex",gap:"8px",flexWrap:"wrap"}}>
          <div style={{background:"#00bfff",color:"black",padding:"14px 22px",borderRadius:"14px",fontWeight:900,fontSize:"16px",cursor:"pointer"}}>Today</div>
          <div style={{background:"#132f45",color:"#00bfff",padding:"14px 22px",borderRadius:"14px",fontWeight:900,fontSize:"16px",cursor:"pointer"}}>Yesterday</div>
          <div style={{background:"#132f45",color:"#00bfff",padding:"14px 22px",borderRadius:"14px",fontWeight:900,fontSize:"16px",cursor:"pointer"}}>Tomorrow</div>
        </div>
        <div style={{padding:"0 10px 14px",display:"flex",gap:"8px",flexWrap:"wrap"}}>
          <div style={{background:"#132f45",color:"white",padding:"14px 22px",borderRadius:"14px",fontWeight:900,textAlign:"center",fontSize:"16px",cursor:"pointer",lineHeight:"1.1"}}>All<br/>Games</div>
          <div style={{background:"#132f45",color:"#ff2d2d",padding:"14px 22px",borderRadius:"14px",fontWeight:900,fontSize:"16px",cursor:"pointer"}}>LIVE</div>
          <div style={{background:"#00bfff",color:"black",padding:"14px 22px",borderRadius:"14px",fontWeight:900,fontSize:"16px",cursor:"pointer"}}>Finished</div>
          <div onClick={()=>window.location.reload()} style={{background:"#00bfff",color:"black",padding:"14px 22px",borderRadius:"14px",fontWeight:900,fontSize:"16px",textAlign:"center",cursor:"pointer",lineHeight:"1.1"}}>REFRESH<br/>NOW</div>
        </div>
      </div>
      <div style={{padding:"8px"}}>
        {g.map((x,i)=>(
          <div key={i} onClick={()=>setSel(x)} style={{background:"#101a2e",borderRadius:"10px",padding:"14px",display:"flex",justifyContent:"space-between",marginBottom:"8px",cursor:"pointer"}}>
            <div><div style={{color:"#00bfff",fontSize:"11px",fontWeight:700}}>{x.c}: {x.l}</div><div style={{color:"white",fontWeight:700,fontSize:"14px"}}>{x.h} vs {x.a}</div></div>
            <div style={{color:"#00bfff",fontWeight:900}}>0 - 0</div>
          </div>
        ))}
      </div>
      {sel && (
        <div onClick={()=>setSel(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
          <div style={{background:"#101a2e",width:"100%",borderRadius:"14px",padding:"18px",border:"2px solid #00bfff"}}>
            <div style={{color:"white",fontWeight:900}}>{sel.h} vs {sel.a}</div>
            <div style={{color:"#00bfff",fontSize:"32px",fontWeight:900,textAlign:"center",margin:"14px 0"}}>0 - 0</div>
            <div style={{background:"#00bfff",color:"black",textAlign:"center",padding:"12px",borderRadius:"10px",fontWeight:900}}>CLOSE</div>
          </div>
        </div>
      )}
    </div>
  )
}
