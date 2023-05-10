import { lightness, negate, themeColor, toHex } from '@/types/assist/colors';
import Box from '@/components/box';
import Navbar from '@/components/nav';
import * as dbFunctions from '@/lib/dbFunctions';
import { GetStaticPropsContext } from 'next/types';
import { Troll as trollType } from '@/types/troll';
import Footer from '@/components/footer';
import TrollCard from '@/components/trollcard';
import PesterBox from '@/components/pester';
import UsernameRenderer, { TrollNameRenderer } from '@/components/name';
import { User as userType } from '@/types/user';
import { Bloods, PossibleBloods, policyString } from '@/types/assist/signs';
import { Themer } from '@/components/themer';

export default function Troll({ troll }: { troll: trollType }) {
  var mySignColor = troll.sign.fakeColor ?? troll.sign.color;
  var bloodColor = Bloods[mySignColor] ?? Bloods[12];
  var bloodHex = toHex(bloodColor.colormap.map((x) => x * 255));
  console.log(troll);
  return (
    <div className='base'>
      <Themer
        color={bloodColor.colormap.map((x) => x * 255)}
        label='pos'
      />
      <Themer
        color={
          bloodColor.colormapNeg
            ? bloodColor.colormapNeg?.map((x) => x * 255)
            : negate(bloodColor.colormap.map((x) => x * 255))
        }
        label='neg'
      />
      <Navbar
        title={troll.name.first}
        type={module.exports.default.name}
      />
      <Box
        title={troll.name.first + ' ' + troll.name.last}
        className='relative'
      >
        <svg
          width='70'
          height='61'
          style={{
            filter: `drop-shadow(${bloodHex} 0px 0px 4px)`,
            position: 'absolute',
            top: 16,
            right: 16
          }}
          viewBox='0 0 80 70'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            stroke={toHex(lightness(bloodHex, 90, true))}
            strokeWidth='2'
            fill={toHex(lightness(bloodHex, 80, true))}
            d='M-1.74846e-06 35L20 0.358977L60 0.358976L80 35L60 69.641L20 69.641L-1.74846e-06 35Z'
          />
          <image
            x='12'
            y='10'
            width='56'
            height='56'
            href={`/signs/${troll.sign?.color ?? 0}/${troll.sign?.extended ?? 'Aries'}.svg`}
          />
          <rect
            width='100%'
            height='100%'
            fill='transparent'
          >
            <title>{troll.sign?.extended ?? 'Aries'}</title>
          </rect>
        </svg>
        <span>
          owned by{' '}
          {troll.owners.map((user: userType, i) => (
            <>
              {i > 0 ? ' and ' : ''}
              <UsernameRenderer
                link
                key={i}
                name
                user={user}
              />
            </>
          ))}
        </span>
        <p>
          pronounced <i>({troll.pronunciation.first + ' ' + troll.pronunciation.last})</i>
        </p>
        <p>
          Also known as <code>{TrollNameRenderer({ time: '', character: troll }, true, true, false)}</code> online.
        </p>
        <Box className='negative noborder font-mono my-1 whitespace-pre-line'>{troll.description}</Box>
        <div className='w-full flex flex-row flex-wrap items-center justify-center gap-4'>
          <span>{troll.pronouns.join(', ')}</span>
          <span>{troll.gender}</span>
          <span title={'(' + Math.round(troll.age * 2.166) + ' years old)'}>{troll.age} sweeps old</span>
          <span title={'(' + Math.round(troll.height / 0.3937) / 100 + ' meters)'}>
            {Math.floor(troll.height / 12)}'{Math.floor(troll.height % 12)}"
          </span>
          <span>{troll.species}</span>
        </div>
      </Box>
      <div className='w-full grid grid-cols-2 gap-2'>
        <img src={'/api/cdn/trolls/' + troll.id + '/image.png'} />
        <div>
          <Box
            title={'About ' + troll.name.first}
            className='h-max'
          >
            <Box className='negative noborder font-mono my-1 whitespace-pre-line'>
              <ul className='py-0'>
                {troll.facts.map((x) => (
                  <li>{x}</li>
                ))}
              </ul>
            </Box>
            <p className='subtitle py-1'>Policies</p>
            <Box className='negative noborder font-mono my-1 whitespace-pre-line'>
              1. You {policyString(troll.policies.fanfiction, 'can make', 'should ask before making', 'can not make')}{' '}
              fanfiction about {troll.pronouns[0].split('/')[1]}
              <br />
              2. You {policyString(troll.policies.fanart, 'can make', 'should ask before making', 'can not make')}{' '}
              fanart of {troll.pronouns[0].split('/')[1]}
              <br />
              3. You {policyString(troll.policies.fanart, 'can make', 'should ask before making', 'can not make')}{' '}
              fanart of {troll.pronouns[0].split('/')[1]} with other characters
              <br />
              4. You {policyString(
                troll.policies.shipping,
                'can ship',
                'should ask before shipping',
                'can not ship'
              )}{' '}
              {troll.pronouns[0].split('/')[1]} with other characters
              <br />
              5. You {policyString(troll.policies.kinning, 'can kin', 'should ask before kinning', 'can not kin')}{' '}
              {troll.pronouns[0].split('/')[1]}
            </Box>
            <p className='subtitle py-1'>What {troll.name.first} likes</p>
            <Box className='negative noborder font-mono my-1 whitespace-pre-line'>
              {troll.preferences.map((v) => (
                <p>
                  <span style={{ color: v.opinion ? 'red' : 'black' }}>{v.opinion ? '♥️' : '♠️'}</span> {v.thing}
                </p>
              ))}
            </Box>
          </Box>
          <div className='pt-2'>
            <PesterBox
              pesterJSON={{
                id: '',
                owners: troll.owners,
                name: 'Testerlog',
                description: '',
                date: 0,
                characters: [
                  {
                    character: troll,
                    time: ''
                  },
                  {
                    character: troll,
                    time: ''
                  }
                ],
                log: Object.entries(troll.quirks).map(([quirkName, _], i) => ({
                  character: 0,
                  text: 'This is my ' + quirkName + ' quirk.',
                  time: '',
                  noDash: true,
                  quirk: quirkName,
                  id: ''
                }))
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export async function getStaticPaths() {
  // @ts-ignore Go fuck yourself, JavaScript
  const findAll = (await dbFunctions.default).findAll;
  const bruh = await findAll('trolls');
  const paths = bruh.map((x: string) => ({
    params: { id: x }
  }));
  return {
    paths,
    fallback: false // can also be true or 'blocking'
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  // @ts-ignore Go fuck yourself, JavaScript
  const findOne = (await dbFunctions.default).findOne;
  let cpi: string | undefined = context.params?.id as string;
  if (cpi === undefined)
    return {
      notFound: true
    };

  var rp = await findOne('trolls', cpi);

  return {
    props: {
      troll: rp
    }
  };
}
