"use client";
import { useState } from "react";
import { LayoutDashboard, Users, CreditCard, ShieldAlert, FileText, Package, TrendingUp, Newspaper, FolderOpen, Menu, X, LogOut, Bell, Download, MapPin, ExternalLink, Car } from "lucide-react";

const FLOOR_PLANS = [
  { pod:"TC-JHB-003", location:"Sandton", amount:"R185,000", daysLeft:3, status:"URGENT" },
  { pod:"TC-CPT-007", location:"Cape Town CBD", amount:"R220,000", daysLeft:8, status:"DUE SOON" },
  { pod:"TC-DBN-002", location:"Durban North", amount:"R148,000", daysLeft:12, status:"ON TRACK" },
  { pod:"TC-JHB-009", location:"Roodepoort", amount:"R310,000", daysLeft:19, status:"ON TRACK" },
  { pod:"TC-PTA-005", location:"Centurion", amount:"R95,000", daysLeft:21, status:"ON TRACK" },
];
const CREDIT = [
  { pod:"TC-JHB-001", score:88, status:"APPROVED" },
  { pod:"TC-PTA-004", score:71, status:"CONDITIONAL" },
  { pod:"TC-CPT-006", score:54, status:"NOT YET" },
  { pod:"TC-DBN-001", score:82, status:"APPROVED" },
  { pod:"TC-JHB-007", score:63, status:"CONDITIONAL" },
];
const INVENTORY = [
  { pod:"TC-JHB-001", location:"Sandton", units:12, avgDays:19, sales:4, fee:"PAID", fp:"ACTIVE" },
  { pod:"TC-CPT-007", location:"Cape Town CBD", units:8, avgDays:31, sales:2, fee:"PAID", fp:"CONDITIONAL" },
  { pod:"TC-DBN-002", location:"Durban North", units:15, avgDays:14, sales:6, fee:"PAID", fp:"ACTIVE" },
  { pod:"TC-PTA-004", location:"Centurion", units:5, avgDays:42, sales:1, fee:"PENDING", fp:"PENDING" },
  { pod:"TC-JHB-009", location:"Roodepoort", units:10, avgDays:22, sales:3, fee:"PAID", fp:"ACTIVE" },
];
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

function badge(s: string) {
  const m: Record<string,string> = {
    URGENT:"bg-red-900/40 text-red-400 border-red-800",
    "DUE SOON":"bg-amber-900/40 text-amber-400 border-amber-800",
    "ON TRACK":"bg-emerald-900/40 text-emerald-400 border-emerald-800",
    APPROVED:"bg-emerald-900/40 text-emerald-400 border-emerald-800",
    CONDITIONAL:"bg-amber-900/40 text-amber-400 border-amber-800",
    "NOT YET":"bg-gray-800 text-gray-400 border-gray-700",
    ACTIVE:"bg-emerald-900/40 text-emerald-400 border-emerald-800",
    PAID:"bg-emerald-900/40 text-emerald-400 border-emerald-800",
    PENDING:"bg-gray-800 text-gray-400 border-gray-700",
  };
  return <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${m[s]||m.PENDING}`}>{s}</span>;
}

function Sidebar({ open, onClose }: { open:boolean; onClose:()=>void }) {
  return (
    <>
      {open && <div className="fixed inset-0 z-20 bg-black/60 md:hidden" onClick={onClose}/>}
      <aside className={`fixed md:sticky top-0 left-0 h-screen z-30 w-56 bg-[#0D0D0D] border-r border-[#2A2A2A] flex flex-col transition-transform duration-200 ${open?"translate-x-0":"-translate-x-full md:translate-x-0"}`}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#2A2A2A]">
          <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-[#8B0000] rounded-sm"/><span className="font-serif font-bold text-white text-sm">TUTA CAPITAL</span></div>
          <button className="md:hidden text-gray-500 hover:text-white" onClick={onClose}><X size={16}/></button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
          {NAV.map((item,i) => {
            if ('section' in item) return <p key={i} className="px-3 pt-4 pb-1 text-[10px] uppercase tracking-widest text-gray-600">{item.section}</p>;
            const Icon = item.icon!;
            const active = item.label==="Dashboard";
            return <a key={item.label} href={item.href} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${active?"bg-[#8B0000]/20 text-white border border-[#8B0000]/30":"text-gray-400 hover:text-white hover:bg-[#1A1A1A]"}`}><Icon size={15}/>{item.label}</a>;
          })}
        </nav>
        <div className="border-t border-[#2A2A2A] p-4">
          <div className="flex items-center gap-2 mb-3"><div className="w-7 h-7 rounded-full bg-[#8B0000] flex items-center justify-center text-xs font-bold">AT</div><div><p className="text-xs text-white font-medium">Anthony Tshali</p><p className="text-[10px] text-gray-500">Admin</p></div></div>
          <button className="flex items-center gap-2 text-gray-500 hover:text-white text-xs transition-colors"><LogOut size={13}/>Sign out</button>
        </div>
      </aside>
    </>
  );
}

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-screen bg-[#0A0A0A] overflow-hidden">
      <Sidebar open={open} onClose={()=>setOpen(false)}/>
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="sticky top-0 z-10 bg-[#0A0A0A] border-b border-[#2A2A2A] px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-gray-400 hover:text-white" onClick={()=>setOpen(true)}><Menu size={20}/></button>
            <div><p className="text-xs text-gray-500">June 2025</p><h1 className="font-serif text-lg font-bold text-white">Dashboard</h1></div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 hidden sm:block">12 active dealer pods · 3 in onboarding</span>
            <button className="relative text-gray-400 hover:text-white"><Bell size={18}/><span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#C41E3A] rounded-full text-[8px] flex items-center justify-center font-bold">2</span></button>
            <a href="https://tutacars.co.za" target="_blank" rel="noopener" className="text-gray-500 hover:text-white"><ExternalLink size={16}/></a>
          </div>
        </header>
        <main className="flex-1 px-4 sm:px-6 py-6 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label:"Active Dealers", value:"12", sub:"+3 this month", icon:Users, color:"text-[#C41E3A]" },
              { label:"Floor Plan Deployed", value:"R2.4M", sub:"4 settle in 9 days", icon:CreditCard, color:"text-amber-400" },
              { label:"Surety Pool", value:"R1.2M", sub:"Fully ring-fenced", icon:ShieldAlert, color:"text-emerald-400" },
              { label:"Units Live on Site", value:"487", sub:"+54 this week", icon:Car, color:"text-blue-400" },
            ].map(k=>(
              <div key={k.label} className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-4">
                <div className="flex items-center justify-between mb-2"><p className="text-xs text-gray-500">{k.label}</p><k.icon size={15} className={k.color}/></div>
                <p className={`font-serif text-2xl font-bold ${k.color} mb-0.5`}>{k.value}</p>
                <p className="text-[11px] text-gray-500">{k.sub}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3 bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#2A2A2A]"><h2 className="font-serif text-sm font-bold text-white">Floor Plan — Settlement Due</h2><a href="#" className="text-[10px] text-[#C41E3A] uppercase tracking-wide hover:underline">View All</a></div>
              <div className="overflow-x-auto"><table className="w-full text-xs"><thead><tr className="border-b border-[#2A2A2A]">{["Dealer Pod","Location","Amount","Days Left","Status"].map(h=><th key={h} className="px-4 py-2.5 text-left text-gray-500 font-medium uppercase tracking-wider text-[10px]">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-[#1E1E1E]">{FLOOR_PLANS.map(r=><tr key={r.pod} className="hover:bg-[#1A1A1A]"><td className="px-4 py-3 text-white font-medium">{r.pod}</td><td className="px-4 py-3 text-gray-400"><span className="flex items-center gap-1"><MapPin size={10}/>{r.location}</span></td><td className="px-4 py-3 text-white font-medium">{r.amount}</td><td className="px-4 py-3 text-gray-400">{r.daysLeft} days</td><td className="px-4 py-3">{badge(r.status)}</td></tr>)}</tbody></table></div>
            </div>
            <div className="lg:col-span-2 bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#2A2A2A]"><h2 className="font-serif text-sm font-bold text-white">Credit Scores — 6-Month Cohort</h2><a href="#" className="text-[10px] text-[#C41E3A] uppercase tracking-wide hover:underline">Full Report</a></div>
              <div className="divide-y divide-[#1E1E1E]">{CREDIT.map(r=><div key={r.pod} className="flex items-center justify-between px-4 py-3 hover:bg-[#1A1A1A]"><div><p className="text-white text-xs font-medium">{r.pod}</p><p className="text-gray-500 text-[10px]">Floor plan eligible</p></div><div className="flex items-center gap-3"><span className={`font-serif font-bold text-lg ${r.score>=80?"text-emerald-400":r.score>=65?"text-amber-400":"text-red-400"}`}>{r.score}<span className="text-xs text-gray-500">/100</span></span>{badge(r.status)}</div></div>)}</div>
            </div>
          </div>
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#2A2A2A]"><h2 className="font-serif text-sm font-bold text-white">Dealer Pod — Inventory Snapshot</h2><button className="flex items-center gap-1.5 text-[10px] text-gray-400 hover:text-white border border-[#2A2A2A] hover:border-[#444] px-2.5 py-1 rounded transition-colors uppercase tracking-wide"><Download size={10}/>Export CSV</button></div>
            <div className="overflow-x-auto"><table className="w-full text-xs"><thead><tr className="border-b border-[#2A2A2A]">{["Pod ID","Location","Units Live","Avg Days","Month Sales","Platform Fee","Floor Plan"].map(h=><th key={h} className="px-4 py-2.5 text-left text-gray-500 font-medium uppercase tracking-wider text-[10px] whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-[#1E1E1E]">{INVENTORY.map(r=><tr key={r.pod} className="hover:bg-[#1A1A1A]"><td className="px-4 py-3 text-white font-medium">{r.pod}</td><td className="px-4 py-3 text-gray-400"><span className="flex items-center gap-1"><MapPin size={10}/>{r.location}</span></td><td className="px-4 py-3 text-white">{r.units} units</td><td className="px-4 py-3 text-gray-400">{r.avgDays} days</td><td className="px-4 py-3 text-white">{r.sales}</td><td className="px-4 py-3">{badge(r.fee)}</td><td className="px-4 py-3">{badge(r.fp)}</td></tr>)}</tbody></table></div>
          </div>
          <p className="text-[11px] text-gray-600 pb-4">Data sourced from Dolibarr ERP v21. Auto-refreshed every 15 minutes.</p>
        </main>
      </div>
    </div>
  );
}
