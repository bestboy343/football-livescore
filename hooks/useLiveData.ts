// @ts-nocheck
"use client";
import { useState, useEffect } from 'react';

function empty() {
  return { data: null, matches: [], news: [], teams: [], players: [], leagues: [], loading: false, isLoading: false, error: null };
}
function emptyDetail() {
  return { data: null, news: null, team: null, player: null, match: null, league: null, matches: [], loading: false, isLoading: false };
}

export const footballService = {
  getTodayMatches: async () => { try { const r = await fetch('/api/matches'); return await r.json(); } catch { return []; } },
  getLiveMatches: async () => { try { const r = await fetch('/api/matches'); return await r.json(); } catch { return []; } },
  getMatchById: async () => null,
};

export function useTodayMatches() { const [m, s] = useState<any[]>([]); const [l, sl] = useState(true); useEffect(()=>{ fetch('/api/matches').then(r=>r.json()).then(d=>{ s(d); sl(false); }).catch(()=>sl(false)); },[]); return { data: m, matches: m, loading: l, isLoading: l }; }
export function useLiveMatches() { return useTodayMatches(); }
export function useNewsList() { return empty(); }
export function useNews() { return empty(); }
export function useFeaturedNews() { return empty(); }
export function useHeadCarousel() { return { news: [], data: null, loading: false, isLoading: false }; }
export function useNewsDetails() { return { news: null, data: null, loading: false, isLoading: false }; }
export function useNewsDetail() { return useNewsDetails(); }
export function useNewsBySlug() { return { news: null, data: null, loading: false }; }
export function useNewsCategories() { return { categories: [], data: [], loading: false }; }
export function usePlayers() { return empty(); }
export function usePlayerDetails() { return { player: null, data: null, loading: false, isLoading: false }; }
export function use
