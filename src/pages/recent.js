import { useEffect, useState } from "react";
import { useContract, useAddress } from "@thirdweb-dev/react";
import PasteList from "../components/PasteList";
import { getURL, deletePasteFromIPFS } from "@/utils/ipfs";
import EnigmaPaste from "../assets/EnigmaPaste.json";
import LoadingPage from "@/components/LoadingPage";

const ENIGMAPASTE_ADDRESS = process.env.NEXT_PUBLIC_ENIGMAPASTE_ADDRESS;

export default function Recent(props) {
  const [pasteList, setPasteList] = useState();
  const walletAddress = useAddress();
  const { contract, isLoading } = useContract(
    ENIGMAPASTE_ADDRESS,
    EnigmaPaste.abi
  );

  async function getPasteList() {
    var newPaste = [];
    const data = await contract.call("getAllPastes", [], {
      from: walletAddress,
    });
    if(!data){
      console.error("Cant get pastes, contract call failed");
      return;
    }
    for (var i = 0; i < data.length; i++) {
      const date = new Date(data[i].creationTime.toNumber());
      const formattedDate = date.toISOString().split("T")[0];
      var author = data[i].aurthor;
      if (data[i].aurthor === "") {
        author = "Anonymous";
      }
      const contentUrl = getURL(data[i].ipfsCid);
      newPaste.push({
        id: data[i].id.toNumber(),
        title: data[i].title,
        author: author,
        language: data[i].language,
        date: formattedDate,
        url: contentUrl,
        cid: data[i].ipfsCid,
      });
    }
    setPasteList(newPaste);
  }

  async function handleDeletePaste(paste) {
    //TODO ADD loading
    try {
      const txn = await contract.call("deletePaste", [paste.id]);
      const result = await deletePasteFromIPFS(paste.cid);
      console.log(`Paste with cid=${paste.cid} deleted: ${result}`);
    } catch (e) {
      console.error(`Error deleting paste ${paste.cid}: ${e}`);
    }
  }

  useEffect(() => {
    if (contract && walletAddress) {
      getPasteList();
    }
  }, [contract, walletAddress]);

  if (!pasteList) {
    return <LoadingPage />;
  }

  return (
    <div>
      <div>
        <PasteList pastes={pasteList} onDeletePaste={handleDeletePaste} />
      </div>
    </div>
  );
}
