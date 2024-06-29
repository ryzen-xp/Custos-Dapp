import React from "react";
import { AutoConnect } from "thirdweb/react";
import { wallets } from "./connect";
import { client } from "@/utils/thirdwebclient";

export const autoconnect = () => {
  return (
    <AutoConnect
      client={client}
      timeout={10000}
      wallets={wallets}
      appMetadata={appMetadata}
    />
  );
};
