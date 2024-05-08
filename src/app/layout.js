import { Inter } from 'next/font/google';
import './globals.css';
import { ThirdwebProvider } from "thirdweb/react";

const inter = Inter({ subsets: ['latin'] });



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>

      </head>
      <ThirdwebProvider>

      <body className={inter.fontStyles}>{children}</body>
      </ThirdwebProvider>

    </html>
  );
}
