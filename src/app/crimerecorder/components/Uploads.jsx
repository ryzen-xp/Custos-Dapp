"use client";
import React, { useContext, useEffect, useState } from "react";
import { Upload } from "./Upload";
import { UseReadContractData } from "@/utils/fetchcontract";
import { WalletContext } from "@/components/walletprovider";

const Uploads = () => {
  const { address } = useContext(WalletContext);
  const [readData, setReadData] = useState([]);

  useEffect(() => {
    const retrieve = async () => {
      let { fetchData } = UseReadContractData();
      let result = await fetchData("crime", "get_all_user_uploads", [address]);
      let arr = Object.keys(result);
      setReadData(arr);
    };

    retrieve();
  }, [address]);

  useEffect(() => {
    if (readData !== []) {
      const userUploads = async () => {
        let item = readData.map(async (data) => {
          let { fetchData } = UseReadContractData();
          let uploads = await fetchData("crime", "get_token_uri", [data]);
          console.log("i am the user uploads", uploads);
        });
        console.log(item);
      };

      userUploads();
    }
  }, []);

  return (
    <div className="grid grid-cols-3 w-100">
      {readData.map((data, index) => {
        return <Upload key={index} />;
      })}
    </div>
  );
};

export default Uploads;
