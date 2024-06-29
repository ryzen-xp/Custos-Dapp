"use client";
import { ConnectButton, darkTheme } from "thirdweb/react";
import { createWallet, inAppWallet, walletConnect } from "thirdweb/wallets";
import { client } from "../utils/thirdwebclient";

export const wallets = [
  inAppWallet(),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  walletConnect(),
];

const ConnectButtoncomponent = () => {
  return (
    <div className="hover:cursor-pointer p-[1px] rounded-xl bg-gradient-to-r from-[#0094ff] to-[#A02294]">
      <ConnectButton
        client={client}
        wallets={wallets}
        theme={darkTheme({
          colors: {
            primaryButtonBg: "#131418",
            primaryButtonText: "#ededef",
          },
        })}
      />
    </div>
  );
};

export default ConnectButtoncomponent;
