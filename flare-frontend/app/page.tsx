"use client"
import { LinearGradient } from 'react-text-gradients'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from 'react';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "@/components/ui/form"
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  username: z.string().min(2).max(50),
})

export default function IndexPage() {
  return (
    <BridgeCard />
  )
}

export function BridgeCard() {
  const [blockchain1, setBlockchain1] = useState('');
  const [blockchain2, setBlockchain2] = useState('');
  const [token1, setToken1] = useState('');
  const [token2, setToken2] = useState('');


  return (


    <section className="container flex items-center justify-center gap-6 pb-8 pt-6 md:py-10 h-screen ">
      <div className="flex-1 transform translate-x-56 pb-96">
        <h1 className="text-3xl font-extrabold leading-tight tracking-normal md:text-5xl">
            <LinearGradient gradient={['to bottom right', '#E3BCB0 ,#E4A8B8, #93AADC']}>
            Bridge.
          </LinearGradient>
        </h1>
        <p className="max-w-[700px] text-xl text-muted-foreground pt-2">
          <LinearGradient gradient={['to bottom right', '#E3BCB0 ,#E4A8B8, #93AADC']}>
            Seamlessly send your assets <br className="hidden sm:inline" />across chains.
          </LinearGradient>
        </p>
      </div>
      <div className="flex-1">

        <Card className="w-[500px]">
          <CardHeader>
            <CardTitle>From</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="grid grid-cols-3 gap-4 bg-gradient-to-r p-[6px] from-[#E3BCB0]/90 via-[#E4A8B8]/90 to-[#93AADC]/90 rounded-xl">

                  <div className="grid grid-col-3 space-y-1.5">

                    <Label htmlFor="token1" className="pl-3 pt-3">Token</Label>
                    <Select>

                      <SelectTrigger id="token1" className="bg-transparent border-transparent font-bold text-lg h-5">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="token1" onClick={() => setToken1('ethereum')}>Ethereum</SelectItem>
                        <SelectItem value="token2" onClick={() => setToken1('bitcoin')}>Bitcoin</SelectItem>
                        <SelectItem value="token3" onClick={() => setToken1('cardano')}>Cardano</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-center h-full">
                    <hr style={{ borderLeft: "1px solid white", height: "60px", width: "1px" }} />
                  </div>

                  <div className="flex flex-col space-y-1.5 ">
                    <Label htmlFor="blockchain1" className="pl-3 pt-3">Network</Label>
                    <Select>
                      <SelectTrigger id="blockchain1" className="bg-transparent border-transparent font-bold text-lg h-5">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="ethereum" onClick={() => setBlockchain1('ethereum')}>Ethereum</SelectItem>
                        <SelectItem value="bitcoin" onClick={() => setBlockchain1('bitcoin')}>Bitcoin</SelectItem>
                        <SelectItem value="cardano" onClick={() => setBlockchain1('cardano')}>Cardano</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>


                </div>

              </div>

            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Input type="email" className="rounded-xl border-black" placeholder="Amount 0.0000" >
            </Input>
          </CardFooter>
          <CardHeader>
            <CardTitle>To</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="grid grid-cols-3 gap-4 bg-gradient-to-r p-[6px] from-[#E3BCB0]/90 via-[#E4A8B8]/90 to-[#93AADC]/90 rounded-xl">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="token2" className="pl-3 pt-3">Token</Label>
                    <Select>
                      <SelectTrigger id="token2" className="bg-transparent border-transparent font-bold text-lg h-5">
                        <SelectValue placeholder="Select" className="font-bold" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="token1" onClick={() => setToken2('ethereum')}>Ethereum</SelectItem>
                        <SelectItem value="token2" onClick={() => setToken2('bitcoin')}>Bitcoin</SelectItem>
                        <SelectItem value="token3" onClick={() => setToken2('cardano')}>Cardano</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-center h-full">
                    <hr style={{ borderLeft: "1px solid white", height: "60px", width: "1px" }} />
                  </div>
                  <div className="flex flex-col space-y-1.5 ">
                    <Label htmlFor="blockchain1" className="pl-3 pt-3">Network</Label>
                    <Select>
                      <SelectTrigger id="blockchain2" className="bg-transparent border-transparent font-bold text-lg h-5">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="ethereum" onClick={() => setBlockchain2('ethereum')}>Ethereum</SelectItem>
                        <SelectItem value="bitcoin" onClick={() => setBlockchain2('bitcoin')}>Bitcoin</SelectItem>
                        <SelectItem value="cardano" onClick={() => setBlockchain2('cardano')}>Cardano</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>


                </div>
              </div>
            </form>
          </CardContent>
          

          <CardFooter className="flex justify-between">
            <Input type="email" className="rounded-xl border-black" placeholder="Amount 0.0000" ></Input>

          </CardFooter>
          <div className='grid grid-cols-2 flex justify-between'>
            <Label htmlFor="blockchain1" className="pl-3 pt-3 justify-self-start">Gas on Destination</Label>
            <Label htmlFor="blockchain1" className="pl-3 pt-3 justify-self-end pr-4">Add</Label>
          </div>
          <div className='grid grid-cols-2 flex justify-between'>
            <Label htmlFor="blockchain1" className="pl-3 pt-3 justify-self-start">Fees</Label>
            <Label htmlFor="blockchain1" className="pl-3 pt-3 justify-self-end pr-4">----</Label>
          </div>
          <CardFooter className="flex justify-between">
            <Button className={` w-full bg-transparent border border-black text-black rounded-xl hover:border-white hover:text-white hover:bg-gradient-to-r p-[6px] from-[#E3BCB0]/50 via-[#E4A8B8]/50 to-[#93AADC]/50 rounded-full`} onClick={() => open()}>Connect</Button>
          </CardFooter>
          
        </Card>



      </div>

    </section>
  )
}
