
"use client";
import Link from 'next/link';

export default function Header() {
  return (
    <header style={{background:'black', padding:'12px', borderBottom:'1px solid #222', position:'sticky', top:0, zIndex:50}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', maxWidth:'1200px', margin:'0 auto'}}>
        <Link href="/" style={{color:'white', fontWeight:'bold', textDecoration:'none'}}>FOOTBALL LIVE</Link>
        <Link href="/" style={{color:'white', background:'#16a34a', padding:'6px 12px', borderRadius:'6px', textDecoration:'none', fontSize:'14px'}}>Home</Link>
      </div>
    </header>
  );
}
