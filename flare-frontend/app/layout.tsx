import "@/styles/globals.css"
import { Metadata, Viewport } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { headers } from 'next/headers'

import { cookieToInitialState } from 'wagmi'

import { config } from '@/config'
import { ContextProvider } from '@/context'


export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}


interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
  className={cn(
    "min-h-screen bg-gradient-to-r p-[6px] from-[#E3BCB0]/25 via-[#E4A8B8]/25 to-[#93AADC]/25 font-sans antialiased",
    fontSans.variable
  )}
>
            <ContextProvider initialState={initialState}>
                <div className="relative flex flex-col min-h-screen">
                  <SiteHeader />
                  <div className="flex-1">{children}</div>
                </div>
                <TailwindIndicator />
            </ContextProvider>
        
        </body>
      </html>
    </>
  )
}
