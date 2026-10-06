export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const day = searchParams.get('day') || 'today'

  const d = new Date()
  if (day === 'yesterday') d.setDate(d.getDate() - 1)
  if (day === 'tomorrow') d.setDate(d.getDate() + 1)
  const dateStr = d.toISOString().split('T')[0]

  const apiKey = process.env.HIGHLIGHTLY_KEY || process.env.HIGHLIGHTLY_API_KEY

  if (!apiKey) {
    return Response.json({ response: [], error: "No API Key" })
  }

  try {
    // CORRECT HEADER - x-rapidapi-key
    const res = await fetch(`https://sports.highlightly.net/football/matches?date=${dateStr}`, {
      headers: {
        'x-rapidapi-key': apiKey
      },
      cache: 'no-store'
    })

    const json = await res.json()
    console.log("Highlightly raw:", JSON.stringify(json).slice(0,500))

    const rawData = json.data || json.response || []

    // CORRECT PARSING - score is in state.score.current = "2 - 1"
    const formatted = rawData.map((m: any) => {
      let homeScore = 0
      let awayScore = 0
      if (m.state?.score?.current) {
        const parts = m.state.score.current.split('-').map((s:string)=>parseInt(s.trim()))
        homeScore = parts[0] || 0
        awayScore = parts[1] || 0
      }
      return {
        homeTeam: { name: m.homeTeam?.name || "Home" },
        awayTeam: { name: m.awayTeam?.name || "Away" },
        homeScore,
        awayScore,
        status: m.state?.description || m.state || "FT",
        league: { name: m.league?.name || "League" },
        time: m.state?.description || ""
      }
    })

    return Response.json({ response: formatted })

  } catch (e: any) {
    return Response.json({ response: [], error: String(e) })
  }
}
