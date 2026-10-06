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
   <div style={{background:"#001e28",padding:"10px",borderBottom:"2px solid #00b6e6"}}>
     <div style={{fontWeight:900,fontSize:18,marginBottom:8}}>FLASHSCORE</div>
     <div style={{color:"#aaa",marginBottom:6}}>
       <b style={{color:"#fff"}}>Football</b> | Hockey | Tennis | Basketball | Handball | Volleyball | Baseball | Am. football | Rugby Union | <span style={{color:"#00b6e6"}}>More sports »</span>
     </div>
     <div style={{marginBottom:6}}>
       <span onClick={()=>setDay('today')} style={{cursor:"pointer",color:day==='today'?"#fff":"#00b6e6",fontWeight:day==='today'?"900":"400"}}>Today</span> | <span onClick={()=>setDay('yesterday')} style={{cursor:"pointer",color:day==='yesterday'?"#fff":"#00b6e6"}}>Yesterday</span> | <span onClick={()=>setDay('tomorrow')} style={{cursor:"pointer",color:day==='tomorrow'?"#fff":"#00b6e6"}}>Tomorrow</span> | <span style={{color:"#00b6e6"}}>More days »</span>
     </div>
     <div style={{marginBottom:6}}>
       <span onClick={()=>setFilter('all')} style={{cursor:"pointer",color:filter==='all'?"#fff":"#00b6e6",fontWeight:filter==='all'?"900":"400"}}>All Games</span> | <span onClick={()=>setFilter('live')} style={{cursor:"pointer",color:filter==='live'?"#fff":"#ff0000",fontWeight:filter==='live'?"900":"400"}}>LIVE</span> | <span onClick={()=>setFilter('finished')} style={{cursor:"pointer",color:filter==='finished'?"#fff":"#00b6e6"}}>Finished</span> | Odds
     </div>
     <div onClick={load} style={{color:"#00b6e6",cursor:"pointer",textDecoration:"underline"}}>REFRESH NOW</div>
   </div>

   <div style={{background:"#2a5a2a",padding:"6px 10px",fontWeight:"700"}}>Football » {day.charAt(0).toUpperCase()+day.slice(1)} » {filter==='all'?'All Games':filter.toUpperCase()}</div>

   <div style={{background:"#d9e6f2",color:"#000",padding:"8px",display:"flex",gap:"10px",fontSize:12}}>
     <div style={{border:"1px solid #aaa",padding:"4px",flex:1}}>50% stake back as a Sports Freebet on UCL games</div>
     <div style={{border:"1px solid #aaa",padding:"4px",flex:1}}>🎁 BETANO: Welcome Bonus up to ₦200,000</div>
     <div style={{border:"1px solid #aaa",padding:"4px",flex:1}}>🎁 1XBET: 300% deposit bonus! If you deposit NGN 170,001 or more...</div>
   </div>
   <div style={{background:"#eef",color:"#900",padding:"4px 10px",fontSize:12,textDecoration:"underline"}}>Bet on Football from your mobile with 1xBet!</div>

   {Object.entries(groups).map(([title,list])=>(
    <div key={title}>
     <div style={{background:"#222",padding:"6px 10px",fontWeight:"900",borderTop:"1px solid #333"}}>{title.toUpperCase()} <span style={{color:"#888",fontWeight:400}}> Standings</span></div>
     {list.map((m:any)=>{
       let gh=m.homeTeam?.score??m.score?.home; let ga=m.awayTeam?.score??m.score?.away;
       let has=gh!=null&&ga!=null; let s=(m.status||'').toLowerCase(); let isLive=s.includes('progress')||s==='live'||s==='1h'||s==='2h'||m.minute; let isFT=s==='finished'||s==='ft';
       let time=isLive?(m.minute?`${m.minute}'`:"LIVE"):isFT?"FT":fmtTime(m.date); let score=has?`${gh}-${ga}`:"-";
       return <div key={m.id} style={{display:"flex",padding:"6px 10px",borderBottom:"1px solid #1a1a1a",background:isLive?"#200":"transparent"}}>
         <span style={{width:50,color:isLive?"#f00":"#ccc",fontWeight:isLive?"900":"400"}}>{time}</span><span style={{flex:1}}>{m.homeTeam?.name||"Home"} - {m.awayTeam?.name||"Away"}</span><span style={{fontWeight:"900",color:isLive?"#f00":isFT?"#6ea8ff":"#fff"}}>{score}</span>
       </div>
     })}
    </div>
   ))}
  </div>
 )
}
