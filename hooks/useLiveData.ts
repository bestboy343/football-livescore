"use client"
import { useState, useEffect } from "react"
export const footballService={
getTodayMatches: async()=>{
const r=await fetch("/api/matches")
return r.json()
},
getLiveMatches: async()=>{
const r=await fetch("/api/matches")
return r.json()
}
}
export function useTodayMatches(){
const [data,setData]=useState([])
const [loading,setLoading]=useState(true)
useEffect(()=>{
fetch("/api/matches").then(r=>r.json()).then(d=>{setData(d);setLoading(false)})
},[])
return {data,loading,error:null}
}
export const useLiveMatches=useTodayMatches
export const useLiveData=useTodayMatches
export default useTodayMatches
