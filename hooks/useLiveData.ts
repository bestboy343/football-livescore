"use client";
import { useState, useEffect } from 'react';
export const footballService = {
  getTodayMatches: async () => { try { const r = await fetch('/api/matches?type=today'); return r.ok? await r.json() : []; } catch { return []; } },
  getLiveMatches: async () => { try { const r = await fetch('/api/matches?type=live'); return r.ok? await r.json() : []; } catch { return []; } },
  getMatchById: async () => null,
};
export type Match = { id: string; homeTeam: string; awayTeam: string; homeScore: number | null; awayScore: number | null; status: string; minute?: string; time: string; league: string; };
function empty() { const [matches] = useState([]); return { data: matches, matches, news: [], teams: [], players: [], leagues: [], team: null, player: null, league: null, match: null, loading: false, isLoading: false, error: null }; }
export function useTodayMatches() { const [m,s]=useState<any[]>([]); const [l,sl]=useState(true); useEffect(()=>{footballService.getTodayMatches().then(s).finally(()=>sl(false));},[]); return { data:m, matches:m, error:null, isLoading:l, loading:l }; }
export function useLiveMatches() { const [m,s]=useState<any[]>([]); const [l,sl]=useState(true); useEffect(()=>{const ld=()=>footballService.getLiveMatches().then(s).finally(()=>sl(false)); ld(); const i=setInterval(ld,30000); return()=>clearInterval(i);},[]); return { data:m, matches:m, error:null, isLoading:l, loading:l }; }
export function useNewsList(){return empty();} export function useNews(){return empty();} export function useFeaturedNews(){return empty();} export function useHeadCarousel(){return empty();}
export function useNewsDetail(a?:any){return {news:null,data:null,loading:false,isLoading:false,error:null};} export function useNewsDetails(a?:any){return {news:null,data:null,loading:false,isLoading:false,error:null};}
export function usePlayers(){return empty();} export function usePlayerDetail(a?:any){return {player:null,data:null,loading:false,isLoading:false,error:null};} export function usePlayerDetails(a?:any){return {player:null,data:null,loading:false,isLoading:false,error:null};}
export function useTeams(){return empty();} export function useTeamDetail(a?:any){return {team:null,data:null,loading:false,isLoading:false,error:null};} export function useTeamDetails(a?:any){return {team:null,data:null,loading:false,isLoading:false,error:null};}
export function useLeaguesList(){return empty();} export function useLeagues(){return empty();} export function useLeagueDetail(a?:any){return {league:null,data:null,loading:false,isLoading:false,error:null};} export function useLeagueDetails(a?:any){return {league:null,data:null,loading:false,isLoading:false,error:null};}
export function useTournify(){return empty();} export function useMatchTrio(){return empty();} export function useNewsTrivory(){return empty();} export function useMatches(){return empty();} export function useMatch(){return empty();}
export function useMatchDetail(a?:any){return {match:null,data:null,loading:false,isLoading:false,error:null};} export function useMatchDetails(a?:any){return {match:null,data:null,loading:false,isLoading:false,error:null};}
export function getSinglePlayer(){return null;} export function getSingleTeam(){return null;} export function getSingleLeague(){return null;} export function getSingleMatch(){return null;} export function getMatchDetail(){return null;} export function getMatchDetails(){return null;} export function nextMatch(){return null;} export function nextSingle(){return null;}
export const useTeam=useTeamDetail; export const usePlayer=usePlayerDetail; export const useLeague=useLeagueDetail; export const useNewsItem=useNewsDetail;
