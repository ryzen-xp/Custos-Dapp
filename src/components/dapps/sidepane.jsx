import Image from 'next/image'
import React from 'react'

const Sidepane = () => {
  return (
    <div className="bg-gradient-to-r from-[#04080C] to-[#09131A] h-screen w-full ">
                <a href="/" className="w-auto">
          <Image src="/logo.png" alt="logo" width={232.7} height={22} />
          </a>
        
    </div>
  )
}

export default Sidepane