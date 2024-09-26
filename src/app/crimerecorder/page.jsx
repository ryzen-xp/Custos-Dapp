import React from 'react'
import Image from 'next/image';
import Button from '@/components/Button';
import Link from 'next/link';
const NoRecordingScreen = () => {
  return (
    <div className="m-auto w-full text-center items-center flex flex-col space-y-4">
      <Image
        src="/gifs/noagreement.gif"
        alt="norecording"
        width={200}
        height={200}
      />
      <p className="text-[#EAFBFF]">
      You have not saved any video or image on the blockchain yet. Launch your camera to record your evidence.
      </p>
      {/* <Button
        text="Create Agreement"
        icon={<Image src="/Plus.svg" alt="plus" width={18} height={18} />}
        link={"/agreement/create"}
      /> */}

      <Link href="crimerecorder/record">
        <button className="launch-pad-button-container" link={"crimerecorder/Crimerecorder"}>
          <img src="./Button.png" alt="Zoom Image" />
        </button>
      </Link>
    </div>
  );
}

export default NoRecordingScreen ;