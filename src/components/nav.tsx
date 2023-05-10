import Head from 'next/head';
import Link from 'next/link';
import { name } from '@/types/assist/branding';

export default function Navbar({ title, type }: { title: string; type: string }) {
  return (
    <>
      <Head>
        <title>{type + ': ' + title + ' | ' + name}</title>
      </Head>
      <div className='box negative noborder items-center flex flex-row overflow-hidden rounded-lg'>
        <Link
          href='/'
          className='monospace text-left flex-none'
        >
          &lt;== Back
        </Link>
        <span className='subtitle text-center break-words grow'>{title}</span>
        <span className='monospace text-right flex-none'>{type}</span>
      </div>
    </>
  );
}
