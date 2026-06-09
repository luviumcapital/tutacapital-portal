"use client";
import { useState } from "react";
import { LayoutDashboard, Users, CreditCard, ShieldAlert, FileText, Package, TrendingUp, Newspaper, FolderOpen, Menu, X, LogOut, Bell, ExternalLink, Send, Eye, Edit, CheckCircle } from "lucide-react";

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

const NEWSLETTERS = [
  { id:"NL-2025-006", subject:"June 2025 — Network Update & Platform Fees Due", date:"02 Jun 2025", recipients:12, opens:10, audience:"All Pods", status:"SENT" },
  { id:"NL-2025-005", subject:"May Performance Report — Top Pod Spotlight: Umhlanga", date:"05 May 2025", recipients:10, opens:9, audience:"All Pods", status:"SENT" },
  { id:"NL-2025-004", subject:"Floor Plan Reminder — Settlements Due 18–25 May", date:"12 May 2025", recipients:5, opens:5, audience:"Finance Pods", status:"SENT" },
  { id:"NL-2025-003", subject:"Welcome: Nelspruit & Gqeberha Pods Go Live", date:"01 Apr 2025", recipients:12, opens:11, audience:"All Pods", status:"SENT" },
  { id:"NL-2025-002", subject:"March Network Update — 35 Cars Sold This Month", date:"03 Mar 2025", recipients:8, opens:7, audience:"All Pods", status:"SENT" },
  { id:"NL-2025-001", subject:"Welcome to Tuta Capital Network — Getting Started", date:"15 Jan 2025", recipients:5, opens:5, audience:"Launch Pods", status:"SENT" },
];

const DRAFTS = [
  { id:"DR-001", subject:"July 2025 — Monthly Update Draft", updated:"Today, 09:14", status:"DRAFT" },
  { id:"DR-002", subject:"Onboarding Welcome: Rustenburg & Menlyn Pods", updated:"Yesterday", status:"DRAFT" },
];

const PREVIEW = `Dear [Dealer Name],\n\nHere is your monthly update from the Tuta Capital network for June 2025.\n\n📊 NETWORK HIGHLIGHTS\n• 38 vehicles sold across all pods (+6% vs May)\n• Average days on lot improved to 16 days\n• R4.82M total network revenue\n• 2 new pods onboarded (Rustenburg, Menlyn)\n\n💰 FINANCE REMINDERS\nFloor plan settlements due this month:\n• TC-JHB-001 — R185,000 due 18 Jun (URGENT)\n• TC-CPT-007 — R220,000 due 23 Jun\n\n🏆 POD OF THE MONTH\nCongratulations to Tuta Cars Umhlanga — 6 sales, 14-day average, credit score 84.\n\nWarm regards,\nThe Tuta Capital Team`;

function badge(s:string){const m:Record<string,string>={SENT:"bg-emerald-900/40 text-emerald-400 border-emerald-800",DRAFT:"bg-gray-800 text-gray-400 border-gray-700"};return <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${m[s]||"bg-gray-800 text-gray-400 border-gray-700"}`}>{s}</span>;}

function Sidebar({open,onClose}:{open:boolean;onClose:()=>void}){return(<><{open&&<div className="fixed inset-0 z-20 bg-black/60 md:hidden" onClick={onClose}/>}<aside className={`fixed md:sticky top-0 left-0 h-screen z-30 w-56 bg-[#0D0D0D] border-r border-[#2A2A2A] flex flex-col transition-transform duration-200 ${open?"translate-x-0":"-translate-x-full md:translate-x-0"}`}><div className="flex items-center justify-between px-4 py-4 border-b border-[#2A2A2A]"><div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-[#8B0000] rounded-sm"/><span className="font-serif font-bold text-white text-sm">TUTA CAPITAL</span></div><button className="md:hidden" onClick={onClose}><X size={16}/></button></div><nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">{NAV.map((item,i)=>{if('section' in item) return <p key={i} className="px-3 pt-4 pb-1 text-[10px] uppercase tracking-widest text-gray-600">{item.section}</p>;const Icon=item.icon!;const active=item.label==="Newsletters";return <a key={item.label} href={item.href} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${active?"bg-[#8B0000]/20 text-white border border-[#8B0000]/30":"text-gray-400 hover:text-white hover:bg-[#1A1A1A]"}`}><Icon size={15}/>{item.label}</a>;})}</nav><div className="border-t border-[#2A2A2A] p-4"><div className="flex items-center gap-2 mb-3"><div className="w-7 h-7 rounded-full bg-[#8B0000] flex items-center justify-center text-xs font-bold text-white">AT</div><div><p className="text-xs text-white font-medium">Anthony Tshali</p><p className="text-[10px] text-gray-500">Admin</p></div></div><button className="flex items-center gap-2 text-gray-500 hover:text-white text-xs"><LogOut size={13}/>Sign out</button></div></aside></>
  );}

export default function NewslettersPage(){
  const [open,setOpen]=useState(false);
  const [preview,setPreview]=useState(false);
  return(
    <div className="flex h-screen bg-[#0A0A0A] overflow-hidden">
      <Sidebar open={open} onClose={()=>setOpen(false)}/>
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="sticky top-0 z-10 bg-[#0A0A0A] border-b border-[#2A2A2A] px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4"><button className="md:hidden text-gray-400 hover:text-white" onClick={()=>setOpen(true)}><Menu size={20}/></button><div><p className="text-xs text-gray-500">Dealer Communications</p><h1 className="font-serif text-lg font-bold text-white">Newsletters</h1></div></div>
          <div className="flex items-center gap-3"><button className="flex items-center gap-1.5 bg-[#C41E3A] hover:bg-[#a01830] text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"><Edit size={13}/>Compose</button><button className="relative text-gray-400 hover:text-white"><Bell size={18}/><span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#C41E3A] rounded-full text-[8px] flex items-center justify-center font-bold text-white">2</span></button><a href="https://tutacars.co.za" target="_blank" rel="noopener" className="text-gray-500 hover:text-white"><ExternalLink size={16}/></a></div>
        </header>
        <main className="flex-1 px-4 sm:px-6 py-6 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[{label:"Sent YTD",value:"6",sub:"All delivered",icon:Send,color:"text-[#C41E3A]"},{label:"Avg Open Rate",value:"87%",sub:"Industry avg 21%",icon:Eye,color:"text-emerald-400"},{label:"Drafts",value:"2",sub:"Ready to send",icon:Edit,color:"text-amber-400"},{label:"Active Recipients",value:"12",sub:"All dealer pods",icon:CheckCircle,color:"text-blue-400"}].map(k=>(
              <div key={k.label} className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-4"><div className="flex items-center justify-between mb-2"><p className="text-xs text-gray-500">{k.label}</p><k.icon size={15} className={k.color}/></div><p className={`font-serif text-2xl font-bold ${k.color} mb-0.5`}>{k.value}</p><p className="text-[11px] text-gray-500">{k.sub}</p></div>
            ))}
          </div>
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#2A2A2A]"><h2 className="font-serif text-sm font-bold text-white">Drafts</h2></div>
            <div className="divide-y divide-[#1E1E1E]">{DRAFTS.map(d=>(
              <div key={d.id} className="flex items-center justify-between px-4 py-3 hover:bg-[#1A1A1A]"><div><p className="text-white text-sm">{d.subject}</p><p className="text-gray-500 text-xs mt-0.5">Last updated: {d.updated}</p></div><div className="flex items-center gap-3 flex-shrink-0">{badge(d.status)}<button className="text-gray-400 hover:text-white border border-[#2A2A2A] hover:border-[#444] text-xs px-3 py-1.5 rounded-lg transition-colors">Edit</button><button className="flex items-center gap-1 bg-[#C41E3A] hover:bg-[#a01830] text-white text-xs px-3 py-1.5 rounded-lg transition-colors"><Send size={11}/>Send</button></div></div>
            ))}</div>
          </div>
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#2A2A2A] flex items-center justify-between"><h2 className="font-serif text-sm font-bold text-white">Sent Newsletters</h2><button onClick={()=>setPreview(!preview)} className="flex items-center gap-1.5 text-gray-400 hover:text-white text-xs border border-[#2A2A2A] hover:border-[#444] px-2.5 py-1 rounded transition-colors"><Eye size={11}/>{preview?"Hide":"Preview Latest"}</button></div>
            <div className="overflow-x-auto"><table className="w-full text-xs"><thead><tr className="border-b border-[#2A2A2A]">{["ID","Subject","Date","Recipients","Opens","Audience","Status"].map(h=><th key={h} className="px-4 py-2.5 text-left text-gray-500 font-medium uppercase tracking-wider text-[10px] whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-[#1E1E1E]">{NEWSLETTERS.map(n=>(<tr key={n.id} className="hover:bg-[#1A1A1A]"><td className="px-4 py-3 text-gray-500">{n.id}</td><td className="px-4 py-3 text-white">{n.subject}</td><td className="px-4 py-3 text-gray-400">{n.date}</td><td className="px-4 py-3 text-gray-300">{n.recipients}</td><td className="px-4 py-3"><span className="text-emerald-400 font-medium">{n.opens}</span><span className="text-gray-500">/{n.recipients}</span></td><td className="px-4 py-3 text-gray-400">{n.audience}</td><td className="px-4 py-3">{badge(n.status)}</td></tr>))}</tbody></table></div>
          </div>
          {preview&&(<div className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden"><div className="px-4 py-3 border-b border-[#2A2A2A]"><h2 className="font-serif text-sm font-bold text-white">Preview — NL-2025-006</h2></div><div className="p-5"><pre className="text-xs text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">{PREVIEW}</pre></div></div>)}
        </main>
      </div>
    </div>
  );
}
