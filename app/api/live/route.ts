export const dynamic = 'force-dynamic';
export async function GET(){
 const key=process.env.API_FOOTBALL_KEY;
 const today=new Date().toISOString().split('T')[0];
 try{
  let r=await fetch('https://v3.football.api-sports.io/fixtures?live=all',{headers:{"x-apisports-key":key!},cache:"no-store"});
  let d=await r.json();
  let m=d.response||[];
  if(m.length===0){
   r=await fetch(`https://v3.football.api-sports.io/fixtures?date=${today}`,{headers:{"x-apisports-key":key!},cache:"no-store"});
   d=await r.json(); m=(d.response||[]).slice(0,30);
  }
  const f=m.map((x:any)=>({id:x.fixture.id,league:x.league.name,home:x.teams.home.name,away:x.teams.away.name,score:`${x.goals.home??0} - ${x.goals.away??0}`,minute:x.fixture.status.elapsed?x.fixture.status.elapsed+"'":x.fixture.status.short,status:x.fixture.status.short}));
  return Response.json(f);
 }catch(e){ return Response.json([]); }
}
