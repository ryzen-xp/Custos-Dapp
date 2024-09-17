"use client";
import "./globals.css";
import Footer from "@/components/footer";
import Metadata from "./metadata";
import BackgroundWrapper from "@/components/backgroundwrapper";
import { WalletProvider } from "@/components/walletprovider";
import { GlobalStateProvider } from "@/context/GlobalStateProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{Metadata.title}</title>
        {Metadata.link}
      </head>
      <body className="flex flex-col min-h-screen justify-between">
        <BackgroundWrapper>
          <WalletProvider>
            <div className="w-full flex flex-col justify-between">
              <div className="min-h-screen w-full ">
                <GlobalStateProvider>{children}</GlobalStateProvider>
              </div>
              <div className="h-fit">
                <Footer />
              </div>
            </div>
          </WalletProvider>
        </BackgroundWrapper>
      </body>
    </html>
  );
}
