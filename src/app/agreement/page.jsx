/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useEffect, useState } from "react";
import AgreementCard from "./components/agreementcard";
import NoAgreementscreen from "./components/noAgreementscreen";
// import { baseSepolia } from "thirdweb/chains";
// import { getContract } from "thirdweb";
// import { useReadContract } from "thirdweb/react";
import abi from "@/utils/agreementAbi.json";
// import { client } from "@/utils/thirdwebclient";
import SignAgreementModal from "./components/signagreementmodal";

function AgreementList() {
  const [loading, setLoading] = useState(true);
  const [agreements, setAgreements] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showagreementModal, setShowagreementModal] = useState(false);



  // const contract = getContract({
  //   client,
  //   chain: baseSepolia,
  //   address: "0x726c51fcAC027fF7C9eAaF830f88daF12199ddC5",
  //   abi: abi,
  // });

  // for (let i = 0; i < Number(detail); i++) {
  //   id.push(i);
  // }

  // const eachAgreement = id.map((id) => {
  //   const { data, isLoading } = useReadContract({
  //     contract,
  //     method: "getAgreementDetails",
  //     params: [id],
  //   });
  // });

  // let id = [];
  // let agree;
  // console.log(id);

  // for (let i = 1; i < id.length; i++) {
  //   agree = id[i];
  // }

  // const { data: detail, isLoading: loadDetail } = useReadContract({
  //   contract,
  //   method: "agreementCount",
  // });

  // for (let i = 0; i <= Number(detail); i++) {
  //   id.push(i);
  // }

  // const { data, isLoading } = useReadContract({
  //   contract,
  //   method: "getAgreementDetails",
  //   params: [id],
  // });

  // console.log(id);
  // console.log(agree);


  const toggleSignModal = () => {
    setshowSignModal(!showagreementModal);
  };

  useEffect(() => {
    const mockAgreements = [
      {
        id: 1,
        creator: "Alice",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        secondPartyAddress: "0x123456789...",
      },
      {
        id: 2,
        creator: "Bob",
        content:
          "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        secondPartyAddress: "0x987654321...",
      },
      {
        id: 2,
        creator: "Bob",
        content:
          "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        secondPartyAddress: "0x987654321...",
      },
      {
        id: 2,
        creator: "Bob",
        content:
          "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        secondPartyAddress: "0x987654321...",
      }
    ];
    setAgreements(null);
    setLoading(false);
    setIsAdmin(true);
  }, [agreements]);


  return (
    <div className="w-full px-4">
      

 

      <div className="w-full ">
        {loading ? (
          // Show loading indicator if agreements are loading
          <div className="text-center py-8">
            <div className="loader ease-linear rounded-full border-8 border-t-8 bg-[#130316] border-gray-200 h-16 w-16 mx-auto"></div>
            <p className="mt-2">Loading agreements...</p>
          </div>
        ) : agreements === null ? (
          <div className="w-full m-auto p-4 text-[#EAFBFF] ">
   <NoAgreementscreen />
          </div>
          
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto w-[90%] mb-8">
            {agreements?.map((agreement) => (
              <div key={agreement.id} className="">
                <AgreementCard agreement={agreement} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AgreementList;
