export async function addPasteToIPFS(content, name) {
  try {
    const resp = await fetch(`/api/addPasteToIPFS`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content,
        name: name,
      }),
    });
    if (resp.ok) {
      const result = await resp.json();
      return result;
    } else {
      console.error("Failed to add to IPFS");
    }
  } catch (error) {
    console.error(error);
  }
}

export function getURL(cid) {
  return `https://gateway.pinata.cloud/ipfs/${cid}`;
}

export function getIpfsURL(cid){
  return `https://ipfs.io/ipfs/${cid}`;
}

export async function deletePasteFromIPFS(cid) {
  try {
    const resp = await fetch(`/api/deletePasteFromIPFS`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cid: cid,
      }),
    });
    if (resp.ok) {
      const result = await resp.json();
      return result;
    } else {
      console.error("Failed to unpin from IPFS");
    }
  } catch (error) {
    console.error(error);
  }
}
