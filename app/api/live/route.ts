export const dynamic = 'force-dynamic';
export async function GET(){
 try{
  const res = await fetch('https://v3.football.api-sports.io/fixtures?live=all',{
   headers:{
    'x-apisports-key': process.env.API_FOOTBALL_KEY!,
    'x-apisports-host': 'v3.football.api-sports.io'
   },
   cache:'no-store'
  });
  const data = await res.json();
  const matches = (data.response||[]).map((f:any)=>({
   id: f.fixture.id,
   home: f.teams.home.name,
   away: f.teams.away.name,
   score: `${f.goals.home}-${f.goals.away}`,
   minute: f.fixture.status.elapsed? `${f.fixture.status.elapsed}'` : f.fixture.status.short,
   status: f.fixture.status.long,
   league: f.league.name,
   country: f.league.country,
   flag: f.league.flag
  }));
  return Response.json(matches);
 }catch(e){
  return Response.json([]);
 }
}
