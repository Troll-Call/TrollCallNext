import {
  negate,
  themeColor,
  toHex
} from '@/types/assist/colors';
import Box from '@/components/box';
import Navbar from '@/components/nav';
import * as dbFunctions from '@/lib/dbFunctions';
import { GetStaticPropsContext } from 'next/types';
import { Troll as trollType } from '@/types/troll';
import Footer from '@/components/footer';
import TrollCard from '@/components/trollcard';
import PesterBox from '@/components/pester';
import UsernameRenderer from '@/components/name';
import { User as userType } from '@/types/user';
import {
  Bloods,
  PossibleBloods
} from '@/types/assist/signs';
import { Themer } from '@/components/themer';

export default function Troll({
  troll
}: {
  troll: trollType;
}) {
  var bloodColor =
    Bloods[troll.sign.fakeColor ?? troll.sign.color] ??
    Bloods[12];
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
            : negate(
                bloodColor.colormap.map((x) => x * 255)
              )
        }
        label='neg'
      />
      <Navbar
        title={troll.name.first}
        type={module.exports.default.name}
      />
      <Box title={troll.name.first + ' ' + troll.name.last}>
        <p>Peter</p>
      </Box>
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

export async function getStaticProps(
  context: GetStaticPropsContext
) {
  // @ts-ignore Go fuck yourself, JavaScript
  const findOne = (await dbFunctions.default).findOne;
  let cpi: string | undefined = context.params
    ?.id as string;
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
