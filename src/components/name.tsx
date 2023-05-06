import { CharacterReference } from '@/types/pester';
import { User } from '@/types/user';
import Link from 'next/link';
import Flair from './flair';

export default function UsernameRenderer({
  user,
  name,
  link,
  full
}: {
  user: User;
  name?: boolean;
  link?: boolean;
  full?: boolean;
}) {
  var theLink = link ? (
    <Link href={'/user/' + user.id}>
      {name ? user.username : ''}
    </Link>
  ) : name ? (
    user.username
  ) : (
    ''
  );
  return (
    <span className='inline'>
      {theLink}
      {user.flairs && user.flairs[0] ? (
        full ? (
          user.flairs.map((x, i) => (
            <Flair
              flair={x}
              key={i}
            />
          ))
        ) : (
          <Flair flair={user.flairs[0]} />
        )
      ) : (
        <></>
      )}
    </span>
  );
}

export function TrollNameRenderer(
  character: CharacterReference,
  displayName?: boolean | number,
  shortName?: boolean | number,
  link?: boolean | number
) {
  let sn =
    (character.time ? character.time[0] : '') +
    character.character.username
      .replace(/^(([a-z])[a-z]+)(([A-Z])[a-z]+)$/, '$2$4')
      .toUpperCase();
  var box =
    (character.time ? character.time + ' ' : '') +
    (displayName
      ? character.character.username +
        (shortName ? ' ' : '')
      : '') +
    (shortName ? (displayName ? `[${sn}]` : sn) : '');
  if (link)
    return (
      <Link href={'/trolls/' + character.character.id}>
        {box}
      </Link>
    );
  return box;
}
