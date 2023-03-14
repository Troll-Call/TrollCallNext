import { DocumentReference } from "firebase/firestore";
import { Troll } from "./troll";

export type Color = [number, number, number];
export const rgb = (r:number, g:number, b:number):Color => ([r,g,b]);

export interface HeightMeasure {
  value: number;
  unit: "inches" | "meters";
}
export interface TimeMeasure {
  value: number;
  unit: "sweeps" | "years";
}
export interface Name {
  first: string;
  last: string;
}
export interface Preference {
  thing: string;
  opinion: "loves" | "likes" | "neutral" | "dislikes" | "hates";
};
export type Policy = "yes" | "ask" | "no";

export interface Log {
  character: number;
  text: string;
  action?: {
    text?: string;
    time?: string; 
  };
  quirk?: string;
}

export interface CharacterStatus {
  character: (DocumentReference|any) // Reference
  time?: string;
}