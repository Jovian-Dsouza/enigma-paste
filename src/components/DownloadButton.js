export default function DownloadButton({ children, className, fileName, fileContent }) {
  const downloadFile = () => {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(fileContent)
    );
    element.setAttribute("download", fileName);

    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <button type="button" className={className} onClick={downloadFile}>
      {children}
    </button>
  );
}