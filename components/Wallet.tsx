"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useWallet } from "@solana/wallet-adapter-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


export default function Wallet() {
    const { select, wallets, publicKey, disconnect } = useWallet();

    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="outline" className="mb-4">
                    {!publicKey ? (
                        <>
                            Wallet Connect
                        </>
                    ) : (
                        <>
                            Connected
                        </>
                    )}
                </Button>
                {!publicKey ? (
                    <>
                        <DialogDescription>
                            Connect your wallet
                        </DialogDescription>
                    </>
                ) : (
                    <>
                        <DialogDescription>
                            Connected to {publicKey.toBase58()}
                        </DialogDescription>
                    </>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Connect Your Wallet</DialogTitle>
                    {
                        !publicKey ? (
                            <div className="flex flex-col gap-4 items-center pt-6">
                                {wallets.filter((wallet) => wallet.readyState === "Installed").length > 0 ? (
                                    wallets.filter((wallet) => wallet.readyState === "Installed").map((wallet) => (
                                        <Button
                                            key={wallet.adapter.name}
                                            variant="secondary"
                                            className="w-full max-w-[80%] gap-2 items-center"
                                            onClick={() => select(wallet.adapter.name)}
                                        >
                                            <Image
                                                src={wallet.adapter.icon}
                                                alt={wallet.adapter.name}
                                                width={24}
                                                height={24}
                                            />
                                            {wallet.adapter.name}
                                        </Button>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </div>
                        ) : (
                            <>
                                <DialogDescription>
                                    Connected to {publicKey.toBase58()}
                                </DialogDescription>
                                <Button onClick={disconnect}>
                                    Disconnect
                                </Button>
                            </>
                        )
                    }
                </DialogHeader>
            </DialogContent>
        </Dialog>

    );

    // return !publicKey ? (
    //     <div className="flex gap-4 items-center">
    //         {wallets.filter((wallet) => wallet.readyState === "Installed").length > 0 ? (
    //             wallets.filter((wallet) => wallet.readyState === "Installed").map((wallet) => (
    //                 <Button
    //                     key={wallet.adapter.name}
    //                     onClick={() => select(wallet.adapter.name)}
    //                 >
    //                     <Image
    //                         src={wallet.adapter.icon}
    //                         alt={wallet.adapter.name}
    //                         width={24}
    //                         height={24}
    //                     />
    //                     {wallet.adapter.name}
    //                 </Button>
    //             ))
    //         ) : (
    //             <></>
    //         )}
    //     </div>
    // ) : (
    //     <Button onClick={disconnect}>Disconnect</Button>
    // );
}