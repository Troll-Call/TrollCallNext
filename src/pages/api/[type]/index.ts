import { requestType, findAll, findUpdate } from '../../../lib/dbFunctions';
import type { NextApiRequest, NextApiResponse } from 'next';
import validtypes from './validtypes';
import { setDoc, doc } from 'firebase/firestore';
import { database } from "@/lib/firebase";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let rqt:string = req.query.type as string;
  if (!validtypes.hasOwnProperty(rqt)) {
    res.status(404).send(`Endpoint "${rqt}" Not Found`); 
    return;
  }
  switch (req.method) {
    case requestType.GET: {
      var rp = await findAll(rqt);
      if (rp)
        res.status(200).json(rp)
      else
        res.status(404).send(`Not Found`);
      break;
    }
  }
}

export default handler;