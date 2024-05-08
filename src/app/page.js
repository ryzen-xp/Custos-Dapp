// pages/index.js

import Connect from '@/components/connect';
import Hero from '@/components/hero';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#090909]">

      <main className="">
      <Navbar/>
        <Hero/>
        <Footer/>
      </main>
      
    </div>
  );
}
