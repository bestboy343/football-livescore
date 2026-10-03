"use client";
import { useState } from "react";
const D=[
"England||gb-eng||Premier League|Championship|FA Cup",
"Spain||es||La Liga|La Liga 2|Copa del Rey",
"Germany||de||Bundesliga|2. Bundesliga|DFB Pokal",
"Italy||it||Serie A|Serie B|Coppa Italia",
"France||fr||Ligue 1|Ligue 2|Coupe de France",
"Brazil||br||Serie A|Serie B|Copa do Brasil",
"Argentina||ar||Liga Profesional|Copa Argentina",
"Portugal||pt||Primeira Liga|Liga 2|Taca Portugal",
"Netherlands||nl||Eredivisie|Eerste Divisie|KNVB Cup",
"Turkey||tr||Super Lig|1. Lig|Turkish Cup",
"USA||us||MLS|USL Championship|US Open Cup",
"Saudi Arabia||sa||Pro League|Kings Cup",
"Mexico||mx||Liga MX|Liga Expansion",
"Belgium||be||Pro League|Challenger Pro League",
"Morocco||ma||Botola Pro|Throne Cup",
"Nigeria||ng||NPFL|Federation Cup",
"Egypt||eg||Premier League|Egypt Cup",
"South Africa||za||PSL|Nedbank Cup",
"Japan||jp||J1 League|J2 League|Emperor Cup",
"Qatar||qa||Stars League|Qatar Cup",
"Scotland||gb-sct||Premiership|Championship|Scottish Cup",
"Switzerland||ch||Super League|Challenge League",
"Austria||at||Bundesliga|2. Liga",
"Russia||ru||Premier League|First League",
"Ukraine||ua||Premier League|First League",
"Greece||gr||Super League|Greek Cup",
"Croatia||hr||HNL|Croatian Cup",
"Serbia||rs||Super Liga|Serbian Cup",
"Denmark||dk||Superliga|Danish Cup",
"Sweden||se||Allsvenskan|Swedish Cup",
"Norway||no||Eliteserien|Norwegian Cup",
"Poland||pl||Ekstraklasa|Polish Cup",
"Czech Republic||cz||First League|Czech Cup",
"Romania||ro||SuperLiga|Romanian Cup",
"Colombia||co||Primera A|Copa Colombia",
"Chile||cl||Primera Division|Copa Chile",
"Uruguay||uy||Primera Division|Copa Uruguay",
"Ecuador||ec||Serie A|Copa Ecuador",
"Senegal||sn||Ligue 1|Senegal Cup",
"Ghana||gh||Premier League|FA Cup",
"Algeria||dz||Ligue 1|Algerian Cup",
"Tunisia||tn||Ligue 1|Tunisian Cup",
"Cameroon||cm||Elite One|Cameroon Cup",
"Ivory Coast||ci||Ligue 1|Ivory Coast Cup",
"Australia||au||A-League|Australia Cup",
"South Korea||kr||K League 1|K League 2",
"China||cn||Super League|FA Cup",
"India||in||ISL|I-League|Super Cup",
"Indonesia||id||Liga 1|Liga 2",
"Thailand||th||League 1|FA Cup",
"Malaysia||my||Super League|FA Cup",
"Vietnam||vn||V.League 1|Vietnam Cup",
"UAE||ae||Pro League|Presidents Cup",
"Iran||ir||Pro League|Hazfi Cup",
"Iraq||iq||Stars League|Iraq Cup",
"Israel||il||Premier League|State Cup",
"Northern Ireland||gb-nir||Premiership|Irish Cup",
"Wales||gb-wls||Premier League|Welsh Cup",
"Ireland||ie||Premier Division|FAI Cup",
"Finland||fi||Veikkausliiga|Finnish Cup",
"Iceland||is||Besta Deild|Iceland Cup",
"Hungary||hu||NB I|Hungarian Cup",
"Slovakia||sk||Nike Liga|Slovak Cup",
"Slovenia||si||PrvaLiga|Slovenian Cup",
"Bulgaria||bg||First League|Bulgarian Cup",
"Albania||al||Superliga|Albanian Cup",
"Bosnia||ba||Premier League|Bosnia Cup",
"North Macedonia||mk||First League|Macedonia Cup",
"Montenegro||me||First League|Montenegro Cup",
"Cyprus||cy||First Division|Cyprus Cup",
"Malta||mt||Premier League|Maltese Cup",
"Luxembourg||lu||National Division|Lux Cup",
"Azerbaijan||az||Premier League|Azerbaijan Cup",
"Georgia||ge||Erovnuli Liga|Georgia Cup",
"Armenia||am||Premier League|Armenia Cup",
"Kazakhstan||kz||Premier League|Kazakhstan Cup",
"Uzbekistan||uz||Super League|Uzbekistan Cup",
"Paraguay||py||Primera Division|Paraguay Cup",
"Peru||pe||Liga 1|Copa Bicentenario",
"Bolivia||bo||Primera Division|Bolivia Cup",
"Venezuela||ve||Primera Division|Venezuela Cup",
"Panama||pa||LPF|Panama Cup",
"Costa Rica||cr||Primera Division|Costa Rica Cup",
"Honduras||hn||Liga Nacional|Honduras Cup",
"El Salvador||sv||Primera Division|El Salvador Cup",
"Jamaica||jm||Premier League|Jamaica Cup",
"Canada||ca||Premier League|Canadian Cup",
"New Zealand||nz||Premiership|Chatham Cup",
"Kenya||ke||Premier League|FKF Cup",
"Uganda||ug||Premier League|Uganda Cup",
"Tanzania||tz||Premier League|Tanzania Cup",
"Zambia||zm||Super League|Zambia Cup",
"Zimbabwe||zw||Premier League|Zimbabwe Cup",
"Angola||ao||Girabola|Angola Cup",
"DR Congo||cd||Linafoot|Congo Cup",
"Mali||ml||Premiere Division|Mali Cup",
"Burkina Faso||bf||Premier League|Burkina Cup",
"Guinea||gn||Ligue 1|Guinea Cup",
"Benin||bj||Premier League|Benin Cup",
"Togo||tg||Championnat|Togo Cup",
"Rwanda||rw||Premier League|Rwanda Cup",
"Mozambique||mz||Mocambola|Mozambique Cup",
"Botswana||bw||Premier League|Botswana Cup",
"Namibia||na||Premier League|Namibia Cup",
"Libya||ly||Premier League|Libya Cup",
"Sudan||sd||Premier League|Sudan Cup",
"Ethiopia||et||Premier League|Ethiopia Cup",
"Gabon||ga||Championnat|Gabon Cup",
"Singapore||sg||Premier League|Singapore Cup",
"Philippines||ph||PFL|Philippines Cup",
"Bahrain||bh||Premier League|Bahrain Cup",
"Kuwait||kw||Premier League|Kuwait Cup",
"Oman||om||Pro League|Sultan Cup",
"Jordan||jo||Pro League|Jordan Cup",
"Lebanon||lb||Premier League|Lebanon Cup",
"Latvia||lv||Virsliga|Latvian Cup",
"Lithuania||lt||A Lyga|Lithuanian Cup",
"Estonia||ee||Meistriliiga|Estonian Cup",
"Moldova||md||Super Liga|Moldova Cup",
"Belarus||by||Premier League|Belarus Cup",
"Gibraltar||gi||Football League|Gibraltar Cup",
"Andorra||ad||Primera Divisio|Andorra Cup",
"Trinidad||tt||Pro League|Trinidad Cup"
];
export default function Page(){
 const [q,setQ]=useState("");
 const list=D.map(s=>{
   const p=s.split("||");
   return {c:p[0],f:p[1],l:p[2].split("|")};
 }).filter(x=>x.c.toLowerCase().includes(q.toLowerCase()));
 return(
  <div style={{background:"#0B0F19",minHeight:"100vh",padding:12,color:"white"}}>
   <h1 style={{fontWeight:"bold",fontSize:18}}>TOP {D.length} LEAGUES 👑</h1>
   <p style={{fontSize:11,color:"#888",marginBottom:12}}>Top countries first • {D.length} total</p>
   <input value={q} onChange={e=>setQ(e.target.value)} placeholder={`Search ${D.length}...`} style={{width:"100%",padding:10,borderRadius:8,background:"#151A27",border:"1px solid #333",color:"white",marginBottom:12}} />
   {list.map((o,i)=>(
    <div key={o.c+i} style={{background:"#151A27",marginBottom:8,borderRadius:10,overflow:"hidden",border: i<15? "1px solid #00d084" : "1px solid #222"}}>
     <div style={{padding:10,background: i<15? "#1a2e25" : "#1e2536",display:"flex",gap:8,alignItems:"center",fontWeight:"bold",fontSize:13}}>
      <span style={{fontSize:10,color: i<15? "#00d084" : "#555",width:22}}>{i+1}</span>
      <img src={`https://flagcdn.com/w20/${o.f}.png`} width={20} height={14} alt="" style={{borderRadius:2}} />
      {o.c.toUpperCase()}
      {i<15 && <span style={{marginLeft:"auto",background:"#00d084",color:"#000",fontSize:9,padding:"2px 6px",borderRadius:10}}>TOP</span>}
     </div>
     {o.l.map(l=><div key={l} style={{padding:"8px 12px",borderTop:"1px solid #222",fontSize:13,color:"#ccc"}}>• {l}</div>)}
    </div>
   ))}
  </div>
 );
}
