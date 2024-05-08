import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import React from 'react';

const About = () => {
  return (
    <div>
        <Navbar/>
    <div className="max-w-4xl mx-auto px-4 py-8">
        
      <h1 className="text-3xl font-bold mb-6">About Custos Diretriz</h1>
      <p className="mb-4">
        At Custos Diretriz, we are dedicated to revolutionizing safety and security through innovative protocol platforms. Our mission is to provide cutting-edge solutions that empower individuals and communities to effectively address crime scene witnessing and streamline agreement systems.
      </p>
      <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
      <p className="mb-4">
        We envision a safer and more transparent society where individuals have the tools and resources they need to contribute to crime prevention and intervention efforts. By leveraging technology and collaboration, we strive to build a world where everyone feels empowered to make a difference in their communities.
      </p>
      <h2 className="text-2xl font-bold mb-4">Our Platforms</h2>
      <ol className="list-decimal mb-4">
        <li className="mb-2">
          <strong>Crime Scene Witnessing Record Platform:</strong> Our crime scene witnessing record platform is designed to enable individuals to document and report crime events securely and transparently. With user-friendly interfaces and robust security measures, we facilitate the collection of accurate and reliable information to aid law enforcement and community safety initiatives.
        </li>
        <li className="mb-2">
          <strong>Agreement System Platform:</strong> Our agreement system platform simplifies the process of creating, managing, and validating legal agreements. Whether it's a business contract, a rental agreement, or a partnership arrangement, our platform ensures that agreements are securely stored, easily accessible, and tamper-proof, fostering trust and accountability among parties.
        </li>
      </ol>
      <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
      <p className="mb-4">
        At Custos Diretriz, we are committed to excellence in everything we do. We prioritize user privacy, data security, and ethical practices to ensure the integrity and reliability of our platforms. By continuously innovating and adapting to the evolving needs of our users, we aim to set new standards for safety, security, and accountability in our communities.
      </p>
      <h2 className="text-2xl font-bold mb-4">Join Us</h2>
      <p className="mb-4">
        Join us on our journey to create a safer and more secure future for all. Whether you're an individual looking to report a crime or create a legally binding agreement, or a community organization seeking innovative solutions, Custos Diretriz welcomes you to explore our platforms and be part of the change. Together, we can make a meaningful impact and build a better world for generations to come.
      </p>
     
    </div>
    <Footer/>
    </div>
  );
};

export default About;
