const grouped = matches.reduce((a:any,m)=>{
 const key = `${m.country} - ${m.league}`;
 (a[key]=a[key]||[]).push(m);
 return a;
},{});
