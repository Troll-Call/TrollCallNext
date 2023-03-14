import { Flair } from "./flair";

export interface User {
  username: string;
  url: string;
  flairs: any[]; // Reference
}