import { useEffect, useState } from "react";
import { useContract, useAddress } from "@thirdweb-dev/react";
import PasteList from "../components/PasteList";
import { ethers } from "ethers";
import { getURL } from "@/utils/ipfs";
import EnigmaPaste from "../assets/EnigmaPaste.json";
const ENIGMAPASTE_ADDRESS = process.env.NEXT_PUBLIC_ENIGMAPASTE_ADDRESS;

export default function Recent(props) {
  const [pasteList, setPasteList] = useState([]);
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
    console.log("getRecentData", data);
    console.log(walletAddress)
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
      });
      console.log(newPaste);
    }
    setPasteList(newPaste);
  }
  useEffect(() => {
    if (contract) {
      getPasteList();
    }
  }, [contract]);

  return (
    <div>
      <div>
        <PasteList pastes={pasteList} />
      </div>
    </div>
  );
}
