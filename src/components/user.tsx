import { lightness, toHex } from '@/types/assist/colors';
import { UserSchema, User as userType } from '@/types/user';
import Link from 'next/link';
import { CSSProperties } from 'react';
import Box from './box';
import UsernameRenderer from './name';
import { Bloods, PossibleBloods } from '@/types/assist/signs';

export default function UserRenderer({ user }: { user: userType }) {
  if (!(user && UserSchema.isValidSync(user))) return <></>;
  console.log(user.color);
  const hexColor = toHex((Bloods[PossibleBloods[user.color]] ?? Bloods[12]).colormap.map((x) => x * 255));
  const darkenederHex = toHex(lightness(hexColor, 70, false));
  const darkenedHex = toHex(lightness(hexColor, 60, false));
  const lightenedHex = toHex(lightness(hexColor, 60, true));
  let style: CSSProperties = {
    backgroundColor: darkenedHex,
    color: lightenedHex,
    borderColor: lightenedHex
  };
  return (
    <Link href={'/user/' + user.id}>
      <Box
        title={user.username}
        className='noshadow'
        style={style}
      >
        {user.url ? (
          <p className='pt-0'>
            at{' '}
            <a
              href={user.url}
              target='_blank'
            >
              {user.url}
            </a>
          </p>
        ) : (
          <></>
        )}
        <UsernameRenderer
          name={false}
          full={true}
          user={user}
        />
        {user.description ? (
          <div className='negative noborder no-underline my-1 font-mono whitespace-pre-line break-words'>
            {user.description.replace(/\\n/gm, '\n')}
          </div>
        ) : (
          <></>
        )}
      </Box>
    </Link>
  );
}
