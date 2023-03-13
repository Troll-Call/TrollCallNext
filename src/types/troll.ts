import { HeightMeasure, TimeMeasure, Name, Policy, Preference, Color } from "./generics";
import { User } from "./user";

export interface Character {
  reference: string;
  owners: User[];
  name: Name; // Joltif Zoxxit
  pronunciation: Name; // joel-teef zox-sit
  username: string; // technologicalConnectivity

  description: string; // Joltif is a goldblood nerd-o who's not ashamed...

  age: TimeMeasure;
  sign: {
    extended: string;
    sign: number;
  };
  species: string;
  pronouns: [string, string][];
  gender: string;
  height: HeightMeasure;

  colors: Color[];

  policies: {
    fanart: Policy;
    fanartOthers: Policy;
    kinning: Policy;
    shipping: Policy;
    fanfiction: Policy;
  };
  likes: Preference[];
  facts: string[];

  quirks: {[quirk: string]: QuirkFunction[]};
}

type QuirkFunction = [string, string[]];