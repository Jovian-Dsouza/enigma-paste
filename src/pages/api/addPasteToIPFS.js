const pinataSDK = require("@pinata/sdk");
const Readable = require("stream").Readable;

const pinata = new pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_API_SECRET
);

async function addPasteToIPFS(content, name) {
  /*
    returns {
        IpfsHash: This is the IPFS multi-hash provided back for your content,
        PinSize: This is how large (in bytes) the content you just pinned is,
        Timestamp: This is the timestamp for your content pinning (represented in ISO 8601 format)
    }
    */
  const fileStream = new Readable();
  fileStream.push(content);
  fileStream.push(null);

  const options = {
    //TODO: Maybe consider storing file metadata here instead of smartcontract
    pinataMetadata: {
      name: name,
    },
  };
  const result = await pinata
    .pinFileToIPFS(fileStream, options)
    .catch((err) => {
      console.log(err);
    });
  //TODO: check status of IPFS before returning
  return result;
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { content, name } = req.body;
    const result = await addPasteToIPFS(content, name);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
