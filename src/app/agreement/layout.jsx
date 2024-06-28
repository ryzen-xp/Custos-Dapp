import { Kanit } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/navbar";

export default function RootLayout({ children }) {
     const metadata = {
        title: "Custos Diretriz",
        description: "Onchain security platform",
        link: <link rel="icon" href="/favicon.png" />,
      };
      
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        {metadata.link}
      </head>
      {/* <ThirdwebProvider> */}
        

        <body className={`flex-col flex ` }>
            <Navbar />
            <div className="px-6 w-full flex flex-col">

        <h1 className="text-3xl text-white font-bold">
       Agreements
      </h1>
          {children}
            </div>
          </body>

        {/* <Footer /> */}
      {/* </ThirdwebProvider> */}
    </html>
  );
}
