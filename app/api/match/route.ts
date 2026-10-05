export const dynamic='force-dynamic';
export async function GET(req:Request){
 const {searchParams}=new URL(req.url);
 const id=searchParams.get('id');
 if(!id) return Response.json({error:'no id'},{status:400});
 const headers:any={'x-rapidapi-key':process.env.HIGHLIGHTLY_KEY||'','x-api-key':process.env.HIGHLIGHTLY_KEY||''};
 try{
  const [mRes,eRes]=await Promise.all([
   fetch(`https://api.sports.highlightly.cc/football/matches/${id}`,{headers,cache:'no-store'}).then(r=>r.json()).catch(()=>null),
   fetch(`https://api.sports.highlightly.cc/football/events/${id}`,{headers,cache:'no-store'}).then(r=>r.json()).catch(()=>null),
  ]);
  const raw=eRes?.data||eRes||[];
  const events=(Array.isArray(raw)?raw:raw.events||[]).map((e:any)=>({
   minute:e.minute||e.time||'',
   player:e.player?.name||e.playerName||e.description||'',
   team:e.team?.name||'',
   type:e.type||'goal',
  }));
  return Response.json({match:mRes?.data||mRes,events});
 }catch(e:any){return Response.json({error:e.message,events:[]},{status:500});}
}
