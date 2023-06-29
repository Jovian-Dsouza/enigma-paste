const pinataSDK = require("@pinata/sdk");

const pinata = new pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_API_SECRET
);

async function unpin(cid) {
  return await pinata
    .unpin(cid)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return "ERROR";
    });
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { cid } = req.body;
    const result = await unpin(cid);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
