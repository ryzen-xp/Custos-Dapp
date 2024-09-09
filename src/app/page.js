"use client";

import Hero from "@/components/home/hero";
import Navbar from "@/components/navbar";
// import Footer from "@/components/footer";
import Agree from "@/components/home/agree";
import FadeInSection from "@/components/fadeInSection";

export default function Home() {
  return (
    <div className="min-h-screen kanit">
      <main className="kanit">
        <div className="mb-10">
          <Navbar />
        </div>
        <FadeInSection>
          <Hero />
        </FadeInSection>
        <Agree />
      </main>
    </div>
  );
}
