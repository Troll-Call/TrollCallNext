
import { requestType, findManyMongoose } from '../main';
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/middleware/mongodb';
import generics from './generics';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!generics.hasOwnProperty(req.query.type)) {
    res.status(404).send(); 
    return;
  }
  var type = generics[req.query.type].type;
  switch (req.method) {
    case requestType.POST: {
      if (req.query.verify != process.env.AUTH_KEY) {
        res.status(401).send({ error: "Password incorrect" });
        return;
      }
      const user = new type(req.body);
      user.save()
        .then(function () {
          res.redirect(301, "/api/users/id/" + user.id);
        })
        .catch(function (err:Error) {
          res.status(500).send({ error: err.message });
        });
      break;
    }
    case requestType.GET: {
      res.status(200).json(await findManyMongoose(type, generics[req.query.type].populate));
      break;
    }
  }
}

export default connectDB(handler);