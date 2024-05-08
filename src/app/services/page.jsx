import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import React from 'react';

const Service = () => {
  return (
    <div>
      {/* Hero section with full-width background image */}
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url('/hero.jpg')` }}>
        <Navbar/>
        <div className="absolute inset-0 bg-[#090909] opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold">Custos Diretriz Services</h1>
        </div>
      </div>

      {/* Card section */}
      <div className="container mx-auto my-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[#090909] rounded-lg shadow-md p-6 border-2 border-[#181818] hover:border-[#c92eff]">
            <h2 className="text-xl text-center font-bold mb-4 text-[#c92eff]">Agreement</h2>
            <p className="text-gray-700 hover:text-white">The Agreement smart contract enables the creation, signing, and validation of legal agreements between two parties on the Ethereum blockchain. It allows users to: <br />

Create Agreements: <br /><br />
 Users can create new legal agreements by providing the agreement content, the address of the second party, and details about the first party. <br /><br />
Sign Agreements: The second party can sign an agreement by providing their full name and valid ID. Once signed, the agreement status is updated to reflect this action. <br /><br />
Validate Signatures: The creator of an agreement can validate the signatures of both parties, confirming that the agreement has been signed by all relevant parties. <br /><br />
Access Agreement Details: Users can retrieve details of specific agreements, including the creator, content, second party's address, first party's name and valid ID, and the signed status.</p>
<button className="bg-[#c92eff] hover:bg-[#090909] text-white font-bold py-2 px-4 border-2 border-[#c92eff] font-san hover:border-[#c92eff]">Get Started</button>
          </div>
          {/* Card 2 */}
          <div className="bg-black  p-6">
            
          </div>
          {/* Card 3 */}
          <div className="bg-[#090909] rounded-lg shadow-md p-6 border-2 border-[#181818] hover:border-[#c92eff]">
            <h2 className="text-xl text-center font-bold mb-4 text-[#c92eff]">Eye witness</h2>
            <p className="text-gray-700 hover:text-white">The Witness Eye revolutionizes the way individuals contribute to societal safety by offering a cutting-edge platform for documenting and sharing crime events securely and transparently. <br /><br /> Revolutionizing Crime Reporting: The Crime Recording App transforms the way individuals contribute to societal safety by providing an advanced platform for documenting and sharing crime events securely and transparently.

            <br /><br />  User-Centric Design: It empowers users to easily log detailed information about crime events.

            <br /><br />  Blockchain Integration: By leveraging blockchain technology, the app ensures the integrity and immutability of recorded data, instilling trust in the authenticity of reported incidents and enhancing the platform's credibility.

            <br /><br /> Meta-Transaction Support: One of the app's standout features is its support for meta-transactions, enabling users to interact with the blockchain without the need for cryptocurrency or gas fees, thus lowering barriers to participation.

            <br /><br /> Community Engagement: Beyond documentation, the app fosters community engagement and collaboration towards crime prevention and intervention. Users can share insights, collaborate on initiatives, and address safety concerns within their neighborhoods, empowering individuals to make tangible contributions to a safer society.</p>
            <button className="bg-[#c92eff] hover:bg-[#090909] text-white font-bold py-2 px-4 border-2 border-[#c92eff] font-san hover:border-[#c92eff]">Get Started</button>
          </div>
         
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Service;
