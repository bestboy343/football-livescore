"use client";
export function useLeagues(){return {data:[], leagues:[], isLoading:false};}
export function useLeague(){return {data:null, league:null, isLoading:false};}
export function useSingleLeague(){return {data:null, league:null, isLoading:false};}
export function useSingleLeagueMatches(){return {data:[], matches:[], isLoading:false};}
export function useLeagueMatches(){return {data:[], matches:[], isLoading:false};}
export function useLeagueStandings(){return {data:[], standings:[], table:[], isLoading:false};}
export function useLeagueTable(){return {data:[], standings:[], isLoading:false};}
export default useLeagues;
