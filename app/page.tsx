"use client";
import Link from "next/link";

export default function Page(){
  return(
    <div style={{background:"#080F19",minHeight:"100vh",color:"white",padding:20}}>
      <h1 style={{fontSize:28,fontWeight:"bold"}}>LiveScore ⚽</h1>
      <p style={{color:"#888",marginTop:8}}>Top leagues live</p>
      
      <div style={{marginTop:20,display:"grid",gap:12}}>
        <div style={{background:"#13202F",padding:16,borderRadius:12}}>🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League</div>
        <div style={{background:"#13202F",padding:16,borderRadius:12}}>🇪🇸 La Liga</div>
        <div style={{background:"#13202F",padding:16,borderRadius:12}}>🇩🇪 Bundesliga</div>
        <div style={{background:"#13202F",padding:16,borderRadius:12}}>🇮🇹 Serie A</div>
        <div style={{background:"#13202F",padding:16,borderRadius:12}}>🇫🇷 Ligue 1</div>
        <div style={{background:"#13202F",padding:16,borderRadius:12}}>🇳🇬 NPFL</div>
      </div>

      <Link href="/leagues" style={{display:"block",marginTop:20,background:"#00D659",color:"black",textAlign:"center",padding:14,borderRadius:999,fontWeight:"bold",textDecoration:"none"}}>
        View All 120 Leagues →
      </Link>
    </div>
  );
}
