import { DocumentReference } from "firebase/firestore";
import { CharacterStatus, Log } from "./generics";
import { User } from "./user";


export interface Pesterlog {
  reference: string;
  owners: (DocumentReference|any)[]; // Reference
  name: string;
  description: string | string[];
  date: number;
  characters: CharacterStatus[];
  log: Log[];
}