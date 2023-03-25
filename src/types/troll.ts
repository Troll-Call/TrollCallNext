import { DocumentReference } from "firebase/firestore";
import { Policy, Preference, Color, isPolicy, isPreference } from "./generics";
import { User } from "./user";

export interface Troll {
  owners: string[]; // Reference
  name: Name; // Joltif Zoxxit
  pronunciation: Name; // joel-teef zox-sit
  username: string; // technologicalConnectivity

  description: string; // Joltif is a goldblood nerd-o who's not ashamed...

  age: number;
  sign: {
    extended: string;
    color: number;
    fakeColor?: number;
  };
  species: string;
  pronouns: string[];
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

export interface ServerTroll extends Omit<Troll, "owners"> {
  owners: string[] & DocumentReference[];
}

export function isTroll(troll:Troll) {
  return troll ? [
    troll.owners ? troll.owners.every(x => (typeof x) === "string") : false,
    isName(troll.name),
    isName(troll.pronunciation),
    (typeof troll.username) === "string",
    (typeof troll.description) === "string",
    (typeof troll.age) === "number",
    // {
    troll.sign ? ([
      (typeof troll.sign.extended) === "string",
      (typeof troll.sign.color) === "number"
    ].every(x=>x)) : false,
    // }
    (typeof troll.species) === "string",
    troll.pronouns ? troll.pronouns.every(x => (typeof x) === "string") : false,
    (typeof troll.gender) === "string",
    (typeof troll.height) === "number",
    troll.colors ? troll.colors.every(x => (typeof x) === "number") : false,
    // {
    troll.policies ? ([
      isPolicy(troll.policies.fanart),
      isPolicy(troll.policies.fanartOthers),
      isPolicy(troll.policies.kinning),
      isPolicy(troll.policies.shipping),
      isPolicy(troll.policies.fanfiction)
    ].every(x=>x)) : false,
    // }
    troll.preferences ? troll.preferences.every(isPreference) : false,
    troll.facts ? troll.facts.every(x => (typeof x) === "string") : false,
    troll.quirks ? Object.values(troll.quirks).every(x => x ? x.every(isQuirkFunction) : false) : false,
  ].every(x=>x) : false;
}

interface QuirkFunction {
  function: string,
  arguments?: any[]
};

export function isQuirkFunction(quirkFunction:QuirkFunction) {
  return quirkFunction ? (typeof quirkFunction.function) == "string" : false;
}

export interface Name {
  first: string;
  last: string;
}

export function isName(name:Name) {
  return name ? [
    (typeof name.first) == "string",
    (typeof name.last) == "string"
  ].every(x=>x) : false;
}