export const dynamic='force-dynamic'
export const revalidate=0
export async function GET(req:Request){
 const url=new URL(req.url)
 const day=url.searchParams.get('day')||'today'
 const filter=url.searchParams.get('filter')||'all'
 const key=process.env.HIGHLIGHTLY_KEY||process.env.HIGHLY_KEY
 const getDate=(o:number)=>{let d=new Date();d.setDate(d.getDate()+o);return d.toISOString().split('T')[0]}
 let dates: string[]=[]
 if(day==='yesterday') dates=[getDate(-1)]
 else if(day==='tomorrow') dates=[getDate(1)]
 else if(day==='today') dates=[getDate(0)]
 else dates=[getDate(-1),getDate(0),getDate(1)] // all

 const fetchDay=async(dt:string)=>{
   let r=await fetch(`https://sports.highlightly.net/football/matches?date=${dt}`,{headers:{"x-rapidapi-key":key!},cache:"no-store"})
   let j=await r.json(); return j.data||j||[]
 }
 let all:any[]=[]
 for(let dt of dates){ let d=await fetchDay(dt); all=[...all,...d] }

 // filter
 if(filter==='live') all=all.filter((m:any)=>{let s=(m.status||'').toLowerCase();return s.includes('progress')||s==='live'||s==='1h'||s==='2h'||m.minute})
 if(filter==='finished') all=all.filter((m:any)=>{let s=(m.status||'').toLowerCase();return s==='finished'||s==='ft'})

 return Response.json({response:all},{headers:{"Cache-Control":"no-store"}})
}
