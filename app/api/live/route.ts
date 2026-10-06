import { NextResponse } from "next/server"
export const dynamic = "force-dynamic"
export async function GET(){
  const today = new Date().toISOString().split("T")[0]
  try{
    const key = process.env.HIGHLIGHTLY_KEY
    if(key){
      const r = await fetch(`https://soccer.highlightly.net/matches?date=${today}&limit=100`,{headers:{"x-rapidapi-key":key,"x-rapidapi-host":"soccer.highlightly.net"}})
      const j = await r.json()
      if(j.data?.length){
        const resp = j.data.map((m:any)=>{
          const [h,a]= (m.match?.score?.current||"0-0").split("-").map((s:string)=>parseInt(s.trim())||0)
          const st = m.match?.description?.includes("Finished")?"FT":m.match?.description?.includes("Progress")?"LIVE":m.match?.description||"NS"
          return {fixture:{id:m.id,date:m.date,status:{short:st}},league:{country:m.country?.name||"World",name:m.league?.name||"Football",logo:m.league?.name},teams:{home:{name:m.homeTeam?.name||"Home"},away:{name:m.awayTeam?.name||"Away"}},goals:{home:h,away:a}}
        })
        return NextResponse.json({response:resp})
      }
    }
  }catch{}
  try{
    const res = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/misc/events?dates=${today.replace(/-/g,"")}`)
    const json = await res.json()
    const events = json.events||[]
    const resp = events.map((e:any)=>{
      const comp = e.competitions[0]
      const home = comp.competitors.find((c:any)=>c.homeAway==="home")
      const away = comp.competitors.find((c:any)=>c.homeAway==="away")
      return {fixture:{id:e.id,date:e.date,status:{short:comp.status.type.shortDetail.includes("FT")?"FT":comp.status.type.shortDetail.includes("Half")||comp.status.type.detail.includes("-")?"LIVE":"NS"}},league:{country:comp.league?.name?.includes("England")?"England":comp.league?.name?.includes("Spain")?"Spain":comp.league?.name?.includes("Italy")?"Italy":comp.league?.country||"World",name:comp.league?.name||"Football"},teams:{home:{name:home?.team?.displayName||"Home"},away:{name:away?.team?.displayName||"Away"}},goals:{home:parseInt(home?.score||"0"),away:parseInt(away?.score||"0")}}
    })
    return NextResponse.json({response:resp})
  }catch{ return NextResponse.json({response:[]}) }
}
