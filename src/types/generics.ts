import { DocumentReference } from "firebase/firestore";
import { Flair } from "./flair";
import { Pesterlog } from "./pester";
import { Troll } from "./troll";
import { User } from "./user";

export type Color = [number, number, number];
export const rgb = (r:number, g:number, b:number):Color => ([r,g,b]);

export interface Preference {
  thing: string;
  opinion: boolean;
};

export function isPreference(preference:Preference) {
  return preference ? [
    (typeof preference.thing) === "string",
    (typeof preference.opinion) === "boolean"
  ].every(x=>x) : false;
}

export type Policy = "yes" | "ask" | "no";

export function isPolicy(policy:Policy) {
  return policy == "yes" || policy == "ask" || policy == "no";
}

export interface Log {
  character: number;
  text: string;
  action?: {
    text?: string;
    time?: string; 
  };
  quirk?: string;
}

export function isLog(log:Log) {
  return log ? [
    (typeof log.character) === "number",
    (typeof log.text) === "string"
  ].every(x=>x) : false;
}

export interface CharacterStatus {
  character: (DocumentReference|any) // Reference
  time?: string;
}

export function isCharacterStatus(characterStatus:CharacterStatus) {
  return characterStatus ? (characterStatus.character !== undefined) : false;
}

export interface GenericHolder {
  id: string,
  data: Troll & Pesterlog & User & Flair
}