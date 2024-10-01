"use client";
import { usePathname } from "next/navigation";
import "./globals.css";
import Footer from "@/components/footer";
import Metadata from "./metadata";
import BackgroundWrapper from "@/components/backgroundwrapper";
import { WalletProvider } from "@/components/walletprovider";
import { GlobalStateProvider } from "@/context/GlobalStateProvider";

export default function RootLayout({ children }) {
  // const pathname = usePathname();

  // if (pathname.includes("/crimerecorder")) {
  //   return (
  //     <html lang="en">
  //       <head>
  //         <title>404 Not Found</title>
  //       </head>
  //       <body className="flex flex-col min-h-screen justify-between">
  //         <BackgroundWrapper>
  //           <div className="w-full flex flex-col justify-center items-center min-h-screen">
  //             <h1 className="text-4xl text-white">404 - Page Not Found</h1>
  //           </div>
  //         </BackgroundWrapper>
  //       </body>
  //     </html>
  //   );
  // }

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
