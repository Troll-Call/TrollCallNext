import { toHex } from "@/types/assist/colors";
import { Bloods } from "@/types/assist/signs";
import { Log, Pesterlog } from "@/types/pester";
import { Troll } from "@/types/troll";
import Link from "next/link";
import { ReactNode } from "react";
import reactStringReplace from 'react-string-replace';

const quirkFunctions:{[key:string]:(str:string, args:any) => string} = {
  replace (str:string, args:[string, string]) {
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

function transformToQuirks(text:string, character:Troll, quirkIndex:string):string {
  let newText = text;
  character.quirks[quirkIndex ?? "default"].forEach((quirkFunc) => {
    newText = quirkFunctions[quirkFunc.function](newText, quirkFunc.arguments);
  })
  return newText;
}

function dialogCompiler(dialog:Pesterlog) {
  let newDialogLog = [...dialog.log];
  let characterColors = dialog.characters.map((char) => 
    toHex(Bloods[char.character.sign.fakeColor ?? char.character.sign.color].colormap.map(x => x * 0xa1))
  );
  // dialog.config = {
  //   memo: true,
  //   memoName: "INSANE CLOWN POSSE",
  //   memoCreationTime: "RIGHT NOW",
  //   memoCreator: 0
  // }
  if (dialog.config?.memo) {
    newDialogLog.unshift({
      text: `[C${dialog.config.memoCreator}] ${dialog.config.memoCreationTime} opened memo on board ${dialog.config.memoName}.`
    }, {
      text: ` `,
      noDash: true
    });
    newDialogLog.push({
      text: ` `,
      noDash: true
    }, {
      text: `[C${dialog.config.memoCreator}S] closed memo.`,
      noDash: true
    }, {
      text: ` `,
      noDash: true
    }, {
      text: `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`,
      noDash: true
    });
  } else {
    newDialogLog.unshift({
      text: "[C0] began trolling [C1]"
    })
  }

  return newDialogLog.map((logitem:Log, index) => {
    let style = {};
    var jsx:any = logitem.text;
    if (logitem.character !== undefined) {
      let character = dialog.characters[logitem.character];
      let shortName = (character.time ? character.time[0] : "") + character.character.username.split(/(?=[A-Z])/).map(x => x[0]).join("").toUpperCase();
      style.color = characterColors[logitem.character];
      jsx = transformToQuirks(jsx.toString(), character.character, logitem.quirk);
      jsx = (<>{shortName}: {jsx}</>);
    } else {
      jsx = reactStringReplace(jsx, /\[C([0-9][US]?)\]/gm, function (m:string) {
        let match = +m.replace(/[US]/g, "");
        let dcm = dialog.characters[match];
        let character = (dcm.time ? dcm.time + " " : "") + dcm.character.username;
        let shortName = (dcm.time ? dcm.time[0] : "") + dcm.character.username.split(/(?=[A-Z])/).map(x => x[0]).join("").toUpperCase();
        return <span style={{color:characterColors[match]}}><Link href={"/trolls/" + dcm.character.id}>{!m.includes("S") ? character : ""}{!m.includes("U") ? (m.includes("S") ? `${shortName}` : ` [${shortName}]`) : ""}</Link></span>
      });
      if (!logitem.noDash) {
        jsx = (<>-- {jsx} --</>);
      }
    }
    return (<p key={index} className={"p-0 leading-tight"} style={style}>
      {jsx}
    </p>);
  });
}

export default function PesterBox({pesterJSON}:{pesterJSON:Pesterlog}) {
  return (
    <div className="p-2 bg-[white] border-2 border-[black] text-[black] my-1 font-mono flex flex-col whitespace-pre-wrap">
      {dialogCompiler(pesterJSON)}
    </div>
  )
}
