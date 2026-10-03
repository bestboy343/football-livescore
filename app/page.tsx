
"use client";
export default function Page(){
 return(
  <div style={{background:"#080F19",minHeight:"100vh",color:"white",padding:20,fontFamily:"sans-serif"}}>
   <h1 style={{fontSize:24,fontWeight:"bold"}}>LiveScore ⚽</h1>
   <p style={{color:"#888",marginTop:8}}>Loading leagues...</p>
   <a href="/leagues" style={{display:"block",marginTop:16,background:"#00d084",color:"#000",padding:12,borderRadius:8,textAlign:"center",fontWeight:"bold",textDecoration:"none"}}>View All Leagues →</a>
  </div>
 );
}
