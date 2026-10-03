
"use client";
import { useState } from "react";
import Link from "next/link";

const data = [
["England","gb-eng","Premier League,Championship,FA Cup,League One"],
["Spain","es","La Liga,La Liga 2,Copa del Rey"],
["Germany","de","Bundesliga,2. Bundesliga,DFB Pokal"],
["Italy","it","Serie A,Serie B,Coppa Italia"],
["France","fr","Ligue 1,Ligue 2,Coupe de France"],
["Algeria","dz","Ligue 1,Ligue 2,Algerian Cup"],
["Morocco","ma","Botola Pro,Botola 2,Coupe du Trone"],
["Egypt","eg","Premier League,Division 2,Egypt Cup"],
["Nigeria","ng","NPFL,NNL,Federation Cup"],
["South Africa","za","PSL,National First Division,Nedbank Cup"],
["USA","us","MLS,USL Championship,US Open Cup"],
["Brazil","br","Serie A,Serie B,Copa do Brasil"],
["Argentina","ar","Liga Profesional,Primera Nacional,Copa Argentina"],
["Saudi Arabia","sa","Pro League,Division 1,King Cup"],
["Turkey","tr","Super Lig,1. Lig,Turkish Cup"],
["Netherlands","nl","Eredivisie,Eerste Divisie,KNVB Cup"],
["Portugal","pt","Primeira Liga,Segunda Liga,Taca de Portugal"],
["Belgium","be","Pro League,Challenger League,Belgian Cup"],
["Scotland","gb-sct","Premiership,Championship,Scottish Cup"],
["Mexico","mx","Liga MX,Liga Expansion,Copa MX"],
["Japan","jp","J1 League,J2 League,Emperor Cup"],
["South Korea","kr","K League 1,K League 2,FA Cup"],
["Australia","au","A-League,A-League 2,Australia Cup"],
["India","in","ISL,I-League,Super Cup"],
["Qatar","qa","Stars League,Second Division,Amir Cup"],
["Tunisia","tn","Ligue 1,Ligue 2,Tunisian Cup"],
["Senegal","sn","Ligue 1,Ligue 2,Senegal Cup"],
["Ghana","gh","Premier League,Division One,FA Cup"],
["Cameroon","cm","Elite One,Elite Two,Cameroon Cup"],
["Ivory Coast","ci","Ligue 1,Ligue 2,Coupe Nationale"],
["Kenya","ke","Premier League,Super League,FKF Cup"],
["Ethiopia","et","Premier League,Higher League,Ethiopian Cup"],
["Uganda","ug","Premier League,Big League,Uganda Cup"],
["Zambia","zm","Super League,National Division One,ABSA Cup"],
["Zimbabwe","zw","Premier League,Division 1,Chibuku Cup"],
];

const more = [
["Afghanistan","af"],["Albania","al"],["Andorra","ad"],["Angola","ao"],["Armenia","am"],["Austria","at"],["Azerbaijan","az"],["Bahrain","bh"],["Bangladesh","bd"],["Belarus","by"],["Benin","bj"],["Bolivia","bo"],["Bosnia","ba"],["Botswana","bw"],["Bulgaria","bg"],["Burkina Faso","bf"],["Burundi","bi"],["Cambodia","kh"],["Canada","ca"],["Chad","td"],["Chile","cl"],["China","cn"],["Colombia","co"],["Comoros","km"],["Congo","cg"],["Costa Rica","cr"],["Croatia","hr"],["Cuba","cu"],["Cyprus","cy"],["Czech Republic","cz"],["Denmark","dk"],["Djibouti","dj"],["Dominican Republic","do"],["DR Congo","cd"],["Ecuador","ec"],["El Salvador","sv"],["Equatorial Guinea","gq"],["Estonia","ee"],["Eswatini","sz"],["Faroe Islands","fo"],["Fiji","fj"],["Finland","fi"],["Gabon","ga"],["Gambia","gm"],["Georgia","ge"],["Gibraltar","gi"],["Greece","gr"],["Guatemala","gt"],["Guinea","gn"],["Haiti","ht"],["Honduras","hn"],["Hong Kong","hk"],["Hungary","hu"],["Iceland","is"],["Indonesia","id"],["Iran","ir"],["Iraq","iq"],["Ireland","ie"],["Israel","il"],["Jamaica","jm"],["Jordan","jo"],["Kazakhstan","kz"],["Kosovo","xk"],["Kuwait","kw"],["Kyrgyzstan","kg"],["Laos","la"],["Latvia","lv"],["Lebanon","lb"],["Lesotho","ls"],["Liberia","lr"],["Libya","ly"],["Liechtenstein","li"],["Lithuania","lt"],["Luxembourg","lu"],["Macau","mo"],["Madagascar","mg"],["Malawi","mw"],["Malaysia","my"],["Maldives","mv"],["Mali","ml"],["Malta","mt"],["Mauritania","mr"],["Mauritius","mu"],["Moldova","md"],["Mongolia","mn"],["Montenegro","me"],["Mozambique","mz"],["Myanmar","mm"],["Namibia","na"],["Nepal","np"],["New Zealand","nz"],["Nicaragua","ni"],["Niger","ne"],["North Korea","kp"],["North Macedonia","mk"],["Norway","no"],["Oman","om"],["Pakistan","pk"],["Palestine","ps"],["Panama","pa"],["Paraguay","py"],["Peru","pe"],["Philippines","ph"],["Poland","pl"],["Romania","ro"],["Russia","ru"],["Rwanda","rw"],["San Marino","sm"],["Seychelles","sc"],["Sierra Leone","sl"],["Singapore","sg"],["Slovakia","sk"],["Slovenia","si"],["Somalia","so"],["South Sudan","ss"],["Sri Lanka","lk"],["Sudan","sd"],["Sweden","se"],["Switzerland","ch"],["Syria","sy"],["Taiwan","tw"],["Tajikistan","tj"],["Tanzania","tz"],["Thailand","th"],["Togo","tg"],["Trinidad and Tobago","tt"],["Turkmenistan","tm"],["Ukraine","ua"],["United Arab Emirates","ae"],["Uruguay","uy"],["Uzbekistan","uz"],["Venezuela","ve"],["Vietnam","vn"],["Wales","gb-wls"],["Yemen","ye"]
];

export default function Page(){
const [q,setQ]=useState("");
const all = [...data,...more.map(m=>[m[0],m[1],`Premier League,Cup`])];
const filtered = all.filter(c=>c[0].toLowerCase().includes(q.toLowerCase()));

return(
<div style={{background:"#0B0F19",minHeight:"100vh",padding:"12px",color:"white"}}>
<h1 style={{fontSize:"20px",fontWeight:"bold",marginBottom:"12px"}}>All {all.length} Countries</h1>
<input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search country..." style={{width:"100%",padding:"10px",borderRadius:"8px",border:"1px solid #333",background:"#151A27",color:"white",marginBottom:"16px"}} />
{filtered.map((c:any)=>(
<div key={c[0]} style={{marginBottom:"10px",background:"#151A27",borderRadius:"10px",overflow:"hidden",border:"1px solid #222"}}>
<div style={{padding:"10px",background:"#1e2536",display:"flex",gap:"8px",alignItems:"center",fontWeight:"bold",fontSize:"13px"}}>
<img src={`https://flagcdn.com/w20/${c[1]}.png`} width="20" height="14" style={{borderRadius:"2px"}} alt
