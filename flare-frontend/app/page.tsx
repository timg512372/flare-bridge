"use client"
<<<<<<< HEAD
import { LinearGradient } from 'react-text-gradients'
=======


>>>>>>> 0d4e8702a2683b055867cca5de6253e4fc4509dd
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
<<<<<<< HEAD
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

=======
>>>>>>> 0d4e8702a2683b055867cca5de6253e4fc4509dd
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
<<<<<<< HEAD
import { Input } from '@/components/ui/input'
=======
>>>>>>> 0d4e8702a2683b055867cca5de6253e4fc4509dd

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
<<<<<<< HEAD
  const [token1, setToken1] = useState('');
  const [token2, setToken2] = useState('');
=======
>>>>>>> 0d4e8702a2683b055867cca5de6253e4fc4509dd


  return (

<<<<<<< HEAD

    <section className="container flex items-center justify-center gap-6 pb-8 pt-6 md:py-10 h-screen">
      <div className="flex-1 transform -translate-y-9">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          <LinearGradient gradient={['to bottom right', '#E3BCB0 ,#E4A8B8, #93AADC']}>
            Bridge.
          </LinearGradient>
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          <LinearGradient gradient={['to bottom right', '#E3BCB0 ,#E4A8B8, #93AADC']}>
            Seamlessly send your assets across chains.
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
                      <SelectTrigger id="blokchain2" className="bg-transparent border-transparent font-bold text-lg h-5">
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
          <CardFooter className="flex justify-between">
            <Button className={` w-full bg-transparent border border-black text-black rounded-xl hover:border-white hover:text-white hover:bg-gradient-to-r p-[6px] from-[#E3BCB0]/50 via-[#E4A8B8]/50 to-[#93AADC]/50 rounded-xl`} onClick={() => open()}>Connect Wallet</Button>
          </CardFooter>
        </Card>



      </div>

    </section>
=======
    <section className="container grid items-center justify-center gap-6 pb-8 pt-6 md:py-10 flex h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Bridge</CardTitle>
          <CardDescription>Seamlessly send your assets across chains.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="blockchain1">Blockchain 1</Label>
                <Select>
                  <SelectTrigger id="blockchain1">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="ethereum" onClick={() => setBlockchain1('ethereum')}>Ethereum</SelectItem>
                    <SelectItem value="bitcoin" onClick={() => setBlockchain1('bitcoin')}>Bitcoin</SelectItem>
                    <SelectItem value="cardano" onClick={() => setBlockchain1('cardano')}>Cardano</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="blockchain1">Blockchain 1</Label>
                <Select>
                  <SelectTrigger id="blockchain2">
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
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
       
      </Card>
        </section>
>>>>>>> 0d4e8702a2683b055867cca5de6253e4fc4509dd
  )
}
