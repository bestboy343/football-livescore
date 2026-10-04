"use client";
export function useLiveData(){return {data:[], matches:[], isLoading:false};}
export function useLiveMatches(){return {data:[], matches:[], isLoading:false};}
export function useTodayMatches(){return {data:[], matches:[], isLoading:false, loading:false};}
export function useFootballService(){return {getMatches:()=>[], getTodayMatches:async()=>[], getLiveMatches:async()=>[]};}
export const footballService={getTodayMatches:async()=>[], getLiveMatches:async()=>[]};
export default useLiveData;
