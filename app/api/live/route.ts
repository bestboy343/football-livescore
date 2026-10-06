export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(){
  const today = new Date().toISOString().split('T')[0]
  const key = process.env.HIGHLIGHTLY_KEY || process.env.HIGHLY_KEY

  const res = await fetch(`https://sports.highlightly.net/football/matches?date=${today}`,{
    headers: { "x-rapidapi-key": key! },
    cache: "no-store"
  })
  const data = await res.json()

  // Highlightly returns array directly
  return Response.json({response: data.data || data || []},{
    headers: {"Cache-Control":"no-store"}
  })
}
