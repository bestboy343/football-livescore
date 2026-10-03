"use client";
import { useState } from "react";
import Link from "next/link";

const DATA = [
  { c: "England", f: "gb-eng", l: ["Premier League","Championship","FA Cup","League One"] },
  { c: "Spain", f: "es", l: ["La Liga","La Liga 2","Copa del Rey"] },
  { c: "Germany", f: "de", l: ["Bundesliga","2. Bundesliga"] },
  { c: "Italy", f: "it", l: ["Serie A","Serie B"] },
  { c: "France", f: "fr", l: ["Ligue 1","Ligue 2"] },
  { c: "Algeria", f: "dz", l: ["Ligue 1","Ligue 2","Cup"] },
  { c: "Morocco", f: "ma", l: ["Botola Pro","Botola 2"] },
  { c: "Egypt", f: "eg", l: ["Premier League","Cup"] },
  { c: "Nigeria", f: "ng", l: ["NPFL","Cup"] },
  { c: "South Africa", f: "za", l: ["PSL","Cup"] },
  { c: "Brazil", f: "br", l: ["Serie A","Serie B"] },
  { c: "Argentina", f: "ar", l: ["Liga Profesional","Primera Nacional"] },
  { c: "USA", f: "us", l: ["MLS","US Open Cup"] },
  { c: "Turkey", f: "tr", l: ["Super Lig","1. Lig"] },
  { c: "Saudi Arabia", f: "sa", l: ["Pro League","Division 1"] },
  { c: "Netherlands", f: "nl", l: ["Eredivisie","Eerste Divisie"] },
  { c: "Portugal", f: "pt", l: ["Primeira Liga","Segunda Liga"] },
  { c: "Belgium", f: "be", l: ["Pro League","Challenger"] },
  { c: "Qatar", f: "qa", l: ["Stars League","Second Division"] },
  { c: "Tunisia", f: "tn", l: ["Ligue 1","Ligue 2"] },
  { c: "Senegal", f: "sn", l: ["Ligue 1","Ligue 2"] },
  { c: "Ghana", f: "gh", l: ["Premier League","Division One"] },
  { c: "Japan", f: "jp", l: ["J1 League","J2 League"] },
  { c: "Mexico", f: "mx", l: ["Liga MX","Liga Expansion"] },
];

const MORE = [
  "Afghanistan-af","Albania-al","Andorra-ad","Angola-ao","Armenia-am","Australia-au",
  "Austria-at","Azerbaijan-az","Bahrain-bh","Bangladesh-bd","Belarus-by","Benin-bj",
  "Bolivia-bo","Bosnia-ba","Botswana-bw","Bulgaria-bg","Burkina Faso-bf","Burundi-bi",
  "Cambodia-kh","Cameroon-cm","Canada-ca","Chad-td","Chile-cl","China-cn","Colombia-co",
  "Comoros-km","Congo-cg","Costa Rica-cr","Croatia-hr","Cuba-cu","Cyprus-cy","Czech Republic-cz",
  "Denmark-dk","Djibouti-dj","DR Congo-cd","Ecuador-ec","El Salvador-sv","Estonia-ee",
  "Ethiopia-et","Finland-fi","Gabon-ga","Gambia-gm","Georgia-ge","Greece-gr","Guinea-gn",
  "Haiti-ht","Honduras-hn","Hungary-hu","Iceland-is","India-in","Indonesia-id","Iran-ir",
  "Iraq-iq","Ireland-ie","Israel-il","Ivory Coast-ci","Jamaica-jm","Jordan-jo","Kazakhstan-kz",
  "Kenya-ke","Kuwait-kw","Latvia-lv","Lebanon-lb","Liberia-lr","Libya-ly","Lithuania-lt",
  "Luxembourg-lu","Malaysia-my","Mali-ml","Malta-mt","Mauritius-mu","Moldova-md",
  "Mozambique-mz","Namibia-na","Nepal-np","New Zealand-nz","Niger-ne","Norway-no",
  "Oman-om","Pakistan-pk","Panama-pa","Paraguay-py","Peru-pe","Philippines-ph","Poland-pl",
  "Romania-ro","Russia-ru","Rwanda-rw","Scotland-gb-sct","Serbia-rs","Singapore-sg",
  "Slovakia-sk","Slovenia-si","Somalia-so","South Korea-kr","Sweden-se","Switzerland-ch",
  "Tanzania-tz","Thailand-th","Togo-tg","Uganda-ug","Ukraine-ua","UAE-ae","Uruguay-uy",
  "Venezuela-ve","Vietnam-vn","Wales-gb-wls","Zambia-zm","Zimbabwe-zw"
];

export default function Page(){
  const [q,setQ] = useState("");
  const list1 = DATA.filter(x=>x.c.toLowerCase().includes(q.toLowerCase()));
  const list2 = MORE.map(s=>{
    const parts = s.split("-");
    return { c: parts[0], f: parts[1], l: ["Premier League","Cup"] };
  }).filter(x=>x.c.toLowerCase().includes(q.toLowerCase()));

  const all = [...list1,...list2];

  return(
    <div style={{background:"#0B0F19",minHeight:"100vh",padding:"12px",color:"white"}}>
      <h1 style={{fontSize:"20px",fontWeight:"bold",marginBottom:"12px"}}>All {DATA.length + MORE.length} Countries</h1>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search 150 countries..." style={{width:"100%",padding:"10px",borderRadius:"8px",border:"1px solid #333",background:"#151A27",color:"white",marginBottom:"16px"}} />
      {all.map(item=>(
        <div key={item.c} style={{marginBottom:"10px",background:"#151A27",borderRadius:"10px",overflow:"hidden",border:"1px solid #222"}}>
          <div style={{padding:"10px",background:"#1e2536",display:"flex",gap:"8px",alignItems:"center",fontWeight:"bold",fontSize:"13px"}}>
            <img src={`https://flagcdn.com/w20/${item.f}.png`} width={20} height={14} alt="" style={{borderRadius:"2px"}} />
            <span>{item.c.toUpperCase()}</span>
            <span style={{marginLeft:"auto",background:"#00d084",color:"black",fontSize:"10px",padding:"2px 6px",borderRadius:"10px"}}>{item.l.length} leagues</span>
          </div>
          {item.l.map(lg=>(
            <Link key={lg+item.c} href={`/leagues/${item.f}`} style={{textDecoration:"none"}}>
              <div style={{padding:"10px",borderTop:"1px solid #222",display:"flex",justifyContent:"space-between",color:"#ccc",fontSize:"13px"}}>
                <span>{lg}</span><span style={{color:"#666"}}>›</span>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
