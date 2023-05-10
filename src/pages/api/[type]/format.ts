import { requestType, findOne } from '@/lib/dbFunctions';
import type { NextApiRequest, NextApiResponse } from 'next';
import validyum from '@/lib/validyum';
import { setDoc, doc, updateDoc, SnapshotOptions } from 'firebase/firestore';
import { database } from '@/lib/firebase';
import validtypes from '@/lib/validtypes';
import { dialogCompiler } from '@/components/pester';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let rqt: string = req.query.type as string;
  if (rqt === undefined || rqt !== 'pesters') {
    res.status(404).send(`Endpoint "${rqt}" does not support formatting.`);
    return;
  }
  switch (req.method) {
    case requestType.POST: {
      validyum[rqt].clientPolicy
        .validate(req.body)
        .then(async function (out) {
          res.send(
            dialogCompiler(
              // @ts-ignore just gonna sweep this under the rug until I find a fix for it
              await validtypes[rqt].toFormat(out),
              false
            ).join('\n')
          );
        })
        .catch(function (err: Error) {
          res.status(400).send(err.stack);
        });
      break;
    }
    default: {
      res.status(404).send('');
    }
  }
}

export default handler;
