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
  description: "Onchain security platform",
  link: <link rel="icon" href="/favicon.png" />,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        {metadata.link}
      </head>
      <ThirdwebProvider>
        <body className={kanit.fontStyles}>{children}</body>

        <Footer />
      </ThirdwebProvider>
    </html>
  );
}
