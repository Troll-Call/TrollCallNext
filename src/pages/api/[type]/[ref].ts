import { requestType, findOne } from '@/lib/dbFunctions';
import type { NextApiRequest, NextApiResponse } from 'next';
import validyum from '@/lib/validyum';
import { setDoc, doc, updateDoc } from 'firebase/firestore';
import { database } from "@/lib/firebase";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let rqt:string = req.query.type as string;
  let rqr:string = req.query.ref as string;
  if (!validyum.hasOwnProperty(rqt)) {
    res.status(404).send(`Endpoint "${rqt}" Not Found`); 
    return;
  }
  switch (req.method) {
    case requestType.GET: {
      var rp = await findOne(rqt, rqr);
      if (rp)
        res.status(200).json(rp)
      else
        res.status(404).send(`${validyum[rqt].name} "${rqr}" Not Found`);
      break;
    }
    case requestType.POST: {
      if (req.query.verify != process.env.AUTH_KEY) {
        res.status(401).send("Password incorrect");
        return;
      }
      const user = doc(database, rqt, rqr);
      let validate = validyum[rqt].policy.validate(req.body)
        .then(function (out) {
          setDoc(user, out)
            .then(function () {
              res.redirect(303, "/api/" + rqt + "/" + user.id);
            })
            .catch(function (err:Error) {
              res.status(500).send(err.message);
            });
        })
        .catch(function (err:Error) {
          res.status(400).send(err.message);
        });
      break;
    }
    case requestType.PATCH: {
      if (req.query.verify != process.env.AUTH_KEY) {
        res.status(401).send("Password incorrect");
        return;
      }
      const user = doc(database, rqt, rqr);
      let validate = validyum[rqt].policy.validate(req.body)
        .then(function (out) {
          updateDoc(user, out)
            .then(function () {
              res.redirect(303, "/api/" + rqt + "/" + user.id);
            })
            .catch(function (err:Error) {
              res.status(500).send(err.message);
            });
        })
        .catch(function (err:Error) {
          res.status(400).send(err.message);
        });
      break;
    }
  }
}

export default handler;