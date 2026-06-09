"use client";
import { useState } from "react";
import { LayoutDashboard, Users, CreditCard, ShieldAlert, FileText, Package, TrendingUp, Newspaper, FolderOpen, Menu, X, LogOut, Bell, ExternalLink, Download, Search, CheckCircle, Clock, AlertTriangle } from "lucide-react";

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

const DOCS = [
  { id:"DOC-001", name:"Tuta Capital Franchise Agreement v2.1", category:"Franchise", pod:"All Pods", date:"15 Jan 2025", signed:12, required:12, status:"COMPLETE" },
  { id:"DOC-002", name:"Floor Plan Facility Agreement — Standard Template", category:"Finance", pod:"All Pods", date:"15 Jan 2025", signed:10, required:10, status:"COMPLETE" },
  { id:"DOC-003", name:"Surety Pool Contribution & Ring-Fence Agreement", category:"Finance", pod:"All Pods", date:"15 Jan 2025", signed:12, required:12, status:"COMPLETE" },
  { id:"DOC-004", name:"RMI Membership Certificates — Network Bundle", category:"Compliance", pod:"All Pods", date:"20 Jan 2025", signed:10, required:12, status:"PENDING" },
  { id:"DOC-005", name:"NADA Code of Conduct Acknowledgement", category:"Compliance", pod:"All Pods", date:"20 Jan 2025", signed:12, required:12, status:"COMPLETE" },
  { id:"DOC-006", name:"POPIA Data Processing Agreement", category:"Legal", pod:"All Pods", date:"01 Feb 2025", signed:12, required:12, status:"COMPLETE" },
  { id:"DOC-007", name:"NCR Registration — TC-JHB-001 Sandton", category:"Compliance", pod:"TC-JHB-001", date:"22 Jan 2025", signed:1, required:1, status:"COMPLETE" },
  { id:"DOC-008", name:"NCR Registration — TC-CPT-003 Sea Point", category:"Compliance", pod:"TC-CPT-003", date:"10 Feb 2025", signed:1, required:1, status:"COMPLETE" },
  { id:"DOC-009", name:"Floor Plan Drawdown Notice — TC-JHB-001 Apr 2025", category:"Finance", pod:"TC-JHB-001", date:"15 Apr 2025", signed:1, required:1, status:"COMPLETE" },
  { id:"DOC-010", name:"Franchise Agreement Addendum — 2025 Fee Schedule", category:"Franchise", pod:"All Pods", date:"01 Jun 2025", signed:8, required:12, status:"PENDING" },
  { id:"DOC-011", name:"Vehicle Inspection Report Template v3", category:"Operations", pod:"All Pods", date:"15 Mar 2025", signed:12, required:12, status:"COMPLETE" },
  { id:"DOC-012", name:"Dealer Onboarding Checklist — Rustenburg Pod", category:"Onboarding", pod:"TC-NW-001", date:"15 May 2025", signed:0, required:1, status:"IN PROGRESS" },
  { id:"DOC-013", name:"Dealer Onboarding Checklist — Menlyn Pod", category:"Onboarding", pod:"TC-PTA-005", date:"01 Jun 2025", signed:0, required:1, status:"IN PROGRESS" },
];

const CATEGORIES = ["All","Franchise","Finance","Compliance","Legal","Operations","Onboarding"];

function badge(s:string){const m:Record<string,string>={COMPLETE:"bg-emerald-900/40 text-emerald-400 border-emerald-800",PENDING:"bg-amber-900/40 text-amber-400 border-amber-800","IN PROGRESS":"bg-blue-900/40 text-blue-400 border-blue-800"};return <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${m[s]||"bg-gray-800 text-gray-400 border-gray-700"}`}>{s}</span>;}
function catBadge(c:string){const m:Record<string,string>={Franchise:"text-purple-400",Finance:"text-[#C41E3A]",Compliance:"text-emerald-400",Legal:"text-amber-400",Operations:"text-blue-400",Onboarding:"text-cyan-400"};return <span className={`text-[10px] font-medium ${m[c]||"text-gray-400"}`}>{c}</span>;}

function Sidebar({open,onClose}:{open:boolean;onClose:()=>void}){return(<><{open&&<div className="fixed inset-0 z-20 bg-black/60 md:hidden" onClick={onClose}/>}<aside className={`fixed md:sticky top-0 left-0 h-screen z-30 w-56 bg-[#0D0D0D] border-r border-[#2A2A2A] flex flex-col transition-transform duration-200 ${open?"translate-x-0":"-translate-x-full md:translate-x-0"}`}><div className="flex items-center justify-between px-4 py-4 border-b border-[#2A2A2A]"><div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-[#8B0000] rounded-sm"/><span className="font-serif font-bold text-white text-sm">TUTA CAPITAL</span></div><button className="md:hidden" onClick={onClose}><X size={16}/></button></div><nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">{NAV.map((item,i)=>{if('section' in item) return <p key={i} className="px-3 pt-4 pb-1 text-[10px] uppercase tracking-widest text-gray-600">{item.section}</p>;const Icon=item.icon!;const active=item.label==="Documents";return <a key={item.label} href={item.href} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${active?"bg-[#8B0000]/20 text-white border border-[#8B0000]/30":"text-gray-400 hover:text-white hover:bg-[#1A1A1A]"}`}><Icon size={15}/>{item.label}</a>;})}</nav><div className="border-t border-[#2A2A2A] p-4"><div className="flex items-center gap-2 mb-3"><div className="w-7 h-7 rounded-full bg-[#8B0000] flex items-center justify-center text-xs font-bold text-white">AT</div><div><p className="text-xs text-white font-medium">Anthony Tshali</p><p className="text-[10px] text-gray-500">Admin</p></div></div><button className="flex items-center gap-2 text-gray-500 hover:text-white text-xs"><LogOut size={13}/>Sign out</button></div></aside></>
  );}

export default function DocumentsPage(){
  const [open,setOpen]=useState(false);
  const [q,setQ]=useState("");
  const [cat,setCat]=useState("All");
  const filtered=DOCS.filter(d=>{const matchQ=`${d.name} ${d.pod} ${d.category}`.toLowerCase().includes(q.toLowerCase());const matchCat=cat==="All"||d.category===cat;return matchQ&&matchCat;});
  const complete=DOCS.filter(d=>d.status==="COMPLETE").length;
  const pending=DOCS.filter(d=>d.status==="PENDING"||d.status==="IN PROGRESS").length;
  return(
    <div className="flex h-screen bg-[#0A0A0A] overflow-hidden">
      <Sidebar open={open} onClose={()=>setOpen(false)}/>
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="sticky top-0 z-10 bg-[#0A0A0A] border-b border-[#2A2A2A] px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4"><button className="md:hidden text-gray-400 hover:text-white" onClick={()=>setOpen(true)}><Menu size={20}/></button><div><p className="text-xs text-gray-500">Contracts & Compliance</p><h1 className="font-serif text-lg font-bold text-white">Documents</h1></div></div>
          <div className="flex items-center gap-3"><button className="flex items-center gap-1.5 border border-[#2A2A2A] hover:border-white text-gray-400 hover:text-white text-xs px-3 py-1.5 rounded-lg transition-colors"><Download size={13}/>Export Index</button><button className="relative text-gray-400 hover:text-white"><Bell size={18}/><span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#C41E3A] rounded-full text-[8px] flex items-center justify-center font-bold text-white">2</span></button><a href="https://tutacars.co.za" target="_blank" rel="noopener" className="text-gray-500 hover:text-white"><ExternalLink size={16}/></a></div>
        </header>
        <main className="flex-1 px-4 sm:px-6 py-6 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[{label:"Total Documents",value:String(DOCS.length),sub:"In repository",icon:FolderOpen,color:"text-[#C41E3A]"},{label:"Fully Signed",value:String(complete),sub:"Complete & filed",icon:CheckCircle,color:"text-emerald-400"},{label:"Awaiting Signatures",value:String(pending),sub:"Action required",icon:Clock,color:"text-amber-400"},{label:"Compliance Rate",value:Math.round(complete/DOCS.length*100)+"%",sub:"Network-wide",icon:AlertTriangle,color:"text-blue-400"}].map(k=>(
              <div key={k.label} className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-4"><div className="flex items-center justify-between mb-2"><p className="text-xs text-gray-500">{k.label}</p><k.icon size={15} className={k.color}/></div><p className={`font-serif text-2xl font-bold ${k.color} mb-0.5`}>{k.value}</p><p className="text-[11px] text-gray-500">{k.sub}</p></div>
            ))}
          </div>
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-4 py-3 border-b border-[#2A2A2A]">
              <h2 className="font-serif text-sm font-bold text-white flex-1">Document Repository</h2>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-56"><Search size={12} className="absolute left-3 top-2.5 text-gray-600"/><input value={q} onChange={ev=>setQ(ev.target.value)} placeholder="Search documents..." className="w-full bg-[#0F0F0F] border border-[#2A2A2A] text-gray-300 text-xs rounded-lg pl-8 pr-3 py-2 focus:border-[#C41E3A] focus:outline-none placeholder:text-gray-600"/></div>
                <select value={cat} onChange={ev=>setCat(ev.target.value)} className="bg-[#0F0F0F] border border-[#2A2A2A] text-gray-300 text-xs rounded-lg px-3 py-2 focus:border-[#C41E3A] focus:outline-none">{CATEGORIES.map(c=><option key={c}>{c}</option>)}</select>
              </div>
            </div>
            <div className="overflow-x-auto"><table className="w-full text-xs"><thead><tr className="border-b border-[#2A2A2A]">{["Doc ID","Document Name","Category","Pod Scope","Date Added","Signatures","Status",""].map(h=><th key={h} className="px-4 py-2.5 text-left text-gray-500 font-medium uppercase tracking-wider text-[10px] whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-[#1E1E1E]">{filtered.map(d=>(<tr key={d.id} className="hover:bg-[#1A1A1A]"><td className="px-4 py-3 text-gray-500">{d.id}</td><td className="px-4 py-3 text-white max-w-xs"><span className="truncate block">{d.name}</span></td><td className="px-4 py-3">{catBadge(d.category)}</td><td className="px-4 py-3 text-gray-400">{d.pod}</td><td className="px-4 py-3 text-gray-400">{d.date}</td><td className="px-4 py-3"><span className={d.signed===d.required?"text-emerald-400 font-medium":"text-amber-400 font-medium"}>{d.signed}/{d.required}</span></td><td className="px-4 py-3">{badge(d.status)}</td><td className="px-4 py-3"><button className="text-gray-500 hover:text-white transition-colors"><Download size={13}/></button></td></tr>))}</tbody></table></div>
          </div>
        </main>
      </div>
    </div>
  );
}
