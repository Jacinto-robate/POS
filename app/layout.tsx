import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "./context/cart-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sistema POS",
  description: "Sistema de Ponto de Venda",
  generator: 'Jacinto.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body className={`${inter.className} bg-gray-100`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
