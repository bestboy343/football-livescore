"use client";
import { useState, useEffect } from 'react';

export const footballService = {
  getTodayMatches: async () => { try { const r = await fetch('/api/matches?type=today'); return r.ok ? await r.json() : []; } catch { return []; } },
  getLiveMatches: async () => { try { const r = await fetch('/api/matches?type=live'); return r.ok ? await r.json() : []; } catch { return []; } },
  getMatchById: async () => null,
  getLeagues: async () => [],
  getTeams: async () => [],
};

export type Match = { id: string; homeTeam: string; awayTeam: string; homeScore: number | null; awayScore: number | null; status: string; minute?: string; time: string; league: string; };

// Main hooks
export function useTodayMatches() {
  const [matches, setMatches] = useState<Match[]>([]); const [loading, setLoading] = useState(true);
  useEffect(() => { footballService.getTodayMatches().then(setMatches).finally(() => setLoading(false)); }, []);
  return { data: matches, matches, error: null, isLoading: loading, loading };
}
export function useLiveMatches() {
  const [matches, setMatches] = useState<Match[]>([]); const [loading, setLoading] = useState(true);
  useEffect(() => { const load = () => footballService.getLiveMatches().then(setMatches).finally(() => setLoading(false)); load(); const i = setInterval(load, 30000); return () => clearInterval(i); }, []);
  return { data: matches, matches, error: null, isLoading: loading, loading };
}

// Dummy hooks - return empty but with all properties
const emptyReturn = { data: [] as any, news: [] as any, matches: [] as any, teams: [] as any, players: [] as any, leagues: [] as any, team: null as any, player: null as any, league: null as any, match: null as any, loading: false, isLoading: false, error: null };

export function useNewsList() { return emptyReturn; }
export function useNews() { return emptyReturn; }
export function useFeaturedNews() { return emptyReturn; }
export function useHeadCarousel() { return emptyReturn; }
export function useNewsDetail(id?: any) { return { news: null, data: null, loading: false, isLoading: false, error: null }; }
export function useNewsDetails(id?: any) { return { news: null, data: null, loading: false, isLoading: false, error: null }; }
export function usePlayers() { return emptyReturn; }
export function usePlayerDetail(id?: any) { return { player: null, data: null, loading: false, isLoading: false, error: null }; }
export function usePlayerDetails(id?: any) { return { player: null, data: null, loading: false, isLoading: false, error: null }; }
export function useTeams() { return emptyReturn; }
export function useTeamDetail(id?: any) { return { team: null, data: null, loading: false, isLoading: false, error: null }; }
export function useTeamDetails(id?: any) { return { team: null, data: null, loading: false, isLoading: false, error: null }; }
export function useLeaguesList() { return emptyReturn; }
export function useLeagues() { return emptyReturn; }
export function useLeagueDetail(id?: any) { return { league: null, data: null, loading: false, isLoading: false, error: null }; }
export function useLeagueDetails(id?: any) { return { league: null, data: null, loading: false, isLoading: false, error: null }; }
export function useTournify() { return emptyReturn; }
export function useMatchTrio() { return emptyReturn; }
export function useNewsTrivory() { return emptyReturn; }
export function useMatches() { return emptyReturn; }
export function useMatch() { return emptyReturn; }
export function useMatchDetail(id?: any) { return { match: null, data: null, loading: false, isLoading: false, error: null }; }
export function useMatchDetails(id?: any) { return { match: null, data: null, loading: false, isLoading: false, error: null }; }

// Old functions
export function getSinglePlayer() { return null; }
export function getSingleTeam() { return null; }
export function getSingleLeague() { return null; }
export function getSingleMatch() { return null; }
export function getMatchDetail() { return null; }
export function getMatchDetails() { return null; }
export function nextMatch() { return null; }
export function nextSingle() { return null; }

// Aliases for safety
export const useTeam = useTeamDetail;
export const usePlayer = usePlayerDetail;
export const useLeague = useLeagueDetail;
export const useNewsItem = useNewsDetail;
