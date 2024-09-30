"use client";
import "../globals.css";
import Footer from "@/components/footer";
import Metadata from "../metadata";
import BackgroundWrapper from "@/components/backgroundwrapper";

import Sidepane from "@/components/dapps/sidepane";
import Header from "@/components/dapps/header";

export default function RootLayout({ children }) {
  return (

        
<div className="flex min-h-screen w-full">
        <div className="w-fit hidden h-full z-[10] bg-gray-800 sticky md:flex top-0 bottom-0">
          <Sidepane />
        </div>



        <div className="w-full min-h-screen flex flex-col">
          
          <div className=" left-0  right-0  fixed" >
            <Header />
          </div>

          {/* Children Content */}
          <div className="flex flex-col px-3 w-full mt-[5%]">
            <div className="w-full px-8 flex flex-col">
              {children}
            </div>

            
          </div>
        </div>
</div>

  );
}
