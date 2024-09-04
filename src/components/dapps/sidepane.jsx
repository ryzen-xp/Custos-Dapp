import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const Sidepane = () => {
  return (
    <div className="bg-gradient-to-r from-[#04080C] flex items-center flex-col to-[#09131A] h-screen w-full ">
      <div className="w-full">

                <a href="/" className="w-auto">
          <Image src="/logo.png" alt="logo" width={232.7} height={22} />
          </a>
      </div>

      <div className="section2 flex flex-col gap-16 m-auto w-full p-2">
 
      <Link
                href={`/crimerecorder`}
                className="text-[#EAFBFF]"
              >
      <div className="section2 flex gap-4 m-auto w-full p-2">
      <p className="text-[1.3em] text-[#EAFBFF]">Videos</p>
      <Image src="/cameraicon.svg" alt="icon" width={25} height={20} />
      </div> 
      </Link>

      <Link
                href={`/agreement/`}
                className="text-[#EAFBFF]"
              >
      <div className="section2 flex gap-4 m-auto w-full p-2">
      <p className="text-[1.3em] text-[#EAFBFF]">Agreement</p>
      <Image src="/Plus.svg" alt="icon" width={25} height={20} />
      </div> 
      </Link>
      </div>

      <div className="section2 flex flex-col gap-16 m-auto w-full p-2">
            <button className="bg-[#0094FF] rounded-full p-[0.6px]">
            <span
              className="flex justify-between items-center gap-2 px-4 py-3 bg-gradient-to-r from-[#04080C]  to-[#09131A] shadow-[#A02294_2px_1px_2px_0.2px] rounded-[1.5em] w-full">
              <Link
                href={`/crimerecorder/video`}
                className="text-[#EAFBFF]"
              >
                Record a Video
              </Link>
              <Image src='/cameraicon.svg' alt="logo" width={24} height={24} />
            </span>
          </button>

          <button className="bg-[#0094FF] rounded-full p-[0.6px]">
            <span
              className="flex justify-between items-center gap-2 px-4 py-3 bg-gradient-to-r from-[#04080C]  to-[#09131A] shadow-[#A02294_2px_1px_2px_0.2px] rounded-[1.5em] w-full">
              <Link
                href={`/agreement/create`}
                className="text-[#EAFBFF]"
              >
                Create Agreement
              </Link>
              <Image src='/Plus.svg' alt="logo" width={24} height={24} />
            </span>
          </button>
      </div> 
        
    </div>
  )
}

export default Sidepane