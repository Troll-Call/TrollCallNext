import { Troll } from "@/types/troll";

const quirkFunctions: { [key: string]: (str: string, args: any) => string } = {
  replace(str: string, args: [string, string]) {
    return str.replace(new RegExp(args[0], "gm"), args[1]);
  },
  lowercase(str: string, args: [boolean, number, number, number]) {
    if (!args[0]) {
      let newStr = str.split("");
      let sep = args[2] + 1;
      if (args[1] > 0) for (let i = 0; i < args[1]; i += sep) {
        if (i >= newStr.length) break;
        newStr[i] = newStr[i].toLowerCase();
      }
      if (args[3] > 0) for (let i = newStr.length; i >= newStr.length - args[3]; i -= sep) {
        if (i < 0) break;
        newStr[i] = newStr[i].toLowerCase();
      }
      return newStr.join("");
    } else return str.toLowerCase();
  },
  uppercase(str: string, args: [boolean, number, number, number]) {
    if (!args[0]) {
      let newStr = str.split("");
      let sep = args[2] + 1;
      if (args[1] > 0) for (let i = 0; i < args[1]; i += sep) {
        if (i >= newStr.length) break;
        newStr[i] = newStr[i].toUpperCase();
      }
      // if (args[3] > 0) for (let i = newStr.length; i >= newStr.length - args[3]; i -= sep) {
      //   if (i < 0) break;
      //   newStr[i] = newStr[i].toUpperCase();
      // }
      return newStr.join("");
    } else return str.toUpperCase();
  },
  lowercaseWords(str: string, args: [boolean, number, number, number]) {
    return str.split(" ").map((word) => {
      let thep1: string = "", thep3: string = "";
      let newWord: string = word.replace(/^([^a-zA-Z]*)(.*?)([^a-zA-Z]*)$/g, (m: string, p1: string, p2: string, p3: string, _: any, __: any) => {
        thep1 = p1;
        thep3 = p3;
        return p2;
      });
      return thep1 + quirkFunctions.lowercase(newWord, args) + thep3;
    }).join(" ");
  },
  uppercaseWords(str: string, args: [boolean, number, number, number]) {
    // return str;
    return str.split(" ").map((word) => {
      let thep1: string = "", thep3: string = "";
      let newWord: string = word.replace(/^([^a-zA-Z]*)(.*?)([^a-zA-Z]*)$/g, (m: string, p1: string, p2: string, p3: string, _: any, __: any) => {
        thep1 = p1;
        thep3 = p3;
        return p2;
      });
      return thep1 + quirkFunctions.uppercase(newWord, args) + thep3;
    }).join(" ");
  }
}

export function transformToQuirks(text: string, character: Troll, quirkIndex: string): string {
  let newText = text;
  character.quirks[quirkIndex ?? "default"].forEach((quirkFunc: any) => {
    newText = quirkFunctions[quirkFunc.function](newText, quirkFunc.arguments);
  })
  return newText;
}