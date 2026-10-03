"use client";
import { useState } from "react";
import Link from "next/link";

const leagues = [
"Premier League - England", "La Liga - Spain", "Bundesliga - Germany", "Serie A - Italy", "Ligue 1 - France",
"NPFL - Nigeria", "Champions League - Europe", "Europa League - Europe", "Conference League - Europe", "Eredivisie - Netherlands",
"Primeira Liga - Portugal", "Belgian Pro League - Belgium", "Scottish Premiership - Scotland", "Super Lig - Turkey", "Premier League - Russia",
"Ukrainian Premier League - Ukraine", "Super League - Greece", "Austrian Bundesliga - Austria", "Swiss Super League - Switzerland", "Danish Superliga - Denmark",
"Eliteserien - Norway", "Allsvenskan - Sweden", "Veikkausliiga - Finland", "Ekstraklasa - Poland", "Czech First League - Czech Republic",
"MLS - USA", "Liga MX - Mexico", "Brasileirao - Brazil", "Primera Division - Argentina", "Primera Division - Chile",
"Liga Pro - Ecuador", "Primera Division - Uruguay", "Liga 1 - Peru", "Primera Division - Colombia", "Primera Division - Paraguay",
"Saudi Pro League - Saudi Arabia", "UAE Pro League - UAE", "Qatar Stars League - Qatar", "Persian Gulf Pro League - Iran", "Super League - India",
"J1 League - Japan", "K League 1 - South Korea", "A-League - Australia", "Chinese Super League - China", "Thai League 1 - Thailand",
"Egypt Premier League - Egypt", "Botola Pro - Morocco", "Ligue 1 - Algeria", "Tunisian Ligue 1 - Tunisia", "Premier League - South Africa",
"Premier League - Ghana", "Premier League - Kenya", "Premier League - Tanzania", "Super League - Zambia", "NPFL Women - Nigeria",
"Championship - England", "La Liga 2 - Spain", "2. Bundesliga - Germany", "Serie B - Italy", "Ligue 2 - France",
"Eerste Divisie - Netherlands", "Liga Portugal 2 - Portugal", "Challenger Pro League - Belgium", "Championship - Scotland", "1. Lig - Turkey",
"J2 League - Japan", "K League 2 - South Korea", "Serie B - Brazil", "Primera Nacional - Argentina", "MLS Next Pro - USA",
"Copa Libertadores - South America", "Copa Sudamericana - South America", "AFCON - Africa", "AFCON Qualifiers - Africa", "World Cup - World",
"World Cup Qualifiers - World", "Euro - Europe", "Euro Qualifiers - Europe", "Nations League - Europe", "Copa America - South America",
"FA Cup - England", "Copa del Rey - Spain", "DFB Pokal - Germany", "Coppa Italia - Italy", "Coupe de France - France",
"KNVB Cup - Netherlands", "Taca de Portugal - Portugal", "Belgian Cup - Belgium", "Scottish Cup - Scotland", "Turkish Cup - Turkey",
"US Open Cup - USA", "Copa MX - Mexico", "Copa do Brasil - Brazil", "Copa Argentina - Argentina", "Emperor's Cup - Japan",
"FA Cup - Egypt", "Throne Cup - Morocco", "FA Cup - Nigeria", "King's Cup - Saudi Arabia", "President's Cup - UAE",
"Premier League - Ireland", "Welsh Premier League - Wales", "NIFL Premiership - N. Ireland", "Super League - Albania", "First League - Armenia",
"Premier League - Azerbaijan", "Premier League - Belarus", "Premier League - Bosnia", "First League - Bulgaria", "First League - Croatia",
"First Division - Cyprus", "Super Liga - Slovakia", "Prva Liga - Slovenia", "Meistriliiga - Estonia", "Virsliga - Latvia",
"A Lyga - Lithuania", "Premier League - Malta", "First League - Moldova", "First League - Montenegro", "Super Liga - Serbia",
"Premier League - Israel", "Premier League - Georgia", "Premier League - Kazakhstan", "Super League - Uzbekistan", "Premier League - Iceland",
"Premier League - Luxembourg", "First League - North Macedonia", "Eliteserien Women - Norway", "Damallsvenskan - Sweden", "Frauen-Bundesliga - Germany",
"WSL - England", "Liga F - Spain", "Serie A Women - Italy", "Premiere Ligue - France", "NWSL - USA",
"Liga MX Femenil - Mexico", "Brasileirao Feminino - Brazil", "A-League Women - Australia", "WE League - Japan", "WK League - South Korea",
"Second Division - Egypt", "Botola 2 - Morocco", "Ligue 2 - Algeria", "National League - England", "Regionalliga - Germany",
"Primera RFEF - Spain", "Serie C - Italy", "Championnat National - France", "Tweede Divisie - Netherlands", "Liga 3 - Portugal",
"National League - Scotland", "2. Lig - Turkey", "USL Championship - USA", "Liga de Expansion - Mexico", "Serie C - Brazil",
"Primera B - Argentina", "J3 League - Japan", "K3 League - South Korea", "National Premier League - Australia", "China League One - China",
"Division 1 - Thai - Thailand", "I-League - India", "Persian Gulf Pro League 2 - Iran", "First Division - UAE", "First Division - Qatar",
"First Division - Saudi Arabia", "Kenyan Super League - Kenya", "Division One - Ghana", "Ligue 2 - South Africa", "Ligue 2 - Tanzania",
"National Division - Zambia", "NLO - Nigeria", "NNL - Nigeria", "CAF Champions League - Africa", "CAF Confederation Cup - Africa",
"Club World Cup - World", "Intercontinental Cup - World", "Olympics Men - World", "Olympics Women - World", "U20 World Cup - World",
"U17 World Cup - World", "Arab Cup - Arab", "Gulf Cup - Gulf", "COSAFA Cup - Africa", "CECAFA Cup - Africa",
"WAFU Cup - Africa", "CHAN - Africa", "African Nations League - Africa", "Asian Cup - Asia", "Asian Cup Qualifiers - Asia",
"Gold Cup - N. America", "Nations League - N. America", "AFC Champions League - Asia", "AFC Cup - Asia", "Europa Conference Qualifiers - Europe",
"Youth League - Europe", "Premier League U21 - England", "Bundesliga U19 - Germany", "La Liga U19 - Spain", "Primavera 1 - Italy",
"Reserve League - Russia", "Youth League - Brazil", "Next Gen Cup - India", "Viareggio Cup - Italy", "Toulon Tournament - France",
"Algarve Cup - Women", "SheBelieves Cup - Women", "Arnold Clark Cup - Women", "Pinatar Cup - Women", "Cyprus Cup - Women"
];

export default function Page(){
const [search,setSearch] = useState("");
const filtered = leagues.filter(l=>l.toLowerCase().includes(search.toLowerCase()));
return(
<div className="min-h-screen bg-[#0B0F19] text-white p-4">
<h1 className="text-2xl font-bold mb-4">200 Leagues</h1>
<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search leagues..." className="w-full p-3 rounded-lg bg-[#151A27] border border-gray-700 mb-4 text-white" />
<div className="grid gap-2">
{filtered.map((name,i)=><Link key={i} href={`/leagues/${i+1}`} className="border border-gray-700 bg-[#151A27] p-3 rounded-lg hover:bg-[#1E2535]">{name}</Link>)}
</div>
<p className="text-gray-400 text-sm mt-4 text-center">{filtered.length} leagues</p>
</div>
)
}
