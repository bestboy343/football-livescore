"use client"
import { useRouter } from 'next/navigation'

export default function MatchPage(){
 const router = useRouter()
 return(
  <div style={{background:'#000',minHeight:'100vh',color:'#fff',padding:16}}>
   <div onClick={()=>router.back()} style={{cursor:'pointer',marginBottom:12}}>← Back</div>
   
   <div style={{textAlign:'center',marginTop:20}}>
    <div style={{opacity:0.6,fontSize:13}}>Premier League • Live 67'</div>
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:20,marginTop:16}}>
     <div><div style={{fontSize:40}}>🔵</div><div>Man City</div></div>
     <div style={{background:'#00ff88',color:'#000',padding:'10px 20px',borderRadius:10,fontSize:24,fontWeight:'bold'}}>2 - 1</div>
     <div><div style={{fontSize:40}}>🔴</div><div>Arsenal</div></div>
    </div>
   </div>

   <div style={{marginTop:30,display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,textAlign:'center'}}>
    <div style={{background:'#1a1a1a',padding:12,borderRadius:8}}>Shots<br/><b>12 - 8</b></div>
    <div style={{background:'#1a1a1a',padding:12,borderRadius:8}}>Possession<br/><b>58% - 42%</b></div>
    <div style={{background:'#1a1a1a',padding:12,borderRadius:8}}>Corners<br/><b>5 - 3</b></div>
   </div>

   <div style={{marginTop:20,background:'#111',padding:16,borderRadius:10,border:'1px dashed #333',textAlign:'center'}}>
    <div style={{opacity:0.5,fontSize:12}}>AD SPACE</div>
    <div style={{marginTop:8,fontSize:13}}>Your AdMob banner will show here</div>
   </div>

   <div style={{marginTop:20,textAlign:'center'}}>
    <button onClick={()=>router.push('/')} style={{background:'#00ff88',color:'#000',padding:'12px 24px',borderRadius:8,border:'none',fontWeight:'bold'}}>Back to Live Scores</button>
   </div>
  </div>
 )
}
