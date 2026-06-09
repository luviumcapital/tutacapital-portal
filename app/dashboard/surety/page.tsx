"use client";
import { useState } from "react";
import { LayoutDashboard, Users, CreditCard, ShieldAlert, FileText, Package, TrendingUp, Newspaper, FolderOpen, Menu, X, LogOut, Bell, ExternalLink, Download, CheckCircle, Lock } from "lucide-react";

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

const CONTRIBUTIONS = [
  { pod:"TC-JHB-001", name:"Tuta Cars Sandton", contributed:"R55,000", required:"R50,000", status:"COMPLIANT", date:"Jan 2025" },
  { pod:"TC-CPT-003", name:"Tuta Cars Sea Point", contributed:"R44,000", required:"R44,000", status:"COMPLIANT", date:"Feb 2025" },
  { pod:"TC-DBN-001", name:"Tuta Cars Umhlanga", contributed:"R62,000", required:"R55,000", status:"COMPLIANT", date:"Jan 2025" },
  { pod:"TC-PTA-002", name:"Tuta Cars Centurion", contributed:"R28,000", required:"R35,000", status:"SHORTFALL", date:"Mar 2025" },
  { pod:"TC-JHB-009", name:"Tuta Cars Roodepoort", contributed:"R50,000", required:"R50,000", status:"COMPLIANT", date:"Feb 2025" },
  { pod:"TC-MPM-001", name:"Tuta Cars Nelspruit", contributed:"R38,000", required:"R38,000", status:"COMPLIANT", date:"Mar 2025" },
  { pod:"TC-ECP-001", name:"Tuta Cars Gqeberha", contributed:"R32,000", required:"R32,000", status:"COMPLIANT", date:"Apr 2025" },
  { pod:"TC-NW-001", name:"Tuta Cars Rustenburg", contributed:"R25,000", required:"R40,000", status:"PARTIAL", date:"May 2025" },
  { pod:"TC-JHB-003", name:"Tuta Cars Randburg", contributed:"R45,000", required:"R45,000", status:"COMPLIANT", date:"Feb 2025" },
  { pod:"TC-CPT-007", name:"Tuta Cars Bellville", contributed:"R52,000", required:"R50,000", status:"COMPLIANT", date:"Feb 2025" },
  { pod:"TC-DBN-002", name:"Tuta Cars Pinetown", contributed:"R58,000", required:"R55,000", status:"COMPLIANT", date:"Jan 2025" },
  { pod:"TC-PTA-005", name:"Tuta Cars Menlyn", contributed:"R22,000", required:"R40,000", status:"PARTIAL", date:"Jun 2025" },
];

const CLAIMS = [
  { pod:"TC-JHB-007", amount:"R35,000", reason:"Floor plan default", date:"14 Feb 2025", resolved:"22 Feb 2025", status:"RECOVERED" },
  { pod:"TC-CPT-002", amount:"R28,000", reason:"Vehicle repossession", date:"05 Mar 2025", resolved:"18 Mar 2025", status:"RECOVERED" },
];

function badge(s:string){
  const m:Record<string,string>={COMPLIANT:"bg-emerald-900/40 text-emerald-400 border-emerald-800",SHORTFALL:"bg-red-900/40 text-red-400 border-red-800",PARTIAL:"bg-amber-900/40 text-amber-400 border-amber-800",RECOVERED:"bg-blue-900/40 text-blue-400 border-blue-800"};
  return <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${m[s]||"bg-gray-800 text-gray-400 border-gray-700"}`}>{s}</span>;
}

function Sidebar({open,onClose}:{open:boolean;onClose:()=>void}){
  return(
    <>
      {open&&<div className="fixed inset-0 z-20 bg-black/60 md:hidden" onClick={onClose}/>}
      <aside className={`fixed md:sticky top-0 left-0 h-screen z-30 w-56 bg-[#0D0D0D] border-r border-[#2A2A2A] flex flex-col transition-transform duration-200 ${open?"translate-x-0":"-translate-x-full md:translate-x-0"}`}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#2A2A2A]"><div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-[#8B0000] rounded-sm"/><span className="font-serif font-bold text-white text-sm">TUTA CAPITAL</span></div><button className="md:hidden text-gray-500 hover:text-white" onClick={onClose}><X size={16}/></button></div>
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">{NAV.map((item,i)=>{ if('section' in item) return <p key={i} className="px-3 pt-4 pb-1 text-[10px] uppercase tracking-widest text-gray-600">{item.section}</p>; const Icon=item.icon!; const active=item.label==="Surety Pool"; return <a key={item.label} href={item.href} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${active?"bg-[#8B0000]/20 text-white border border-[#8B0000]/30":"text-gray-400 hover:text-white hover:bg-[#1A1A1A]"}`}><Icon size={15}/>{item.label}</a>;})}</nav>
        <div className="border-t border-[#2A2A2A] p-4"><div className="flex items-center gap-2 mb-3"><div className="w-7 h-7 rounded-full bg-[#8B0000] flex items-center justify-center text-xs font-bold text-white">AT</div><div><p className="text-xs text-white font-medium">Anthony Tshali</p><p className="text-[10px] text-gray-500">Admin</p></div></div><button className="flex items-center gap-2 text-gray-500 hover:text-white text-xs transition-colors"><LogOut size={13}/>Sign out</button></div>
      </aside>
    </>
  );
}

export default function SuretyPage(){
  const [open,setOpen]=useState(false);
  const compliant=CONTRIBUTIONS.filter(c=>c.status==="COMPLIANT").length;
  return(
    <div className="flex h-screen bg-[#0A0A0A] overflow-hidden">
      <Sidebar open={open} onClose={()=>setOpen(false)}/>
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="sticky top-0 z-10 bg-[#0A0A0A] border-b border-[#2A2A2A] px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4"><button className="md:hidden text-gray-400 hover:text-white" onClick={()=>setOpen(true)}><Menu size={20}/></button><div><p className="text-xs text-gray-500">Finance · Risk Mitigation</p><h1 className="font-serif text-lg font-bold text-white">Surety Pool</h1></div></div>
          <div className="flex items-center gap-3"><button className="flex items-center gap-1.5 border border-[#2A2A2A] hover:border-white text-gray-400 hover:text-white text-xs px-3 py-1.5 rounded-lg transition-colors"><Download size={13}/>Export</button><button className="relative text-gray-400 hover:text-white"><Bell size={18}/><span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#C41E3A] rounded-full text-[8px] flex items-center justify-center font-bold text-white">2</span></button><a href="https://tutacars.co.za" target="_blank" rel="noopener" className="text-gray-500 hover:text-white"><ExternalLink size={16}/></a></div>
        </header>
        <main className="flex-1 px-4 sm:px-6 py-6 space-y-6">
          <div className="bg-gradient-to-r from-[#141414] to-[#0F0F0F] border border-[#C41E3A]/20 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4"><div className="w-12 h-12 rounded-full bg-[#C41E3A]/10 border border-[#C41E3A]/20 flex items-center justify-center"><Lock size={22} className="text-[#C41E3A]"/></div><div><p className="text-xs text-gray-500 mb-0.5">Ring-Fenced Pool Balance</p><p className="font-serif text-3xl font-bold text-white">R 1,211,000</p><p className="text-xs text-gray-500 mt-0.5">Held in trust · Nedbank Commercial Account</p></div></div>
            <div className="grid grid-cols-3 gap-4 text-center"><div><p className="font-serif text-lg font-bold text-emerald-400">R1.21M</p><p className="text-[10px] text-gray-500">Current Balance</p></div><div><p className="font-serif text-lg font-bold text-amber-400">2</p><p className="text-[10px] text-gray-500">Claims YTD</p></div><div><p className="font-serif text-lg font-bold text-blue-400">100%</p><p className="text-[10px] text-gray-500">Recovery Rate</p></div></div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[{label:"Pool Balance",value:"R1,211,000",sub:"Fully ring-fenced",icon:ShieldAlert,color:"text-[#C41E3A]"},{label:"Compliant Pods",value:`${compliant}/${CONTRIBUTIONS.length}`,sub:"Met minimum threshold",icon:CheckCircle,color:"text-emerald-400"},{label:"Claims Paid YTD",value:"R63,000",sub:"2 incidents resolved",icon:FileText,color:"text-amber-400"},{label:"Pool Coverage",value:"47.3%",sub:"Of total floor plans",icon:Lock,color:"text-blue-400"}].map(k=>(
              <div key={k.label} className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-4"><div className="flex items-center justify-between mb-2"><p className="text-xs text-gray-500">{k.label}</p><k.icon size={15} className={k.color}/></div><p className={`font-serif text-2xl font-bold ${k.color} mb-0.5`}>{k.value}</p><p className="text-[11px] text-gray-500">{k.sub}</p></div>
            ))}
          </div>
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#2A2A2A] flex items-center justify-between"><h2 className="font-serif text-sm font-bold text-white">Pod Contributions</h2><span className="text-xs text-gray-500">Min. R25,000 per pod</span></div>
            <div className="overflow-x-auto"><table className="w-full text-xs"><thead><tr className="border-b border-[#2A2A2A]">{["Pod","Dealer","Contributed","Required","Contributed Since","Status"].map(h=><th key={h} className="px-4 py-2.5 text-left text-gray-500 font-medium uppercase tracking-wider text-[10px] whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-[#1E1E1E]">{CONTRIBUTIONS.map(c=>(<tr key={c.pod} className="hover:bg-[#1A1A1A]"><td className="px-4 py-3 text-white font-medium">{c.pod}</td><td className="px-4 py-3 text-gray-300">{c.name}</td><td className="px-4 py-3 text-[#C41E3A] font-bold">{c.contributed}</td><td className="px-4 py-3 text-gray-400">{c.required}</td><td className="px-4 py-3 text-gray-400">{c.date}</td><td className="px-4 py-3">{badge(c.status)}</td></tr>))}</tbody></table></div>
          </div>
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#2A2A2A]"><h2 className="font-serif text-sm font-bold text-white">Claims History</h2></div>
            <div className="overflow-x-auto"><table className="w-full text-xs"><thead><tr className="border-b border-[#2A2A2A]">{["Pod","Amount","Reason","Date","Resolved","Status"].map(h=><th key={h} className="px-4 py-2.5 text-left text-gray-500 font-medium uppercase tracking-wider text-[10px]">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-[#1E1E1E]">{CLAIMS.map((c,i)=>(<tr key={i} className="hover:bg-[#1A1A1A]"><td className="px-4 py-3 text-white">{c.pod}</td><td className="px-4 py-3 text-amber-400 font-medium">{c.amount}</td><td className="px-4 py-3 text-gray-400">{c.reason}</td><td className="px-4 py-3 text-gray-400">{c.date}</td><td className="px-4 py-3 text-gray-400">{c.resolved}</td><td className="px-4 py-3">{badge(c.status)}</td></tr>))}</tbody></table></div>
          </div>
        </main>
      </div>
    </div>
  );
}
