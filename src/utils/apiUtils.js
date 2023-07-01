export async function getRawContentFromURL(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch data from ${url}. Status: ${response.status}`
    );
  }
  const text = await response.text();
  return text;
}
