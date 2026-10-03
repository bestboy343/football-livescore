"use client";
import { useState, useEffect } from 'react';
import { footballService, Match } from '@/services/apiService';

export function useTodayMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    footballService.getTodayMatches().then(setMatches).finally(() => setLoading(false));
  }, []);
  return { data: matches, matches, error: null, isLoading: loading, loading };
}

export function useLiveMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const load = () => footballService.getLiveMatches().then(setMatches).finally(() => setLoading(false));
    load();
    const i = setInterval(load, 30000);
    return () => clearInterval(i);
  }, []);
  return { data: matches, matches, error: null, isLoading: loading, loading };
}

export function useNewsList() { return { news: [], loading: false, data: [], isLoading: false }; }
export function useFeaturedNews() { return { news: [], loading: false, data: [], isLoading: false }; }
export function useHeadCarousel() { return { news: [], loading: false, data: [], isLoading: false }; }
export function useNewsDetail(id: any) { return { news: null, loading: false, data: null, isLoading: false }; }
export function usePlayers() { return { players: [], loading: false, data: [], isLoading: false }; }
export function usePlayerDetail(id: any) { return { player: null, loading: false, data: null, isLoading: false }; }
export function useTeams() { return { teams: [], loading: false, data: [], isLoading: false }; }
export function useTeamDetail(id: any) { return { team: null, loading: false, data: null, isLoading: false }; }
export function useLeaguesList() { return { leagues: [], loading: false, data: [], isLoading: false }; }
export function useLeagueDetail(id: any) { return { league: null, loading: false, data: null, isLoading: false }; }
export function useTournify() { return { data: null, loading: false, isLoading: false }; }
export function useMatchTrio() { return { data: null, loading: false, isLoading: false }; }
export function useNewsTrivory() { return { data: null, loading: false, isLoading: false }; }
export function useMatchDetail(id: any) { return { match: null, loading: false, data: null, isLoading: false }; }
export function getSinglePlayer() { return null; }
export function getSingleTeam() { return null; }
export function getSingleLeague() { return null; }
export function nextMatch() { return null; }
export function nextSingle() { return null; }

export { footballService } from '@/services/apiService';
export type { Match } from '@/services/apiService';
