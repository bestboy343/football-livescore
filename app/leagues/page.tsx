"use client";
import Link from "next/link";
export default function Page(){
return(<div className="p-4"><h1 className="text-xl font-bold">200 Leagues</h1><div className="grid gap-2 mt-4">{Array.from({length:200}).map((_,i)=><Link key={i} href={`/leagues/${i+1}`} className="border p-3 rounded">League {i+1}</Link>)}</div></div>)
}
