"use client"
import { useParams, useRouter } from 'next/navigation'

export default function LeaguePage(){
 const params = useParams()
 const code = params.countryCode as string
 const router = useRouter()

 const games = [
  {home:"Man City", away:"Arsenal", time:"19:30", score:"2 - 1"},
  {home:"Liverpool", away:"Chelsea", time:"21:00", score:"0 - 0"},
  {home:"Tottenham", away:"Man Utd", time:"Live 67'", score:"1 - 2"},
 ]

 return(
  <div style={{background:'#000',minHeight:'100vh',color:'#fff',padding:16}}>
   <div onClick={()=>router.back()} style={{cursor:'pointer',marginBottom:12}}>← Back</div>
   <h2 style={{textTransform:'uppercase'}}>{code} Leagues</h2>
   <p style={{opacity:0.6,fontSize:13}}>Live matches from {code}</p>
   <div style={{marginTop:16,display:'grid',gap:10}}>
    {games.map((g,i)=><div key={i} onClick={()=>router.push(`/match/${i+1}`)} style={{background:'#1a1a1a',padding:14,borderRadius:10,border:'1px solid #333',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer'}}>
     <div><div style={{fontSize:13,opacity:0.7}}>{g.time}</div><div>{g.home} vs {g.away}</div></div>
     <div style={{background:'#00ff88',color:'#000',padding:'4px 8px',borderRadius:6,fontWeight:'bold'}}>{g.score}</div>
    </div>)}
   </div>
   <div style={{marginTop:20,textAlign:'center',opacity:0.5,fontSize:12}}>Ads will show here</div>
  </div>
 )
}
