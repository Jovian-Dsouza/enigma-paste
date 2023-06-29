import { ConnectWallet } from "@thirdweb-dev/react";

export function ConnectButton({ className }){
    return (
      <div className={`${className} border-2 border-white rounded-xl`}>
        <ConnectWallet
          theme="dark"
          className="!h-12 !font-bold"
          btnTitle="Connect"
        />
      </div>
    );
}