import styles from "@/pages/home.module.css";
import { useState } from "react";
import { addPasteToIPFS, getURL } from "../utils/ipfs";
import EnigmaPaste from "../assets/EnigmaPaste.json";
import {languageOptions, languageFileExtensions} from "@/data/contants";
import { useContract, useAddress } from "@thirdweb-dev/react";

const ENIGMAPASTE_ADDRESS = process.env.NEXT_PUBLIC_ENIGMAPASTE_ADDRESS;

export default function Home() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [language, setLanguage] = useState(languageOptions[0]);
  const [content, setContent] = useState("");

  const [textareaHeight, setTextareaHeight] = useState("auto");
  const handleTextareaInput = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
    setTextareaHeight(event.target.style.height);
  };

  const { contract } = useContract(
    ENIGMAPASTE_ADDRESS,
    EnigmaPaste.abi
  );
  const walletAddress = useAddress();

  const handleCreatePaste = async (isPrivate) => {
    const result = await addPasteToIPFS(
      content,
      `${title}.${languageFileExtensions[language]}}`
    ); //TODO Error handling if this fails
    const cid = result["IpfsHash"];
    console.log("Added to IPFS", getURL(cid));
    const timestamp = (new Date(result["Timestamp"])).getTime();
    console.log(timestamp)
    const txn = await contract.call("createPaste", [title, language, author, timestamp, cid, isPrivate]);
  };

  return (
    <div className="flex item-start justify-center min-h-full bg-gray-100 md:py-10">
      {/* Main Container */}
      <div className="w-full max-w-6xl bg-white p-10 rounded-md shadow-lg">
        {/* Form Container */}
        <div className="flex flex-col">
          {/* Create new paste  */}
          <div className="w-full mb-5 pb-2 border-b-2 outline-none text-lg text-gray-600 font-semibold uppercase">
            CREATE A NEW PASTE
          </div>

          {/* Metadata input container */}
          <div className="flex flex-col w-full items-center md:flex-row md:space-x-4">
            {/* Author */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Author</label>
              <input
                type="text"
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
                className={styles.formInput}
                name="author"
                placeholder="Anonymous"
              />
            </div>

            {/* Title */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Title</label>
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={styles.formInput}
                name="title"
              />
            </div>

            {/* Language */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Language</label>
              <select
                className={styles.formSelect}
                name="language"
                onChange={(e) => setLanguage(e.target.value)}
                value={language}
              >
                {languageOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Your Paste */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Your Paste</label>
          <textarea
            type="text"
            className={`${styles.formInput} min-h-80 overflow-hidden`}
            name="pasteContent"
            style={{ height: textareaHeight }}
            onInput={handleTextareaInput}
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
        </div>

        {/* Create buttons */}
        <div className="flex space-x-2">
          <button
            onClick={async () => {
              handleCreatePaste(false);
            }}
            className="bg-[#6c767e] border-2 border-[#6c767e] font-semibold text-white px-2 py-1 rounded-md hover:bg-white hover:text-[#6c767e]"
          >
            Create
          </button>

          <button
            onClick={async () => {
              handleCreatePaste(true);
            }}
            className="bg-[#24a843] border-2 border-[#24a843] font-semibold text-white px-2 py-1 rounded-md hover:bg-white hover:text-[#24a843]"
          >
            Create private
          </button>
        </div>
      </div>
    </div>
  );
}
