"use client"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { useWeb3Modal } from "@web3modal/wagmi/react"
import { WagmiProvider, useAccount, useDisconnect } from "wagmi"
import { Label } from "@radix-ui/react-label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { config } from '../config' 
const queryClient = new QueryClient() 

export function SiteHeader() {
  const { open } = useWeb3Modal();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect()


  return (
    <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}> 
    <header className="sticky top-0 z-40 w-full bg-transparent ">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {address ? (
              <><AlertDialog>
                <AlertDialogTrigger>
                <Button className={` ${buttonVariants()}`}>
                    Connected
                    <span className="ml-2 inline-block size-2 rounded-full bg-green-500"></span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Disconnect?</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="rounded-xl bg-gradient-to-r from-[#E3BCB0] via-[#E4A8B8] to-[#93AADC] p-[6px]" onClick={() => disconnect()}>Disconnect</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              </>
            ) : (
              <Button className={`rounded-xl border border-black bg-transparent from-[#E3BCB0] via-[#E4A8B8] to-[#93AADC] p-[6px] text-black hover:border-white hover:bg-gradient-to-r hover:text-white`} onClick={() => open()}>Connect Wallet</Button>                   
              )}
          </nav>
        </div>
      </div>
    </header>
    </QueryClientProvider> 
    </WagmiProvider>
  )
}
export function ConnectButton() {
  return <w3m-button />
}