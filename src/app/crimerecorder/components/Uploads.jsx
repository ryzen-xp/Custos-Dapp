"use client";
import React, { useContext, useEffect, useState } from "react";
import { Upload } from "./Upload";
import { UseReadContractData } from "@/utils/fetchcontract";
import { WalletContext } from "@/components/walletprovider";
import NoRecordScreen from "./NoRecordScreen";

const Uploads = () => {
  const { address } = useContext(WalletContext);
  const [readData, setReadData] = useState([]);
  const [uri, setUri] = useState([]);

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
    const userUploads = async () => {
      let items = await Promise.all(
        readData.map(async (data) => {
          let { fetchData } = UseReadContractData();
          let uploads = await fetchData("crime", "get_token_uri", [data]);
          return uploads;
        })
      );
      setUri(items);
    };

    if (readData.length) userUploads();
  }, [readData]);

  if (!address || readData.length === 0) {
    return <NoRecordScreen />;
  }

  return (
    <div className="grid grid-cols-3 w-100">
      {readData.map((data, index) => {
        return <Upload key={index} uri={uri[index]} />;
      })}
    </div>
  );
};

export default Uploads;
