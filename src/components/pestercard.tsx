import Link from 'next/link';
import { Pesterlog } from '@/types/pester';
import Box from './box';
import { TrollNameRenderer } from './name';

export default function PesterCard({ pester }: { pester: Pesterlog }) {
  return (
    <Link
      href={'/pester/' + pester.id}
      className='no-underline'
    >
      <Box
        className='box noborder'
        title={pester.name}
      >
        <p className='py-1'>Created {new Date(pester.date).toLocaleString()}</p>
        <div className='negative noborder no-underline my-1 font-mono whitespace-pre-line'>
          {pester.description.replace(/\\n/gm, '\n')}
        </div>
        {pester.config?.memo
          ? 'Memo with ' + pester.characters.map((troll, i) => TrollNameRenderer(troll, 1, 1, 0)).join(' and ')
          : TrollNameRenderer(pester.characters[0], 1, 1, 0) +
            ' vs ' +
            TrollNameRenderer(pester.characters[1], 1, 1, 0)}
      </Box>
    </Link>
  );
}
