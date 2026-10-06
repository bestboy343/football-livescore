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
        <div style={{padding:"10px",display:"flex",gap:"6px"}}>
          <div style={{background:"#00bfff",color:"black",padding:"8px 12px",borderRadius:"8px",fontWeight:900,fontSize:"12px"}}>Today</div>
          <div style={{background:"#132f45",color:"#00bfff",padding:"8px 12px",borderRadius:"8px",fontWeight:900,fontSize:"12px"}}>Yesterday</div>
          <div style={{background:"#132f45",color:"#00bfff",padding:"8px 12px",borderRadius:"8px",fontWeight:900,fontSize:"12px"}}>Tomorrow</div>
        </div>
        <div style={{padding:"0 8px 10px",display:"flex",gap:"4px",alignItems:"center"}}>
          <div style={{background:"#132f45",color:"white",padding:"6px 8px",borderRadius:"6px",fontWeight:900,textAlign:"center",fontSize:"10px"}}>All<br/>Games</div>
          <div style={{background:"#132f45",color:"#ff2d2d",padding:"6px 8px",borderRadius:"6px",fontWeight:900,fontSize:"10px"}}>LIVE</div>
          <div style={{background:"#00bfff",color:"black",padding:"3px 6px",borderRadius:"5px",fontWeight:900,fontSize:"8px"}}>Finished</div>
          <div style={{background:"#00bfff",color:"black",padding:"3px 5px",borderRadius:"5px",fontWeight:900,fontSize:"7px",textAlign:"center"}}>REFRESH<br/>NOW</div>
        </div>
      </div>
      <div style={{padding:"8px"}}>
        {g.map((x,i)=>(
          <div key={i} onClick={()=>setSel(x)} style={{background:"#101a2e",borderRadius:"8px",padding:"12px",display:"flex",justifyContent:"space-between",marginBottom:"6px"}}>
            <div><div style={{color:"#00bfff",fontSize:"10px",fontWeight:700}}>{x.c}: {x.l}</div><div style={{color:"white",fontWeight:700,fontSize:"13px",marginTop:"2px"}}>{x.h} vs {x.a}</div></div>
            <div style={{color:"#00bfff",fontWeight:900,fontSize:"13px"}}>0 - 0</div>
          </div>
        ))}
      </div>
      {sel && (
        <div onClick={()=>setSel(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
          <div style={{background:"#101a2e",width:"100%",borderRadius:"12px",padding:"16px",border:"2px solid #00bfff"}}>
            <div style={{color:"white",fontWeight:900}}>{sel.h} vs {sel.a}</div>
            <div style={{color:"#00bfff",fontSize:"28px",fontWeight:900,textAlign:"center",margin:"12px 0"}}>0 - 0</div>
            <div style={{background:"#00bfff",color:"black",textAlign:"center",padding:"10px",borderRadius:"8px",fontWeight:900}}>CLOSE</div>
          </div>
        </div>
      )}
    </div>
  )
}
