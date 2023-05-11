import { name } from '@/types/assist/branding';
import Box from '@/components/box';
import Head from 'next/head';
import Footer from '@/components/footer';
import { GetStaticPropsContext } from 'next/types';
import { limit, orderBy, query } from 'firebase/firestore';
import * as dbFunctions from '@/lib/dbFunctions';
import { Troll } from '@/types/troll';
import { Pesterlog } from '@/types/pester';
import PesterCard from '@/components/pestercard';
import TrollCard from '@/components/trollcard';
import Flair from '@/components/flair';

export default function Home({ trolls, pesters }: { trolls: Troll[]; pesters: Pesterlog[] }) {
  return (
    <div className='base !max-w-screen-2xl'>
      <Head>
        <title>{module.exports.default.name + ' | ' + name}</title>
      </Head>
      <Box
        title={name}
        className='negative'
      >
        <p>Welcome to {name}, a website for indexing various fantrolls. Check them out!</p>
      </Box>
      <Box title='TrollCall Next Beta'>
        <p>
          You are currently viewing the TrollCall Next <b>Beta</b>. Things may be buggy, unstable, or slow. Please
          exercise caution while using the site!
        </p>
        <p>
          If you are a Beta Tester, <b>thank you!</b> Your patronage is helping the website.
        </p>
        <p>If you aren't, then don't fret. You can still view trolls and observe things.</p>
        <p>
          - <b>MeowcaTheoRange</b>
        </p>
      </Box>
      <Box className='flex flex-row gap-4 flex-wrap justify-center w-full'>
        <Flair
          flair={{
            id: 'submit_user',
            color: 16711680,
            name: 'Submit a User',
            url: '/user/submit/'
          }}
          chip
        />
        <Flair
          flair={{
            id: 'submit_troll',
            color: 16711680,
            name: 'Submit a Troll',
            url: '/troll/submit/'
          }}
          chip
        />
        <Flair
          flair={{
            id: 'submit_pester',
            color: 8421504,
            name: 'Submit a Trolllog',
            url: ''
            // url: '/pester/submit/'
          }}
          chip
        />
        <Flair
          flair={{
            id: 'submit_flair',
            color: 16711680,
            name: 'Submit a Flair',
            url: '/flair/submit/'
          }}
          chip
        />
      </Box>
      <div className='flex flex-row gap-4 flex-wrap justify-start w-full'>
        <Box
          title='Some Recent Trolls'
          className='grow basis-[calc(60%_-_0.5rem)]'
        >
          <div className='noshow flex-row flex-wrap justify-around'>
            {trolls.length <= 0
              ? 'No critters in sight...'
              : trolls.map((x, i) => (
                  <TrollCard
                    troll={x}
                    key={i}
                    simple={true}
                  />
                ))}
          </div>
        </Box>
        <Box
          title='Some Recent Pesters'
          className='grow basis-[calc(40%_-_0.5rem)]'
        >
          <div className='noshow flex-row flex-wrap justify-around'>
            {pesters.length <= 0
              ? 'No blabbing in earshot...'
              : pesters.map((x, i) => (
                  <PesterCard
                    pester={x}
                    key={i}
                  />
                ))}
          </div>
        </Box>
      </div>
      <Footer />
    </div>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  // @ts-ignore ???
  const findQueryPrecise = (await dbFunctions.default).findQueryPrecise;

  var rt = await findQueryPrecise('trolls', limit(10));
  var rp = await findQueryPrecise('pesters', limit(10));

  console.log(rt, rp);

  return {
    props: {
      trolls: rt,
      pesters: rp
    }
  };
}
