"use client"
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const ServiceDetails = ({params}) => {

    const processes = [
        {
          title: "Crime Recorder",
          imageUrl: "eyewitness.jpeg", 
          content: [
            "Revolutionizing Crime Reporting: The Crime Recording App transforms the way individuals contribute to societal safety by providing an advanced platform for documenting and sharing crime events securely and transparently.",
            "User-Centric Design: With its intuitive interface, the app empowers users to easily log detailed information about crime events, including descriptions, locations, timestamps, and supporting multimedia evidence.",
            "Blockchain Integration: By leveraging blockchain technology, the app ensures the integrity and immutability of recorded data, instilling trust in the authenticity of reported incidents and enhancing the platform's credibility.",
            "Privacy and Security: The app prioritizes user privacy and security, employing robust encryption and authentication measures to safeguard sensitive information. Users retain full control over their data and can manage permissions to share details with authorized parties.",
            "Meta-Transaction Support: One of the app's standout features is its support for meta-transactions, enabling users to interact with the blockchain without the need for cryptocurrency or gas fees, thus lowering barriers to participation.",
            "Community Engagement: Beyond documentation, the app fosters community engagement and collaboration towards crime prevention and intervention. Users can share insights, collaborate on initiatives, and address safety concerns within their neighborhoods, empowering individuals to make tangible contributions to a safer society."
          ]
        },
        {
          title: "Agreement",
          imageUrl: "legalagreement.png", 
          content: [
            "Create Agreements: Users can create new legal agreements by providing the agreement content, the address of the second party, and details about the first party.",
            "Sign Agreements: The second party can sign an agreement by providing their full name and valid ID. Once signed, the agreement status is updated to reflect this action.",
            "Validate Signatures: The creator of an agreement can validate the signatures of both parties, confirming that the agreement has been signed by all relevant parties.",
            "Access Agreement Details: Users can retrieve details of specific agreements, including the creator, content, second party's address, first party's name and valid ID, and the signed status.",
            "List All Agreements: Users can retrieve a list of all agreement IDs for easy access to agreement details."
          ]
        }
      ];
  
  const title = params.title;
  const decodedTitle = title ? decodeURIComponent(title) : '';
  console.log(decodedTitle)
  const process = processes.find((process) => process.title === decodedTitle);  
  const makeBoldBeforeColon = (text) => {
    const splitText = text.split(':'); // Split text by colon
    if (splitText.length > 1) { // If there's a colon
      return <p><strong className='text-[#c8a2c8] text-[1.2em]'>{splitText[0]}:</strong> {splitText.slice(1).join(':')}</p>; // Wrap first part before colon in <strong> tag
    }
    return <p>{text}</p>;
  };

  
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

    if (!process) {
      return <div>Loading...</div>;
    }
  
    // Animation state
    return (
        <div className="w-full">
        <Navbar />

        <div className="border-[#c8a2c8] w-[80%] m-auto flex flex-col rounded-lg my-4 items-center justify-center border text-white p-6">
        <h1 className="text-2xl mb-6 animate-fadeIn">{process.title}</h1>
        <img src={`/${process?.imageUrl}`} alt={process.title} className="w-full h-[39vh] rounded-lg mb-6 animate-fadeIn" />
        {process.content.map((content, index) => (
          <p key={index} className="text-lg mb-2 p-4 border rounded-lg border-[#c8a2c8] bg-[#110414] animate-fadeIn">
             {makeBoldBeforeColon(content)}
          </p>
        ))}
            <Link href={`/${decodeURIComponent(title).replaceAll(' ', '').toLowerCase()}`}>
  <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
    Launch Dapp
  </button>
</Link>
      </div>
        </div>
    );
  };
  
  export default ServiceDetails;
  

