import { MongooseTroll } from '@/Mongoose/Troll';
import { requestType, findMongoose, findUpdateMongoose } from '../../main';
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/middleware/mongodb';
import generics from '../generics';

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
    case requestType.GET: {
      res.status(200).json(await findMongoose(type, { '_id': req.query.id }, generics[req.query.type].populate));
      break;
    }
    case requestType.PATCH: {
      if (req.query.verify != process.env.AUTH_KEY) {
        res.status(401).send({ error: "Password incorrect" });
        return;
      }
      res.status(200).json(await findUpdateMongoose(type, { '_id': req.query.id }, req.body, generics[req.query.type].populate));
      break;
    }
  }
}

export default connectDB(handler);