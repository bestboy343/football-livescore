"use client"
import {useEffect,useState} from "react"
function fmtTime(d:string){try{return new Date(d).toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",timeZone:"Europe/Paris",hour12:false})}catch{return"--:--"}}

export default function Page(){
 const [games,setGames]=useState<any[]>([])
 const [day,setDay]=useState('today')
 const [filter,setFilter]=useState('all')
 const [selected,setSelected]=useState<any>(null)

 const load=()=>{fetch(`/api/live?day=${day}&filter=${filter}`).then(r=>r.json()).then(d=>setGames(d.response||[]))}
 useEffect(()=>{load()},[day,filter])

 const groups:Record<string,any[]>={}
 games.forEach((m:any)=>{let c=m.country?.name||m.league?.country||"WORLD";let l=m.league?.name||"League";let k=`${c}: ${l}`;if(!groups[k])groups[k]=[];groups[k].push(m)})

 return(
  <div style={{background:"#000",color:"#fff",minHeight:"100vh",fontFamily:"Arial",fontSize:13}}>
   <div style={{background:"#001e28",padding:"10px",borderBottom:"3px solid #00b6e6",textAlign:"center"}}>
     <div style={{fontWeight:900,fontSize:20}}>BESTSCORE • {games.length} MATCHES</div>
   </div>

   <div style={{background:"#0a2a35",padding:"8px 10px"}}>
     <div style={{marginBottom:8,display:"flex",gap:5}}>
       {['today','yesterday','tomorrow'].map(d=>(
         <span key={d} onClick={()=>setDay(d)} style={{cursor:"pointer",padding:"6px 12px",background:day===d?"#00b6e6":"#122f3a",color:day===d?"#000":"#00b6e6",fontWeight:"900",borderRadius:4,textTransform:"capitalize"}}>{d}</span>
       ))}
     </div>
     <div style={{display:"flex",gap:10,alignItems:"center"}}>
       <span onClick={()=>setFilter('all')} style={{cursor:"pointer",color:filter==='all'?"#fff":"#aaa",fontWeight:filter==='all'?"900":"400",textDecoration:filter==='all'?"underline":"none"}}>All Games</span> |
       <span onClick={()=>setFilter('live')} style={{cursor:"pointer",color:"#ff0000",fontWeight:"900",textDecoration:filter==='live'?"underline":"none"}}>LIVE</span> |
       <span onClick={()=>setFilter('finished')} style={{cursor:"pointer",color:filter==='finished'?"#fff":"#aaa",fontWeight:filter==='finished'?"900":"400"}}>Finished</span>
       <span onClick={load} style={{marginLeft:"auto",color:"#00b6e6",cursor:"pointer",textDecoration:"underline"}}>REFRESH NOW</span>
     </div>
   </div>

   {/* REMOVED Football » Today » All Games line */}

   {Object.entries(groups).map(([title,list])=>(
    <div key={title}>
     <div style={{background:"#1a1a1a",padding:"6px 10px",fontWeight:"900",color:"#00b6e6",borderTop:"1px solid #222"}}>{title.toUpperCase()}</div>
     {list.map((m:any)=>{
       let gh=m.homeTeam?.score??m.score?.home; let ga=m.awayTeam?.score??m.score?.away;
       let has=gh!=null&&ga!=null; let s=(m.status||'').toLowerCase(); let isLive=s.includes('progress')||s==='live'||s==='1h'||s==='2h'||m.minute; let isFT=s==='finished'||s==='ft';
       let time=isLive?(m.minute?`${m.minute}'`:"LIVE"):isFT?"FT":fmtTime(m.date); let score=has?`${gh}-${ga}`:"-";
       return (
        <div key={m.id} onClick={()=>setSelected(m)} style={{display:"flex",padding:"10px 10px",borderBottom:"1px solid #1e1e1e",background:isLive?"#1a0000":"transparent",cursor:"pointer"}}>
         <span style={{width:50,color:isLive?"#ff0000":"#aaa"}}>{time}</span>
         <span style={{flex:1}}>{m.homeTeam?.name||"Home"} - {m.awayTeam?.name||"Away"}</span>
         <span style={{fontWeight:"900"}}>{score} ›</span>
        </div>
       )
     })}
    </div>
   ))}

   {selected && (
    <div onClick={()=>setSelected(null)} style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:20}}>
     <div onClick={e=>e.stopPropagation()} style={{background:"#111",border:"2px solid #00b6e6",borderRadius:10,width:"100%",maxWidth:400,padding:20}}>
       <div style={{display:"flex",justifyContent:"space-between",marginBottom:15}}><b style={{color:"#00b6e6"}}>MATCH DETAILS</b><span onClick={()=>setSelected(null)} style={{cursor:"pointer",background:"#333",padding:"2px 8px",borderRadius:10}}>X</span></div>
       <div style={{textAlign:"center"}}><div style={{fontSize:18,fontWeight:900}}>{selected.homeTeam?.name} vs {selected.awayTeam?.name}</div><div style={{fontSize:32,fontWeight:900,margin:"10px 0"}}>{selected.homeTeam?.score??"-"} - {selected.awayTeam?.score??"-"}</div><div style={{color:"#aaa"}}>{selected.league?.name}</div></div>
       <div onClick={()=>setSelected(null)} style={{background:"#00b6e6",color:"#000",textAlign:"center",padding:10,borderRadius:5,fontWeight:900,marginTop:15,cursor:"pointer"}}>CLOSE</div>
     </div>
    </div>
   )}
  </div>
 )
}
