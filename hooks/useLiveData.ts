"use client";
export function useLiveData(){return {data:[], matches:[], isLoading:false};}
export function useLiveMatches(){return {data:[], matches:[], isLoading:false};}
export function useTodayMatches(){return {data:[], matches:[], isLoading:false, loading:false};}
export function useNewsList(){return {data:[], news:[], isLoading:false};}
export function useSingleNews(){return {data:null, isLoading:false};}
export function useFeaturedNews(){return {data:[], news:[], isLoading:false};}
export function useNewsCategories(){return {data:[], categories:[], isLoading:false};}
export function useNews(){return {data:[], news:[], isLoading:false};}
export function useTeams(){return {data:[], teams:[], isLoading:false};}
export function useTeam(){return {data:null, team:null, isLoading:false};}
export function useSingleTeam(){return {data:null, team:null, isLoading:false};}
export function useTeamInfo(){return {data:null, team:null, isLoading:false};}
export function useSingleTeamMatches(){return {data:[], matches:[], isLoading:false};}
export function useTeamMatches(){return {data:[], matches:[], isLoading:false};}
export function usePlayers(){return {data:[], players:[], isLoading:false};}
export function usePlayer(){return {data:null, player:null, isLoading:false};}
export function useSinglePlayer(){return {data:null, player:null, isLoading:false};}
export function useLeagues(){return {data:[], leagues:[], isLoading:false};}
export function useLeague(){return {data:null, league:null, isLoading:false};}
export function useSingleLeague(){return {data:null, league:null, isLoading:false};}
export function useLeagueMatches(){return {data:[], matches:[], isLoading:false};}
export function useSingleLeagueMatches(){return {data:[], matches:[], isLoading:false};}
export function useLeagueStandings(){return {data:[], standings:[], table:[], isLoading:false};}
export function useLeagueTable(){return {data:[], standings:[], isLoading:false};}
export function useFootballService(){return {getMatches:()=>[]};}
export const footballService={getTodayMatches:async()=>[], getLiveMatches:async()=>[]};
export default useLiveData;
