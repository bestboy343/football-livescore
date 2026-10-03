"use client";
import Link from "next/link";
const TOP_LEAGUES = [
  { id: 39, name: "Premier League", country: "England", logo: "https://media.api-sports.io/football/leagues/39.png" },
  { id: 140, name: "La Liga", country: "Spain", logo: "https://media.api-sports.io/football/leagues/140.png" },
  { id: 78, name: "Bundesliga", country: "Germany", logo: "https://media.api-sports.io/football/leagues/78.png" },
  { id: 135, name: "Serie A", country: "Italy", logo: "https://media.api-sports.io/football/leagues/135.png" },
  { id: 61, name: "Ligue 1", country: "France", logo: "https://media.api-sports.io/football/leagues/61.png" },
  { id: 2, name: "Champions League", country: "World", logo: "https://media.api-sports.io/football/leagues/2.png" },
  { id: 3, name: "Europa League", country: "World", logo: "https://media.api-sports.io/football/leagues/3.png" },
  { id: 531, name: "NPFL", country: "Nigeria", logo: "https://media.api-sports.io/football/leagues/531.png" },
];
export default function LeaguesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Top Leagues</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOP_LEAGUES.map((league) => (
          <Link key={league.id} href={`/leagues/${league.id}`} className="border rounded-lg p-4 flex items-center gap-4 hover:bg-gray-800 transition">
            <img src={league.logo} alt={league.name} className="w-12 h-12 object-contain" />
            <div><h3 className="font-semibold">{league.name}</h3><p className="text-sm text-gray-400">{league.country}</p></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
              
            
