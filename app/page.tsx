"use client"
import {useEffect,useState} from "react"
function fmtTime(d:string){try{return new Date(d).toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",timeZone:"Europe/Paris",hour12:false})}catch{return"--:--"}}

export default function Page(){
 const [games,setGames]=useState<any[]>([])
 const [day,setDay]=useState('today')
 const [filter,setFilter]=useState('all')
 const [selected,setSelected]=useState<any>(null)
 const [loading,setLoading]=useState(false)
 const load=()=>{
   setLoading(true)
   fetch(`/api/live?day=${day}&filter=${filter}&t=${Date.now()}`).then(r=>r.json()).then(d=>{setGames(d.response||[]);setLoading(false)}).catch(()=>setLoading(false))
 }
 useEffect(()=>{load()},[day,filter])

 const groups:Record<string,any[]>={}
 games.forEach((m:any)=>{let c=m.country?.name||m.league?.country||"WORLD";let l=m.league?.name||"League";let k=`${c}: ${l}`;if(!groups[k])groups[k]=[];groups[k].push(m)})

 const btnStyle=(active:boolean, color:string="#00b6e6")=>({
   cursor:"pointer",padding:"8px 14px",background:active?"#00b6e6":"#122f3a",
   color:active?"#000":color,fontWeight:"900",borderRadius:5,border:"none",
   fontSize:14, userSelect:"none" as any, WebkitUserSelect:"none" as any, touchAction:"manipulation" as any
 })

 return(
  <div style={{background:"#000",color:"#fff",minHeight:"100vh",fontFamily:"Arial",fontSize:13, userSelect:"none", WebkitUserSelect:"none"}}>
   <div style={{background:"#001e28",padding:"10px",borderBottom:"3px solid #00b6e6",textAlign:"center"}}>
     <div style={{fontWeight:900,fontSize:18}}>BESTSCORE • {loading?"LOADING...":`${games.length} MATCHES`}</div>
   </div>

   <div style={{background:"#0a2a35",padding:"10px"}}>
     <div style={{display:"flex",gap:6,marginBottom:10}}>
       <button onClick={()=>setDay('today')} style={btnStyle(day==='today')}>Today</button>
       <button onClick={()=>setDay('yesterday')} style={btnStyle(day==='yesterday')}>Yesterday</button>
       <button onClick={()=>setDay('tomorrow')} style={btnStyle(day==='tomorrow')}>Tomorrow</button>
     </div>
     <div style={{display:"flex",gap:6,alignItems:"center"}}>
       <button onClick={()=>setFilter('all')} style={btnStyle(filter==='all',"#fff")}>All Games</button>
       <button onClick={()=>setFilter('live')} style={btnStyle(filter==='live',"#ff3333")}>LIVE</button>
       <button onClick={()=>setFilter('finished')} style={btnStyle(filter==='finished',"#fff")}>Finished</button>
       <button onClick={load} style={{marginLeft:"auto",background:"#00b6e6",color:"#000",border:"none",padding:"9px 18px",borderRadius:6,fontWeight:"900",fontSize:14}}>{loading?"...":"↻ REFRESH NOW"}</button>
     </div>
   </div>

   {Object.entries(groups).map(([title,list])=>(
    <div key={title}>
     <div style={{background:"#1a1a1a",padding:"6px 10px",fontWeight:"900",color:"#00b6e6"}}>{title.toUpperCase()}</div>
     {list.map((m:any)=>{
       let gh=m.homeTeam?.score??m.score?.home; let ga=m.awayTeam?.score??m.score?.away; let has=gh!=null&&ga!=null;
       let s=(m.status||'').toLowerCase(); let isLive=s.includes('progress')||s==='live'||m.minute;
       let time=isLive?(m.minute?`${m.minute}'`:"LIVE"):s==='finished'||s==='ft'?"FT":fmtTime(m.date);
       let score=has?`${gh}-${ga}`:"-";
       return <div key={m.id} onClick={()=>setSelected(m)} style={{display:"flex",padding:"11px 10px",borderBottom:"1px solid #1a1a1a",background:isLive?"#1a0000":"transparent"}}><span style={{width:50,color:isLive?"#f00":"#aaa"}}>{time}</span><span style={{flex:1}}>{m.homeTeam?.name} - {m.awayTeam?.name}</span><span style={{fontWeight:"900"}}>{score} ›</span></div>
     })}
    </div>
   ))}

   {selected && (
    <div onClick={()=>setSelected(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:20}}>
     <div onClick={e=>e.stopPropagation()} style={{background:"#111",border:"2px solid #00b6e6",borderRadius:10,width:"100%",maxWidth:400,padding:20}}><div style={{textAlign:"center",fontWeight:900}}>{selected.homeTeam?.name} vs {selected.awayTeam?.name}</div><div style={{textAlign:"center",fontSize:30,margin:"10px 0"}}>{selected.homeTeam?.score??"-"} - {selected.awayTeam?.score??"-"}</div><button onClick={()=>setSelected(null)} style={{width:"100%",background:"#00b6e6",padding:10,border:"none",borderRadius:5,fontWeight:900}}>CLOSE</button></div>
    </div>
   )}
  </div>
 )
}
