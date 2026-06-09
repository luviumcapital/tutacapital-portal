"use client";
import { useState } from "react";
import { LayoutDashboard, Users, CreditCard, ShieldAlert, FileText, Package, TrendingUp, Newspaper, FolderOpen, Menu, X, LogOut, Bell, ExternalLink, Phone, Mail, AlertTriangle, Download } from "lucide-react";

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

const ACCOUNTS = [
  { pod:"TC-JHB-001", name:"Tuta Cars Sandton", overdue:"R22,500", daysOverdue:5, type:"Platform Fee", contact:"Michael Dlamini", phone:"+27 82 411 2234", lastContact:"05 Jun 2025", action:"Promise to Pay", status:"PROMISE", priority:"MEDIUM" },
  { pod:"TC-PTA-002", name:"Tuta Cars Centurion", overdue:"R35,000", daysOverdue:12, type:"Floor Plan Interest", contact:"Johan van Wyk", phone:"+27 79 245 8812", lastContact:"02 Jun 2025", action:"Formal notice issued", status:"NOTICE", priority:"HIGH" },
  { pod:"TC-JHB-009", name:"Tuta Cars Roodepoort", overdue:"R15,000", daysOverdue:3, type:"Platform Fee", contact:"Thandi Mokoena", phone:"+27 82 512 3344", lastContact:"07 Jun 2025", action:"Follow-up call scheduled", status:"MONITORING", priority:"LOW" },
  { pod:"TC-NW-001", name:"Tuta Cars Rustenburg", overdue:"R40,000", daysOverdue:21, type:"Surety Shortfall", contact:"Kelebogile Motsepe", phone:"+27 76 441 9923", lastContact:"28 May 2025", action:"Surety pool draw pending", status:"ESCALATED", priority:"CRITICAL" },
];

const LOG = [
  { date:"07 Jun 2025", pod:"TC-JHB-001", agent:"Sarah M.", action:"Called dealer — promise to pay by 12 Jun", outcome:"PROMISE" },
  { date:"06 Jun 2025", pod:"TC-NW-001", agent:"Admin", action:"Formal demand letter sent via email", outcome:"NOTICE SENT" },
  { date:"05 Jun 2025", pod:"TC-PTA-002", agent:"Sarah M.", action:"WhatsApp follow-up — no response", outcome:"NO RESPONSE" },
  { date:"04 Jun 2025", pod:"TC-JHB-009", agent:"Admin", action:"SMS reminder sent — auto-debit retry", outcome:"PENDING" },
  { date:"02 Jun 2025", pod:"TC-CPT-003", agent:"Admin", action:"Platform fee auto-collected successfully", outcome:"CLEARED" },
  { date:"01 Jun 2025", pod:"TC-DBN-001", agent:"Admin", action:"Platform fee auto-collected successfully", outcome:"CLEARED" },
];

function badge(s:string){
  const m:Record<string,string>={CRITICAL:"bg-red-900/40 text-red-400 border-red-800",HIGH:"bg-orange-900/40 text-orange-400 border-orange-800",MEDIUM:"bg-amber-900/40 text-amber-400 border-amber-800",LOW:"bg-blue-900/40 text-blue-400 border-blue-800",ESCALATED:"bg-red-900/40 text-red-400 border-red-800",NOTICE:"bg-orange-900/40 text-orange-400 border-orange-800",PROMISE:"bg-amber-900/40 text-amber-400 border-amber-800",MONITORING:"bg-blue-900/40 text-blue-400 border-blue-800",CLEARED:"bg-emerald-900/40 text-emerald-400 border-emerald-800","NO RESPONSE":"bg-red-900/40 text-red-400 border-red-800","NOTICE SENT":"bg-orange-900/40 text-orange-400 border-orange-800",PENDING:"bg-gray-800 text-gray-400 border-gray-700"};
  return <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${m[s]||"bg-gray-800 text-gray-400 border-gray-700"}`}>{s}</span>;
}

function Sidebar({open,onClose}:{open:boolean;onClose:()=>void}){
  return(
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
            const Icon=item.icon!; const active=item.label==="Collections";
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

export default function CollectionsPage(){
  const [open,setOpen]=useState(false);
  return(
    <div className="flex h-screen bg-[#0A0A0A] overflow-hidden">
      <Sidebar open={open} onClose={()=>setOpen(false)}/>
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="sticky top-0 z-10 bg-[#0A0A0A] border-b border-[#2A2A2A] px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-gray-400 hover:text-white" onClick={()=>setOpen(true)}><Menu size={20}/></button>
            <div><p className="text-xs text-gray-500">Finance · Recoveries</p><h1 className="font-serif text-lg font-bold text-white">Collections</h1></div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 border border-[#2A2A2A] hover:border-white text-gray-400 hover:text-white text-xs px-3 py-1.5 rounded-lg transition-colors"><Download size={13}/>Export</button>
            <button className="relative text-gray-400 hover:text-white"><Bell size={18}/><span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#C41E3A] rounded-full text-[8px] flex items-center justify-center font-bold text-white">4</span></button>
            <a href="https://tutacars.co.za" target="_blank" rel="noopener" className="text-gray-500 hover:text-white"><ExternalLink size={16}/></a>
          </div>
        </header>
        <main className="flex-1 px-4 sm:px-6 py-6 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {label:"Total Overdue",value:"R112,500",sub:"4 accounts",icon:AlertTriangle,color:"text-[#C41E3A]"},
              {label:"Critical / Escalated",value:"1",sub:"Surety draw pending",icon:FileText,color:"text-red-400"},
              {label:"Promise to Pay",value:"1",sub:"Due 12 Jun",icon:Phone,color:"text-amber-400"},
              {label:"Cleared MTD",value:"R67,500",sub:"8 accounts resolved",icon:Mail,color:"text-emerald-400"},
            ].map(k=>(
              <div key={k.label} className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-4">
                <div className="flex items-center justify-between mb-2"><p className="text-xs text-gray-500">{k.label}</p><k.icon size={15} className={k.color}/></div>
                <p className={`font-serif text-2xl font-bold ${k.color} mb-0.5`}>{k.value}</p>
                <p className="text-[11px] text-gray-500">{k.sub}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#2A2A2A] flex items-center justify-between">
              <h2 className="font-serif text-sm font-bold text-white">Open Accounts</h2>
              <span className="text-xs text-red-400 font-medium">{ACCOUNTS.length} accounts requiring action</span>
            </div>
            <div className="divide-y divide-[#1E1E1E]">
              {ACCOUNTS.map(a=>(
                <div key={a.pod} className="p-4 hover:bg-[#1A1A1A]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-medium text-sm">{a.name}</span>
                        <span className="text-gray-500 text-xs">· {a.pod}</span>
                        {badge(a.priority)}
                      </div>
                      <p className="text-[10px] text-gray-500 mb-2">{a.type} · {a.daysOverdue} days overdue · Contact: {a.contact}</p>
                      <p className="text-xs text-gray-400">Last action: <span className="text-gray-300">{a.action}</span> on {a.lastContact}</p>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="text-right">
                        <p className="font-serif font-bold text-[#C41E3A] text-lg">{a.overdue}</p>
                        <p className="text-[10px] text-gray-500">overdue</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex items-center gap-1 text-gray-400 hover:text-white border border-[#2A2A2A] hover:border-[#444] text-xs px-2.5 py-1.5 rounded-lg transition-colors"><Phone size={11}/>Call</button>
                        <button className="flex items-center gap-1 text-gray-400 hover:text-white border border-[#2A2A2A] hover:border-[#444] text-xs px-2.5 py-1.5 rounded-lg transition-colors"><Mail size={11}/>Email</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#2A2A2A]">
              <h2 className="font-serif text-sm font-bold text-white">Collections Activity Log</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="border-b border-[#2A2A2A]">{["Date","Pod","Agent","Action","Outcome"].map(h=><th key={h} className="px-4 py-2.5 text-left text-gray-500 font-medium uppercase tracking-wider text-[10px]">{h}</th>)}</tr></thead>
                <tbody className="divide-y divide-[#1E1E1E]">
                  {LOG.map((l,i)=>(
                    <tr key={i} className="hover:bg-[#1A1A1A]">
                      <td className="px-4 py-3 text-gray-400">{l.date}</td>
                      <td className="px-4 py-3 text-white font-medium">{l.pod}</td>
                      <td className="px-4 py-3 text-gray-400">{l.agent}</td>
                      <td className="px-4 py-3 text-gray-300">{l.action}</td>
                      <td className="px-4 py-3">{badge(l.outcome)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
