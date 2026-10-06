"use client"
import { useState } from "react"
export default function Page(){
const [d,sD]=useState("Today")
const [f,sF]=useState("Finished")
return(
<div style={{minHeight:"100vh",background:"black"}}>
<div style={{background:"#0a1e2e",paddingBottom:"12px"}}>
<div style={{textAlign:"center",color:"white",fontWeight:900,padding:"18px 0",fontSize:"22px"}}>BESTSCORE • 0 MATCHES</div>
<div style={{height:"3px",background:"#00bfff"}}></div>
<div style={{padding:"12px",display:"flex",gap:"10px"}}>
<div onClick={()=>sD("Today")} style={{background:d==="Today"?"#00bfff":"#132f45",color:d==="Today"?"black":"#00bfff",padding:"12px 18px",borderRadius:"10px",fontWeight:900,fontSize:"17px"}}>Today</div>
<div onClick={()=>sD("Yesterday")} style={{background:d==="Yesterday"?"#00bfff":"#132f45",color:d==="Yesterday"?"black":"#00bfff",padding:"12px 18px",borderRadius:"10px",fontWeight:900,fontSize:"17px"}}>Yesterday</div>
<div onClick={()=>sD("Tomorrow")} style={{background:d==="Tomorrow"?"#00bfff":"#132f45",color:d==="Tomorrow"?"black":"#00bfff",padding:"12px 18px",borderRadius:"10px",fontWeight:900,fontSize:"17px"}}>Tomorrow</div>
</div>
<div style={{padding:"8px 12px",display:"flex",gap:"10px",alignItems:"center"}}>
<div onClick={()=>sF("All")} style={{background:f==="All"?"#00bfff":"#132f45",color:f==="All"?"black":"white",padding:"14px",borderRadius:"10px",fontWeight:900,fontSize:"16px",textAlign:"center",lineHeight:"1.1"}}>All<br/>Games</div>
<div onClick={()=>sF("LIVE")} style={{background:f==="LIVE"?"#ff2d2d":"#132f45",color:f==="LIVE"?"white":"#ff2d2d",padding:"12px 18px",borderRadius:"10px",fontWeight:900,fontSize:"16px"}}>LIVE</div>
<div onClick={()=>sF("Finished")} style={{background:f==="Finished"?"#00bfff":"#132f45",color:f==="Finished"?"black":"#00bfff",padding:"12px 18px",borderRadius:"10px",fontWeight:900,fontSize:"16px"}}>Finished</div>
<div onClick={()=>window.location.reload()} style={{background:"#00bfff",color:"black",padding:"16px 18px",borderRadius:"12px",fontWeight:900,fontSize:"16px",textAlign:"center",lineHeight:"1.15",marginLeft:"auto",minWidth:"110px"}}>REFRESH<br/>NOW</div>
</div>
</div>
<div style={{padding:"30px",color:"#666",textAlign:"center"}}>Day: {d} | Filter: {f} - All clickable!</div>
</div>
)
}
