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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React, { useEffect } from "react";
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
import { WagmiProvider, useAccount, useWaitForTransactionReceipt, useWriteContract, http, createConfig } from 'wagmi'
import { config } from '../config'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import ReadContract from '@/components/read_contract'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { SendTransaction } from '@/components/write_contract'
import { toast } from '@/components/ui/use-toast'
import { useDisconnect, useEnsAvatar, useEnsName, useReadContract } from 'wagmi'
import { abi } from '@/config/abi'

import { gt_abi } from '@/config/gt_abi'
import { songbirdTestnet, sepolia } from 'wagmi/chains'

const queryClient = new QueryClient()


export default function IndexPage() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <BridgeCard />
      </QueryClientProvider>
    </WagmiProvider>

  )
}

export function BridgeCard() {
  const FormSchema = z.object({
    token1: z.string().nonempty({ message: "Please select a token." }),
    token2: z.string().nonempty({ message: "Please select a token." }),
    blockchain1: z.string().nonempty({ message: "Please select a blockchain." }),
    blockchain2: z.string().nonempty({ message: "Please select a blockchain." }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { address } = useAccount()
  const [blockchain1, setBlockchain1] = useState('');
  const [blockchain2, setBlockchain2] = useState('');
  const [token1, setToken1] = useState('');
  const [token2, setToken2] = useState('');
  const [amount, setAmount] = useState(0);
  const { data: hash, isPending, writeContract } = useWriteContract()

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash })


  async function onSubmit() {
    const approve = {
      abi,
      address: blockchain1 == 'Sepolia' ? '0x5187763e09a672eda81F27e622129Ac28393ca53' : '0x8c49e01E86d9ef98eA963Be48B1E41297E06F817',
      functionName: 'approve',
      args: [address ? address : '0x', BigInt(amount)],
      chainId: blockchain1 == 'Sepolia' ? sepolia.id : songbirdTestnet.id
    } as const
    
    await writeContract(approve, {onSuccess: () => {
      console.log("Tx succesful")
      writeContract({
      abi: gt_abi,
      address: blockchain1 == 'Sepolia' ? '0x0c2eFE1D385151870B3fFb9901B7a0FB1C5a1314' : '0x8b1274d063593F0973afF1710EA4490BE67AE9f2',
      functionName: 'sendToken',
      args: [BigInt(amount)],
      chainId: blockchain1 == 'Sepolia' ? sepolia.id : songbirdTestnet.id
    } as const, {onSuccess: () => {console.log('Tx succesful again')}}
  )}})
    
    console.log('submit')
    console.log(blockchain1, blockchain2, token1, token2, amount)
    address ? console.log(address) : console.log('no address')
    
  }

  // useEffect(() => {

  //   async function sample() {
  //     await wc2.

  //   if (isSuccess) {
  //     console.log('Transaction successful')
  //     sample()
  //   }

  // }, [isSuccess])

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
                        <SelectItem value="token1" onClick={() => setToken1('Sepolia B@B Coin')}>B@B Coin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-center h-full">
                    <hr style={{ borderLeft: "1px solid white", height: "60px", width: "1px" }} />
                  </div>

                  <div className="flex flex-col space-y-1.5 ">
                    <Label htmlFor="blockchain1" className="pl-3 pt-3">Network</Label>
                    <Select onValueChange={(v) => setBlockchain1(v)}>
                      <SelectTrigger id="blockchain1" className="bg-transparent border-transparent font-bold text-lg h-5">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="Sepolia" onClick={() => setBlockchain1('Sepolia')}>Sepolia</SelectItem>
                        <SelectItem value="Couston" onClick={() => setBlockchain1('Couston')}>Couston</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>


                </div>

              </div>

            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Input
              type="number"
              className="rounded-xl border-black"
              placeholder="Amount 0.0000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
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
                    <Select onValueChange={(v) => setToken2(v)}>
                      <SelectTrigger id="token2" className="bg-transparent border-transparent font-bold text-lg h-5">
                        <SelectValue placeholder="Select" className="font-bold" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="token1" onClick={() => setToken2('Sepolia B@B Coin')}>B@B Coin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-center h-full">
                    <hr style={{ borderLeft: "1px solid white", height: "60px", width: "1px" }} />
                  </div>
                  <div className="flex flex-col space-y-1.5 ">
                    <Label htmlFor="blockchain1" className="pl-3 pt-3">Network</Label>
                    <Select onValueChange={(v) => setBlockchain2(v)}>
                      <SelectTrigger id="blockchain2" className="bg-transparent border-transparent font-bold text-lg h-5">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="Sepolia" onClick={() => setBlockchain2('Sepolia')}>Sepolia</SelectItem>
                        <SelectItem value="Couston" onClick={() => setBlockchain2('Couston')}>Couston</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>


                </div>
              </div>
            </form>
          </CardContent>


          <CardFooter className="flex justify-between">
            <Input
              type="number"
              className="rounded-xl border-black"
              placeholder="Amount 0.0000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />          </CardFooter>
          <div className='grid grid-cols-2 flex justify-between'>
            <Label htmlFor="blockchain1" className="pl-3 pt-3 justify-self-start">Gas on Destination</Label>
            <Label htmlFor="blockchain1" className="pl-3 pt-3 justify-self-end pr-4">Add</Label>
          </div>
          <div className='grid grid-cols-3 flex justify-between'>
            <Label htmlFor="blockchain1" className="pl-3 pt-3 justify-self-start">Fees</Label>
            <Label htmlFor="blockchain1" className="pl-3 pt-3 justify-self-end pr-4">----</Label>
            <i className="fa-solid fa-user"></i>

          </div>
          <CardFooter className="flex justify-between">
            <Button className={` w-full bg-transparent border border-black text-black rounded-xl hover:border-white hover:text-white hover:bg-gradient-to-r p-[6px] from-[#E3BCB0]/50 via-[#E4A8B8]/50 to-[#93AADC]/50 rounded-full`} onClick={() => onSubmit()}>Connect</Button>
          </CardFooter>

        </Card>
        <ReadContract />



      </div>

    </section>
  )
}
