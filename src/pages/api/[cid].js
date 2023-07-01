import { getRawContentFromURL } from "@/utils/apiUtils";
import { getIpfsURL } from "@/utils/ipfs";

export default async function handler(req, res) {
  const url = getIpfsURL(req.query.cid);
  if (req.method === "GET") {
    
    try {
        const content = await getRawContentFromURL(url);
        res.status(200).send(content);
    } catch (error) {
        res.status(422).send(`Error: Could fetch ${url}`);
    }
    
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
