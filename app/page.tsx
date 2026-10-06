"use client"
import { useState } from "react"

export default function Page(){
  const [day,setDay]=useState("Today")
  const [filter,setFilter]=useState("Finished")
  const [show,setShow]=useState(false)

  return(
    <div style={{minHeight:"100vh",background:"black"}}>
      <div style={{background:"#0a1e2e",paddingBottom:"12px"}}>
        <div style={{textAlign:"center",color:"white",fontWeight:900,padding:"18px 0",fontSize:"22px"}}>
          BESTSCORE • 0 MATCHES
        </div>
        <div style={{height:"3px",background:"#00bfff"}}></div>
        
        <div style={{padding:"12px",display:"flex",gap:"10px"}}>
          <div onClick={()=>setDay("Today")} style={{background:day==="Today"?"#00bfff":"#132f45",color:day==="Today"?"black":"#00bfff",padding:"12px 18px",borderRadius:"10px",fontWeight:900,fontSize:"17px",cursor:"pointer"}}>Today</div>
          <div onClick={()=>setDay("Yesterday")} style={{background:day==="Yesterday"?"#00bfff":"#132f45",color:day==="Yesterday"?"black":"#00bfff",padding:"12px 18px",borderRadius:"10px",fontWeight:900,fontSize:"17px",cursor:"pointer"}}>Yesterday</div>
          <div onClick={()=>setDay("Tomorrow")} style={{background:day==="Tomorrow"?"#00bfff":"#132f45",color:day==="Tomorrow"?"black":"#00bfff",padding:"12px 18px",borderRadius:"10px",fontWeight:900,fontSize:"17px",cursor:"pointer"}}>Tomorrow</div>
        </div>

        <div style={{padding:"8px 12px",display:"flex",gap:"10px",alignItems:"center"}}>
          <div onClick={()=>setFilter("All")} style={{background:filter==="All"?"#00bfff":"#132f45",color:filter==="All"?"black":"white",padding:"14px",borderRadius:"10px",fontWeight:900,fontSize:"16px",textAlign:"center",lineHeight:"1.1",cursor:"pointer"}}>All<br/>Games</div>
          <div onClick={()=>setFilter("LIVE")} style={{background:filter==="LIVE"?"#ff2d2d":"#132f45",color:filter==="LIVE"?"white":"#ff2d2d",padding:"12px 18px",borderRadius:"10px",fontWeight:900,fontSize:"16px",cursor:"pointer"}}>LIVE</div>
          <div onClick={()=>setFilter("Finished")} style={{background:filter==="Finished"?"#00bfff":"#132f45",color:filter==="Finished"?"black":"#00bfff",padding:"12px 18px",borderRadius:"10px",fontWeight:900,fontSize:"16px",cursor:"pointer"}}>Finished</div>
          <div onClick={()=>window.location.reload()} style={{background:"#00bfff",color:"black",padding:"16px 18px",borderRadius:"12px",fontWeight:900,fontSize:"16px",textAlign:"center",lineHeight:"1.15",cursor:"pointer",marginLeft:"auto",minWidth:"110px"}}><div>↻</div>REFRESH<br/>NOW</div>
        </div>
      </div>

      <div style={{padding:"20px",color:"#555",textAlign:"center"}} onClick={()=>setShow(true)}>
        Click a filter above - Working! {day} - {filter}
      </div>

      {show && (
        <div onClick={()=>setShow(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{background:"#101a2e",padding:"20px",borderRadius:"12px",border:"2px solid #00bfff",color:"white",fontWeight:900}}>
            Popup Clickable! Click to close
          </div>
        </div>
      )}
    </div>
  )
}
