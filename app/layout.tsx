"use client";

import "./globals.css";
import React, { useMemo } from "react";
import { Inter } from "next/font/google";
import { clusterApiUrl } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const wallets = useMemo(() => [new PhantomWalletAdapter()], []);
    const endpoint = useMemo(() => clusterApiUrl("mainnet-beta"), []);

    return (
        <html lang="en">
            <body className={inter.className}>
                <ConnectionProvider endpoint={endpoint}>
                    <WalletProvider wallets={wallets} autoConnect>
                        {children}
                    </WalletProvider >
                </ConnectionProvider >
            </body>
        </html>
    );
}
