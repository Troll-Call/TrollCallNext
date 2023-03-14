import { DocumentReference } from "firebase/firestore";
import { HeightMeasure, TimeMeasure, Name, Policy, Preference, Color } from "./generics";
import { User } from "./user";

export interface Troll {
  owners: (DocumentReference|any)[]; // Reference
  name: Name; // Joltif Zoxxit
  pronunciation: Name; // joel-teef zox-sit
  username: string; // technologicalConnectivity

  description: string; // Joltif is a goldblood nerd-o who's not ashamed...

  age: number;
  sign: {
    extended: string;
    color: number;
  };
  species: string;
  pronouns: [string, string][];
  gender: string;
  height: number;

  colors: number[];

  policies: {
    fanart: Policy;
    fanartOthers: Policy;
    kinning: Policy;
    shipping: Policy;
    fanfiction: Policy;
  };
  preferences: Preference[];
  facts: string[];

  quirks: {[quirk: string]: QuirkFunction[]};
}

type QuirkFunction = [string, string[]];