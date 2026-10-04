'use client';
import { useParams, useRouter } from 'next/navigation';
export default function Page(){
  const p = useParams();
  const r = useRouter();
  return (
    <div style={{background:'#0f172a',color:'white',minHeight:'100vh',padding:20}}>
      <h1 style={{fontSize:24,fontWeight:'bold'}}>Match {String(p.id)} ✅</h1>
      <p style={{marginTop:10,color:'#aaa'}}>Route is working!</p>
      <button onClick={()=>r.back()} style={{marginTop:20,padding:'12px 20px',background:'#22c55e',color:'black',border:'none',borderRadius:8,fontWeight:'bold'}}>← Back</button>
    </div>
  );
}
