import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
<<<<<<< HEAD
import logo from "./flare_logo.png"
=======
>>>>>>> 0d4e8702a2683b055867cca5de6253e4fc4509dd

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
<<<<<<< HEAD
        <img src={logo.src} alt="Logo" style={{ width: "90px", height: "25px" }}/>        
=======
        <Icons.llogo className="h-6 w-6" />
        <span className="inline-block font-bold">{siteConfig.name}</span>
>>>>>>> 0d4e8702a2683b055867cca5de6253e4fc4509dd
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
