// @ts-nocheck
"use client"
import { useState, useEffect } from 'react'
const e=()=>({data:null,matches:[],news:[],teams:[],players:[],leagues:[],loading:false,isLoading:false,error:null})
const d=()=>({data:null,news:null,team:null,player:null,match:null,league:null,matches:[],loading:false,isLoading:false})
export const footballService={getTodayMatches:async()=>{try{const r=await fetch('/api/matches');return await r.json()}catch{return[]}},getLiveMatches:async()=>{try{const r=await fetch('/api/matches');return await r.json()}catch{return[]}},getMatchById:async()=>null}
export function useTodayMatches(){const[m,s]=useState([]);const[l,sl]=useState(true);useEffect(()=>{fetch('/api/matches').then(r=>r.json()).then(v=>{s(v);sl(false)}).catch(()=>sl(false))},[]);return{data:m,matches:m,loading:l,isLoading:l}}
export const useLiveMatches=useTodayMatches
export const useLiveData=useTodayMatches
export const useNewsList=e
export const useNews=e
export const useFeaturedNews=e
export const useHeadCarousel=()=>({news:[],data:null,loading:false,isLoading:false})
export const useNewsDetails=d
export const useNewsDetail=d
export const useNewsBySlug=()=>({news:null,data:null,loading:false})
export const useNewsCategories=()=>({categories:[],data:[],loading:false})
export const usePlayers=e
export const usePlayerDetails=d
export const useSinglePlayer=()=>({player:null,data:null,loading:false})
export const usePlayerDetail=d
export const useTeams=e
export const useTeamDetails=d
export const useTeamInfo=()=>({team:null,data:null,loading:false})
export const useTeamDetail=d
export const useSingleTeamMatches=()=>({matches:[],data:[],loading:false})
export const useSingleLeagueTeamMatches=()=>({matches:[],data:[],loading:false})
export const useSingleLeagueForMatches=()=>({matches:[],data:[],loading:false})
export const useSingleLeagueMatches=()=>({matches:[],data:[],loading:false})
export const useSingleLeagueForTeams=()=>({teams:[],data:[],loading:false})
export const useLeaguesList=e
export const useLeaguesDetail=d
export const useLeagueDetail=d
export const useLeagueDetails=d
export const useSingleLeague=()=>({league:null,data:null,loading:false})
export const useTourify=e
export const useMatchTrio=e
export const useNewsTrivory=e
export const useMatches=useTodayMatches
export const useMatch=d
export const useMatchDetail=()=>({match:null,data:null,loading:false,isLoading:false})
export const useMatchDetails=()=>({match:null,data:null,loading:false,isLoading:false})
export const useSingleCompetitionScorers=()=>({scorers:[],data:[],loading:false})
export function getSingleLayer(){return null}
export function getSingleTeam(){return null}
export function getSingleLeague(){return null}
export function getSingleMatch(){return null}
export function getMatchDetail(){return null}
export function getMatchDetails(){return null}
export function nextMatch(){return null}
export function nextSingle(){return null}
export default useTodayMatches
