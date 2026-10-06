"use client"
import { useState } from "react"
export default function Page(){
const [d,setD]=useState("Today")
const [f,setF]=useState("All")
const [s,setS]=useState<any>(null)
const g=[
{c:"WORLD",l:"Friendly",h:"Colombia",a:"Peru",hs:0,as:0,t:"FT"},
{c:"WORLD",l:"Friendly",h:"Argentina",a:"Benin",hs:0,as:0,t:"FT"},
{c:"BRAZIL",l:"Serie B",h:"Goias",a:"Athletic",hs:1,as:0,t:"LIVE"},
{c:"ALGERIA",l:"Ligue 1",h:"Saoura",a:"Khenchela",hs:0,as:0,t:"FT"},
]
const list=g.filter(x=>f==="All"?1:f==="LIVE"?x.t==="LIVE":x.t==="FT")
const B=(on:boolean,red:boolean)=>({background:on?"#00bfff":red?"#2a0f15":"#132f45",color:on?"#000":red?"#ff3b3b":"#8aa8bd",padding:"5px 10px",borderRadius:"7px",fontSize:"11px",fontWeight:800}as any)
return(<div style={{minHeight:"100vh
