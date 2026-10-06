"use client"
import { useState } from "react"

export default function Page() {
  const [open, setOpen] = useState<any>(null)
  const list = [
    { c: "WORLD", l: "Friendlies", h: "Colombia", a: "Peru" },
    { c: "WORLD", l: "Friendlies", h: "Argentina", a: "Benin" },
    { c: "BRAZIL", l: "Serie B", h: "Goias", a: "Athletic" },
    { c: "ALGERIA", l: "Ligue 1", h: "Saoura", a: "Khenchela" },
  ]

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-[#0e2335]">
        <div className="text-center text-white font-black text-[23px] py-4">BESTSCORE • 4 MATCHES</div>
        <div className="h-[3px] bg-[#00bfff]"></div>

        <div className="p-3 flex gap-3">
          <button className="bg-[#00bfff] text-black font-black px-6 py-3 rounded-xl">Today</button>
          <button className="bg-[#143049] text-[#00bfff] font-black px-6 py-3 rounded-xl">Yesterday</button>
          <button className="bg-[#143049] text-[#00bfff] font-black px-6 py-3 rounded-xl">Tomorrow</button>
        </div>

        <div className="p-3 flex gap-2 items-start">
          <div className="bg-[#143049] text-white font-black rounded-xl px-5 py-4 text-center leading-none">All<br/>Games</div>
          <div className="bg-[#143049] text-red-500 font-black rounded-xl px-6 py-4 mt-1">LIVE</div>
          <div className="bg-[#00bfff] text-black font-black rounded-xl px-6 py-4 mt-1">Finished</div>
          <div className="bg-[#00bfff] text-black font-black rounded-xl flex-1 py-2 text-center">
            <div>↻</div>
            <div>REFRESH</div>
            <div>NOW</div>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-3">
        {list.map((g, i) => (
          <div key={i} onClick={() => setOpen(g)} className="bg-[#101c2e] p-4 rounded-xl flex justify-between">
            <div>
              <div className="text-[#00bfff] text-[11px] font-bold">{g.c}: {g.l}</div>
              <div className="text-white font-bold mt-1">{g.h} vs {g.a}</div>
            </div>
            <div className="text-[#00bfff] font-bold">0 - 0</div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-5" onClick={() => setOpen(null)}>
          <div className="bg-[#101c2e] border-2 border-[#00bfff] w-full rounded-2xl p-6">
            <div className="text-[#00bfff] text-xs">{open.c}: {open.l}</div>
            <div className="text-white text-xl font-black mt-2">{open.h} vs {open.a}</div>
            <div className="text-[#00bfff] text-4xl font-black my-5 text-center">0 - 0</div>
            <button onClick={() => setOpen(null)} className="w-full bg-[#00bfff] text-black font-black py-3 rounded-xl">CLOSE</button>
          </div>
        </div>
      )}
    </div>
  )
}
