import { getDocs, getDoc, where, query, doc, collection, WhereFilterOp } from 'firebase/firestore';
import { database } from "@/lib/firebase";
import validtypes from '@/lib/validtypes';

export enum requestType {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE"
}

export async function findOne(collection: string, documen:string) {
  const object = await validtypes[collection].fromFirestore(await getDoc(doc(database, collection, documen)));
  console.log(object);
  return object;
}

export async function findAll(collectionName: string) {
  const object = await getDocs(collection(database, collectionName));
  return object.docs.map(x => x.id);
}

export async function findQuery(collectionName: string, a:string, b:WhereFilterOp, c:unknown) {
  const object = await getDocs(query(collection(database, collectionName), where(a,b,c)));
  return object.docs.map(x => ({id: x.id, data: x.data()}));
}