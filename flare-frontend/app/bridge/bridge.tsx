import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function BridgePage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Introducing Underground  <br className="hidden sm:inline" />
          A Capital-Efficient Blockchain Bridge.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
        Discover the seamless integration of our blockchain bridge with 
        Flare's State Connector, enabling access to non-changing, 
        verifiable information from external sources, and the Flare Time Series Oracle for continuous estimations, 
        particularly for Price Feeds.
        </p>
      </div>
      
      <div className="flex gap-4">
                <Link
                    href={siteConfig.links.docs}
                    target="_blank"
                    rel="noreferrer"
                    className={buttonVariants()}
                >
                    Connect Wallet
                </Link>
                
            </div>
    </section>
  )
}
