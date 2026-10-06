export const dynamic='force-dynamic'
export const revalidate=0
export async function GET(){
 const key=process.env.HIGHLIGHTLY_KEY||process.env.HIGHLY_KEY
 const d=(o:number)=>{let x=new Date();x.setDate(x.getDate()+o);return x.toISOString().split('T')[0]}
 const [y,t]=[d(-1),d(0)]
 const f=async(dt:string)=>{let r=await fetch(`https://sports.highlightly.net/football/matches?date=${dt}`,{headers:{"x-rapidapi-key":key!},cache:"no-store"});let j=await r.json();return j.data||j||[]}
 const [a,b]=await Promise.all([f(y),f(t)])
 return Response.json({response:[...a,...b]},{headers:{"Cache-Control":"no-store"}})
}
