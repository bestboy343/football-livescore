"use client"
import {useEffect,useState} from "react"
function fmtTime(d:string){try{return new Date(d).toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",timeZone:"Europe/Paris",hour12:false})}catch{return"--:--"}}

export default function Page(){
 const [games,setGames]=useState<any[]>([])
 const [day,setDay]=useState('today')
 const [filter,setFilter]=useState('all')
 const load=()=>{fetch(`/api/live?day=${day}&filter=${filter}`).then(r=>r.json()).then(d=>setGames(d.response||[]))}
 useEffect(()=>{load()},[day,filter])

 const groups:Record<string,any[]>={}
 games.forEach((m:any)=>{let c=m.country?.name||m.league?.country||"WORLD";let l=m.league?.name||"League";let k=`${c}: ${l}`;if(!groups[k])groups[k]=[];groups[k].push(m)})

 return(
  <div style={{background:"#000",color:"#fff",minHeight:"100vh",fontFamily:"Arial",fontSize:13}}>

   {/* YOUR BRAND - NOT FLASHSCORE */}
   <div style={{background:"#001e28",padding:"10px",borderBottom:"3px solid #00b6e6",textAlign:"center"}}>
     <div style={{fontWeight:900,fontSize:20,letterSpacing:1}}>BESTSCORE • {games.length} MATCHES</div>
   </div>

   <div style={{background:"#0a2a35",padding:"8px 10px"}}>
     <div style={{marginBottom:6}}>
       <span onClick={()=>setDay('today')} style={{cursor:"pointer",padding:"4px 8px",background:day==='today'?"#00b6e6":"transparent",color:day==='today'?"#000":"#00b6e6",fontWeight:"900",borderRadius:3}}>Today</span> <span onClick={()=>setDay('yesterday')} style={{cursor:"pointer",padding:"4px 8px",background:day==='yesterday'?"#00b6e6":"transparent",color:day==='yesterday'?"#000":"#00b6e6",borderRadius:3}}>Yesterday</span> <span onClick={()=>setDay('tomorrow')} style={{cursor:"pointer",padding:"4px 8px",background:day==='tomorrow'?"#00b6e6":"transparent",color:day==='tomorrow'?"#000":"#00b6e6",borderRadius:3}}>Tomorrow</span>
     </div>
     <div>
       <span onClick={()=>setFilter('all')} style={{cursor:"pointer",color:filter==='all'?"#fff":"#aaa",fontWeight:filter==='all'?"900":"400",textDecoration:filter==='all'?"underline":"none"}}>All Games</span> | <span onClick={()=>setFilter('live')} style={{cursor:"pointer",color:filter==='live'?"#ff0000":"#aaa",fontWeight:filter==='live'?"900":"400"}}>LIVE</span> | <span onClick={()=>setFilter('finished')} style={{cursor:"pointer",color:filter==='finished'?"#fff":"#aaa",fontWeight:filter==='finished'?"900":"400"}}>Finished</span>
       <span onClick={load} style={{float:"right",color:"#00b6e6",cursor:"pointer",textDecoration:"underline"}}>REFRESH NOW</span>
     </div>
   </div>

   <div style={{background:"#333",padding:"6px 10px",fontSize:12}}>Football » {day.charAt(0).toUpperCase()+day.slice(1)} » {filter==='all'?'All Games':filter}</div>

   {Object.entries(groups).map(([title,list])=>(
    <div key={title}>
     <div style={{background:"#1a1a1a",padding:"6px 10px",fontWeight:"900",color:"#00b6e6",borderTop:"1px solid #333",borderBottom:"1px solid #333"}}>{title.toUpperCase()}</div>
     {list.map((m:any)=>{
       let gh=m.homeTeam?.score??m.score?.home; let ga=m.awayTeam?.score??m.score?.away;
       let has=gh!=null&&ga!=null; let s=(m.status||'').toLowerCase(); let isLive=s.includes('progress')||s==='live'||s==='1h'||s==='2h'||m.minute; let isFT=s==='finished'||s==='ft';
       let time=isLive?(m.minute?`${m.minute}'`:"LIVE"):isFT?"FT":fmtTime(m.date); let score=has?`${gh}-${ga}`:"-";
       return <div key={m.id} style={{display:"flex",padding:"8px 10px",borderBottom:"1px solid #1e1e1e",background:isLive?"#1a0000":"transparent"}}>
         <span style={{width:50,color:isLive?"#ff0000":"#aaa",fontWeight:isLive?"900":"400"}}>{time}</span><span style={{flex:1}}>{m.homeTeam?.name||"Home"} - {m.awayTeam?.name||"Away"}</span><span style={{fontWeight:"900",minWidth:30,textAlign:"right",color:isLive?"#ff0000":isFT?"#6ea8ff":"#fff"}}>{score}</span>
       </div>
     })}
    </div>
   ))}
  </div>
 )
}
