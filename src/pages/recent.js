import { useEffect, useState, useContext } from "react";
import { useAddress } from "@thirdweb-dev/react";
import PasteList from "../components/PasteList";
import { getURL, deletePasteFromIPFS } from "@/utils/ipfs";
import LoadingPage from "@/components/LoadingPage";
import { AppContext } from "@/data/AppContext";
import TransactionModal from "@/components/TransactionModal";

export default function Recent() {
  const [pasteList, setPasteList] = useState();
  const [showModal, setShowModal] = useState(false);

  const walletAddress = useAddress();
  const { enigmaContract: contract} = useContext(AppContext);

  async function getPasteList() {
    var newPaste = [];
    const data = await contract.call("getAllPastes", [], {
      from: walletAddress,
    });
    if (!data) {
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
    setShowModal(true);
    try {
      const txn = await contract.call("deletePaste", [paste.id]);
      const result = await deletePasteFromIPFS(paste.cid);
      console.log(`Paste with cid=${paste.cid} deleted: ${result}`);
    } catch (e) {
      console.error(`Error deleting paste ${paste.cid}: ${e}`);
      alert("Error in deleting paste");
    }
    setShowModal(false);
  }

  useEffect(() => {
    if (contract && walletAddress) {
      getPasteList();
    }
  }, [contract, walletAddress]);

  if (!pasteList) {
    if (!walletAddress) {
      return <PasteList pastes={[]} />;
    }
    return <LoadingPage />;
  }

  return (
    <div>
      {/* Modal */}
      <TransactionModal show={showModal}>
        <h1 class="text-3xl text-center font-extrabold">Deleteing Paste 🗑️</h1>
        <p class="text-gray-600">
          Please wait while your paste is being deleted...
        </p>
      </TransactionModal>

      <div>
        <PasteList pastes={pasteList} onDeletePaste={handleDeletePaste} />
      </div>
    </div>
  );
}
