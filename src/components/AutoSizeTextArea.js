import React, { useState, useEffect } from "react";

export default function AutoSizeTextArea({ content, className }) {
  const [textareaHeight, setTextareaHeight] = useState("auto");

  useEffect(() => {
    const textarea = document.getElementById("auto-size-textarea");

    const adjustTextareaHeight = () => {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
      setTextareaHeight(textarea.style.height);
    };

    textarea.addEventListener("input", adjustTextareaHeight);
    adjustTextareaHeight(); // Initial height adjustment

    return () => {
      textarea.removeEventListener("input", adjustTextareaHeight);
    };
  }, []);

  return (
    <textarea
      disabled
      id="auto-size-textarea"
      className={className}
      style={{ height: textareaHeight }}
      value={content}
    ></textarea>
  );
}
