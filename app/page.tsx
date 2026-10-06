"use client"
import { useState } from "react"

export default function Page() {
  const [sel, setSel] = useState<any>(null)
  const games = [
    { id: 1, c: "WORLD", l: "Friendlies", h: "Colombia", a: "Peru" },
    { id: 2, c: "WORLD", l: "Friendlies", h: "Argentina", a: "Benin" },
    { id: 3, c: "BRAZIL", l: "Serie B", h: "Goias", a: "Athletic" },
    { id: 4, c: "ALGERIA", l: "Ligue 1", h: "Saoura", a: "Khenchela" },
  ]

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-[#0a1e2e] border-b-4 border-cyan-400">
        <div className="text-center py-4 font-black text-white text-xl">
          BESTSCORE - 4 MATCHES
        </div>
        <div className="flex gap-2 px-3 pb-3">
          <div className="bg-cyan-400 text-black px-6 py-3 rounded-xl font-black">Today</div>
          <div className="bg-[#112a3a] text-cyan-400 px-6 py-3 rounded-xl font-black">Yesterday</div>
          <div className="bg-[#112a3a] text-cyan-400 px-6 py-3 rounded-xl font-black">Tomorrow</div>
        </div>
        <div className="flex gap-2 px-3 pb-4">
          <div className="bg-[#152d3d] text-white px-5 py-4 rounded-xl font-black">All Games</div>
          <div className="bg-[#152d3d] text-red-500 flex-1 py-4 rounded-xl font-black text-center">LIVE</div>
          <div className="bg-cyan-400 text-black flex-1 py-4 rounded-xl font-black text-center">Finished</div>
          <div className="bg-cyan-400 text-black px-6 py-3 rounded-xl font-black text-center">REFRESH NOW</div>
        </div>
      </div>

      <div className="p-3 space-y-2">
        {games.map((g) => (
          <div key={g.id} onClick={() => setSel(g)} className="bg-[#101a2e] rounded-xl p-4 flex justify-between">
            <div>
              <div className="text-[11px] text-cyan-400">{g.c}: {g.l}</div>
              <div className="text-white font-bold mt-1">{g.h} vs {g.a}</div>
            </div>
            <div className="text-cyan-400 font-black">0 - 0</div>
          </div>
        ))}
      </div>

      {sel && (
        <div onClick={() => setSel(null)} className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#101a2e] w-full rounded-2xl p-6 border-2 border-cyan-400">
            <div className="text-cyan-400 text-xs">{sel.c}: {sel.l}</div>
            <div className="text-white font-black text-xl mt-2">{sel.h} vs {sel.a}</div>
            <div className="text-cyan-400 text-3xl font-black my-4">0 - 0</div>
            <button onClick={() => setSel(null)} className="w-full bg-cyan-400 text-black py-3 rounded-xl font-black">CLOSE</button>
          </div>
        </div>
      )}
    </div>
  )
}
