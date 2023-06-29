import { useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
} from "wagmi";

export function ConnectButton({ className }) {
  const [buttonTxt, setButtonTxt] = useState('Loading...')
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  const [connector] = connectors;

  useEffect((()=>{
    if(isConnected){
        setButtonTxt('Disconnect')
    }
    else{
        setButtonTxt('Connect')
    }
  }), [isConnected]);

  function handleToggleConnect({connector}) {
    if(isConnected){
        disconnect();
        setButtonTxt('Connect');
    }
    else{
        connect({connector});
        setButtonTxt("Disconnect");
    }
  }

  return (
    <a
      onClick={() => handleToggleConnect({ connector })}
      className={`text-brownishBlack hover:text-white hover:bg-brownishBlack bg-white border-white font-bold border-2 px-4 py-2 rounded-lg ${className}`}
    >
      {buttonTxt}
    </a>
  );
}
