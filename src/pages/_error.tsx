import { name } from '@/types/assist/branding';
import Box from '@/components/box';
import Head from 'next/head';
import Footer from '@/components/footer';
import { NextPageContext } from 'next';
import http from '@/types/assist/http';
import Navbar from '@/components/nav';
import Link from 'next/link';

function Error({ statusCode }: { statusCode: number }) {
  return (
    <div className='base'>
      <Head>
        <title>{module.exports.default.name + ' | ' + name}</title>
      </Head>
      <Navbar
        title={statusCode + ' - ' + http[statusCode]}
        type={module.exports.default.name}
      />
      <Box
        title={module.exports.default.name + ' ' + statusCode + ' - ' + http[statusCode]}
        className='negative'
      >
        <p className='py-2'>
          <b>BAD NEWS: This isn't the right page!</b>
        </p>
        <p>
          "What do I do", you shout!
          <br />
          Don't fret! You can go back <Link href='/'>home</Link> to abscond quickly!
        </p>
        <p>Or, you can get into the sharpie bath.</p>
        <div className='text-center w-full p-4'>
          <img
            className='inline-block border-4 border-[black]'
            src='/assets/sharpiebath.png'
          />
        </div>
      </Box>
      <Footer />
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
