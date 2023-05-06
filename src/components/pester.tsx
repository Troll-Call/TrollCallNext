import { toHex } from '@/types/assist/colors';
import {
  Bloods,
  PossibleBloods
} from '@/types/assist/signs';
import { Log, Pesterlog } from '@/types/pester';
import { CSSProperties } from 'react';
import reactStringReplace from 'react-string-replace';
import { transformToQuirks } from './functions/text';
import { TrollNameRenderer } from './name';

export function dialogCompiler(
  dialog: Pesterlog,
  jsx: boolean
) {
  let newDialogLog = [...dialog.log];
  console.log(JSON.stringify(dialog.characters));
  let characterColors = dialog.characters.map((char) =>
    toHex(
      Bloods[
        char.character.sign?.fakeColor ??
          char.character.sign?.color ??
          0
      ].colormap.map((x) => Math.round(x * 0xa1))
    )
  );
  // dialog.config = {
  //   memo: true,
  //   memoName: "INSANE CLOWN POSSE",
  //   memoCreationTime: "RIGHT NOW",
  //   memoCreator: 0
  // }
  if (dialog.config?.memo) {
    newDialogLog.unshift(
      {
        text: `[C${dialog.config.memoCreator}] ${
          dialog.config.memoCreationTime
        } opened memo on board ${transformToQuirks(
          dialog.config.memoName,
          dialog.characters[dialog.config.memoCreator]
            .character,
          'default'
        )}.`,
        id: '',
        quirk: 'default'
      },
      {
        text: ` `,
        noDash: true,
        id: '',
        quirk: 'default'
      }
    );
    newDialogLog.push(
      {
        text: ` `,
        noDash: true,
        id: '',
        quirk: 'default'
      },
      {
        text: `[C${dialog.config.memoCreator}S] closed memo.`,
        id: '',
        quirk: 'default'
      },
      {
        text: ` `,
        noDash: true,
        id: '',
        quirk: 'default'
      },
      {
        text: `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`,
        noDash: true,
        id: '',
        quirk: 'default'
      }
    );
  } else {
    newDialogLog.unshift({
      text: '[C0] began trolling [C1]',
      id: '',
      quirk: 'default'
    });
  }

  return newDialogLog.map((logitem: Log, index) => {
    let style: CSSProperties = {};
    var output: any = logitem.text;
    if (logitem.character === undefined && jsx) {
      output = reactStringReplace(
        output,
        /\[C([0-9][US]?)\]/gm,
        function (m: string) {
          let match = +m.replace(/[US]/g, '');
          return (
            <span style={{ color: characterColors[match] }}>
              {TrollNameRenderer(
                dialog.characters[match],
                !m.includes('S'),
                !m.includes('U'),
                1
              )}
            </span>
          );
        }
      );
    } else {
      output = output.replace(
        /\[C([0-9])([US])?\]/gm,
        function (
          m: string,
          p1: string,
          p2: string,
          _: any,
          __: any
        ) {
          return TrollNameRenderer(
            dialog.characters[+p1],
            p2 !== 'S',
            p2 !== 'U',
            0
          );
        }
      );
    }
    if (logitem.character !== undefined) {
      let character = dialog.characters[logitem.character];
      style.color = characterColors[logitem.character];
      output = `${TrollNameRenderer(
        character,
        0,
        1,
        0
      )}: ${transformToQuirks(
        output,
        character.character,
        logitem.quirk
      )}`;
    } else {
      if (!logitem.noDash) {
        output = jsx ? (
          <>-- {output} --</>
        ) : (
          `-- ${output} --`
        );
      }
    }
    return jsx ? (
      <p
        key={index}
        className={'p-0 leading-tight'}
        style={style}
      >
        {output}
      </p>
    ) : (
      output
    );
  });
}

export default function PesterBox({
  pesterJSON
}: {
  pesterJSON: Pesterlog;
}) {
  return (
    <div className='p-2 bg-[white] border-2 border-[black] text-[black] my-1 font-mono flex flex-col whitespace-pre-wrap'>
      {dialogCompiler(pesterJSON, true)}
    </div>
  );
}
