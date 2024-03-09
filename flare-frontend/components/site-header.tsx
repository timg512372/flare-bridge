"use client"
import Link from "next/link"
<<<<<<< HEAD
=======

>>>>>>> 0d4e8702a2683b055867cca5de6253e4fc4509dd
import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { useWeb3Modal } from "@web3modal/wagmi/react"
import { useAccount, useDisconnect } from "wagmi"
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

export function SiteHeader() {
  const { open } = useWeb3Modal();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect()


  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {address ? (
              <><AlertDialog>
                <AlertDialogTrigger>
<<<<<<< HEAD
                <Button className={` ${buttonVariants()}`}>
=======
                  <Button>
>>>>>>> 0d4e8702a2683b055867cca5de6253e4fc4509dd
                    Connected
                    <span className="ml-2 h-2 w-2 bg-green-500 rounded-full inline-block"></span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Disconnect?</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
<<<<<<< HEAD
                    <AlertDialogAction className="bg-gradient-to-r p-[6px] from-[#E3BCB0] via-[#E4A8B8] to-[#93AADC] rounded-xl" onClick={() => disconnect()}>Disconnect</AlertDialogAction>
=======
                    <AlertDialogAction onClick={() => disconnect()}>Disconnect</AlertDialogAction>
>>>>>>> 0d4e8702a2683b055867cca5de6253e4fc4509dd
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              </>
            ) : (
<<<<<<< HEAD
              <Button className={`bg-transparent border border-black text-black rounded-xl hover:border-white hover:text-white hover:bg-gradient-to-r p-[6px] from-[#E3BCB0] via-[#E4A8B8] to-[#93AADC] rounded-xl`} onClick={() => open()}>Connect Wallet</Button>                   
              )}
=======
              <Button onClick={() => open()}>Connect Wallet</Button>
            )}
            <ThemeToggle />
>>>>>>> 0d4e8702a2683b055867cca5de6253e4fc4509dd
          </nav>
        </div>
      </div>
    </header>
  )
}
export function ConnectButton() {
  return <w3m-button />
}