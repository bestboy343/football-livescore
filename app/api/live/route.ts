export const dynamic = 'force-dynamic'
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const day = searchParams.get('day') || 'today'
  const d = new Date()
  if (day === 'yesterday') d.setDate(d.getDate() - 1)
  if (day === 'tomorrow') d.setDate(d.getDate() + 1)
  const dateStr = d.toISOString().split('T')[0]
  const key = process.env.HIGHLIGHTLY_KEY || process.env.HIGHLIGHTLY_API_KEY || ""
  if (!key) return Response.json({ response: [] })
  try {
    const r = await fetch(`https://sports.highlightly.net/football/matches?date=${dateStr}`, {
      headers: { 'x-rapidapi-key': key },
      cache: 'no-store'
    })
    const j = await r.json()
    const data = j.data || []
    const out = data.map((m: any) => {
      let hs = 0, as = 0
      if (m.state?.score?.current) {
        const p = m.state.score.current.split('-')
        hs = parseInt(p[0]) || 0; as = parseInt(p[1]) || 0
      }
      return {
        homeTeam: { name: m.homeTeam?.name || "Home" },
        awayTeam: { name: m.awayTeam?.name || "Away" },
        homeScore: hs,
        awayScore: as,
        status: m.state?.description || m.state?.short || "NS",
        time: m.date? new Date(m.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "",
        league: { name: m.league?.name || "League" },
        country: m.country?.name || m.league?.country || "WORLD"
      }
    })
    return Response.json({ response: out })
  } catch { return Response.json({ response: [] }) }
}
