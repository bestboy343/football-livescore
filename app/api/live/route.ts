export const dynamic = 'force-dynamic'

export async function GET() {
  const matches = [
    { id: 1, homeTeam: { name: "Man City" }, awayTeam: { name: "Arsenal" }, homeScore: 2, awayScore: 1, status: "LIVE 78'", league: { name: "Premier League" } },
    { id: 2, homeTeam: { name: "Barcelona" }, awayTeam: { name: "Real Madrid" }, homeScore: 1, awayScore: 1, status: "HT", league: { name: "La Liga" } },
    { id: 3, homeTeam: { name: "Bayern" }, awayTeam: { name: "Dortmund" }, homeScore: 3, awayScore: 0, status: "FT", league: { name: "Bundesliga" } },
    { id: 4, homeTeam: { name: "PSG" }, awayTeam: { name: "Marseille" }, homeScore: 0, awayScore: 0, status: "LIVE 23'", league: { name: "Ligue 1" } },
  ]
  return Response.json({ response: matches })
}
