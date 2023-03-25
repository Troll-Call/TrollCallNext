import { getDocs, getDoc, where, query, doc, updateDoc, serverTimestamp, collection, WhereFilterOp } from 'firebase/firestore';
import { database } from "@/lib/firebase";
import validtypes from '../pages/api/[type]/validtypes';

export enum requestType {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE"
}

export async function findOne(collection: string, documen:string) {
  const object = await getDoc(doc(database, collection, documen).withConverter(validtypes[collection]));
  return object.data();
}

export async function findAll(collectionName: string) {
  const object = await getDocs(collection(database, collectionName));
  return object.docs.map(x => x.id);
}

export async function findQuery(collectionName: string, a:string, b:WhereFilterOp, c:unknown) {
  const object = await getDocs(query(collection(database, collectionName), where(a,b,c)));
  return object.docs.map(x => ({id: x.id, data: x.data()}));
}

export async function findUpdate(collection:string, documen:string, update:{[key:string]:any}) {
  // update.timestamp = serverTimestamp();
  return (await updateDoc(doc(database, collection, documen), update));
}