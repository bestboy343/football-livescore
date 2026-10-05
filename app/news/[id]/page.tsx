"use client";
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useNewsBySlug } from '@/hooks/useNews';
import NewsCard from '@/components/news/NewsCard';
import {
  FaArrowLeft, FaClock, FaEye, FaTag,
  FaFacebook, FaTwitter, FaLink, FaBolt
} from 'react-icons/fa';
import Link from 'next/link';

const CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
  'Transfer Updates': { bg: 'rgba(255,171,0,0.15)', color: '#ffab00' },
  'Match Reports': { bg: 'rgba(0,230,118,0.12)', color: '#00e676' },
  'Player Interviews': { bg: 'rgba(167,139,250,0.15)', color: '#a78bfa' },
  'League Updates': { bg: 'rgba(41,121,255,0.15)', color: '#6ab0ff' },
  'International Football': { bg: 'rgba(20,184,166,0.15)', color: '#2dd4bf' },
  'Club News': { bg: 'rgba(251,146,60,0.15)', color: '#fb923c' },
  'Opinion & Analysis': { bg: 'rgba(248,113,113,0.15)', color: '#f87171' },
  'Football News': { bg: 'rgba(96,165,250,0.15)', color: '#60a5fa' },
};

const getCategoryStyle = (c: string) =>
  CATEGORY_COLORS[c] || { bg: 'rgba(255,255,255,0.08)', color: 'var(--text-secondary)' };

const sanitizeSummary = (text?: string): string => {
  if (!text) return '';
  return text
   .replace(/<a\b[^>]*>.*?<\/a>/gi, '')
   .replace(/<[^>]+>/g, ' ')
   .replace(/https?:\/\/\S+/gi, '')
   .replace(/&amp;/g, '&')
   .replace(/&lt;/g, '<')
   .replace(/&gt;/g, '>')
   .replace(/&quot;/g, '"')
   .replace(/&#39;/g, "'")
   .replace(/&apos;/g, "'")
   .replace(/&nbsp;/g, ' ')
   .replace(/\s+/g, ' ')
   .trim();
};

const fullDate = (d?: string | Date) => {
  if (!d) return 'Recent';
  return new Date(d).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
};

const timeAgo = (d?: string | Date) => {
  if (!d) return 'just now';
  const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  if (s < 604800) return `${Math.floor(s / 86400)}
