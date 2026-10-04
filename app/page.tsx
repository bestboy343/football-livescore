"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const SPORTS = ["Football","Hockey","Tennis","Basketball","Handball","Volleyball","Baseball","Am. football","Rugby Union","More sports »"];
const DAYS = ["Today","Yesterday","Tomorrow","More days »"];
const FILTERS = ["All Games","LIVE","Finished","Odds"];

export default function Page() {
  const [sport,setSport] = useState("Football");
  const [day,setDay] = useState("Today");
  const [filter,setFilter] = useState("All Games");
  const [matches,setMatches] = useState<any[]>([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/matches?day=${day.toLowerCase()}&status=${filter.toLowerCase()}`);
        const data = await res.json();
        setMatches(data.matches || data || []);
      } catch { setMatches([]); }
      setLoading(false);
    }
    if(sport==="Football") load(); else setLoading(false);
  }, [day,filter,sport]);

  return (
    <div style={{background:'#111', minHeight:'100vh', color:'white', fontFamily:'Arial'}}>
      {/* SPORTS BAR */}
      <div style={{background:'#000', padding:'8px', borderBottom:'1px solid #333', overflowX:'auto', whiteSpace:'nowrap'}}>
        {SPORTS.map(s=>(
          <span key={s} onClick={()=>setSport(s)} style={{color: sport===s ? '#00ff00' : '#ccc', fontWeight: sport===s?'bold':'normal', marginRight:'12px', cursor:'pointer', fontSize:'14px', borderBottom: sport===s?'2px solid #00ff00':'none'}}>
            {s}
          </span>
        ))}
      </div>

      {/* DAYS BAR */}
      <div style={{background:'#222', padding:'8px', display:'flex', gap:'12px', overflowX:'auto'}}>
        {DAYS.map(d=>(
          <span key={d} onClick={()=>setDay(d)} style={{color: day===d ? 'white':'#aaa', fontWeight: day===d?'bold':'normal', cursor:'pointer', fontSize:'14px', background: day===d?'#333':'none', padding:'4px 8px', borderRadius:'12px'}}>
            {d}
          </span>
        ))}
      </div>

      {/* FILTERS BAR */}
      <div style={{background:'#1a1a1a', padding:'8px', display:'flex', gap:'16px', borderBottom:'1px solid #333'}}>
        {FILTERS.map(f=>(
          <span key={f} onClick={()=>setFilter(f)} style={{color: f==='LIVE'?'#ff4444': filter===f?'white':'#888', fontWeight: filter===f?'bold':'normal', cursor:'pointer', fontSize:'13px'}}>
            {f==='LIVE'?'● ':''}{f}
          </span>
        ))}
      </div>

      {/* GREEN BAR */}
      <div style={{background:'#00b050', padding:'6px 10px', fontWeight:'bold', fontSize:'14px'}}>
        {sport} » {day} » {filter}
      </div>

      {/* CONTENT */}
      <div style={{padding:'0'}}>
        {sport!=="Football" ? (
          <div style={{padding:'40px 20px', textAlign:'center'}}>
            <h2>{sport} Coming Soon!</h2>
            <p style={{color:'#aaa'}}>We dey add {sport} API now. Football dey live now.</p>
            <button onClick={()=>setSport('Football')} style={{background:'#00b050', color:'white', padding:'10px 20px', border:'none', borderRadius:'6px', marginTop:'10px'}}>Back to Football</button>
          </div>
        ) : loading ? (
          <div style={{padding:'20px', textAlign:'center'}}>Loading matches...</div>
        ) : matches.length===0 ? (
          <div style={{padding:'20px', textAlign:'center', color:'#888'}}>No {filter} games for {day}</div>
        ) : (
          // Group by league - you can adapt to your data structure
          matches.map((m:any, i:number)=>(
            <div key={i} style={{borderBottom:'1px solid #222'}}>
              <div style={{background:'black', padding:'6px 10px', fontSize:'12px', fontWeight:'bold', display:'flex', justifyContent:'space-between'}}>
                <span>{m.league || m.competition || 'League'}</span>
                <span style={{color:'#aaa', fontWeight:'normal'}}>Standings</span>
              </div>
              <Link href={`/matches/${m.id || i}`} style={{textDecoration:'none', color:'white', display:'flex', justifyContent:'space-between', padding:'8px 10px', alignItems:'center'}}>
                <div>
                  <div style={{color:'#00ff00', fontSize:'11px'}}>{m.status || 'Half Time'}</div>
                  <div style={{fontSize:'14px'}}>{m.homeTeam || m.home} - {m.awayTeam || m.away}</div>
                </div>
                <div style={{color:'red', fontWeight:'bold', background:'#222', padding:'2px 6px', borderRadius:'3px'}}>{m.score || '0-0'}</div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
