"use client";
import { Kanit } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Metadata from "./metadata";
import { ThirdwebProvider } from "thirdweb/react";

const kanit = Kanit({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["vietnamese"],
});

import BackgroundWrapper from "@/components/backgroundwrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{Metadata.title}</title>
        {Metadata.link}
      </head>
      <body className={`flex flex-col min-h-screen ${kanit.className}`}>
      <BackgroundWrapper>

        <ThirdwebProvider>
          <div className="flex-grow">{children}</div>
          <div className="mobile-footer">
            <Footer />
          </div>
        </ThirdwebProvider>
      </BackgroundWrapper>
      </body>
    </html>
  );
}
