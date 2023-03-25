import { DocumentReference } from "firebase/firestore";
import { Flair } from "./flair";

export interface User {
  username: string;
  url: string;
  flairs: string[]; // Reference
}

export interface ServerUser extends Omit<User, "flairs"> {
  flairs: DocumentReference[] & string[];
}

export function isUser(user:User) {
  return user ? [
    (typeof user.username) === "string",
    (typeof user.url) === "string",
    user.flairs ? user.flairs.every(x => (typeof x) === "string") : false,
  ].every(x=>x) : false;
}