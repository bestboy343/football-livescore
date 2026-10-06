import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET() {
  const key = process.env.HIGHLIGHTLY_KEY || "";
  const today = new Date().toISOString().split("T")[0];
  const yyyymmdd = today.replace(/-/g, "");

  // Try Highlightly first if you have live key
  if (key && key.startsWith("sk_live_")) {
    try {
      const r = await fetch(`https://soccer.highlightly.net/matches?date=${today}&limit=100`, {
        headers: { "x-rapidapi-key": key, "x-rapidapi-host": "soccer.highlightly.net" },
        cache: "no-store"
      });
      const j = await r.json();
      if (j.data && j.data.length > 0) {
        const response = j.data.map((m: any) => {
          const [h, a] = (m.state?.score?.current || "0 - 0").split("-").map((s: string) => parseInt(s.trim()) || 0);
          let short = "NS";
          if (m.state?.description === "Finished") short = "FT";
          else if ((m.state?.description || "").includes("Progress")) short = "LIVE";
          return {
            fixture: { id: m.id, date: m.date, status: { short } },
            league: { country: m.country?.name || "World", name: m.league?.name || "Football" },
            teams: { home: { name: m.homeTeam?.name }, away: { name: m.awayTeam?.name } },
            goals: { home: h, away: a }
          };
        });
        return NextResponse.json({ response });
      }
    } catch {}
  }

  // FREE fallback - ESPN API (no key needed, always works) with country + time
  try {
    const res = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/misc/events?dates=${yyyymmdd}`, { cache: "no-store" });
    const json = await res.json();
    const events = json.events || [];
    const response = events.map((e: any) => {
      const comp = e.competitions?.[0];
      const home = comp?.competitors?.find((c: any) => c.homeAway === "home");
      const away = comp?.competitors?.find((c: any) => c.homeAway === "away");
      return {
        fixture: { id: e.id, date: e.date, status: { short: comp?.status?.type?.shortDetail?.includes("FT")? "FT" : comp?.status?.type?.shortDetail || "NS" } },
        league: { country: e.league?.name?.split(" ")[0] || "World", name: e.league?.name || comp?.notes?.[0]?.headline || "Football" },
        teams: { home: { name: home?.team?.displayName || "Home" }, away: { name: away?.team?.displayName || "Away" } },
        goals: { home: parseInt(home?.score || "0"), away: parseInt(away?.score || "0") }
      };
    });
    return NextResponse.json({ response });
  } catch (err) {
    return NextResponse.json({ response: [] });
  }
}
