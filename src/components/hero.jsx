import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
const Hero = () => {
  return (
    <div className="bg-[#090909] text-white py-20 mx-auto flex flex-col">
      <div className="flex flex-row w-fit mx-auto">

        <div className="flex-1 max-w-4xl mx-auto px-20 bg-[#090909]">
          <h1 className="font-bold mb-4 text-[#7611f7] text-xl">WELCOME TO CUSTOS</h1>
          <p className="font-bold text-6xl mb-8 w-full">Secure your <span className="text-[#7611f7]">Cyberspace</span>, secure your <span className="text-[#7611f7]">Digital Life</span></p>
          <span className="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi beatae 
            voluptatum neque architecto, iure incidunt recusandae voluptas non vero minus tenetur earum ratione distinctio labore dolorem soluta, laudantium perferendis saepe.</span>

          <div className="my-8 py-5">
            <button className="bg-[#7611f7] hover:bg-[#090909] text-white font-bold py-2 px-4 border-2 border-[#7611f7] font-san hover:border-[#7611f7]">Get Started</button>
          </div>
        </div>

        <div className="flex-1 max-w-4xl mx-auto">
          <Image
            src="/Mockup.png" 
            alt=""
            width={500}
            height={300} 
            className="rounded-lg hover:transition-transform duration-300"
          />
        </div>
      </div>

      <div>
        <h5 className="text-center font-bold font-san mb-4 text-[#7611f7] my-5 text-xl">THE POWER OF CUSTOS</h5>
        <div className="flex flex-row my-10 mx-10">
          <div className="flex-grow flex flex-col items-center border-2 border-[#181818] mx-2 p-10 hover:border-[#7611f7] justify-center w-full">
            <Image
              src="/secure.png" 
              alt=""
              width={60}
              height={30} 
              className="rounded mt-5"
            />
            <h2 className="text-center font-san text-4xl my-5">Eye witness</h2>
            <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe expedita sint molestiae aut minima assumenda eius dolorem exercitationem repellat eligendi deleniti, recusandae, ratione officia beatae incidunt veniam eveniet dolorum amet!</p>
          </div>
          <div className="flex-grow flex flex-col border-2 border-[#181818] hover:border-[#7611f7] items-center mx-2 p-10 justify-center w-full">
            <Image
              src="/agre.png" 
              alt=""
              width={60}
              height={30} 
              className="rounded mt-5"
            />
            <h2 className="text-center font-san text-4xl my-5">Agreement</h2>
            <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe expedita sint molestiae aut minima assumenda eius dolorem exercitationem repellat eligendi deleniti, recusandae, ratione officia beatae incidunt veniam eveniet dolorum amet!</p>
          </div>
        </div>
      </div>
      <hr className="bg-[#181818] w-full"/>
      <div className="container mx-auto">
      <div className="flex justify-between">
        <div className="w-1/2">
        <div>
            <Link href="/"><Image
          src="/logo.png" 
          alt=""
          width={150}
          height={40} 
          className="rounded-lg my-5"
        />
            </Link>
          </div>
          <p className="whitespace-pre-line my-5">Lorem ipsum dolor sit amet <br /> consectetur adipisicing elit. <br /> animi, quia id laborum ea rerum.</p>
            <div className="flex flex-row">
            <Link href="/"><Image
          src="/git.png" 
          alt=""
          width={20}
          height={10} 
          className="rounded-lg mx-5"
        />
            </Link>
            <Link href="/"><Image
          src="/lin.png" 
          alt=""
          width={20}
          height={10} 
          className="rounded-lg mx-5"
        />
            </Link>
            <Link href="/"><Image
          src="/dem.png" 
          alt=""
          width={20}
          height={10} 
          className="rounded-lg mx-5"
        />
            </Link>
            </div>
        </div>
        <div className="w-1/2">
        <p className="text-center font-bold font-san mb-4 text-[#7611f7] my-5 text-xl">About US</p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum delectus enim corporis, minus officiis eum nobis vel nulla maiores, odio ducimus soluta ipsam libero in dignissimos. Qui exercitationem quos dolorum.
        </div>
      </div>
    </div>
      
    </div>
  );
};

export default Hero;
