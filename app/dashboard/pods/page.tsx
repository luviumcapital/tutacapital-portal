"use client";
import { useState } from "react";
import { LayoutDashboard, Users, CreditCard, ShieldAlert, FileText, Package, TrendingUp, Newspaper, FolderOpen, Menu, X, LogOut, Bell, ExternalLink, MapPin, Phone, Mail, CheckCircle, Clock, AlertTriangle, Plus } from "lucide-react";

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

const PODS = [
  { id:"TC-JHB-001", name:"Tuta Cars Sandton", owner:"Michael Dlamini", phone:"+27 82 411 2234", email:"sandton@tutacars.co.za", location:"Sandton, Gauteng", territory:"Northern Johannesburg", units:12, salesMTD:4, revenue:"R2.38M", fp:"R185,000", suretyPaid:"R55,000", status:"ACTIVE", onboarded:"Jan 2025", score:88 },
  { id:"TC-CPT-003", name:"Tuta Cars Sea Point", owner:"Priya Naidoo", phone:"+27 71 933 4421", email:"capetown@tutacars.co.za", location:"Sea Point, WC", territory:"Cape Town Metro", units:8, salesMTD:2, revenue:"R1.62M", fp:"R220,000", suretyPaid:"R44,000", status:"ACTIVE", onboarded:"Feb 2025", score:91 },
  { id:"TC-DBN-001", name:"Tuta Cars Umhlanga", owner:"Sipho Ndlovu", phone:"+27 83 776 0091", email:"durban@tutacars.co.za", location:"Umhlanga, KZN", territory:"eThekwini North", units:15, salesMTD:6, revenue:"R3.10M", fp:"R148,000", suretyPaid:"R62,000", status:"ACTIVE", onboarded:"Jan 2025", score:84 },
  { id:"TC-PTA-002", name:"Tuta Cars Centurion", owner:"Johan van Wyk", phone:"+27 79 245 8812", email:"centurion@tutacars.co.za", location:"Centurion, Gauteng", territory:"Tshwane South", units:5, salesMTD:1, revenue:"R980K", fp:"R95,000", suretyPaid:"R28,000", status:"CONDITIONAL", onboarded:"Mar 2025", score:71 },
  { id:"TC-JHB-009", name:"Tuta Cars Roodepoort", owner:"Thandi Mokoena", phone:"+27 82 512 3344", email:"roodepoort@tutacars.co.za", location:"Roodepoort, Gauteng", territory:"West Rand", units:10, salesMTD:3, revenue:"R1.95M", fp:"R310,000", suretyPaid:"R50,000", status:"ACTIVE", onboarded:"Feb 2025", score:79 },
  { id:"TC-MPM-001", name:"Tuta Cars Nelspruit", owner:"Andile Khumalo", phone:"+27 73 889 2201", email:"nelspruit@tutacars.co.za", location:"Nelspruit, Mpumalanga", territory:"Ehlanzeni District", units:7, salesMTD:2, revenue:"R1.30M", fp:"R120,000", suretyPaid:"R38,000", status:"ACTIVE", onboarded:"Mar 2025", score:77 },
  { id:"TC-ECP-001", name:"Tuta Cars Gqeberha", owner:"Ronaldo Ferreira", phone:"+27 84 301 5578", email:"gqeberha@tutacars.co.za", location:"Gqeberha, EC", territory:"Nelson Mandela Bay", units:6, salesMTD:2, revenue:"R1.18M", fp:"R88,000", suretyPaid:"R32,000", status:"ACTIVE", onboarded:"Apr 2025", score:74 },
  { id:"TC-NW-001", name:"Tuta Cars Rustenburg", owner:"Kelebogile Motsepe", phone:"+27 76 441 9923", email:"rustenburg@tutacars.co.za", location:"Rustenburg, NW", territory:"Bojanala Platinum", units:0, salesMTD:0, revenue:"—", fp:"—", suretyPaid:"R25,000", status:"ONBOARDING", onboarded:"May 2025", score:0 },
  { id:"TC-JHB-003", name:"Tuta Cars Randburg", owner:"Fatima Patel", phone:"+27 83 210 4456", email:"randburg@tutacars.co.za", location:"Randburg, Gauteng", territory:"Joburg West", units:9, salesMTD:3, revenue:"R1.75M", fp:"R162,000", suretyPaid:"R45,000", status:"ACTIVE", onboarded:"Feb 2025", score:82 },
  { id:"TC-CPT-007", name:"Tuta Cars Bellville", owner:"Gareth Hendricks", phone:"+27 71 667 3389", email:"bellville@tutacars.co.za", location:"Bellville, WC", territory:"Cape Town East", units:11, salesMTD:4, revenue:"R2.20M", fp:"R198,000", suretyPaid:"R52,000", status:"ACTIVE", onboarded:"Feb 2025", score:86 },
  { id:"TC-DBN-002", name:"Tuta Cars Pinetown", owner:"Aisha Cassim", phone:"+27 82 774 6612", email:"pinetown@tutacars.co.za", location:"Pinetown, KZN", territory:"eThekwini West", units:13, salesMTD:5, revenue:"R2.60M", fp:"R210,000", suretyPaid:"R58,000", status:"ACTIVE", onboarded:"Jan 2025", score:85 },
  { id:"TC-PTA-005", name:"Tuta Cars Menlyn", owner:"Ruan Potgieter", phone:"+27 79 991 2244", email:"menlyn@tutacars.co.za", location:"Menlyn, Gauteng", territory:"Tshwane East", units:0, salesMTD:0, revenue:"—", fp:"—", suretyPaid:"R22,000", status:"ONBOARDING", onboarded:"Jun 2025", score:0 },
];

function badge(s:string) {
  const m:Record<string,string>={ACTIVE:"bg-emerald-900/40 text-emerald-400 border-emerald-800",CONDITIONAL:"bg-amber-900/40 text-amber-400 border-amber-800",ONBOARDING:"bg-blue-900/40 text-blue-400 border-blue-800"};
  return <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${m[s]||"bg-gray-800 text-gray-400 border-gray-700"}`}>{s}</span>;
}

function Sidebar({ open, onClose }:{ open:boolean; onClose:()=>void }) {
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
            const active = item.label==="Dealer Pods";
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

export default function PodsPage() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<typeof PODS[0]|null>(null);
  const active = PODS.filter(p=>p.status==="ACTIVE").length;
  const onboarding = PODS.filter(p=>p.status==="ONBOARDING").length;
  const totalUnits = PODS.reduce((a,p)=>a+p.units,0);

  return (
    <div className="flex h-screen bg-[#0A0A0A] overflow-hidden">
      <Sidebar open={open} onClose={()=>setOpen(false)}/>
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="sticky top-0 z-10 bg-[#0A0A0A] border-b border-[#2A2A2A] px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-gray-400 hover:text-white" onClick={()=>setOpen(true)}><Menu size={20}/></button>
            <div><p className="text-xs text-gray-500">Network Overview · June 2025</p><h1 className="font-serif text-lg font-bold text-white">Dealer Pods</h1></div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 bg-[#C41E3A] hover:bg-[#a01830] text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"><Plus size={13}/>Add Pod</button>
            <button className="relative text-gray-400 hover:text-white"><Bell size={18}/><span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#C41E3A] rounded-full text-[8px] flex items-center justify-center font-bold text-white">2</span></button>
            <a href="https://tutacars.co.za" target="_blank" rel="noopener" className="text-gray-500 hover:text-white"><ExternalLink size={16}/></a>
          </div>
        </header>
        <main className="flex-1 px-4 sm:px-6 py-6 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {label:"Total Pods", value:"12", sub:"2 onboarding", icon:Users, color:"text-[#C41E3A]"},
              {label:"Active Pods", value:String(active), sub:"Fully operational", icon:CheckCircle, color:"text-emerald-400"},
              {label:"In Onboarding", value:String(onboarding), sub:"Est. live in 30 days", icon:Clock, color:"text-blue-400"},
              {label:"Total Units Live", value:String(totalUnits), sub:"Across all pods", icon:Package, color:"text-amber-400"},
            ].map(k=>(
              <div key={k.label} className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-4">
                <div className="flex items-center justify-between mb-2"><p className="text-xs text-gray-500">{k.label}</p><k.icon size={15} className={k.color}/></div>
                <p className={`font-serif text-2xl font-bold ${k.color} mb-0.5`}>{k.value}</p>
                <p className="text-[11px] text-gray-500">{k.sub}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#2A2A2A]">
              <h2 className="font-serif text-sm font-bold text-white">All Dealer Pods</h2>
              <span className="text-xs text-gray-500">{PODS.length} total</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="border-b border-[#2A2A2A]">{["Pod ID","Dealer / Owner","Territory","Units","Sales MTD","Revenue MTD","Floor Plan","Credit Score","Status","Since"].map(h=><th key={h} className="px-4 py-2.5 text-left text-gray-500 font-medium uppercase tracking-wider text-[10px] whitespace-nowrap">{h}</th>)}</tr></thead>
                <tbody className="divide-y divide-[#1E1E1E]">
                  {PODS.map(p=>(
                    <tr key={p.id} className="hover:bg-[#1A1A1A] cursor-pointer" onClick={()=>setSelected(selected?.id===p.id?null:p)}>
                      <td className="px-4 py-3 text-white font-medium">{p.id}</td>
                      <td className="px-4 py-3"><p className="text-white">{p.name}</p><p className="text-gray-500 text-[10px]">{p.owner}</p></td>
                      <td className="px-4 py-3 text-gray-400"><span className="flex items-center gap-1"><MapPin size={10}/>{p.territory}</span></td>
                      <td className="px-4 py-3 text-white">{p.units}</td>
                      <td className="px-4 py-3 text-white">{p.salesMTD}</td>
                      <td className="px-4 py-3 text-[#C41E3A] font-medium">{p.revenue}</td>
                      <td className="px-4 py-3 text-gray-300">{p.fp}</td>
                      <td className="px-4 py-3"><span className={`font-serif font-bold ${p.score>=80?"text-emerald-400":p.score>=65?"text-amber-400":p.score>0?"text-red-400":"text-gray-600"}`}>{p.score>0?p.score:"—"}</span></td>
                      <td className="px-4 py-3">{badge(p.status)}</td>
                      <td className="px-4 py-3 text-gray-500">{p.onboarded}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {selected && (
            <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
              <div className="flex items-start justify-between mb-4">
                <div><h3 className="font-serif font-bold text-white text-base">{selected.name}</h3><p className="text-gray-500 text-xs mt-0.5">{selected.id} · {selected.territory}</p></div>
                <button onClick={()=>setSelected(null)} className="text-gray-500 hover:text-white"><X size={16}/></button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-400"><Users size={13} className="text-[#C41E3A]"/>{selected.owner}</div>
                <div className="flex items-center gap-2 text-sm text-gray-400"><Phone size={13} className="text-[#C41E3A]"/>{selected.phone}</div>
                <div className="flex items-center gap-2 text-sm text-gray-400"><Mail size={13} className="text-[#C41E3A]"/>{selected.email}</div>
                <div className="flex items-center gap-2 text-sm text-gray-400"><MapPin size={13} className="text-[#C41E3A]"/>{selected.location}</div>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {[["Surety Paid",selected.suretyPaid],["Floor Plan",selected.fp],["Units Live",String(selected.units)],["Sales MTD",String(selected.salesMTD)],["Revenue MTD",selected.revenue],["Credit Score",selected.score>0?`${selected.score}/100`:"N/A"]].map(([k,v])=>(
                  <div key={k} className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg p-3"><p className="text-[10px] text-gray-500 mb-1">{k}</p><p className="text-sm font-bold text-white">{v}</p></div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
