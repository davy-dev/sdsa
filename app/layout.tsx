import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import HydrationFix from "@/components/hydration-fix"
import Navigation from "@/components/navigation"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "SDSA - Serrurerie Dépannage et Sécurisation d'Accès",
  description:
    "Service complet de serrurerie disponible 7j/7 en Île-de-France. Intervention rapide pour ouverture de portes, installation de serrures de sécurité et portes blindées.",
  keywords: "serrurerie, dépannage, porte blindée, serrure, Yvelines, Essonne, Île-de-France, urgence",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased -mt-[80px]">
        <HydrationFix />
        <Navigation />
        {children}
      </body>
    </html>
  )
}
