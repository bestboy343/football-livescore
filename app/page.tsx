"use client"
import { useState } from "react"

export default function Page(){
  const [day,setDay]=useState("Today")
  const [filter,setFilter]=useState("Finished")
  const [sel,setSel]=useState<any>(null)
  const [matches,setMatches]=useState(0)
  
  const games=[
    {c:"WORLD",l:"Friendlies",h:"Colombia",a:"Peru",s:"FT"},
    {c:"WORLD",l:"Friendlies",h:"Argentina",a:"Benin",s:"FT"},
    {c:"BRAZIL",l:"Serie B",h:"Goias",a:"Athletic",s:"FT"},
    {c:"ALGERIA",l:"Ligue 1",h:"Saoura",a:"Khenchela",s:"FT"},
  ]

  const refresh = () => {
    setMatches(games.length)
    window.location.reload()
  }

  return(
    <div style={{minHeight:"100vh",background:"black",fontFamily:"sans-serif"}}>
      {/* HEADER */}
      <div style={{background:"#0a1e2e",paddingBottom:"12px"}}>
        <div style={{textAlign:"center",color:"white",fontWeight:900,padding:"18px 0",fontSize:"22px",letterSpacing:"0.5px"}}>
          BESTSCORE • {matches} MATCHES
        </div>
        <div style={{height:"3px",background:"#00bfff"}}></div>
        
        {/* ROW 1 - Today Yesterday Tomorrow */}
        <div style={{padding:"12px 12px 8px",display:"flex",gap:"10px"}}>
          {["Today","Yesterday","Tomorrow"].map(d=>(
            <div key={d} onClick={()=>setDay(d)} style={{
              background:day===d?"#00bfff":"#132f45",
              color:day===d?"black":"#00bfff",
              padding:"12px 18px",
              borderRadius:"10px",
              fontWeight:900,
              fontSize:"17px",
              cursor:"pointer"
            }}>{d}</div>
          ))}
        </div>

        {/* ROW 2 - All Games LIVE Finished REFRESH NOW - EXACTLY LIKE YOUR PIC */}
        <div style={{padding:"8px 12px",display:"flex",gap:"10px",alignItems:"center"}}>
          <div onClick={()=>setFilter("All")} style={{
            background:filter==="All"?"#00bfff":"#132f45",
            color:filter==="All"?"black":"white",
            padding:"14px 14px",
            borderRadius:"10px",
            fontWeight:900,
            fontSize:"16px",
            textAlign:"center",
            lineHeight:"1.1",
            cursor:"pointer"
          }}>All<br/>Games</div>

          <div onClick={()=>setFilter("LIVE")} style={{
            background:filter==="LIVE"?"#ff2d2d":"#132f45",
            color:filter==="LIVE"?"white":"#ff2d2d",
            padding:"12px 18px",
            borderRadius:"10px",
            fontWeight:900,
            fontSize:"16px",
            cursor:"pointer"
          }}>LIVE</div>

          <div onClick={()=>setFilter("Finished")} style={{
            background:filter==="Finished"?"#00bfff":"#132f45",
            color:filter==="Finished"?"black":"#00bfff",
            padding:"12px 18px",
            borderRadius:"10px",
            fontWeight:900,
            fontSize:"16px",
            cursor:"pointer"
          }}>Finished</div>

          <div onClick={refresh} style={{
            background:"#00bfff",
            color:"black",
            padding:"16px 18px",
            borderRadius:"12px",
            fontWeight:900,
            fontSize:"16px",
            textAlign:"center",
            lineHeight:"1.15",
            cursor:"pointer",
            marginLeft:"auto",
            minWidth:"110px"
          }}>
            <div style={{fontSize:"14px"}}>↻</div>
            REFRESH<br/>NOW
          </div>
        </div>
      </div>

      {/* MATCHES LIST */}
      <div style={{padding:"10px"}}>
        {games.filter(g=>filter==="All" || (filter==="Finished" && g.s==="FT") || (filter==="LIVE" && g.s==="LIVE")).map((x,i)=>(
          <div key={i} onClick={()=>setSel(x)} style={{background:"#101a2e",borderRadius:"10px",padding:"14px",display:"flex",justifyContent:"space-between",marginBottom:"8px",cursor:"pointer"}}>
            <div><div style={{color:"#00bfff",fontSize:"11px",fontWeight:700}}>{x.c}: {x.l}</div><div style={{color:"white",fontWeight:700,fontSize:"14px"}}>{x.h} vs {x.a}</div></div>
            <div style={{color:"#00bfff",fontWeight:900}}>0 - 0</div>
          </div>
        ))}
        {filter==="Finished" && games.length===0 && <div style={{color:"#666",textAlign:"center",padding:"40px"}}>No finished matches for {day}</div>}
      </div>

      {/* POPUP - CLICKABLE */}
      {sel && (
        <div onClick={()=>setSel(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",zIndex:50}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"#101a2e",width:"100%",maxWidth:"400px",borderRadius:"14px",padding:"18px",border:"2px solid #00bfff"}}>
            <div style={{color:"white",fontWeight:900,fontSize:"16px"}}>{sel.h} vs {sel.a}</div>
            <div style={{color:"#00bfff",fontSize:"36px",fontWeight:900,textAlign:"center",margin:"16px 0"}}>0 - 0</div>
            <div style={{color:"#aaa",textAlign:"center",fontSize:"13px",marginBottom:"16px"}}>{sel.c} • {sel.l} • {day}</div>
            <div onClick={()=>setSel(null)} style={{background:"#00bfff",color:"black",textAlign:"center",padding:"12px",borderRadius:"10px",fontWeight:900,cursor:"pointer"}}>CLOSE</div>
          </div>
        </div>
      )}
    </div>
  )
}
