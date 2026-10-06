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
  const click = (t:string)=>{ setActive(t); alert(t+" clicked!") }
  const clickType = (t:string)=>{ setType(t); alert(t+" clicked!") }

  return(
    <div style={{minHeight:"100vh",background:"black"}}>
      <div style={{background:"#0a1e2e"}}>
        <div style={{textAlign:"center",color:"white",fontWeight:900,padding:"18px 0",fontSize:"22px"}}>BESTSCORE • 4 MATCHES</div>
        <div style={{height:"3px",background:"#00bfff"}}></div>
        
        <div style={{padding:"10px",display:"flex",gap:"6px"}}>
          <div onClick={()=>click("Today")} style={{background:active==="Today"?"#00bfff":"#132f45",color:active==="Today"?"black":"#00bfff",padding:"10px 14px",borderRadius:"10px",fontWeight:900,fontSize:"13px",cursor:"pointer"}}>Today</div>
          <div onClick={()=>click("Yesterday")} style={{background:active==="Yesterday"?"#00bfff":"#132f45",color:active==="Yesterday"?"black":"#00bfff",padding:"10px 14px",borderRadius:"10px",fontWeight:900,fontSize:"13px",cursor:"pointer"}}>Yesterday</div>
          <div onClick={()=>click("Tomorrow")} style={{background:active==="Tomorrow"?"#00bfff":"#132f45",color:active==="Tomorrow"?"black":"#00bfff",padding:"10px 14px",borderRadius:"10px",fontWeight:900,fontSize:"13px",cursor:"pointer"}}>Tomorrow</div>
        </div>

        <div style={{padding:"0 8px 12px",display:"flex",gap:"6px",alignItems:"center"}}>
          <div onClick={()=>clickType("All")} style={{background:type==="All"?"#00bfff":"#132f45",color:type==="All"?"black":"white",padding:"10px 14px",borderRadius:"10px",fontWeight:900,textAlign:"center",fontSize:"13px",cursor:"pointer"}}>All<br/>Games</div>
          <div onClick={()=>clickType("LIVE")} style={{background:type==="LIVE"?"#ff2d2d":"#132f45",color:type==="LIVE"?"white":"#ff2d2d",padding:"11px 16px",borderRadius:"10px",fontWeight:900,fontSize:"13px",cursor:"pointer"}}>LIVE</div>
          <div onClick={()=>clickType("Finished")} style={{background:"#00bfff",color:"black",padding:"7px 12px",borderRadius:"7px",fontWeight:900,fontSize:"12px",cursor:"pointer"}}>Finished</div>
          <div onClick={()=>window.location.reload()} style={{background:"#00bfff",color:"black",padding:"7px 12px",borderRadius:"7px",fontWeight:900,fontSize:"12px",textAlign:"center",cursor:"pointer",lineHeight:"1.1"}}>REFRESH<br/>NOW</div>
        </div>
      </div>

      <div style={{padding:"8px"}}>
        {g.map((x,i)=>(
          <div key={i} onClick={()=>setSel(x)} style={{background:"#101a2e",borderRadius:"8px",padding:"12px",display:"flex",justifyContent:"space-between",marginBottom:"6px",cursor:"pointer"}}>
            <div><div style={{color:"#00bfff",fontSize:"10px",fontWeight:700}}>{x.c}: {x.l}</div><div style={{color:"white",fontWeight:700,fontSize:"13px"}}>{x.h} vs {x.a}</div></div>
            <div style={{color:"#00bfff",fontWeight:900}}>0 - 0</div>
          </div>
        ))}
      </div>

      {sel && (
        <div onClick={()=>setSel(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
          <div style={{background:"#101a2e",width:"100%",borderRadius:"12px",padding:"16px",border:"2px solid #00bfff"}}>
            <div style={{color:"white",fontWeight:900}}>{sel.h} vs {sel.a}</div>
            <div style={{color:"#00bfff",fontSize:"28px",fontWeight:900,textAlign:"center",margin:"12px 0"}}>0 - 0</div>
            <div style={{background:"#00bfff",color:"black",textAlign:"center",padding:"10px",borderRadius:"8px",fontWeight:900,cursor:"pointer"}}>CLOSE</div>
          </div>
        </div>
      )}
    </div>
  )
}
