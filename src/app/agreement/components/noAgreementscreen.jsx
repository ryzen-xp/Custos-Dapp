import React from 'react'
import Image from 'next/image';
import Button from '@/components/Button';
const NoAgreementscreen = () => {
  return (
    <div className='m-auto w-full text-center items-center flex flex-col space-y-4'>
    <Image src="/gifs/noagreement.gif" alt="noagreement" width={200} height={200} />
    <p className="text-[#EAFBFF]">You have not created any agreement yet. You can start creating one from here.</p>
    <Button text="Create Agreement" icon={<Image src="/Plus.svg" alt="plus" width={18} height={18}  />} link={"/agreement/create"} />
    </div>
  )
}

export default NoAgreementscreen;