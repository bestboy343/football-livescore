"use client"
import { useState, useEffect } from "react"
export default function Page(){
  const [m,setM]=useState<any[]>([])
  const [day,setDay]=useState("today")
  useEffect(()=>{
    fetch(`/api/live?day=${day}`,{cache:'no-store'}).then(r=>r.json()).then(j=>setM(j.response||[]))
  },[day])
  const s=(a:boolean)=>({padding:'12px 14px',borderRadius:'8px',fontWeight:'900',border:'none',background:a?'#00bfff':'#132e3d',color:a?'#000':'#00bfff'} as any)
  return(
    <div style={{margin:0,padding:0,width:'100%',minHeight:'100vh',background:'#000',overflowX:'hidden'}}>
      <div style={{background:'#0a1e2b',borderBottom:'3px solid #00bfff',padding:'14px',textAlign:'center',width:'100%',boxSizing:'border-box'}}>
        <b style={{color:'#fff',fontSize:'20px'}}>BESTSCORE • {m.length} MATCHES</b>
      </div>
      <div style={{background:'#0a1e2b',padding:'10px',display:'flex',gap:'8px',width:'100%',boxSizing:'border-box'}}>
        <button style={s(day==='today')} onClick={()=>setDay('today')}>Today</button>
        <button style={s(day==='yesterday')} onClick={()=>setDay('yesterday')}>Yesterday</button>
        <button style={s(day==='tomorrow')} onClick={()=>setDay('tomorrow')}>Tomorrow</button>
      </div>
      <div style={{background:'#0a1e2b',padding:'10px',display:'flex',gap:'8px',justifyContent:'space-between',width:'100%',boxSizing:'border-box'}}>
        <div style={{display:'flex',gap:'6px'}}>
          <button style={{...s(true),fontSize:'13px',lineHeight:'14px'}}>All<br/>Games</button>
          <button style={{...s(false),color:'#ff2a2a'}}>LIVE</button>
          <button style={s(false)}>Finished</button>
        </div>
        <button onClick={()=>location.reload()} style={{background:'#00bfff',color:'#000',border:'none',borderRadius:'10px',padding:'8px 16px',fontWeight:'900',lineHeight:'15px',fontSize:'14px'}}>↻<br/>REFRESH<br/>NOW</button>
      </div>
      <div style={{color:'#555',textAlign:'center',padding:'50px 0'}}>0 MATCHES - API limit</div>
    </div>
  )
}
