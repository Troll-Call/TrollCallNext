import { Character } from "./troll";
import { CharacterStatus, Log } from "./generics";
import { User } from "./user";


export interface Pesterlog {
  reference: string;
  owners: User[];
  name: string;
  description: string | string[];
  date: number;
  characters: CharacterStatus[];
  log: Log[];
}