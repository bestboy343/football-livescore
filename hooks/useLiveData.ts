"use client";
import { useState, useEffect } from 'react';

export const footballService = {
  getTodayMatches: async () => { try { const r = await fetch('/api/matches?type=today'); return r.ok? await r.json() : []; } catch { return []; } },
  getLiveMatches: async () => { try { const r = await fetch('/api/matches?type=live'); return r.ok? await r.json() : []; } catch { return []; } },
  getMatchById: async () => null,
};

function empty() {
  const [a] = useState([]);
  return { data: a, matches: a, news: [], teams: [], players: [], leagues: [], team: null, player: null, league: null, match: null, loading: false, isLoading: false, error: null };
}

export function useTodayMatches(){ const [m,s]=useState<any[]>([]); const [l,sl]=useState(true); useEffect(()=>{footballService.getTodayMatches().then(s).finally(()=>sl(false));},[]); return { data:m, matches:m, error:null, isLoading:l, loading:l }; }
export function useLiveMatches(){ const [m,s]=useState<any[]>([]); const [l,sl]=useState(true); useEffect(()=>{ const f=()=>footballService.getLiveMatches().then(s).finally(()=>sl(false)); f(); const i=setInterval(f,30000); return()=>clearInterval(i); },[]); return { data:m, matches:m, error:null, isLoading:l, loading:l }; }
export function useNewsList(){return empty();}
export function useNews(){return empty();}
export function useFeaturedNews(){return empty();}
export function useHeadCarousel(){return empty();}
export function useNewsDetail(){return {news:null,data:null,loading:false,isLoading:false,error:null} as any;}
export function useNewsDetails(){return {news:null,data:null,loading:false,isLoading:false,error:null} as any;}
export function usePlayers(){return empty();}
export function usePlayerDetail(){return {player:null,data:null,loading:false,isLoading:false,error:null} as any;}
export function usePlayerDetails(){return {player:null,data:null,loading:false,isLoading:false,error:null} as any;}
export function useTeams(){return empty();}
export function useTeamDetail(){return {team:null,data:null,loading:false,isLoading:false,error:null} as any;}
export function useTeamDetails(){return {team:null,data:null,loading:false,isLoading:false,error:null} as any;}
export function useLeaguesList(){return empty();}
export function useLeagues(){return empty();}
export function useLeagueDetail(){return {league:null,data:null,loading:false,isLoading:false,error:null} as any;}
export function useLeagueDetails(){return {league:null,data:null,loading:false,isLoading:false,error:null} as any;}
export function useTournify(){return empty();}
export function useMatchTrio(){return empty();}
export function useNewsTrivory(){return empty();}
export function useMatches(){return empty();}
export function useMatch(){return empty();}
export function useMatchDetail(){return {match:null,data:null,loading:false,isLoading:false,error:null} as any;}
export function useMatchDetails(){return {match:null,data:null,loading:false,isLoading:false,error:null} as any;}
export function getSinglePlayer(){return null;}
export function getSingleTeam(){return null;}
export function getSingleLeague(){return null;}
export function getSingleMatch(){return null;}
export function getMatchDetail(){return null;}
export function getMatchDetails(){return null;}
export function nextMatch(){return null;}
export function nextSingle(){return null;}
export const useTeam=useTeamDetail;
export const usePlayer=usePlayerDetail;
export const useLeague=useLeagueDetail;
export const useNewsItem=useNewsDetail;
export const useSingleLeagueMatches=useMatches;
export const useSingleLeague=useLeagueDetail;
export const useLeagueStandings=useLeagues;
export const useSingleLeagueMatch=useMatches;
