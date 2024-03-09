"use client"


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


  return (

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
  )
}
