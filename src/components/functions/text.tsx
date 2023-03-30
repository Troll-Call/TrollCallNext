import { Troll } from "@/types/troll";

const quirkFunctions:{[key:string]:(str:string, args:any) => string} = {
  replace (str:string, args:[string, string]) {
    console.log(str);
    return str.replace(new RegExp(args[0], "gm"), args[1]);
  },
  lowercase (str:string, args:[boolean, number, number]) {
    if (!args[0]) {
      str = str.substring(0, args[1]).toLowerCase() + str.substring(args[1]);
      str = str.substring(0, args[2]) + str.substring(args[2]).toLowerCase();
      return str;
    } else return str.toLowerCase();
  },
  uppercase (str:string, args:[boolean, number, number]) {
    if (!args[0]) {
      str = str.substring(0, args[1]).toUpperCase() + str.substring(args[1]);
      str = str.substring(0, args[2]) + str.substring(args[2]).toUpperCase();
      return str;
    } else return str.toUpperCase();
  }
}

export function transformToQuirks(text:string, character:Troll, quirkIndex:string):string {
  let newText = text;
  character.quirks[quirkIndex ?? "default"].forEach((quirkFunc) => {
    newText = quirkFunctions[quirkFunc.function](newText, quirkFunc.arguments);
  })
  return newText;
}