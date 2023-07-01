import { createContext, useEffect } from "react";
import { useState } from "react";
import { useContract } from "@thirdweb-dev/react";
import EnigmaPaste from "../assets/EnigmaPaste.json";

const ENIGMAPASTE_ADDRESS = process.env.NEXT_PUBLIC_ENIGMAPASTE_ADDRESS;

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [enigmaContract, setEnigmaContract] = useState();

  const { contract } = useContract(ENIGMAPASTE_ADDRESS, EnigmaPaste.abi);

  useEffect(() => {
    setEnigmaContract(contract);
  }, [contract]);

  return (
    <AppContext.Provider value={{ enigmaContract }}>
      {children}
    </AppContext.Provider>
  );
}
