"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useNewsBySlug } from "@/hooks/useNews";
import NewsCard from "@/components/news/NewsCard";
import { FaArrowLeft, FaClock, FaEye, FaTag, FaFacebook, FaTwitter, FaLink, FaBolt } from "react-icons/fa";
import Link from "next/link";

const CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
  "Transfer Updates": { bg: "rgba(255,171,0,0.15)", color: "#ffab00" },
  "Match Reports": { bg: "rgba(0,230,118,0.12)", color: "#00e676" },
  "Player Interviews": { bg: "rgba(167,139,250,0.15)", color: "#a78bfa" },
  "League Updates": { bg: "rgba(41,121,255,0.15)", color: "#6ab0ff" },
  "International Football": { bg: "rgba(20,184,166,0.15)", color: "#2dd4bf" },
  "Club News": { bg: "rgba(251,146,60,0.15)", color: "#fb923c" },
  "Opinion & Analysis": { bg: "rgba(248,113,113,0.15)", color: "#f87171" },
  "Football News": { bg: "rgba(96,165,250,0.15)", color: "#60a5fa" },
};
const getCategoryStyle = (c: string) => CATEGORY_COLORS[c] || { bg: "rgba(255,255,255,0.08)", color: "var(--text-secondary)" };
const sanitizeSummary = (text?: string): string => {
  if (!text) return "";
  return text.replace(/<a\b[^>]*>.*?<\/a>/gi, "").replace(/<[^>]+>/g, " ").replace(/https?:\/\/\S+/gi, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
};
const fullDate = (d?: string | Date) => { if (!d) return "Recent"; return new Date(d).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }); };
const timeAgo = (d?: string | Date) => {
  if (!d) return "just now";
  const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return Math.floor(s / 60) + "m ago";
  if (s < 86400) return Math.floor(s / 3600) + "h ago";
  if (s < 604800) return Math.floor(s / 86400) + "d ago";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};
const Skeleton = () => (
  <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-5">
      <div className="skeleton h-4 w-20 rounded" />
      <div className="skeleton rounded-2xl" style={{ height: 400 }} />
      <div className="skeleton h-9 w-full rounded" />
    </div>
  </div>
);
export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params.id || params.slug) as string;
  const [copied, setCopied] = useState(false);
  const { data, isLoading, error } = useNewsBySlug(slug);
  const share = (platform?: "twitter" | "facebook") => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const title = data?.article?.title ?? "Football News";
    if (platform === "twitter") { window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(title) + "&url=" + encodeURIComponent(url), "_blank"); }
    else if (platform === "facebook") { window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url), "_blank"); }
    else if (navigator.share) { navigator.share({ title, url }).catch(() => {}); }
    else { navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); }
  };
  if (isLoading) return <Skeleton />;
  if (error || !data || !data.article) {
    return (
      <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }} className="flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <h1 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Article Not Found</h1>
          <button onClick={() => router.push("/news")} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold" style={{ background: "var(--accent-blue)", color: "#fff" }}><FaArrowLeft size={12} /> Back to News</button>
        </div>
      </div>
    );
  }
  const { article, related = [] } = data;
  const pubDate = article.publishedAt || article.createdAt;
  const cleanSummary = sanitizeSummary(article.summary);
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.push("/news")} className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-secondary)", border: "1px solid var(--border-subtle)" }}><FaArrowLeft size={10} /> Back to News</button>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={getCategoryStyle(article.category)}>{article.category}</span>
        </div>
        {article.imageUrl ? (<div className="relative rounded-2xl overflow-hidden mb-6" style={{ border: "1px solid var(--border-subtle)", maxHeight: "460px" }}><img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" style={{ maxHeight: "460px" }} /></div>) : null}
        <h1 className="font-black leading-tight mb-4" style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--text-primary)", fontSize: "clamp(1.75rem, 4vw, 2.6rem)" }}>{article.title}</h1>
        {cleanSummary && (<p className="mb-6 text-base leading-relaxed" style={{ color: "var(--text-secondary)", borderLeft: "4px solid var(--accent-blue)", paddingLeft: "16px", fontStyle: "italic", background: "rgba(41, 121, 255, 0.04)", paddingTop: "8px", paddingBottom: "8px", borderRadius: "0 8px 8px 0" }}>{cleanSummary}</p>)}
        <div className="flex flex-wrap items-center gap-4 text-xs mb-8 pb-6" style={{ borderBottom: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}>
          <span>{article.author || "Sports Desk"}</span><span className="flex items-center gap-1"><FaClock size={10} />{timeAgo(pubDate)}</span>
          <div className="flex items-center gap-2 ml-auto">
            <button onClick={() => share("twitter")} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(29,161,242,0.12)", color: "#1da1f2" }}><FaTwitter size={12} /></button>
            <button onClick={() => share("facebook")} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(24,119,242,0.12)", color: "#1877f2" }}><FaFacebook size={12} /></button>
            <button onClick={() => share()} className="px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: "rgba(255,255,255,0.06)", color: "var(--text-secondary)", border: "1px solid var(--border-subtle)" }}>{copied ? "Copied!" : "Copy link"}</button>
          </div>
        </div>
        <div className="article-body mb-10" dangerouslySetInnerHTML={{ __html: article.content }} />
        {related && related.length > 0 && (
          <section className="mt-12">
            <div className="flex items-center justify-between mb-4"><span className="section-label">Related Stories</span><Link href={"/news?category=" + encodeURIComponent(article.category)} className="text-xs font-medium" style={{ color: "var(--accent-blue)" }}>More in {article.category} -{">"}</Link></div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{related.map((rel: any) => (<NewsCard key={rel._id} article={rel} />))}</div>
          </section>
        )}
      </div>
    </div>
  );
}
