"use client";
import { useState } from "react";
import { LayoutDashboard, Users, CreditCard, ShieldAlert, FileText, Package, TrendingUp, Newspaper, FolderOpen, Menu, X, LogOut, Bell, ExternalLink, MapPin, Search, Download, Car, Fuel, Gauge } from "lucide-react";

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

const VEHICLES = [
  { id:"VH-001", pod:"TC-JHB-001", make:"Toyota", model:"Hilux 2.8 GD-6 Legend D/C", year:2023, price:589900, km:"28,400 km", fuel:"Diesel", days:8, status:"LIVE", location:"Sandton, GP" },
  { id:"VH-002", pod:"TC-CPT-003", make:"BMW", model:"320i M Sport Auto", year:2022, price:489900, km:"41,200 km", fuel:"Petrol", days:14, status:"LIVE", location:"Sea Point, WC" },
  { id:"VH-003", pod:"TC-DBN-001", make:"VW", model:"Tiguan 2.0 TSI R-Line 4Motion", year:2023, price:569900, km:"15,800 km", fuel:"Petrol", days:4, status:"LIVE", location:"Umhlanga, KZN" },
  { id:"VH-004", pod:"TC-DBN-002", make:"Ford", model:"Ranger Wildtrak 2.0 Bi-Turbo 4x4", year:2023, price:619900, km:"22,100 km", fuel:"Diesel", days:11, status:"LIVE", location:"Pinetown, KZN" },
  { id:"VH-005", pod:"TC-JHB-003", make:"Hyundai", model:"Tucson 2.0 Premium Auto", year:2022, price:329900, km:"55,300 km", fuel:"Petrol", days:27, status:"SLOW MOVER", location:"Randburg, GP" },
  { id:"VH-006", pod:"TC-JHB-001", make:"Mercedes-Benz", model:"C200 AMG Line Auto", year:2021, price:449900, km:"62,500 km", fuel:"Petrol", days:22, status:"LIVE", location:"Sandton, GP" },
  { id:"VH-007", pod:"TC-MPM-001", make:"Isuzu", model:"D-Max 300 LX Auto D/C 4x4", year:2023, price:559900, km:"18,200 km", fuel:"Diesel", days:6, status:"LIVE", location:"Nelspruit, MP" },
  { id:"VH-008", pod:"TC-JHB-009", make:"Kia", model:"Sportage 2.0 EX Auto", year:2022, price:359900, km:"38,900 km", fuel:"Petrol", days:38, status:"SLOW MOVER", location:"Roodepoort, GP" },
  { id:"VH-009", pod:"TC-CPT-007", make:"Honda", model:"CR-V 1.5T Executive AWD", year:2022, price:419900, km:"44,700 km", fuel:"Petrol", days:12, status:"LIVE", location:"Bellville, WC" },
  { id:"VH-010", pod:"TC-DBN-001", make:"Toyota", model:"Land Cruiser 300 GX-R V6", year:2023, price:1189900, km:"19,800 km", fuel:"Diesel", days:18, status:"LIVE", location:"Umhlanga, KZN" },
  { id:"VH-011", pod:"TC-CPT-003", make:"Renault", model:"Duster 1.5 dCi Prestige", year:2022, price:239900, km:"48,100 km", fuel:"Diesel", days:31, status:"SLOW MOVER", location:"Sea Point, WC" },
  { id:"VH-012", pod:"TC-JHB-001", make:"Haval", model:"Jolion 1.5T Super Luxury", year:2023, price:299900, km:"24,600 km", fuel:"Petrol", days:9, status:"LIVE", location:"Sandton, GP" },
  { id:"VH-013", pod:"TC-DBN-002", make:"Nissan", model:"Navara 2.5 dCi Pro-4X D/C", year:2022, price:479900, km:"33,500 km", fuel:"Diesel", days:16, status:"LIVE", location:"Pinetown, KZN" },
  { id:"VH-014", pod:"TC-ECP-001", make:"Toyota", model:"Fortuner 2.8 GD-6 4x4 Auto", year:2022, price:649900, km:"41,200 km", fuel:"Diesel", days:7, status:"LIVE", location:"Gqeberha, EC" },
  { id:"VH-015", pod:"TC-PTA-002", make:"VW", model:"Polo Vivo 1.6 Highline Auto", year:2023, price:199900, km:"18,900 km", fuel:"Petrol", days:20, status:"LIVE", location:"Centurion, GP" },
];

function fmt(n:number){return "R "+n.toLocaleString("en-ZA");}
function badge(s:string){const m:Record<string,string>={LIVE:"bg-emerald-900/40 text-emerald-400 border-emerald-800","SLOW MOVER":"bg-amber-900/40 text-amber-400 border-amber-800"};return <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${m[s]||"bg-gray-800 text-gray-400 border-gray-700"}`}>{s}</span>;}

function Sidebar({open,onClose}:{open:boolean;onClose:()=>void}){return(<><{open&&<div className="fixed inset-0 z-20 bg-black/60 md:hidden" onClick={onClose}/>}<aside className={`fixed md:sticky top-0 left-0 h-screen z-30 w-56 bg-[#0D0D0D] border-r border-[#2A2A2A] flex flex-col transition-transform duration-200 ${open?"translate-x-0":"-translate-x-full md:translate-x-0"}`}><div className="flex items-center justify-between px-4 py-4 border-b border-[#2A2A2A]"><div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-[#8B0000] rounded-sm"/><span className="font-serif font-bold text-white text-sm">TUTA CAPITAL</span></div><button className="md:hidden" onClick={onClose}><X size={16}/></button></div><nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">{NAV.map((item,i)=>{if('section' in item) return <p key={i} className="px-3 pt-4 pb-1 text-[10px] uppercase tracking-widest text-gray-600">{item.section}</p>;const Icon=item.icon!;const active=item.label==="Inventory";return <a key={item.label} href={item.href} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${active?"bg-[#8B0000]/20 text-white border border-[#8B0000]/30":"text-gray-400 hover:text-white hover:bg-[#1A1A1A]"}`}><Icon size={15}/>{item.label}</a>;})}</nav><div className="border-t border-[#2A2A2A] p-4"><div className="flex items-center gap-2 mb-3"><div className="w-7 h-7 rounded-full bg-[#8B0000] flex items-center justify-center text-xs font-bold text-white">AT</div><div><p className="text-xs text-white font-medium">Anthony Tshali</p><p className="text-[10px] text-gray-500">Admin</p></div></div><button className="flex items-center gap-2 text-gray-500 hover:text-white text-xs"><LogOut size={13}/>Sign out</button></div></aside></>
  );}

export default function InventoryPage(){
  const [open,setOpen]=useState(false);
  const [q,setQ]=useState("");
  const filtered=VEHICLES.filter(v=>`${v.make} ${v.model} ${v.pod} ${v.location}`.toLowerCase().includes(q.toLowerCase()));
  const slowMovers=VEHICLES.filter(v=>v.days>=30).length;
  const totalValue=VEHICLES.reduce((a,v)=>a+v.price,0);
  return(
    <div className="flex h-screen bg-[#0A0A0A] overflow-hidden">
      <Sidebar open={open} onClose={()=>setOpen(false)}/>
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="sticky top-0 z-10 bg-[#0A0A0A] border-b border-[#2A2A2A] px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4"><button className="md:hidden text-gray-400 hover:text-white" onClick={()=>setOpen(true)}><Menu size={20}/></button><div><p className="text-xs text-gray-500">Stock Management</p><h1 className="font-serif text-lg font-bold text-white">Inventory</h1></div></div>
          <div className="flex items-center gap-3"><button className="flex items-center gap-1.5 border border-[#2A2A2A] hover:border-white text-gray-400 hover:text-white text-xs px-3 py-1.5 rounded-lg transition-colors"><Download size={13}/>Export CSV</button><button className="relative text-gray-400 hover:text-white"><Bell size={18}/><span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#C41E3A] rounded-full text-[8px] flex items-center justify-center font-bold text-white">2</span></button><a href="https://tutacars.co.za" target="_blank" rel="noopener" className="text-gray-500 hover:text-white"><ExternalLink size={16}/></a></div>
        </header>
        <main className="flex-1 px-4 sm:px-6 py-6 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[{label:"Total Units",value:String(VEHICLES.length),sub:"Across all pods",icon:Car,color:"text-[#C41E3A]"},{label:"Total Stock Value",value:"R"+Math.round(totalValue/1000000*10)/10+"M",sub:"Listed retail value",icon:Package,color:"text-emerald-400"},{label:"Avg Days on Lot",value:String(Math.round(VEHICLES.reduce((a,v)=>a+v.days,0)/VEHICLES.length)),sub:"Network average",icon:Gauge,color:"text-amber-400"},{label:"Slow Movers (30d+)",value:String(slowMovers),sub:"Pricing review needed",icon:Fuel,color:"text-red-400"}].map(k=>(
              <div key={k.label} className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-4"><div className="flex items-center justify-between mb-2"><p className="text-xs text-gray-500">{k.label}</p><k.icon size={15} className={k.color}/></div><p className={`font-serif text-2xl font-bold ${k.color} mb-0.5`}>{k.value}</p><p className="text-[11px] text-gray-500">{k.sub}</p></div>
            ))}
          </div>
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-3 border-b border-[#2A2A2A]">
              <h2 className="font-serif text-sm font-bold text-white">All Vehicles ({filtered.length})</h2>
              <div className="relative w-full sm:w-64"><Search size={13} className="absolute left-3 top-2.5 text-gray-600"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search make, model, pod..." className="w-full bg-[#0F0F0F] border border-[#2A2A2A] text-gray-300 text-xs rounded-lg pl-8 pr-3 py-2 focus:border-[#C41E3A] focus:outline-none placeholder:text-gray-600"/></div>
            </div>
            <div className="overflow-x-auto"><table className="w-full text-xs"><thead><tr className="border-b border-[#2A2A2A]">{["VH#","Pod","Vehicle","Year","Price","Mileage","Fuel","Days on Lot","Location","Status"].map(h=><th key={h} className="px-4 py-2.5 text-left text-gray-500 font-medium uppercase tracking-wider text-[10px] whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-[#1E1E1E]">{filtered.map(v=>(<tr key={v.id} className="hover:bg-[#1A1A1A]"><td className="px-4 py-3 text-gray-500">{v.id}</td><td className="px-4 py-3 text-gray-400 text-[10px]">{v.pod}</td><td className="px-4 py-3"><p className="text-white font-medium">{v.make}</p><p className="text-gray-500">{v.model}</p></td><td className="px-4 py-3 text-gray-400">{v.year}</td><td className="px-4 py-3 text-[#C41E3A] font-bold">{fmt(v.price)}</td><td className="px-4 py-3 text-gray-400">{v.km}</td><td className="px-4 py-3 text-gray-400">{v.fuel}</td><td className="px-4 py-3"><span className={`font-bold ${v.days>=30?"text-amber-400":v.days<=7?"text-emerald-400":"text-gray-300"}`}>{v.days}d</span></td><td className="px-4 py-3 text-gray-400"><span className="flex items-center gap-1"><MapPin size={10}/>{v.location}</span></td><td className="px-4 py-3">{badge(v.status)}</td></tr>))}</tbody></table></div>
          </div>
        </main>
      </div>
    </div>
  );
}
