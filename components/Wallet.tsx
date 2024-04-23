"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useWallet } from "@solana/wallet-adapter-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


export default function Wallet() {
    const { select, wallets, publicKey, disconnect } = useWallet();

    return (
        <div className="flex flex-col">
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
                                        <Button onClick={() => (window.open("https://phantom.app/","_blank"))}>
                                            Download Phantom Wallet
                                        </Button>
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
            <div>
                {!publicKey ? (
                    <h3>Connect your wallet</h3>
                ) : (
                    <div className="flex flex-col items-center">
                        <h3>Connected to</h3>
                        <h3 className="text-blue-500">{publicKey.toBase58()}</h3>
                    </div>
                )}
            </div>
        </div>
    );
}