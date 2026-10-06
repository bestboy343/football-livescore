export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(){
  const key = process.env.API_FOOTBALL_KEY!
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

  // Fetch 3 things like Flashscore.mobi
  const [liveRes, todayRes, yestRes] = await Promise.all([
    fetch(`https://v3.football.api-sports.io/fixtures?live=all`, { headers: {"x-apisports-key": key}, cache: "no-store" }),
    fetch(`https://v3.football.api-sports.io/fixtures?date=${today}`, { headers: {"x-apisports-key": key}, cache: "no-store" }),
    fetch(`https://v3.football.api-sports.io/fixtures?date=${yesterday}`, { headers: {"x-apisports-key": key}, cache: "no-store" })
  ])

  const live = await liveRes.json()
  const todayData = await todayRes.json()
  const yestData = await yestRes.json()

  // Combine all, remove duplicates
  const allMap = new Map()
  ;[...(live.response||[]),...(yestData.response||[]),...(todayData.response||[])].forEach((f:any)=>{
    allMap.set(f.fixture.id, f)
  })

  let all = Array.from(allMap.values())

  // Sort like Flashscore: LIVE first, then UPCOMING, then FINISHED
  all.sort((a:any,b:any)=>{
    const order = (s:string)=> s==="1H"||s==="2H"||s==="HT"||s==="LIVE"?0 : s==="NS"?1 : 2
    return order(a.fixture.status.short) - order(b.fixture.status.short)
  })

  return Response.json({response: all}, {
    headers: {"Cache-Control": "no-store, max-age=0"}
  })
}
