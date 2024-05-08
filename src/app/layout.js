import { Kanit } from 'next/font/google';
import './globals.css';
import { ThirdwebProvider } from "thirdweb/react";
import Footer from '@/components/footer';

const kanit = Kanit({
    weight: ["400", "500", "600", "700", "800", "900"],
   subsets: ['vietnamese']
   });



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThirdwebProvider>

      <body className={kanit.fontStyles}>{children}</body>

      <Footer/>
      </ThirdwebProvider>

    </html>
  );
}
