import React from 'react'
import Image from 'next/image';
const NoAgreementscreen = () => {
  return (
    <div className='m-auto w-full text-center items-center flex flex-col'>
    <Image src="/gifs/noagreement.gif" alt="noagreement" width={200} height={200} />
    <p className="text-[#EAFBFF]">You have not created any agreement yet. You can start creating one from here.</p>
    </div>
  )
}

export default NoAgreementscreen;