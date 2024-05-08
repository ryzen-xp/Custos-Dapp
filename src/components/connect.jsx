"use client"
import { ConnectButton } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import client from "../utils/thirdwebclient"
import { createThirdwebClient } from "thirdweb";

const wallets = [
  inAppWallet(),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
];

const  ConnectButtoncomponent = ()=> {
    
  return (
    <div>
      <ConnectButton client={client} wallets={wallets} />
    </div>
  );
}

export default ConnectButtoncomponent;
