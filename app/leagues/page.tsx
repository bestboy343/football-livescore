"use client";
import { useState } from 'react';

const ALL = [
  {c:"England",f:"gb-eng",l:["Premier League","Championship","FA Cup","EFL Cup"]},
  {c:"Spain",f:"es",l:["La Liga","La Liga 2","Copa del Rey"]},
  {c:"Germany",f:"de",l:["Bundesliga","2. Bundesliga","DFB-Pokal"]},
  {c:"Italy",f:"it",l:["Serie A","Serie B","Coppa Italia"]},
  {c:"France",f:"fr",l:["Ligue 1","Ligue 2","Coupe de France"]},
  {c:"Brazil",f:"br",l:["Brasileirão","Serie B","Copa do Brasil"]},
  {c:"Nigeria",f:"ng",l:["NPFL","FA Cup","NNL"]},
  {c:"Argentina",f:"ar",l:["Liga Profesional","Primera Nacional"]},
  {c:"Portugal",f:"pt",l:["Primeira Liga","Liga 2"]},
  {c:"Netherlands",f:"nl",l:["Eredivisie","Eerste Divisie"]},
  {c:"Belgium",f:"be",l:["Pro League","Challenger Pro"]},
  {c:"Turkey",f:"tr",l:["Super Lig","1. Lig"]},
  {c:"USA",f:"us",l:["MLS","USL Championship"]},
  {c:"Mexico",f:"mx",l:["Liga MX","Liga Expansion"]},
  {c:"Scotland",f:"gb-sct",l:["Premiership","Championship"]},
  {c:"Russia",f:"ru",l:["Premier League","First League"]},
  {c:"Saudi Arabia",f:"sa",l:["Pro League","First Division"]},
  {c:"Japan",f:"jp",l:["J1 League","J2 League"]},
  {c:"South Korea",f:"kr",l:["K League 1","K League 2"]},
  {c:"Australia",f:"au",l:["A-League","NPL"]},
  {c:"India",f:"in",l:["ISL","I-League"]},
  {c:"South Africa",f:"za",l:["PSL","National First"]},
  {c:"Egypt",f:"eg",l:["Premier League","Second Division"]},
  {c:"Morocco",f:"ma",l:["Botola Pro","Botola 2"]},
  {c:"Ghana",f:"gh",l:["Premier League","Division One"]},
  {c:"Kenya",f:"ke",l:["Premier League","Super League"]},
  {c:"Senegal",f:"sn",l:["Ligue 1","Ligue 2"]},
  {c:"Tunisia",f:"tn",l:["Ligue 1","Ligue 2"]},
  {c:"Greece",f:"gr",l:["Super League","Super League 2"]},
  {c:"Croatia",f:"hr",l:["HNL","Prva NL"]},
  {c:"Sweden",f:"se",l:["Allsvenskan","Superettan"]},
  {c:"Norway",f:"no",l:["Eliteserien","OBOS-ligaen"]},
  {c:"Denmark",f:"dk",l:["Superliga","1st Division"]},
  {c:"Poland",f:"pl",l:["Ekstraklasa","I Liga"]},
  {c:"Ukraine",f:"ua",l:["Premier League","First League"]},
  {c:"Czech Republic",f:"cz",l:["First League","Second League"]},
  {c:"Austria",f:"at",l:["Bundesliga","2. Liga"]},
  {c:"Switzerland",f:"ch",l:["Super League","Challenge League"]},
  {c:"Romania",f:"ro",l:["Liga 1","Liga 2"]},
  {c:"Ireland",f:"ie",l:["Premier Division","First Division"]},
  {c:"Finland",f:"fi",l:["Veikkausliiga","Ykkosliiga"]},
  {c:"Israel",f:"il",l:["Premier League","Leumit"]},
  {c:"China",f:"cn",l:["Super League","League One"]},
  {c:"Thailand",f:"th",l:["Thai League 1","Thai League 2"]},
  {c:"Vietnam",f:"vn",l:["V-League","V-League 2"]},
  {c:"Indonesia",f:"id",l:["Liga 1","Liga 2"]},
  {c:"Uruguay",f:"uy",l:["Primera Division","Segunda"]},
  {c:"Paraguay",f:"py",l:["Primera Division","Division Intermedia"]},
  {c:"Peru",f:"pe",l:["Liga 1","Liga 2"]},
  {c:"Colombia",f:"co",l:["Primera A","Primera B"]},
  {c:"Chile",f:"cl",l:["Primera Division","Primera B"]},
  {c:"Ecuador",f:"ec",l:["LigaPro","Serie B"]},
  {c:"USA MLS",f:"us",l:["MLS","USL"]},
  {c:"Canada",f:"ca",l:["Premier League","League1"]},
  {c:"Qatar",f:"qa",l:["Stars League","Second Division"]},
  {c:"UAE",f:"ae",l:["Pro League","First Division"]},
  {c:"Iran",f:"ir",l:["Pro League","Azadegan"]},
];

export default function Home(){
  const [q,setQ]=useState('');
  const filtered=ALL.filter(x=>x.c.toLowerCase().includes(q.toLowerCase()));
  return(
    <div style={{background:'#080F19',minHeight:'100vh',color:'white',padding:16}}>
      <h1 style={{fontSize:22,fontWeight:'bold'}}>All Leagues ({filtered.length})</h1>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder='Search country...' style={{width:'100%',marginTop:12,padding:12,borderRadius:10,background:'#13202F',border:'1px solid #223',color:'white'}} />
      <div style={{marginTop:16,display:'grid',gap:8}}>
      {filtered.map((x,i)=>(
        <div key={i} style={{background:'#13202F',padding:12,borderRadius:10,display:'flex',gap:12,alignItems:'center'}}>
          <img src={`https://flagcdn.com/w20/${x.f}.png`} width={20} height={14} alt='' />
          <div style={{flex:1}}>
            <div style={{fontWeight:'bold',fontSize:14}}>{i+1}. {x.c}</div>
            <div style={{fontSize:11,color:'#888'}}>{x.l.join(' • ')}</div>
          </div>
        </div>
      ))}
      </div>
      <a href='/' style={{display:'block',marginTop:20,textAlign:'center',background:'#00D659',color:'black',padding:12,borderRadius:999,fontWeight:'bold',textDecoration:'none'}}>← Back Home</a>
    </div>
  )
}
