// pages/index.js

import Connect from '@/components/connect';
import Hero from '@/components/hero';
import Navbar from '@/components/navbar';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#090909]">

      <main className="">
      <Navbar/>
        <Hero/>
      </main>
      
    </div>
  );
}
