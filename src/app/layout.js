"use client";
import "./globals.css";
import Footer from "@/components/footer";
import Metadata from "./metadata";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{Metadata.title}</title>
        {Metadata.link}
        <link id="theme-stylesheet" rel="stylesheet" href="/global.css" />
      </head>

      <body className={`flex flex-col min-h-screen`}>
        <div className="">{children}</div>
        <div className="mobile-footer">
          <Footer />
        </div>
      </body>
    </html>
  );
}
