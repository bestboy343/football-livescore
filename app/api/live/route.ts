export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const day = searchParams.get('day') || 'today'
  const d = new Date()
  if (day === 'yesterday') d.setDate(d.getDate() - 1)
  if (day === 'tomorrow') d.setDate(d.getDate() + 1)
  const dateStr = d.toISOString().split('T')[0]

  const apiKey = process.env.HIGHLIGHTLY_KEY || process.env.HIGHLIGHTLY_API_KEY

  if (!apiKey) return Response.json({ response: [] })

  try {
    const res = await fetch(`https://sports.highlightly.net/football/matches?date=${dateStr}`, {
      headers: { 'x-rapidapi-key': apiKey },
      cache: 'no-store'
    })
    const json = await res.json()
    const rawData = json.data || []

    const formatted = rawData.map((m: any) => {
      let homeScore = 0, awayScore = 0
      if (m.state?.score?.current) {
        const p = m.state.score.current.split('-').map((s:string)=>parseInt(s.trim()))
        homeScore = p[0]||0; awayScore = p[1]||0
      }
      // Time - from date or state
      const matchTime = m.date? new Date(m.date).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : (m.time || m.state?.clock || "")

      return {
        id: m.id,
        homeTeam: { name: m.homeTeam?.name },
        awayTeam: { name: m.awayTeam?.name },
        homeScore, awayScore,
        status: m.state?.description || "NS",
        time: matchTime,
        dateRaw: m.date,
        league: {
          name: m.league?.name || "Other",
          country: m.league?.country || m.country?.name || m.league?.name?.split(' ')[0] || "World"
        },
        country: m.country?.name || m.league?.country || "World"
      }
    })

    // SORT: Put big countries/leagues on top
    const topLeagues = ["Premier League", "La Liga", "Serie A", "Bundesliga", "Ligue 1", "Champions League", "Friendlies", "Serie B"]
    formatted.sort((a:any,b:any)=>{
      const aTop = topLeagues.findIndex(l=>a.league.name.includes(l))
      const bTop = topLeagues.findIndex(l=>b.league.name.includes(l))
      if(aTop!==-1 && bTop!==-1) return aTop-bTop
      if(aTop!==-1) return -1
      if(bTop!==-1) return 1
      return a.league.name.localeCompare(b.league.name)
    })

    return Response.json({ response: formatted })
  } catch(e){
    return Response.json({ response: [] })
  }
}
