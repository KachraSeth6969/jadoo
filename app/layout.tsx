import type React from "react"
import type { Metadata } from "next"
import { Inter, Caveat, Kalam } from "next/font/google"
import "./globals.css"

// Load fonts with proper fallbacks
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-handwriting",
  display: "swap",
})

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-handwriting-alt",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Virtual Gift Book - A Digital Keepsake",
  description:
    "A beautiful virtual flipbook created with love, featuring realistic page animations and heartfelt memories.",
  keywords: ["virtual book", "digital gift", "flipbook", "memories"],
  authors: [{ name: "Virtual Gift Book" }],
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${caveat.variable} ${kalam.variable}`}>
      <body className="font-sans antialiased bg-warm-gray-50 text-warm-gray-900">{children}</body>
    </html>
  )
}
