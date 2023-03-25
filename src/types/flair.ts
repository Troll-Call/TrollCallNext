import { Color } from "./generics";

export interface Flair {
  name: string;
  color: number;
}

export function isFlair(flair:Flair) {
  return flair ? [
    (typeof flair.name) === "string",
    (typeof flair.color) === "number",
  ].every(x=>x) : false;
}