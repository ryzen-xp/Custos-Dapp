"use client";
import React, { useContext, useEffect, useState } from "react";
import { Upload } from "./Upload";
import { UseReadContractData } from "@/utils/fetchcontract";
import { WalletContext } from "@/components/walletprovider";

const Uploads = () => {
  const { address } = useContext(WalletContext);
  const [readData, setReadData] = useState(null);

  useEffect(() => {
    const retrieve = async () => {
      let { fetchData } = UseReadContractData();
      let result = await fetchData("crime", "get_all_user_uploads", [address]);
      console.log("i am result from fetch ", result);
      setReadData(result);
    };

    retrieve();
  }, [address]);

  console.log(readData);

  return (
    <div className="grid grid-cols-3 w-100">
      {/* {arr.map((data, index) => {
        return <Upload key={index} />;
      })} */}
      {/* <Upload />
      <Upload />
      <Upload />
      <Upload />
      <Upload /> */}
    </div>
  );
};

export default Uploads;
