import { lightness, toHex } from '@/types/assist/colors';
import { FlairSchema, Flair as flairType } from '@/types/flair';
import Link from 'next/link';
import { CSSProperties } from 'react';

export default function Flair({ flair, chip }: { flair: flairType; chip?: boolean }) {
  if (!(flair && (chip || FlairSchema.isValidSync(flair)))) return <></>;
  const hexColor = toHex(flair.color ?? 0);
  const darkenederHex = toHex(lightness(hexColor, 70, false));
  const darkenedHex = toHex(lightness(hexColor, 60, false));
  const lightenedHex = toHex(lightness(hexColor, 60, true));
  let style: CSSProperties = {
    backgroundColor: darkenedHex,
    color: lightenedHex
  };
  if (flair.url)
    style.boxShadow = `1px 1px ${darkenederHex}, 
  2px 2px ${darkenederHex}, 
  3px 3px ${darkenederHex}, 
  4px 4px ${darkenederHex}`;
  var out = (
    <span
      title={flair.id}
      className={`flair`}
      style={style}
    >
      {flair.name}
    </span>
  );
  if (flair.url) return <Link href={flair.url}>{out}</Link>;
  return out;
}
