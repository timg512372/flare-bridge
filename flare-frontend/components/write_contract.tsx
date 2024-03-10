import * as React from 'react'
import {
    type BaseError,
    useSendTransaction,
    useWaitForTransactionReceipt
} from 'wagmi'
import { parseEther } from 'viem'
import { Label } from '@radix-ui/react-label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@radix-ui/react-select'
import { LinearGradient } from 'react-text-gradients'
import ReadContract from './read_contract'
import { Button } from './ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card'
import { Input } from './ui/input'
import { useAccount, useDisconnect, useEnsAvatar, useEnsName, useReadContract } from 'wagmi'
import { abi } from '@/config/abi'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/components/ui/use-toast"


export function SendTransaction() {

    const { address } = useAccount()

    const [blockchain1, setBlockchain1] = React.useState('');
    const [blockchain2, setBlockchain2] = React.useState('');
    const [token1, setToken1] = React.useState('');
    const [token2, setToken2] = React.useState('');
    const FormSchema = z.object({
        email: z
            .string({
                required_error: "Please select an email to display.",
            })
            .email(),
    })
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    function submit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

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
                    <form onSubmit={form.handleSubmit(submit)}>

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
                                                <SelectItem value="token2" onClick={() => setToken1('Couston B@B Coin')}>B@B Coin</SelectItem>
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
                                                <SelectItem value="token1" onClick={() => setToken2('Sepolia B@B Coin')}>B@B Coin</SelectItem>
                                                <SelectItem value="token2" onClick={() => setToken2('Couston B@B Coin')}>B@B Coin</SelectItem>
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
                        <Input type="email" className="rounded-xl border-black" placeholder="Amount 0.0000" ></Input>

                    </CardFooter>
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
                        <Button className={` w-full bg-transparent border border-black text-black rounded-xl hover:border-white hover:text-white hover:bg-gradient-to-r p-[6px] from-[#E3BCB0]/50 via-[#E4A8B8]/50 to-[#93AADC]/50 rounded-full`} onClick={() => open()}>Connect</Button>
                    </CardFooter>

                </Card>
                <ReadContract />



            </div>

        </section>


    )
}