import { Kanit } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import Footer from "@/components/footer";

const kanit = Kanit({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["vietnamese"],
});

export const metadata = {
  title: "Custos Diretriz",
  description: "The new blockchain safe",
  link: <link rel="icon" href="/favicon.png" />,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        {metadata.link}
      </head>

      <body className={`flex flex-col min-h-screen ${kanit.fontStyles}`}>
        <ThirdwebProvider>
          <div className="flex-grow">{children}</div>
          <div className="mobile-footer">
          
          </div>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
