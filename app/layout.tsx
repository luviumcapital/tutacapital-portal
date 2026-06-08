import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Tuta Capital — Dealer Portal", description: "Internal portal for Tuta Cars franchise dealer pods." };
export default function RootLayout({ children }: { children: React.ReactNode }) { return (<html lang="en"><body className="bg-[#0A0A0A] text-white antialiased">{children}</body></html>); }
