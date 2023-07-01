/*
To convert a timestamp represented in ISO 8601 format to the format "Jun 23, 2023" using JavaScript
*/
export function convertTimestampToFormat(timestamp) {
  const date = new Date(timestamp);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
}
