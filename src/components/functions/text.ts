import { Troll } from '@/types/troll';

export const quirkFunctionsDescriptions: {
  [key: string]: string;
} = {
  prefix: `Adds a prefix to the text.
  Argument 0: Prefix text.`,
  suffix: `Adds a suffix to the text.
  Argument 0: Suffix text.`,
  replaceSimple: `Replace a simple string match with another string. 
  Argument 0: Matching string, 
  Argument 1: Replacement string,
  Argument 2: Affect every match (default: true)`,
  replace: `Replace any regex match with another string. 
  Argument 0: Unformatted RegExp (m), 
  Argument 1: Replacement string,
  Argument 2: Affect every match (adds g) (default: true)`,
  lowercase: `Change the case of the given text.
  Argument 0: Ignore next arguments and affect everything? (true/false),
  Argument 1: Starting letter amount (given "COOL", 1 would be "cOOL")
  Argument 2: Seperation between affected letters (given "COOL", it would be the difference between "coOL" and "cOoL"),
  Argument 3: Ending letter amount (given "COOL", 1 would be "COOl")`,
  uppercase: `Change the case of the given text.
  Argument 0: Ignore next arguments and affect everything? (true/false),
  Argument 1: Starting letter amount (given "cool", 1 would be "Cool")
  Argument 2: Seperation between affected letters (given "cool", it would be the difference between "COol" and "CoOl"),
  Argument 3: Ending letter amount (given "cool", 1 would be "cooL")`,
  lowercaseWords: `Change the case of the given text by words.
  Argument 0: Ignore next arguments and affect everything? (true/false),
  Argument 1: Starting letter amount (given "COOL", 1 would be "cOOL")
  Argument 2: Seperation between affected letters (given "COOL", it would be the difference between "coOL" and "cOoL"),
  Argument 3: Ending letter amount (given "COOL", 1 would be "COOl")`,
  uppercaseWords: `Change the case of the given text by words.
  Argument 0: Ignore next arguments and affect everything? (true/false),
  Argument 1: Starting letter amount (given "cool", 1 would be "Cool")
  Argument 2: Seperation between affected letters (given "cool", it would be the difference between "COol" and "CoOl"),
  Argument 3: Ending letter amount (given "cool", 1 would be "cooL")`
};

const quirkFunctions: {
  [key: string]: (str: string, args: any) => string;
} = {
  prefix(str: string, args: [string]) {
    args = args ?? [''];
    let pre = args[0] ?? '';
    return pre + str;
  },
  suffix(str: string, args: [string]) {
    args = args ?? [''];
    let suf = args[0] ?? '';
    return str + suf;
  },
  replaceSimple(str: string, args: [string, string, boolean]) {
    args = args ?? ['', '', true];
    let regex = args[0] ?? '';
    let replacement = args[1] ?? '';
    let affectAll = args[2] ?? true;
    return affectAll ? str.replaceAll(regex, replacement) : str.replace(regex, replacement);
  },
  replace(str: string, args: [string, string, string]) {
    args = args ?? ['', '', '', true];
    let regex = args[0] ?? '';
    let replacement = args[1] ?? '';
    let affectAll = args[2] ?? true ? 'gm' : 'm';
    return str.replace(new RegExp(regex, affectAll), replacement);
  },
  lowercase(str: string, args: [boolean, number, number, number]) {
    args = args ?? [true, 0, 0, 0];
    let affectAll = args[0] ?? true;
    let start = args[1] ?? 0;
    let sepsplit = args[2] ?? 0;
    let end = args[3] ?? 0;
    if (!affectAll) {
      let newStr = str.split('');
      let sep = sepsplit + 1;
      if (start > 0)
        for (let i = 0; i < start; i += sep) {
          if (i >= newStr.length) break;
          newStr[i] = newStr[i].toLowerCase();
        }
      if (end > 0)
        for (let i = newStr.length; i >= newStr.length - end; i -= sep) {
          if (i < 0) break;
          newStr[i] = newStr[i].toLowerCase();
        }
      return newStr.join('');
    } else return str.toLowerCase();
  },
  uppercase(str: string, args: [boolean, number, number, number]) {
    args = args ?? [true, 0, 0, 0];
    let affectAll = args[0] ?? true;
    let start = args[1] ?? 0;
    let sepsplit = args[2] ?? 0;
    let end = args[3] ?? 0;
    if (!affectAll) {
      let newStr = str.split('');
      let sep = sepsplit + 1;
      if (start > 0)
        for (let i = 0; i < start; i += sep) {
          if (i >= newStr.length) break;
          newStr[i] = newStr[i].toUpperCase();
        }
      if (end > 0)
        for (let i = newStr.length; i >= newStr.length - end; i -= sep) {
          if (i < 0) break;
          newStr[i] = newStr[i].toUpperCase();
        }
      return newStr.join('');
    } else return str.toUpperCase();
  },
  lowercaseWords(str: string, args: [boolean, number, number, number]) {
    args = args ?? [true, 0, 0, 0];
    return str
      .split(' ')
      .map((word) => {
        let thep1: string = '',
          thep3: string = '';
        let newWord: string = word.replace(
          /^([^a-zA-Z]*)(.*?)([^a-zA-Z]*)$/g,
          (m: string, p1: string, p2: string, p3: string, _: any, __: any) => {
            thep1 = p1;
            thep3 = p3;
            return p2;
          }
        );
        return thep1 + quirkFunctions.lowercase(newWord, args) + thep3;
      })
      .join(' ');
  },
  uppercaseWords(str: string, args: [boolean, number, number, number]) {
    args = args ?? [true, 0, 0, 0];
    // return str;
    return str
      .split(' ')
      .map((word) => {
        let thep1: string = '',
          thep3: string = '';
        let newWord: string = word.replace(
          /^([^a-zA-Z]*)(.*?)([^a-zA-Z]*)$/g,
          (m: string, p1: string, p2: string, p3: string, _: any, __: any) => {
            thep1 = p1;
            thep3 = p3;
            return p2;
          }
        );
        return thep1 + quirkFunctions.uppercase(newWord, args) + thep3;
      })
      .join(' ');
  }
};

export function transformToQuirks(text: string, character: Troll, quirkIndex: string): string {
  let newText = text;
  // @ts-ignore sigh
  character.quirks[quirkIndex ?? 'default']?.forEach((quirkFunc: any) => {
    if (quirkFunctions[quirkFunc.function] === undefined) return;
    newText = quirkFunctions[quirkFunc.function](newText, quirkFunc.arguments);
  });
  return newText;
}
