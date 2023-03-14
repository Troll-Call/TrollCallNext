import { getDocs, getDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { database } from "@/middleware/firebase";

export enum requestType {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE"
}

export async function findOne(collection: string, documen:string) {
  const object = await getDoc(doc(database, collection, documen));
  return object.data();
}

export async function findAll(collection: any) {
  const object = await getDocs(collection(database, collection));
  var blah:{[key:string]:any} = {};
  object.docs.forEach(x => blah[x.id] = x.data());
  return blah;
}

export async function findUpdate(collection:string, documen:string, update:{[key:string]:any}) {
  // update.timestamp = serverTimestamp();
  return (await updateDoc(doc(database, collection, documen), update));
}