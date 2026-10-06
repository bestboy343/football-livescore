export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(){
  const res = await fetch("https://v3.football.api-sports.io/fixtures?live=all", {
    headers: {"x-apisports-key": process.env.API_FOOTBALL_KEY!},
    cache: "no-store",
    next: { revalidate: 0 }
  })
  const data = await res.json()
  return Response.json(data, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "CDN-Cache-Control": "no-store"
    }
  })
}
