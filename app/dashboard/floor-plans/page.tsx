"use client";
import { useState } from "react";
import { LayoutDashboard, Users, CreditCard, ShieldAlert, FileText, Package, TrendingUp, Newspaper, FolderOpen, Menu, X, LogOut, Bell, ExternalLink, MapPin, Download, AlertTriangle, CheckCircle, Clock } from "lucide-react";

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

const FLOOR_PLANS = [
  { pod:"TC-JHB-001", name:"Tuta Cars Sandton", amount:185000, drawn:"15 Apr 2025", settles:"18 Jun 2025", daysLeft:3, vehicles:3, rate:"Prime+2%", security:"Surety + Stock", status:"URGENT" },
  { pod:"TC-CPT-007", name:"Tuta Cars Bellville", amount:220000, drawn:"01 May 2025", settles:"23 Jun 2025", daysLeft:8, vehicles:4, rate:"Prime+2%", security:"Surety + Stock", status:"DUE SOON" },
  { pod:"TC-DBN-002", name:"Tuta Cars Pinetown", amount:148000, drawn:"22 Apr 2025", settles:"27 Jun 2025", daysLeft:12, vehicles:3, rate:"Prime+2%", security:"Surety + Stock", status:"DUE SOON" },
  { pod:"TC-JHB-009", name:"Tuta Cars Roodepoort", amount:310000, drawn:"10 May 2025", settles:"04 Jul 2025", daysLeft:19, vehicles:5, rate:"Prime+2%", security:"Surety + Stock", status:"ON TRACK" },
  { pod:"TC-PTA-002", name:"Tuta Cars Centurion", amount:95000, drawn:"15 May 2025", settles:"06 Jul 2025", daysLeft:21, vehicles:2, rate:"Prime+1.5%", security:"Surety + Stock", status:"ON TRACK" },
  { pod:"TC-DBN-001", name:"Tuta Cars Umhlanga", amount:198000, drawn:"18 May 2025", settles:"10 Jul 2025", daysLeft:25, vehicles:3, rate:"Prime+2%", security:"Surety + Stock", status:"ON TRACK" },
  { pod:"TC-CPT-003", name:"Tuta Cars Sea Point", amount:175000, drawn:"20 May 2025", settles:"12 Jul 2025", daysLeft:27, vehicles:3, rate:"Prime+2%", security:"Surety + Stock", status:"ON TRACK" },
  { pod:"TC-JHB-003", name:"Tuta Cars Randburg", amount:162000, drawn:"22 May 2025", settles:"14 Jul 2025", daysLeft:29, vehicles:3, rate:"Prime+2%", security:"Surety + Stock", status:"ON TRACK" },
  { pod:"TC-MPM-001", name:"Tuta Cars Nelspruit", amount:120000, drawn:"25 May 2025", settles:"17 Jul 2025", daysLeft:32, vehicles:2, rate:"Prime+2%", security:"Surety + Stock", status:"ON TRACK" },
  { pod:"TC-ECP-001", name:"Tuta Cars Gqeberha", amount:88000, drawn:"28 May 2025", settles:"20 Jul 2025", daysLeft:35, vehicles:2, rate:"Prime+1.5%", security:"Surety + Stock", status:"ON TRACK" },
];

const HISTORY = [
  { pod:"TC-JHB-001", amount:"R165,000", settledOn:"12 Mar 2025", method:"EFT", status:"SETTLED" },
  { pod:"TC-DBN-001", amount:"R140,000", settledOn:"28 Feb 2025", method:"EFT", status:"SETTLED" },
  { pod:"TC-CPT-003", amount:"R155,000", settledOn:"15 Feb 2025", method:"EFT", status:"SETTLED" },
  { pod:"TC-JHB-009", amount:"R280,000", settledOn:"05 Mar 2025", method:"EFT", status:"SETTLED" },
  { pod:"TC-DBN-002", amount:"R125,000", settledOn:"18 Mar 2025", method:"EFT", status:"SETTLED" },
];

function fmt(n:number){return "R "+n.toLocaleString("en-ZA");}
function badge(s:string){
  const m:Record<string,string>={URGENT:"bg-red-900/40 text-red-400 border-red-800","DUE SOON":"bg-amber-900/40 text-amber-400 border-amber-800","ON TRACK":"bg-emerald-900/40 text-emerald-400 border-emerald-800",SETTLED:"bg-blue-900/40 text-blue-400 border-blue-800"};
  return <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${m[s]||"bg-gray-800 text-gray-400 border-gray-700"}`}>{s}</span>;
}

function Sidebar({open,onClose}:{open:boolean;onClose:()=>void}){
  return (
    <>
      {open&&<div className="fixed inset-0 z-20 bg-black/60 md:hidden" onClick={onClose}/>}
      <aside className={`fixed md:sticky top-0 left-0 h-screen z-30 w-56 bg-[#0D0D0D] border-r border-[#2A2A2A] flex flex-col transition-transform duration-200 ${open?"translate-x-0":"-translate-x-full md:translate-x-0"}`}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#2A2A2A]">
          <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-[#8B0000] rounded-sm"/><span className="font-serif font-bold text-white text-sm">TUTA CAPITAL</span></div>
          <button className="md:hidden text-gray-500 hover:text-white" onClick={onClose}><X size={16}/></button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
          {NAV.map((item,i)=>{
            if('section' in item) return <p key={i} className="px-3 pt-4 pb-1 text-[10px] uppercase tracking-widest text-gray-600">{item.section}</p>;
            const Icon=item.icon!; const active=item.label==="Floor Plans";
            return <a key={item.label} href={item.href} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${active?"bg-[#8B0000]/20 text-white border border-[#8B0000]/30":"text-gray-400 hover:text-white hover:bg-[#1A1A1A]"}`}><Icon size={15}/>{item.label}</a>;
          })}
        </nav>
        <div className="border-t border-[#2A2A2A] p-4">
          <div className="flex items-center gap-2 mb-3"><div className="w-7 h-7 rounded-full bg-[#8B0000] flex items-center justify-center text-xs font-bold text-white">AT</div><div><p className="text-xs text-white font-medium">Anthony Tshali</p><p className="text-[10px] text-gray-500">Admin</p></div></div>
          <button className="flex items-center gap-2 text-gray-500 hover:text-white text-xs transition-colors"><LogOut size={13}/>Sign out</button>
        </div>
      </aside>
    </>
  );
}

export default function FloorPlansPage(){
  const [open,setOpen]=useState(false);
  const total=FLOOR_PLANS.reduce((a,f)=>a+f.amount,0);
  const urgent=FLOOR_PLANS.filter(f=>f.status==="URGENT").length;
  const dueSoon=FLOOR_PLANS.filter(f=>f.status==="DUE SOON").length;

  return (
    <div className="flex h-screen bg-[#0A0A0A] overflow-hidden">
      <Sidebar open={open} onClose={()=>setOpen(false)}/>
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="sticky top-0 z-10 bg-[#0A0A0A] border-b border-[#2A2A2A] px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-gray-400 hover:text-white" onClick={()=>setOpen(true)}><Menu size={20}/></button>
            <div><p className="text-xs text-gray-500">Finance · June 2025</p><h1 className="font-serif text-lg font-bold text-white">Floor Plans</h1></div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 border border-[#2A2A2A] hover:border-white text-gray-400 hover:text-white text-xs px-3 py-1.5 rounded-lg transition-colors"><Download size={13}/>Export</button>
            <button className="relative text-gray-400 hover:text-white"><Bell size={18}/><span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#C41E3A] rounded-full text-[8px] flex items-center justify-center font-bold text-white">2</span></button>
            <a href="https://tutacars.co.za" target="_blank" rel="noopener" className="text-gray-500 hover:text-white"><ExternalLink size={16}/></a>
          </div>
        </header>
        <main className="flex-1 px-4 sm:px-6 py-6 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {label:"Total Deployed",value:fmt(total),sub:"Across 10 pods",icon:CreditCard,color:"text-[#C41E3A]"},
              {label:"Urgent Settlement",value:String(urgent),sub:"Due within 7 days",icon:AlertTriangle,color:"text-red-400"},
              {label:"Due Soon",value:String(dueSoon),sub:"Due within 14 days",icon:Clock,color:"text-amber-400"},
              {label:"Avg Drawdown",value:fmt(Math.round(total/FLOOR_PLANS.length)),sub:"Per active pod",icon:CheckCircle,color:"text-emerald-400"},
            ].map(k=>(
              <div key={k.label} className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-4">
                <div className="flex items-center justify-between mb-2"><p className="text-xs text-gray-500">{k.label}</p><k.icon size={15} className={k.color}/></div>
                <p className={`font-serif text-2xl font-bold ${k.color} mb-0.5`}>{k.value}</p>
                <p className="text-[11px] text-gray-500">{k.sub}</p>
              </div>
            ))}
          </div>
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#2A2A2A]"><h2 className="font-serif text-sm font-bold text-white">Active Floor Plans</h2><span className="text-xs text-gray-500">{FLOOR_PLANS.length} active facilities</span></div>
            <div className="overflow-x-auto"><table className="w-full text-xs"><thead><tr className="border-b border-[#2A2A2A]">{["Pod","Dealer","Amount","Drawn","Settles","Days Left","Vehicles","Rate","Security","Status"].map(h=><th key={h} className="px-4 py-2.5 text-left text-gray-500 font-medium uppercase tracking-wider text-[10px] whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-[#1E1E1E]">{FLOOR_PLANS.map(f=>(<tr key={f.pod} className="hover:bg-[#1A1A1A]"><td className="px-4 py-3 text-white font-medium">{f.pod}</td><td className="px-4 py-3 text-gray-300">{f.name}</td><td className="px-4 py-3 text-[#C41E3A] font-bold">{fmt(f.amount)}</td><td className="px-4 py-3 text-gray-400">{f.drawn}</td><td className="px-4 py-3 text-gray-400">{f.settles}</td><td className="px-4 py-3"><span className={`font-bold ${f.daysLeft<=5?"text-red-400":f.daysLeft<=14?"text-amber-400":"text-gray-300"}`}>{f.daysLeft}d</span></td><td className="px-4 py-3 text-gray-400">{f.vehicles}</td><td className="px-4 py-3 text-gray-400">{f.rate}</td><td className="px-4 py-3 text-gray-400">{f.security}</td><td className="px-4 py-3">{badge(f.status)}</td></tr>))}</tbody></table></div>
          </div>
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#2A2A2A]"><h2 className="font-serif text-sm font-bold text-white">Recent Settlements</h2></div>
            <div className="overflow-x-auto"><table className="w-full text-xs"><thead><tr className="border-b border-[#2A2A2A]">{["Pod","Amount","Settled On","Method","Status"].map(h=><th key={h} className="px-4 py-2.5 text-left text-gray-500 font-medium uppercase tracking-wider text-[10px]">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-[#1E1E1E]">{HISTORY.map((h,i)=>(<tr key={i} className="hover:bg-[#1A1A1A]"><td className="px-4 py-3 text-white">{h.pod}</td><td className="px-4 py-3 text-emerald-400 font-medium">{h.amount}</td><td className="px-4 py-3 text-gray-400">{h.settledOn}</td><td className="px-4 py-3 text-gray-400">{h.method}</td><td className="px-4 py-3">{badge(h.status)}</td></tr>))}</tbody></table></div>
          </div>
        </main>
      </div>
    </div>
  );
}
