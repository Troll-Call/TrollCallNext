import { Flair } from "./flair";

export interface User {
  user: string;
  url: string;
  flairs: Flair[];
}