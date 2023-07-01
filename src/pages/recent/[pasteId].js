import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { useAddress } from "@thirdweb-dev/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faDownload,
  faMaximize,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./pasteId.module.css";
import { deletePasteFromIPFS } from "@/utils/ipfs";
import DownloadButton from "@/components/DownloadButton";
import { languageFileExtensions } from "@/data/contants";
import LoadingPage from "@/components/LoadingPage";
import { convertTimestampToFormat } from "@/utils/timeUtils";
import { getRawContentFromURL } from "@/utils/apiUtils";
import AutoSizeTextArea from "@/components/AutoSizeTextArea";
import { AppContext } from "@/data/AppContext";

export default function PastePage() {
  const router = useRouter();

  const walletAddress = useAddress();
  const { enigmaContract: contract } = useContext(AppContext);

  const [paste, setPaste] = useState(null);

  async function fetchContentFromURL(url){
    try {
      return await getRawContentFromURL(url);
    } catch (error) {
      return "Could not fetch";
    }
  }

  async function getPaste(pasteId) {
    //TODO handle error on invalid paste id
    const data = await contract.call("getPaste", [pasteId], {
      from: walletAddress,
    });
    if(!data){return;}

    const author = data.aurthor === "" ? "Anonymous" : data.aurthor;
    const url = `/api/${data.ipfsCid}`
    const content = await fetchContentFromURL(url);
    setPaste({
      id: data.id.toNumber(),
      title: data.title,
      author: author,
      language: data.language,
      content: content,
      date: convertTimestampToFormat(data.creationTime.toNumber()),
      cid: data.cid,
      url: url,
    });
  }

  async function deletePaste() {
    //TODO ADD loading
    try {
      const txn = await contract.call("deletePaste", [paste.id]);
      const result = await deletePasteFromIPFS(paste.cid);
      console.log(`Paste with cid=${paste.cid} deleted: ${result}`);
      router.push("/recent"); //TODO: Maybe add this in the event listener callback
    } catch (e) {
      console.error(`Error deleting paste ${paste.cid}: ${e}`);
    }
  }

  useEffect(() => {
    if (contract && walletAddress) {
      getPaste(router.query.pasteId);
    }
  }, [contract, walletAddress]);

  if (!paste) {
    return <LoadingPage />;
  }

  return (
    <div className="flex item-start justify-center min-h-full bg-gray-100 md:py-10">
      {/* Main Container */}
      <div className="w-full max-w-6xl bg-white p-10 rounded-md shadow-lg">
        {/* Form Container */}

        {/* Create new paste  */}
        <div className="w-full mb-5 pb-2 border-b-2 text-lg text-black font-semibold">
          <div className="flex flex-col text-gray-500 gap-1">
            <div className="font-bold">{paste.title}</div>
            <div className="flex  items-center justify-start text-sm space-x-7">
              {/* Aurtor name */}
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} />
                {paste.author}
              </div>
              {/* Date */}
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCalendar} />
                {paste.date}
              </div>
            </div>
          </div>
        </div>

        {/* Paste content */}
        <div className="w-full mb-4 border rounded-lg shadow-sm bg-gray-200">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-3 py-2 border-b">
            {/* Language */}
            <div className="ml-4 px-4 py-1 rounded-md bg-gray-100 text-gray-500 font-bold border border-gray-400">
              {paste.language}
            </div>

            {/* Toolbar buttons */}
            <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x">
              <div className="flex items-center space-x-1 sm:pr-4">
                {/* Trash button */}
                <button
                  type="button"
                  className={styles.toolbarBtn}
                  onClick={deletePaste}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>

                {/* Download button */}
                <DownloadButton
                  className={styles.toolbarBtn}
                  fileName={`${paste.title}.${
                    languageFileExtensions[paste.language]
                  }`}
                  fileContent={paste.content}
                >
                  <FontAwesomeIcon icon={faDownload} />
                </DownloadButton>

                {/* View Raw */}
                <button
                  type="button"
                  className={styles.toolbarBtn}
                  onClick={() => {
                    router.push(paste.url);
                  }}
                >
                  <FontAwesomeIcon icon={faMaximize} />
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="px-4 py-2 bg-white rounded-b-lg">
            <AutoSizeTextArea
              content={paste.content}
              className="w-full px-2 py-1 text-gray-600 border-0 bg-white outline-none focus:ring-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
