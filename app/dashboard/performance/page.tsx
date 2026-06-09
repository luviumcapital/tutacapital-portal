"use client";
import { useState } from "react";
import { LayoutDashboard, Users, CreditCard, ShieldAlert, FileText, Package, TrendingUp, Newspaper, FolderOpen, Menu, X, LogOut, Bell, ExternalLink, Download, ArrowUp, ArrowDown } from "lucide-react";

const NAV = [
  { label:"Dashboard", icon:LayoutDashboard, href:"/dashboard" },
  { label:"Dealer Pods", icon:Users, href:"/dashboard/pods" },
  { section:"FINANCE" },
  { label:"Floor Plans", icon:CreditCard, href:"/dashboard/floor-plans" },
  { label:"Surety Pool", icon:ShieldAlert, href:"/dashboard/surety" },
  { label:"Collections", icon:FileText, href:"/dashboard/collections" },
  { section:"STOCK" },
  { label:"Inventory", icon:Package, href:"/dashboard/inventory" },
  { label:"Performance", icon:TrendingUp, href:"/dashboard/performance" },
  { section:"NETWORK" },
  { label:"Newsletters", icon:Newspaper, href:"/dashboard/newsletters" },
  { label:"Documents", icon:FolderOpen, href:"/dashboard/documents" },
];

const MONTHLY = [
  { month:"Jan 2025", revenue:2180000, units:18, newPods:2, avgDays:24 },
  { month:"Feb 2025", revenue:3420000, units:29, newPods:3, avgDays:21 },
  { month:"Mar 2025", revenue:4150000, units:35, newPods:1, avgDays:19 },
  { month:"Apr 2025", revenue:5280000, units:44, newPods:2, avgDays:18 },
  { month:"May 2025", revenue:6340000, units:54, newPods:2, avgDays:17 },
  { month:"Jun 2025", revenue:4820000, units:38, newPods:2, avgDays:16 },
];

const POD_RANK = [
  { pod:"TC-DBN-001", name:"Tuta Cars Umhlanga", salesMTD:6, revenue:"R3.10M", avgDays:14, score:94, trend:"up" },
  { pod:"TC-CPT-003", name:"Tuta Cars Sea Point", salesMTD:4, revenue:"R2.38M", avgDays:17, score:91, trend:"up" },
  { pod:"TC-CPT-007", name:"Tuta Cars Bellville", salesMTD:4, revenue:"R2.20M", avgDays:18, score:88, trend:"stable" },
  { pod:"TC-JHB-001", name:"Tuta Cars Sandton", salesMTD:4, revenue:"R2.38M", avgDays:19, score:88, trend:"stable" },
  { pod:"TC-DBN-002", name:"Tuta Cars Pinetown", salesMTD:5, revenue:"R2.60M", avgDays:14, score:86, trend:"up" },
  { pod:"TC-JHB-003", name:"Tuta Cars Randburg", salesMTD:3, revenue:"R1.75M", avgDays:22, score:82, trend:"stable" },
  { pod:"TC-JHB-009", name:"Tuta Cars Roodepoort", salesMTD:3, revenue:"R1.95M", avgDays:22, score:79, trend:"down" },
  { pod:"TC-MPM-001", name:"Tuta Cars Nelspruit", salesMTD:2, revenue:"R1.30M", avgDays:25, score:77, trend:"up" },
];

function fmt(n:number){return "R "+n.toLocaleString("en-ZA");}
const maxRev=Math.max(...MONTHLY.map(m=>m.revenue));

function Sidebar({open,onClose}:{open:boolean;onClose:()=>void}){return(<><{open&&<div className="fixed inset-0 z-20 bg-black/60 md:hidden" onClick={onClose}/>}<aside className={`fixed md:sticky top-0 left-0 h-screen z-30 w-56 bg-[#0D0D0D] border-r border-[#2A2A2A] flex flex-col transition-transform duration-200 ${open?"translate-x-0":"-translate-x-full md:translate-x-0"}`}><div className="flex items-center justify-between px-4 py-4 border-b border-[#2A2A2A]"><div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-[#8B0000] rounded-sm"/><span className="font-serif font-bold text-white text-sm">TUTA CAPITAL</span></div><button className="md:hidden" onClick={onClose}><X size={16}/></button></div><nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">{NAV.map((item,i)=>{if('section' in item) return <p key={i} className="px-3 pt-4 pb-1 text-[10px] uppercase tracking-widest text-gray-600">{item.section}</p>;const Icon=item.icon!;const active=item.label==="Performance";return <a key={item.label} href={item.href} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${active?"bg-[#8B0000]/20 text-white border border-[#8B0000]/30":"text-gray-400 hover:text-white hover:bg-[#1A1A1A]"}`}><Icon size={15}/>{item.label}</a>;})}</nav><div className="border-t border-[#2A2A2A] p-4"><div className="flex items-center gap-2 mb-3"><div className="w-7 h-7 rounded-full bg-[#8B0000] flex items-center justify-center text-xs font-bold text-white">AT</div><div><p className="text-xs text-white font-medium">Anthony Tshali</p><p className="text-[10px] text-gray-500">Admin</p></div></div><button className="flex items-center gap-2 text-gray-500 hover:text-white text-xs"><LogOut size={13}/>Sign out</button></div></aside></>
  );}

export default function PerformancePage(){
  const [open,setOpen]=useState(false);
  const totalUnits=MONTHLY.reduce((a,m)=>a+m.units,0);
  return(
    <div className="flex h-screen bg-[#0A0A0A] overflow-hidden">
      <Sidebar open={open} onClose={()=>setOpen(false)}/>
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="sticky top-0 z-10 bg-[#0A0A0A] border-b border-[#2A2A2A] px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4"><button className="md:hidden text-gray-400 hover:text-white" onClick={()=>setOpen(true)}><Menu size={20}/></button><div><p className="text-xs text-gray-500">Analytics · Jan–Jun 2025</p><h1 className="font-serif text-lg font-bold text-white">Performance</h1></div></div>
          <div className="flex items-center gap-3"><button className="flex items-center gap-1.5 border border-[#2A2A2A] hover:border-white text-gray-400 hover:text-white text-xs px-3 py-1.5 rounded-lg transition-colors"><Download size={13}/>Export Report</button><button className="relative text-gray-400 hover:text-white"><Bell size={18}/><span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#C41E3A] rounded-full text-[8px] flex items-center justify-center font-bold text-white">2</span></button><a href="https://tutacars.co.za" target="_blank" rel="noopener" className="text-gray-500 hover:text-white"><ExternalLink size={16}/></a></div>
        </header>
        <main className="flex-1 px-4 sm:px-6 py-6 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[{label:"Revenue YTD",value:"R26.2M",sub:"+18% vs target",icon:TrendingUp,color:"text-[#C41E3A]"},{label:"Units Sold YTD",value:String(totalUnits),sub:"Jan–Jun 2025",icon:Package,color:"text-emerald-400"},{label:"Active Pods",value:"10",sub:"2 in onboarding",icon:Users,color:"text-amber-400"},{label:"Avg Days to Sell",value:"18",sub:"Network average",icon:LayoutDashboard,color:"text-blue-400"}].map(k=>(
              <div key={k.label} className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-4"><div className="flex items-center justify-between mb-2"><p className="text-xs text-gray-500">{k.label}</p><k.icon size={15} className={k.color}/></div><p className={`font-serif text-2xl font-bold ${k.color} mb-0.5`}>{k.value}</p><p className="text-[11px] text-gray-500">{k.sub}</p></div>
            ))}
          </div>
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
            <div className="flex items-center justify-between mb-5"><h2 className="font-serif text-sm font-bold text-white">Monthly Revenue — Jan to Jun 2025</h2><span className="text-xs text-emerald-400">+{Math.round((MONTHLY[4].revenue/MONTHLY[0].revenue-1)*100)}% growth</span></div>
            <div className="flex items-end gap-3 h-40">{MONTHLY.map(m=>{const pct=Math.round((m.revenue/maxRev)*100);const isCurrent=m.month.startsWith("Jun");return(<div key={m.month} className="flex-1 flex flex-col items-center gap-2"><span className="text-[9px] text-gray-500">{"R"+Math.round(m.revenue/1000000*10)/10+"M"}</span><div className="w-full rounded-t-md" style={{height:`${pct}%`,background:isCurrent?"#C41E3A":"#2A2A2A"}}/><span className="text-[9px] text-gray-500 text-center leading-tight">{m.month.replace(" 2025","")}</span></div>);})}</div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-[#2A2A2A]"><h2 className="font-serif text-sm font-bold text-white">Monthly Breakdown</h2></div>
              <div className="overflow-x-auto"><table className="w-full text-xs"><thead><tr className="border-b border-[#2A2A2A]">{["Month","Revenue","Units","New Pods","Avg Days"].map(h=><th key={h} className="px-4 py-2.5 text-left text-gray-500 font-medium uppercase tracking-wider text-[10px]">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-[#1E1E1E]">{MONTHLY.map(m=>(<tr key={m.month} className="hover:bg-[#1A1A1A]"><td className="px-4 py-3 text-white">{m.month}</td><td className="px-4 py-3 text-[#C41E3A] font-bold">{fmt(m.revenue)}</td><td className="px-4 py-3 text-gray-300">{m.units}</td><td className="px-4 py-3 text-blue-400">+{m.newPods}</td><td className="px-4 py-3 text-gray-400">{m.avgDays}d</td></tr>))}</tbody></table></div>
            </div>
            <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-[#2A2A2A]"><h2 className="font-serif text-sm font-bold text-white">Pod Leaderboard — June 2025</h2></div>
              <div className="divide-y divide-[#1E1E1E]">{POD_RANK.map((p,i)=>(
                <div key={p.pod} className="flex items-center gap-3 px-4 py-3 hover:bg-[#1A1A1A]"><span className={`font-serif font-bold text-base w-5 text-center ${i===0?"text-amber-400":i===1?"text-gray-400":i===2?"text-orange-700":"text-gray-600"}`}>{i+1}</span><div className="flex-1 min-w-0"><p className="text-white text-xs font-medium truncate">{p.name}</p><p className="text-gray-500 text-[10px]">{p.salesMTD} sales · {p.avgDays}d avg</p></div><div className="text-right flex-shrink-0"><p className="text-[#C41E3A] font-bold text-xs">{p.revenue}</p><div className="flex items-center justify-end gap-1"><span className={`font-serif font-bold text-sm ${p.score>=85?"text-emerald-400":p.score>=75?"text-amber-400":"text-red-400"}`}>{p.score}</span>{p.trend==="up"?<ArrowUp size={10} className="text-emerald-400"/>:p.trend==="down"?<ArrowDown size={10} className="text-red-400"/>:<span className="text-gray-600 text-[10px]">—</span>}</div></div></div>
              ))}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
