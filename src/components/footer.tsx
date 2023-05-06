import { domain, name } from '@/types/assist/branding';
import getConfig from 'next/config';
import Link from 'next/link';
import Box from './box';
const { publicRuntimeConfig } = getConfig();
import thejson from '@/../sites.json';
import { lightness, toHex } from '@/types/assist/colors';

export default function Footer() {
  var map = thejson.map((x, i) => {
    const darkenedHex = toHex(
      lightness(x.color, 60, false)
    );
    const lightenedHex = toHex(
      lightness(x.color, 60, true)
    );
    return (
      <Link
        key={i}
        className='no-underline'
        href={'http://' + x.name + '.trollcall.xyz'}
      >
        <Box
          style={{
            backgroundColor: darkenedHex,
            color: lightenedHex,
            borderColor: lightenedHex,
            boxShadow: 'none'
          }}
          title={x.title}
          subtitle
          className='my-2'
        >
          {x.description}
        </Box>
      </Link>
    );
  });
  return (
    <Box
      className='negative'
      title={name + domain}
      subtitle
    >
      <p>
        created by{' '}
        <Link
          href='/user/meowcatheorange'
          target='_blank'
        >
          MeowcaTheoRange
        </Link>{' '}
        and{' '}
        <Link
          href='/user/redact'
          target='_blank'
        >
          Redact4K
        </Link>
        .
      </p>
      <p>
        The {name} name is derived from the original{' '}
        <Link href='http://hs.trollcall.xyz/'>
          Hiveswap Troll Call
        </Link>
        . The name may be used in an entity context or a
        project context.
        <br />
        Homestuck and HIVESWAP © Homestuck Inc.
      </p>
      <p className='subtitle pt-2'>OTHER COOL THINGS</p>
      {map}
      <details>
        <summary>Technical</summary>
        <p>
          NPM entry: {publicRuntimeConfig.name}{' '}
          {publicRuntimeConfig.version}
        </p>
        <p>
          Made on Next.js{' '}
          {publicRuntimeConfig.dependencies.next} (React{' '}
          {publicRuntimeConfig.dependencies.react} and
          Typescript{' '}
          {publicRuntimeConfig.dependencies.typescript})
        </p>
        <details open>
          <summary>Extensions</summary>
          <ul>
            {Object.entries(
              publicRuntimeConfig.devDependencies
            ).map((x, i) => (
              <li key={i}>{x[0] + ' ' + x[1]}</li>
            ))}
          </ul>
          <ul>
            {Object.entries(
              publicRuntimeConfig.dependencies
            )
              .filter((x) => x[0].includes('@types/'))
              .map((x, i) => (
                <li key={i}>{x[0] + ' ' + x[1]}</li>
              ))}
          </ul>
        </details>
      </details>
    </Box>
  );
}
