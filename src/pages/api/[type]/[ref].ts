import { requestType, findOne, findUpdate } from '../main';
import type { NextApiRequest, NextApiResponse } from 'next';
import validtypes from './validtypes';
import { setDoc, doc } from 'firebase/firestore';
import { database } from "@/middleware/firebase";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let rqt:string = req.query.type as string;
  let rqr:string = req.query.ref as string;
  if (!validtypes.hasOwnProperty(rqt)) {
    res.status(404).send(`Endpoint "${rqt}" Not Found`); 
    return;
  }
  switch (req.method) {
    case requestType.GET: {
      var rp = await findOne(rqt, rqr);
      if (rp)
        res.status(200).json(rp)
      else
        res.status(404).send(`${validtypes[rqt].name} "${rqr}" Not Found`);
      break;
    }
    case requestType.POST: {
      if (req.query.verify != process.env.AUTH_KEY) {
        res.status(401).send({ error: "Password incorrect" });
        return;
      }
      const user = doc(database, rqt, rqr).withConverter(validtypes[rqt]);
      setDoc(user, req.body)
        .then(function () {
          res.redirect(301, "/api/users/id/" + user.id);
        })
        .catch(function (err:Error) {
          res.status(500).send({ error: err.message });
        });
      break;
    }
    case requestType.PATCH: {
      if (req.query.verify != process.env.AUTH_KEY) {
        res.status(401).send({ error: "Password incorrect" });
        return;
      }
      res.status(200).json(await findUpdate(rqt, rqr, req.body));
      break;
    }
  }
}

export default handler;