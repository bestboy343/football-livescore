"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const All = [
 ["England","gb-eng"],
 ["Spain","es"],
 ["Germany","de"],
 ["Italy","it"],
 ["France","fr"],
 ["Nigeria","ng"],
]

export default function Page(){
 const router = useRouter()
 const [q,setQ] = useState("")
 const f = All.filter(c=>c[0].toLowerCase().includes(q.toLowerCase()))
 return(
  <div style={{background:'#000',minHeight:'100vh',color:'#fff',padding:16}}>
   <h1>All Leagues</h1>
   <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search" style={{width:'100%',padding:10,background:'#222',color:'#fff'}}/>
   <div style={{marginTop:12,display:'grid',gap:8}}>
    {f.map((c,i)=><div key={i} onClick={()=>router.push(`/leagues/${c[1]}`)} style={{background:'#1a1a1a',padding:12,borderRadius:8,border:'1px solid #333'}}>{c[0]} - {c[1]}</div>)}
   </div>
  </div>
 )
}
