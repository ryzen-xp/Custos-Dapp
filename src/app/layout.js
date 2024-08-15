"use client";
import "./globals.css";
import Footer from "@/components/footer";
import Metadata from "./metadata";
import BackgroundWrapper from "@/components/backgroundwrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{Metadata.title}</title>
        {Metadata.link}
      </head>
      <body className={`flex flex-col min-h-screen`}>
        <BackgroundWrapper>
          <div className="flex-grow">{children}</div>
          <div className="mobile-footer">
            <Footer />
          </div>
        </BackgroundWrapper>
      </body>
    </html>
  );
}
