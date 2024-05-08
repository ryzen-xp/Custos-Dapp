// pages/index.js

import Connect from '@/components/connect';
import Hero from '@/components/hero';
import Navbar from '@/components/navbar';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-[#090909]">
      <Navbar/>
        <Hero/>
      </main>
      
    </div>
  );
}
