// pages/index.js

import Connect from "@/components/connect";
import Hero from "@/components/home/hero";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Head from "next/head";
import Agree from "@/components/home/agree";

export default function Home() {
  return (
    <div className="min-h-screen kanit">
      <main className="kanit">
        <Hero />
        <Agree />
      </main>
    </div>
  );
}
