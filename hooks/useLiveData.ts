const API_KEY = process.env.NEXT_PUBLIC_FOOTBALL_API_KEY;
const BASE_URL = "https://v3.football.api-sports.io";

const headers = {
  "x-apisports-key": API_KEY as string,
};

export const footballService = {
  todayMatches: async () => {
    const today = new Date().toISOString().split('T')[0];
    const res = await fetch(`${BASE_URL}/fixtures?date=${today}`, { headers });
    const json = await res.json();
    return json.response.map((f: any) => ({
      id: f.fixture.id,
      homeTeam: f.teams.home.name,
      awayTeam: f.teams.away.name,
      homeLogo: f.teams.home.logo,
      awayLogo: f.teams.away.logo,
      homeScore: f.goals.home,
      awayScore: f.goals.away,
      status: f.fixture.status.short,
      time: f.fixture.status.elapsed? `${f.fixture.status.elapsed}'` : f.fixture.status.short,
      league: f.league.name,
      isLive: ["1H","2H","HT","ET","P","LIVE"].includes(f.fixture.status.short)
    }));
  },

  liveMatches: async () => {
    const res = await fetch(`${BASE_URL}/fixtures?live=all`, { headers });
    const json = await res.json();
    return json.response;
  },

  // keep other methods so app doesn't break
  upcomingMatches: async () => [],
  leagues: async () => [],
  leagueStandings: async () => [],
  previousMatches: async () => [],
  getSingleLeague: async () => null,
  getSingleLeagueMatches: async () => [],
  getSingleLeaguePrevMatches: async () => [],
  getMatchDetails: async () => null,
  getSingleCompetitionScorers: async () => [],
  getSingleTeamMatches: async () => [],
  getTeamInfo: async () => null,
  getSinglePlayer: async () => null,
  newsList: async () => [],
  newsSingle: async () => null,
};

export default footballService;
