import { DocumentReference } from "firebase/firestore";
import { CharacterStatus, isCharacterStatus, isLog, Log } from "./generics";
import { User } from "./user";


export interface Pesterlog {
  reference: string;
  owners: string[]; // Reference
  name: string;
  description: string;
  date: number;
  characters: CharacterStatus[];
  log: Log[];
}

export interface ServerPesterlog extends Omit<Pesterlog, "owners"> {
  owners: string[] & DocumentReference[]
}

export function isPesterlog(pesterlog:Pesterlog) {
  return pesterlog ? [
    (typeof pesterlog.reference) === "string",
    pesterlog.owners ? pesterlog.owners.every(x => (typeof x) === "string") : false,
    (typeof pesterlog.name) === "string",
    (typeof pesterlog.description) === "string",
    (typeof pesterlog.date) === "number",
    pesterlog.characters ? pesterlog.characters.every(isCharacterStatus) : false,
    pesterlog.log ? pesterlog.log.every(isLog) : false,
  ].every(x=>x) : false;
}