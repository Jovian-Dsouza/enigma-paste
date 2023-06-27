import styles from "@/pages/home.module.css";
import { useState } from "react";

export default function Home() {
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const handleTextareaInput = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
    setTextareaHeight(event.target.style.height);
  };

  return (
    <div className="flex item-start justify-center min-h-full bg-gray-100 md:py-10">
      {/* Main Container */}
      <div className="w-full max-w-6xl bg-white p-10 rounded-md shadow-lg">
        {/* Form Container */}
        <div className="flex flex-col">
          {/* Create new paste  */}
          <input
            type="text"
            placeholder="CREATE A NEW PASTE"
            className="w-full mb-5 pb-2 border-b-2 outline-none text-lg text-gray-600 font-semibold"
          ></input>

          {/* Metadata input container */}
          <div className="flex flex-col w-full items-center md:flex-row md:space-x-4">
            {/* Author */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Author</label>
              <input type="text" className={styles.formInput} name="author" />
            </div>

            {/* Title */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Title</label>
              <input type="text" className={styles.formInput} name="title" />
            </div>

            {/* Language */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Language</label>
              <select className={styles.formSelect} name="language">
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="csharp">C#</option>
              </select>
            </div>

            {/* Delete after */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Delete After</label>
              <select className={styles.formSelect} name="deleteAfter">
                <option value="1">1 day</option>
                <option value="7">7 days</option>
                <option value="30">30 days</option>
                <option value="never">Never</option>
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
          />
        </div>

        {/* Create buttons */}
        <div className="flex space-x-2">
          <button className="bg-[#6c767e] border-2 border-[#6c767e] font-semibold text-white px-2 py-1 rounded-md hover:bg-white hover:text-[#6c767e]">
            Create
          </button>
          <button className="bg-[#24a843] border-2 border-[#24a843] font-semibold text-white px-2 py-1 rounded-md hover:bg-white hover:text-[#24a843]">
            Create encrpyted
          </button>
        </div>
      </div>
    </div>
  );
}
