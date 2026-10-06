// Group by country + league like Flashscore
const country = fixture.league.country // "England"
const leagueName = fixture.league.name // "EFL Trophy"

// Format time like Flashscore - 20:00
const time = new Date(fixture.fixture.date).toLocaleTimeString('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
})

// In your JSX:
<div className="flex bg-black text-white px-2 py-1 font-bold text-sm">
  <span>{country.toUpperCase()}: {leagueName}</span>
  <span className="ml-auto underline">Standings</span>
</div>

<div className="flex py-1 px-2 border-b text-sm">
  <span className="w-[50px]">{fixture.fixture.status.short === "NS"? time : fixture.fixture.status.short}</span>
  <span className="flex-1 truncate">{fixture.teams.home.name} - {fixture.teams.away.name}</span>
  <span className="font-bold">{fixture.goals.home?? '-'} - {fixture.goals.away?? '-'}</span>
</div>
