import { requestType, findAll, findUpdate } from '../../../lib/dbFunctions';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let rqc = req.query.content;
  if (Array.isArray(rqc)) rqc = rqc.join("/");
  switch (req.method) {
    case requestType.GET: {
      var rp = await getDownloadURL(ref(storage, rqc));
      if (rp)
        res.status(200).redirect(rp);
      else
        res.status(404).send(`Not Found`);
      break;
    }
  }
}

export default handler;