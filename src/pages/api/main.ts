import mongoose from "mongoose";
import { MongooseUser } from '@/Mongoose/User';
import { MongooseFlair } from '@/Mongoose/Flair';

export enum requestType {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE"
}

export async function findMongoose(model: any, query:Object, populatable:any) {
  const object = await model.findOne(query).populate(populatable).exec();
  return object ? object.toJSON() : {};
}

export async function findManyMongoose(model: any, populatable:any) {
  const objects = await model.find({}).populate(populatable).lean();
  return objects ?? [];
}

export async function findUpdateMongoose(model: any, query:Object, update:string, populatable:any) {
  await model.findOneAndUpdate(query, update).populate(populatable).exec();
  return (await model.findOne(query))?.toJSON() ?? {};
}