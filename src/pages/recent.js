import { useEffect, useState } from "react";
import { useContract, useAddress } from "@thirdweb-dev/react";
import PasteList from "../components/PasteList";
import { ethers } from "ethers";

import EnigmaPaste from "../assets/EnigmaPaste.json";
const ENIGMAPASTE_ADDRESS = process.env.NEXT_PUBLIC_ENIGMAPASTE_ADDRESS;

export default function Recent(props) {
  const pastes = [
    {
      id: 1,
      title: "Website script",
      author: "John Doe",
      date: "2023-06-25",
      language: "JavaScript",
    },
    {
      id: 2,
      title: "ML training",
      author: "Jane Smith",
      date: "2023-06-26",
      language: "Python",
    },
    // Add more paste objects as needed
  ];

  const [pasteList, setPasteList] = useState([]);
  const walletAddress = useAddress();
  const { contract, isLoading } = useContract(
    ENIGMAPASTE_ADDRESS,
    EnigmaPaste.abi
  );

  async function getPasteList() {
    var newPaste = pastes;

    if (!isLoading) {
      const data = await contract.call("getAllPastes", [], {
        from: walletAddress,
      });

      for (var i = 0; i < data.length; i++) {
        const date = new Date(data[i].creationTime.toNumber());
        const formattedDate = date.toISOString().split("T")[0];
        var author = data[i].aurthor;
        if (data[i].aurthor === "") {
          author = "Anonymous";
        }
        newPaste.push({
          id: data[i].id.toNumber(),
          title: data[i].title,
          author: author,
          language: data[i].language,
          date: formattedDate,
        });
        console.log(newPaste);
      }
    }
    setPasteList(newPaste);
  }
  useEffect(() => {
    // if (!isLoading) {
    getPasteList();
    // }
  }, [isLoading]);

  return (
    <div>
      <div>
        <PasteList pastes={pasteList} />
      </div>
    </div>
  );
}
