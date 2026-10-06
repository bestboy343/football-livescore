export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(){
  const key = process.env.HIGHLIGHTLY_KEY || process.env.HIGHLY_KEY
  const getDate = (offset: number) => {
    const d = new Date()
    d.setDate(d.getDate() + offset)
    return d.toISOString().split('T')[0]
  }
  const yesterday = getDate(-1)
  const today = getDate(0)

  const fetchDay = async (date: string) => {
    const res = await fetch(`https://sports.highlightly.net/football/matches?date=${date}`,{
      headers: { "x-rapidapi-key": key! },
      cache: "no-store"
    })
    const json = await res.json()
    return json.data || json || []
  }

  const [yData, tData] = await Promise.all([fetchDay(yesterday), fetchDay(today)])

  // Merge: yesterday finished + today all
  const all = [...yData,...tData]

  return Response.json({response: all},{
    headers: {"Cache-Control":"no-store"}
  })
}
