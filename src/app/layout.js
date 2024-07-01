import { Kanit } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";

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

      <body className={`flex-col flex ${kanit.fontStyles}`}>
        <ThirdwebProvider>{children}</ThirdwebProvider>
      </body>
    </html>
  );
}
