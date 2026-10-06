"use client"
import { useState, useEffect } from "react"

function fmtTime(d: string) {
  try { return new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } catch { return d }
}

export default function Page() {
  const [games, setGames] = useState<any[]>([])
  const [day, setDay] = useState("today")
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/live?day=${day}&filter=${filter}&t=${Date.now()}`, { cache: 'no-store' })
      const data = await res.json()
      setGames(data.response || data.data || [])
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [day, filter])

  const filtered = games

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="p-4 flex justify-between items-center bg-black border-b border-zinc-800">
        <h1 className="text-xl font-black">BESTSCORE</h1>
        <button onClick={load} className="bg-white text-black px-3 py-1 rounded text-sm font-bold">REFRESH NOW</button>
      </header>

      <div className="p-4 space-y-3">
        <div className="flex gap-2">
          <button onClick={() => setDay("yesterday")} className={`px-4 py-2 rounded ${day==='yesterday'?'bg-white text-black':'bg-zinc-800'}`}>Yesterday</button>
          <button onClick={() => setDay("today")} className={`px-4 py-2 rounded ${day==='today'?'bg-white text-black':'bg-zinc-800'}`}>Today</button>
          <button onClick={() => setDay("tomorrow")} className={`px-4 py-2 rounded ${day==='tomorrow'?'bg-white text-black':'bg-zinc-800'}`}>Tomorrow</button>
        </div>

        <div className="flex gap-2">
          <button onClick={() => setFilter("all")} className={`px-4 py-1 rounded text-sm ${filter==='all'?'bg-white text-black':'bg-zinc-800'}`}>All Matches</button>
          <button onClick={() => setFilter("live")} className={`px-4 py-1 rounded text-sm ${filter==='live'?'bg-red-600':'bg-zinc-800'}`}>Live</button>
          <button onClick={() => setFilter("finished")} className={`px-4 py-1 rounded text-sm ${filter==='finished'?'bg-white text-black':'bg-zinc-800'}`}>Finished</button>
        </div>

        <p className="text-zinc-400 text-sm">{loading ? 'LOADING...' : `${filtered.length} MATCHES`}</p>

        <div className="space-y-2">
          {filtered.map((m: any, i: number) => (
            <div key={m.id || i} className="bg-zinc-900 p-3 rounded flex justify-between items-center">
              <div className="flex-1">
                <p className="text-xs text-zinc-500">{m.league?.name || m.competition || 'League'} • {fmtTime(m.date || m.startTime || '')}</p>
                <p className="font-bold">{m.homeTeam?.name || m.home?.name || 'Home'} vs {m.away
